export const reviewQueries = {
  getByPR: "SELECT * FROM pull_request_reviews WHERE repository_id = ?1 AND pr_number = ?2",
  saveReview: "INSERT INTO pull_request_reviews (id, repository_id, pr_number, pr_title, author, status, findings_json) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
};
