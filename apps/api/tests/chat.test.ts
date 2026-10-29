import { describe, it, expect } from "vitest";
import app from "../src/app";

describe("Chat API Routes", () => {
  it("should answer codebase-aware queries with source citations", async () => {
    const res = await app.request("/api/chat/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "Where is organization currency configured?" }),
    });

    expect(res.status).toBe(200);
    const body = (await res.json()) as any;
    expect(body.role).toBe("assistant");
    expect(body.content).toContain("organization currency");
    expect(body.sourceReferences).toBeDefined();
    expect(body.sourceReferences.length).toBeGreaterThan(0);
    expect(body.sourceReferences[0].filePath).toContain("organization.controller.ts");
  });

  it("should reject empty questions with 400", async () => {
    const res = await app.request("/api/chat/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "   " }),
    });

    expect(res.status).toBe(400);
  });
});
