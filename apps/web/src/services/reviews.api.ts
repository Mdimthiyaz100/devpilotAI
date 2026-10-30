import { apiClient } from "./api-client";

export const reviewsApi = {
  getPrReview: (prNumber: number) => apiClient(`/reviews/pr/${prNumber}`),
};
