export interface GitHubRepoMeta {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  default_branch: string;
  description?: string;
}

export class GitHubClient {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async listUserRepositories(): Promise<GitHubRepoMeta[]> {
    if (!this.token) {
      return [
        {
          id: 101,
          name: "cafe4x",
          full_name: "faaztech/cafe4x",
          private: true,
          default_branch: "main",
          description: "Developer workspace & POS",
        },
        {
          id: 102,
          name: "devpilot-api",
          full_name: "faaztech/devpilot-api",
          private: true,
          default_branch: "main",
        },
      ];
    }

    const res = await fetch("https://api.github.com/user/repos?per_page=100&sort=updated", {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "User-Agent": "DevPilot-AI",
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.statusText}`);
    }

    return (await res.json()) as GitHubRepoMeta[];
  }

  async getTree(owner: string, repo: string, branch = "main"): Promise<any[]> {
    if (!this.token) {
      return [
        { path: "backend/src/controllers/organization.controller.ts", type: "blob" },
        { path: "frontend/src/pages/admin/OrganizationSettings.tsx", type: "blob" },
      ];
    }

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "User-Agent": "DevPilot-AI",
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub tree fetch failed: ${res.statusText}`);
    }

    const data = (await res.json()) as any;
    return data.tree || [];
  }
}
