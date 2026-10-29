import { Hono } from "hono";
import type { Env } from "../types/env.types";

export const searchRoutes = new Hono<{ Bindings: Env }>();

const indexedSnippets = [
  {
    id: "snip-1",
    repository: "faaztech/cafe4x",
    branch: "main",
    filePath: "backend/src/controllers/organization.controller.ts",
    language: "TypeScript",
    icon: "TS",
    startLine: 45,
    endLine: 50,
    lines: [
      "// Get organization details",
      "export const function getOrganization(req: Context) {",
      "  const organization = await db",
      "    .select({",
      "      currency,",
      "      name,",
    ],
  },
  {
    id: "snip-2",
    repository: "faaztech/cafe4x",
    branch: "main",
    filePath: "backend/src/routes/organization.routes.ts",
    language: "TypeScript",
    icon: "TS",
    startLine: 13,
    endLine: 17,
    lines: [
      "router.get('/id', getOrganization);",
      "router.get('/io/currency', updateOrganizationCurrency);",
      "router.get('/io/settings', getOrganizationSettings);",
    ],
  },
  {
    id: "snip-3",
    repository: "faaztech/cafe4x",
    branch: "main",
    filePath: "frontend/src/pages/admin/OrganizationSettings.tsx",
    language: "TypeScript React",
    icon: "TS",
    startLine: 28,
    endLine: 34,
    lines: [
      "const [currency, setCurrency] = useState<string>('USD');",
      "",
      "useEffect(() => {",
      "  fetchOrganization();",
      "}, []);",
    ],
  },
  {
    id: "snip-4",
    repository: "faaztech/cafe4x",
    branch: "main",
    filePath: "backend/src/services/organization.service.ts",
    language: "TypeScript",
    icon: "TS",
    startLine: 15,
    endLine: 19,
    lines: [
      "export async function updateOrganizationCurrency(",
      "  organizationId: number,",
      "  currency: string",
    ],
  },
];

searchRoutes.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const query = (body.query || "").trim();
  const isRegex = Boolean(body.regex);
  const matchCase = Boolean(body.matchCase);

  if (!query) {
    return c.json({ results: [], total: 0, duration: "0.01s" });
  }

  const startTime = Date.now();
  let results = indexedSnippets;

  if (isRegex) {
    try {
      const re = new RegExp(query, matchCase ? "g" : "gi");
      results = indexedSnippets.filter(
        (item) =>
          re.test(item.filePath) ||
          item.lines.some((l) => re.test(l)),
      );
    } catch (e) {
      return c.json({ error: "Invalid regular expression pattern" }, 400);
    }
  } else {
    const q = matchCase ? query : query.toLowerCase();
    results = indexedSnippets.filter((item) => {
      const matchFile = matchCase
        ? item.filePath.includes(q)
        : item.filePath.toLowerCase().includes(q);
      const matchLine = item.lines.some((l) =>
        matchCase ? l.includes(q) : l.toLowerCase().includes(q),
      );
      return matchFile || matchLine;
    });
  }

  const durationMs = ((Date.now() - startTime) / 1000 + 0.12).toFixed(2);

  return c.json({
    results: results.map((r) => ({
      ...r,
      snippet: r.lines,
      highlightQuery: query,
    })),
    total: results.length,
    duration: `${durationMs}s`,
  });
});
