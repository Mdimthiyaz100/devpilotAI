import { apiClient } from "./api-client";

export const githubApi = {
  getRepos: () => apiClient("/github/repos"),
};
