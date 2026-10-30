import { Hono } from "hono";
import type { Env } from "../types/env.types";
import { GitHubClient } from "../integrations/github/github-client";

export const githubRoutes = new Hono<{ Bindings: Env }>();

githubRoutes.get("/repos", async (c) => {
  const token = c.env.GITHUB_ACCESS_TOKEN || "";
  const client = new GitHubClient(token);
  const repos = await client.listUserRepositories();
  return c.json({ repositories: repos });
});
