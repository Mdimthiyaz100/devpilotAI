import type { MiddlewareHandler } from "hono";

export const requestIdMiddleware: MiddlewareHandler = async (c, next) => {
  const reqId = c.req.header("x-request-id") || crypto.randomUUID();
  c.header("x-request-id", reqId);
  await next();
};
