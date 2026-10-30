import { apiClient } from "./api-client";

export const documentationApi = {
  generate: (filePath: string) =>
    apiClient("/documentation/generate", {
      method: "POST",
      body: JSON.stringify({ filePath }),
    }),
};
