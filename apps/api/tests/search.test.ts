import { describe, it, expect } from "vitest";
import app from "../src/app";

describe("Search API Routes", () => {
  it("should return matches when searching for currency", async () => {
    const res = await app.request("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "currency" }),
    });

    expect(res.status).toBe(200);
    const body = (await res.json()) as any;
    expect(body.results).toBeDefined();
    expect(body.results.length).toBeGreaterThan(0);
    expect(body.results[0].filePath).toContain("organization");
  });

  it("should handle regex patterns accurately", async () => {
    const res = await app.request("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "get[A-Z]\\w+", regex: true }),
    });

    expect(res.status).toBe(200);
    const body = (await res.json()) as any;
    expect(body.results.length).toBeGreaterThan(0);
  });

  it("should return 400 on invalid regex", async () => {
    const res = await app.request("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "[invalid(", regex: true }),
    });

    expect(res.status).toBe(400);
  });
});
