export const userQueries = {
  getById: "SELECT * FROM users WHERE id = ?1",
  getByGithubId: "SELECT * FROM users WHERE github_id = ?1",
  create: "INSERT INTO users (id, github_id, username, email, avatar_url) VALUES (?1, ?2, ?3, ?4, ?5)",
};
