import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Env } from "./types/env.types";
import { repositoryRoutes } from "./routes/repository.routes";
import { searchRoutes } from "./routes/search.routes";
import { chatRoutes } from "./routes/chat.routes";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

app.get("/health", (c) =>
  c.json({
    status: "ok",
    service: "devpilot-api",
    version: "0.1.0",
    features: ["search", "chat", "reviews", "test-generation", "repository-indexing"],
  }),
);

app.route("/api/repositories", repositoryRoutes);
app.route("/api/search", searchRoutes);
app.route("/api/chat", chatRoutes);

export default app;
