import type { Context } from "hono";

export const handleTests = async (c: Context) => {
  return c.json({ status: "tests_generated" });
};
