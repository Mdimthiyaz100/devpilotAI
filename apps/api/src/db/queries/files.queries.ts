export const fileQueries = {
  getByPath: "SELECT * FROM files WHERE repository_id = ?1 AND branch = ?2 AND path = ?3",
  listTree: "SELECT path, language, size_bytes FROM files WHERE repository_id = ?1 AND branch = ?2",
};
