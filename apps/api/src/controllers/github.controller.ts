import type { Context } from "hono";

export const handleGithub = async (c: Context) => {
  return c.json({ status: "connected" });
};
