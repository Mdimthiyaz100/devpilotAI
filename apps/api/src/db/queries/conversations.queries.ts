export const conversationQueries = {
  getById: "SELECT * FROM conversations WHERE id = ?1",
  listByUser: "SELECT * FROM conversations WHERE user_id = ?1 ORDER BY updated_at DESC",
  create: "INSERT INTO conversations (id, user_id, repository_id, title) VALUES (?1, ?2, ?3, ?4)",
};
