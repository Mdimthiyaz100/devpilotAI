import type { Context } from "hono";

export const getAnalysis = async (c: Context) => {
  return c.json({ status: "ready" });
};
