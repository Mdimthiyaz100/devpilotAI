import { apiClient } from "./api-client";

export const authApi = {
  getMe: () => apiClient("/auth/me"),
  logout: () => apiClient("/auth/logout", { method: "POST" }),
};
