import { describe, it, expect } from "vitest";
import app from "../src/app";

describe("Repositories API Routes", () => {
  it("should list authorized repositories", async () => {
    const res = await app.request("/api/repositories");
    expect(res.status).toBe(200);
    const body = (await res.json()) as any;
    expect(body.repositories).toBeInstanceOf(Array);
    expect(body.repositories.some((r: any) => r.name === "cafe4x")).toBe(true);
  });

  it("should retrieve repository branches", async () => {
    const res = await app.request("/api/repositories/faaztech/cafe4x/branches");
    expect(res.status).toBe(200);
    const body = (await res.json()) as any;
    expect(body.branches).toContain("main");
  });
});
