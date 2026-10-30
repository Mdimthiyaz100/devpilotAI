import { apiClient } from "./api-client";

export const chatApi = {
  sendQuery: (question: string, repository?: string, branch?: string) =>
    apiClient("/chat/query", {
      method: "POST",
      body: JSON.stringify({ question, repository, branch }),
    }),
};
