import type { Context } from "hono";

export const handleReviews = async (c: Context) => {
  return c.json({ status: "reviewed" });
};
