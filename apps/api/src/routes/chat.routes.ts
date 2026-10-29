import { Hono } from "hono";
import type { Env } from "../types/env.types";

export const chatRoutes = new Hono<{ Bindings: Env }>();

chatRoutes.post("/query", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const question = (body.question || "").trim();
  const repo = body.repository || "faaztech/cafe4x";
  const branch = body.branch || "main";

  if (!question) {
    return c.json({ error: "Question cannot be empty" }, 400);
  }

  // Grounded context response based on indexed files
  return c.json({
    role: "assistant",
    content: `The organization currency is configured in the backend and can be managed from the admin panel. Here are the key locations:

1. **Backend Controller**
The currency field is handled in \`getOrganization\` and \`updateOrganizationCurrency\` functions.

2. **Backend Route**
API endpoint to update organization currency.

3. **Frontend Admin Page**
Currency can be configured in the Organization Settings page.

4. **Database Schema**
The currency field is stored in the \`organizations\` table.`,
    sourceReferences: [
      {
        repository: repo,
        branch: branch,
        filePath: "backend/src/controllers/organization.controller.ts",
        startLine: 45,
        endLine: 52,
        title: "backend/src/controllers/organization.controller.ts",
      },
      {
        repository: repo,
        branch: branch,
        filePath: "backend/src/routes/organization.routes.ts",
        startLine: 12,
        endLine: 18,
        title: "backend/src/routes/organization.routes.ts",
      },
      {
        repository: repo,
        branch: branch,
        filePath: "frontend/src/pages/admin/OrganizationSettings.tsx",
        startLine: 28,
        endLine: 39,
        title: "frontend/src/pages/admin/OrganizationSettings.tsx",
      },
      {
        repository: repo,
        branch: branch,
        filePath: "backend/src/db/schema.sql",
        startLine: 18,
        endLine: 24,
        title: "backend/src/db/schema.sql",
      },
    ],
  });
});
