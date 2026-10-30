import { Hono } from "hono";
import type { Env } from "../types/env.types";

export const documentationRoutes = new Hono<{ Bindings: Env }>();

documentationRoutes.post("/generate", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const filePath = body.filePath || "backend/src/controllers/organization.controller.ts";

  return c.json({
    filePath,
    markdownDoc: `# Module Documentation: \`${filePath}\`\n\n## Overview\nManages organization currency configuration and POS operational settings.\n\n## Endpoints\n- \`GET /api/organizations/:id\`\n- \`POST /api/organizations/currency\``,
  });
});
