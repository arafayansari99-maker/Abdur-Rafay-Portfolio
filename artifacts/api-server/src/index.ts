import app from "./app";
import { logger } from "./lib/logger";

const isVercelRuntime = Boolean(process.env["VERCEL"]);

if (!isVercelRuntime) {
  const rawPort = process.env["PORT"];

  if (!rawPort) {
    throw new Error(
      "PORT environment variable is required but was not provided.",
    );
  }

  const port = Number(rawPort);

  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
} else {
  logger.info("Detected Vercel runtime; skipping local listen() call.");
}

export default app;
