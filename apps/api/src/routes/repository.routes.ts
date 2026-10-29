import { Hono } from "hono";
import type { Env } from "../types/env.types";

export const repositoryRoutes = new Hono<{ Bindings: Env }>();

// Demo repos to reflect the screenshot and provide live fallback
const sampleRepositories = [
  {
    id: "repo-cafe4x",
    org: "faaztech",
    name: "cafe4x",
    fullName: "faaztech/cafe4x",
    isPrivate: true,
    defaultBranch: "main",
    branches: ["main", "develop", "feat/pagination"],
    description: "Cafe4x point of sale and developer operations workspace",
  },
  {
    id: "repo-api",
    org: "faaztech",
    name: "devpilot-api",
    fullName: "faaztech/devpilot-api",
    isPrivate: true,
    defaultBranch: "main",
    branches: ["main"],
  },
];

repositoryRoutes.get("/", (c) => {
  return c.json({ repositories: sampleRepositories });
});

repositoryRoutes.get("/:org/:repo/branches", (c) => {
  const { org, repo } = c.req.param();
  const found = sampleRepositories.find((r) => r.org === org && r.name === repo);
  return c.json({ branches: found ? found.branches : ["main"] });
});
