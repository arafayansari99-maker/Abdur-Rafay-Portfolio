import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app = express();

const allowedOrigins = (process.env["CORS_ORIGIN"] ?? process.env["ALLOWED_ORIGINS"] ?? "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = allowedOrigins.includes("*")
  ? { origin: true, credentials: true }
  : {
      origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
    };

app.use((req: any, res: any, next: any) => {
  logger.info({
    method: req.method,
    url: req.originalUrl?.split("?")[0],
    statusCode: res.statusCode,
  }, "request");
  next();
});
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
    message: "API is running",
    routes: ["/healthz", "/api/healthz", "/api/contact"],
  });
});

app.use("/api", router);

export default app;
