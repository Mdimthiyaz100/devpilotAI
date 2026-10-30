import { GitHubClient } from "../integrations/github/github-client";

export class GitHubService {
  private client: GitHubClient;

  constructor(token: string) {
    this.client = new GitHubClient(token);
  }

  async getRepos() {
    return this.client.listUserRepositories();
  }
}
