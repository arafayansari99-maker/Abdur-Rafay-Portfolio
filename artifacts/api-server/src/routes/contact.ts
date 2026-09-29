import { Router, type Request } from "express";
import { rateLimit } from "express-rate-limit";
import { Resend } from "resend";
import { logger } from "../lib/logger.js";

type JsonResponse = {
  status(code: number): JsonResponse;
  json(body: unknown): unknown;
};

const router = Router();
const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages. Please try again later." },
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

router.post("/contact", contactRateLimit, async (req: Request, res: JsonResponse) => {
  const { name, email, message } = req.body as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
  };

  const normalizedName = typeof name === "string" ? name.trim().replace(/[\r\n]+/g, " ") : "";
  const normalizedEmail = typeof email === "string" ? email.trim() : "";
  const normalizedMessage = typeof message === "string" ? message.trim() : "";

  if (
    !normalizedName || normalizedName.length > 100 ||
    normalizedEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
    !normalizedMessage || normalizedMessage.length > 5000
  ) {
    res.status(400).json({ error: "Enter a valid name, email, and message within the allowed lengths." });
    return;
  }

  const safeName = escapeHtml(normalizedName);
  const safeEmail = escapeHtml(normalizedEmail);
  const safeMessage = escapeHtml(normalizedMessage);

  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    logger.error("RESEND_API_KEY is not set");
    res.status(500).json({ error: "Email service is not configured." });
    return;
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["a.rafayansari99@gmail.com"],
      replyTo: normalizedEmail,
      subject: `New message from ${normalizedName} via portfolio`,
      html: `
        <div style="font-family:monospace;background:#0a0a0a;color:#e2e8f0;padding:32px;border-radius:8px;max-width:600px">
          <h2 style="color:#00bcd4;margin:0 0 24px">New Portfolio Contact</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="color:#94a3b8;padding:8px 0;width:120px">Name</td><td style="color:#fff">${safeName}</td></tr>
            <tr><td style="color:#94a3b8;padding:8px 0">Email</td><td style="color:#fff">${safeEmail}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #1e293b;margin:20px 0"/>
          <p style="color:#94a3b8;margin:0 0 8px">Message</p>
          <p style="color:#fff;white-space:pre-wrap;margin:0">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      logger.error({ error }, "Resend API error");
      res.status(502).json({ error: "Failed to send email. Please try again." });
      return;
    }

    logger.info({ from: normalizedEmail }, "Contact email sent");
    res.status(200).json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Contact route error");
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
