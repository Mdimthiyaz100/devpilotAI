export const repositoryQueries = {
  getById: "SELECT * FROM repositories WHERE id = ?1",
  listByUser: "SELECT * FROM repositories WHERE user_id = ?1 ORDER BY name ASC",
  create: "INSERT INTO repositories (id, user_id, org, name, full_name, default_branch, is_private) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
};
