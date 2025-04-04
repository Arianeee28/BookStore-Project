import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import os from 'os';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the root directory
app.use("/attached_assets", express.static(path.join(process.cwd(), "attached_assets")));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = process.env.PORT || 5000;
  const isProduction = process.env.NODE_ENV === 'production';
  const networkInterfaces = os.networkInterfaces();
  const ip = Object.values(networkInterfaces)
    .flat()
    .find((details) => details && 
      details.family === 'IPv4' && 
      !details.internal && 
      typeof details.address === 'string'
    )?.address || '0.0.0.0';

  server.listen(port, '0.0.0.0', () => {
    log(`Server running at:`);
    log(`- Local:    http://localhost:${port}`);
    log(`- Network:  http://${ip}:${port}`);
  });
})();