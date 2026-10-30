import { Hono } from "hono";
import type { Env } from "../types/env.types";

export const authRoutes = new Hono<{ Bindings: Env }>();

authRoutes.get("/me", (c) => {
  return c.json({
    user: {
      id: "usr-mohamed",
      name: "Mohamed",
      email: "mohamed@faaztech.com",
      githubUsername: "faaztech",
      avatarUrl: "https://github.com/faaztech.png",
      quota: {
        used: 12450,
        total: 50000,
        percentage: 25,
      },
    },
  });
});

authRoutes.post("/logout", (c) => {
  return c.json({ status: "success", message: "Signed out session invalidated." });
});
