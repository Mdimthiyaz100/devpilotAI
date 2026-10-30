import type { Context } from "hono";

export const handleSearch = async (c: Context) => {
  return c.json({ status: "searched" });
};
