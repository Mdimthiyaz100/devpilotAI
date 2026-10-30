import type { MiddlewareHandler } from "hono";

const requestCounts = new Map<string, { count: number; resetAt: number }>();

export const rateLimitMiddleware: (limit?: number, windowMs?: number) => MiddlewareHandler = (
  limit = 100,
  windowMs = 60000,
) => {
  return async (c, next) => {
    const ip = c.req.header("cf-connecting-ip") || "local-ip";
    const now = Date.now();
    const entry = requestCounts.get(ip);

    if (!entry || now > entry.resetAt) {
      requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (entry.count >= limit) {
      return c.json({ error: "Too many requests. Please slow down." }, 429);
    }

    entry.count++;
    return next();
  };
};
