import { Hono } from "hono";
import type { Env } from "../types/env.types";

export const analysisRoutes = new Hono<{ Bindings: Env }>();

analysisRoutes.post("/repo", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const repo = body.repository || "faaztech/cafe4x";

  return c.json({
    repository: repo,
    filesCount: 148,
    linesOfCode: 24500,
    languageDistribution: {
      TypeScript: 68,
      TypeScriptReact: 22,
      SQL: 5,
      CSS: 5,
    },
    metrics: {
      complexityScore: "A-",
      coverageEstimate: "74%",
      vulnerabilitiesCount: 0,
    },
    status: "completed",
  });
});
