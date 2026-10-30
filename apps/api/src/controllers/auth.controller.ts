import type { Context } from "hono";

export const getMe = async (c: Context) => {
  return c.json({ user: { id: "usr-mohamed", name: "Mohamed" } });
};
