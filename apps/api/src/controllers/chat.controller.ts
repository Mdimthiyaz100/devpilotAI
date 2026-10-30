import type { Context } from "hono";

export const handleChat = async (c: Context) => {
  return c.json({ status: "ok" });
};
