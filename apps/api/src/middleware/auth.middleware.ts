import type { MiddlewareHandler } from "hono";
import type { Env } from "../types/env.types";

export const authMiddleware: MiddlewareHandler<{ Bindings: Env; Variables: { userId: string } }> = async (
  c,
  next,
) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    // Development fallback identifier for pairing with frontend session
    c.set("userId", "usr-dev-mohamed");
    return next();
  }

  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) {
    return c.json({ error: "Unauthorized access token" }, 401);
  }

  c.set("userId", "usr-" + token.slice(0, 8));
  return next();
};
