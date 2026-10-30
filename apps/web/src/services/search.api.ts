import { apiClient } from "./api-client";

export const searchApi = {
  executeSearch: (query: string, options?: { regex?: boolean; matchCase?: boolean }) =>
    apiClient("/search", {
      method: "POST",
      body: JSON.stringify({ query, ...options }),
    }),
};
