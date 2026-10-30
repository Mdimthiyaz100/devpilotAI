import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Env } from "./types/env.types";
import { repositoryRoutes } from "./routes/repository.routes";
import { searchRoutes } from "./routes/search.routes";
import { chatRoutes } from "./routes/chat.routes";
import { authRoutes } from "./routes/auth.routes";
import { githubRoutes } from "./routes/github.routes";
import { reviewsRoutes } from "./routes/reviews.routes";
import { testsRoutes } from "./routes/tests.routes";
import { activityRoutes } from "./routes/activity.routes";
import { analysisRoutes } from "./routes/analysis.routes";
import { documentationRoutes } from "./routes/documentation.routes";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

app.get("/health", (c) =>
  c.json({
    status: "ok",
    service: "devpilot-api",
    version: "0.1.0",
    features: [
      "search",
      "chat",
      "reviews",
      "test-generation",
      "repository-indexing",
      "auth",
      "github",
      "analytics",
      "documentation",
    ],
  }),
);

// Modular API routes
app.route("/api/auth", authRoutes);
app.route("/api/github", githubRoutes);
app.route("/api/repositories", repositoryRoutes);
app.route("/api/search", searchRoutes);
app.route("/api/chat", chatRoutes);
app.route("/api/reviews", reviewsRoutes);
app.route("/api/tests", testsRoutes);
app.route("/api/activity", activityRoutes);
app.route("/api/analysis", analysisRoutes);
app.route("/api/documentation", documentationRoutes);

export default app;
