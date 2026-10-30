import { apiClient } from "./api-client";

export const analysisApi = {
  runRepoAnalysis: (repository: string) =>
    apiClient("/analysis/repo", {
      method: "POST",
      body: JSON.stringify({ repository }),
    }),
};
