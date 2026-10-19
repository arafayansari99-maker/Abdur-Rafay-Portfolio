import express, { type Application } from "express";
import cors from "cors";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app: Application = express();

if (process.env["VERCEL"]) {
  app.set("trust proxy", 1);
}

const allowedOrigins = (process.env["CORS_ORIGIN"] ?? process.env["ALLOWED_ORIGINS"] ?? "https://abdur-rafay-data-portfolio.vercel.app,http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (allowedOrigins.includes("*")) {
  throw new Error("CORS origins must be explicitly listed; wildcard origins are not supported.");
}

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    callback(null, !origin || allowedOrigins.includes(origin));
  },
};

app.use((req, res, next) => {
  res.on("finish", () => {
    logger.info({
      method: req.method,
      url: req.originalUrl.split("?")[0],
      statusCode: res.statusCode,
    }, "request");
  });
  next();
});
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
    message: "API is running",
    routes: ["/healthz", "/api/healthz", "/api/contact"],
  });
});

app.get("/favicon.ico", (_req, res) => {
  res.status(204).end();
});

app.use("/api", router);

export default app;
