import type { Context } from "hono";

export const handleRepository = async (c: Context) => {
  return c.json({ status: "loaded" });
};
