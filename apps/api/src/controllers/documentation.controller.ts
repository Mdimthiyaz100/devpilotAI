import type { Context } from "hono";

export const handleDocumentation = async (c: Context) => {
  return c.json({ status: "documented" });
};
