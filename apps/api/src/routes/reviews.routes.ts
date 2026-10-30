import { Hono } from "hono";
import type { Env } from "../types/env.types";

export const reviewsRoutes = new Hono<{ Bindings: Env }>();

reviewsRoutes.get("/pr/:number", (c) => {
  const number = Number(c.req.param("number")) || 42;
  return c.json({
    id: `pr-${number}`,
    number,
    title: "Fix pagination and add search",
    author: "faaztech-dev",
    status: "open",
    openedAt: "2 days ago",
    changedFilesCount: 3,
    additions: 105,
    deletions: 25,
    findings: [
      {
        id: "f-1",
        severity: "high",
        title: "Missing error handling",
        summary: "API errors are not properly handled in itemList.tsx",
        filePath: "frontend/src/components/itemList.tsx",
        lineRange: [42, 58],
        evidence: "fetch('/api/items') missing catch or error boundary check.",
        suggestedFix: "Wrap fetch inside try-catch block and update local error state.",
        verified: true,
      },
      {
        id: "f-2",
        severity: "medium",
        title: "Potential performance issue",
        summary: "Search query is not debounced",
        filePath: "frontend/src/components/itemList.tsx",
        lineRange: [65, 78],
        evidence: "Direct onChange triggers search request on every keystroke.",
        suggestedFix: "Introduce useDebounce hook with a 300ms delay window.",
        verified: true,
      },
      {
        id: "f-3",
        severity: "info",
        title: "Add unit tests",
        summary: "Consider adding tests for pagination logic",
        filePath: "frontend/src/components/__tests__/itemList.test.tsx",
        evidence: "Pagination bounds checking has no associated test suite.",
        suggestedFix: "Generate Vitest unit tests verifying page increment/decrement.",
        verified: false,
      },
    ],
  });
});
