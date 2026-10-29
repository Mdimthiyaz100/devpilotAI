import { describe, it, expect } from "vitest";
import app from "../src/app";

describe("Health & Auth API Verification", () => {
  it("should respond ok from health endpoint", async () => {
    const res = await app.request("/health");
    expect(res.status).toBe(200);
    const body = (await res.json()) as any;
    expect(body.status).toBe("ok");
    expect(body.service).toBe("devpilot-api");
  });
});
