import { apiClient } from "./api-client";

export const repositoriesApi = {
  list: () => apiClient("/repositories"),
  getBranches: (org: string, repo: string) => apiClient(`/repositories/${org}/${repo}/branches`),
};
