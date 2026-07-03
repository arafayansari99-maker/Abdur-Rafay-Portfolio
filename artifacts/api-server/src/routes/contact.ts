import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
  };

  // Basic validation
  if (
    typeof name !== "string" || name.trim() === "" ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" || message.trim() === ""
  ) {
    res.status(400).json({ error: "Name, a valid email, and message are required." });
    return;
  }

  try {
    const connectors = new ReplitConnectors();

    const payload = {
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["a.rafayansari99@gmail.com"],
      reply_to: email.trim(),
      subject: `New message from ${name.trim()} via portfolio`,
      html: `
        <div style="font-family:monospace;background:#0a0a0a;color:#e2e8f0;padding:32px;border-radius:8px;max-width:600px">
          <h2 style="color:#00bcd4;margin:0 0 24px">New Portfolio Contact</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="color:#94a3b8;padding:8px 0;width:120px">Name</td><td style="color:#fff">${name.trim()}</td></tr>
            <tr><td style="color:#94a3b8;padding:8px 0">Email</td><td style="color:#fff">${email.trim()}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #1e293b;margin:20px 0"/>
          <p style="color:#94a3b8;margin:0 0 8px">Message</p>
          <p style="color:#fff;white-space:pre-wrap;margin:0">${message.trim()}</p>
        </div>
      `,
    };

    const response = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      logger.error({ status: response.status, body: text }, "Resend API error");
      res.status(502).json({ error: "Failed to send email. Please try again." });
      return;
    }

    logger.info({ from: email }, "Contact email sent");
    res.status(200).json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Contact route error");
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
