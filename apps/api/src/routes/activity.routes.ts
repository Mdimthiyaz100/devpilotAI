import { Hono } from "hono";
import type { Env } from "../types/env.types";

export const activityRoutes = new Hono<{ Bindings: Env }>();

activityRoutes.get("/", (c) => {
  return c.json({
    activities: [
      { id: "act-1", type: "search", detail: "Searched for 'organization currency'", timestamp: "5m ago" },
      { id: "act-2", type: "review", detail: "Reviewed Pull Request #42", timestamp: "1h ago" },
      { id: "act-3", type: "test", detail: "Generated Vitest suite for itemList.tsx", timestamp: "3h ago" },
    ],
  });
});
