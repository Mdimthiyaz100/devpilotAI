export interface PullRequestDetail {
  number: number;
  title: string;
  body: string;
  state: "open" | "closed";
  user: { login: string };
  diff_url: string;
}

export class PullRequestClient {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async listPullRequests(owner: string, repo: string): Promise<PullRequestDetail[]> {
    if (!this.token) {
      return [
        {
          number: 42,
          title: "Fix pagination and add search",
          body: "Resolves pagination bounds and adds debounced code search input.",
          state: "open",
          user: { login: "faaztech-dev" },
          diff_url: "https://github.com/faaztech/cafe4x/pull/42.diff",
        },
      ];
    }

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?state=open`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "User-Agent": "DevPilot-AI",
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to list pull requests: ${res.statusText}`);
    }

    return (await res.json()) as PullRequestDetail[];
  }

  async getPullRequestDiff(owner: string, repo: string, prNumber: number): Promise<string> {
    if (!this.token) {
      return `--- a/frontend/src/components/itemList.tsx\n+++ b/frontend/src/components/itemList.tsx\n@@ -42,6 +42,12 @@\n- fetch('/api/items')\n+ try {\n+   const res = await fetch('/api/items');\n+ } catch (err) {\n+   setError(err);\n+ }`;
    }

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "User-Agent": "DevPilot-AI",
        Accept: "application/vnd.github.v3.diff",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch PR diff: ${res.statusText}`);
    }

    return await res.text();
  }
}
