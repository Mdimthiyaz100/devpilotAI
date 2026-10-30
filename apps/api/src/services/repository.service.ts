export class RepositoryService {
  async getDetails(org: string, repo: string) {
    return { org, repo, branch: "main" };
  }
}
