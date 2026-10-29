-- Initial schema for DevPilot AI D1 SQLite database

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  github_id INTEGER UNIQUE,
  username TEXT NOT NULL,
  email TEXT,
  avatar_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS repositories (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  org TEXT NOT NULL,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  default_branch TEXT DEFAULT 'main',
  is_private INTEGER DEFAULT 1,
  indexed_status TEXT DEFAULT 'pending', -- pending, indexing, indexed, failed
  last_indexed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(org, name)
);

CREATE TABLE IF NOT EXISTS files (
  id TEXT PRIMARY KEY,
  repository_id TEXT NOT NULL REFERENCES repositories(id),
  path TEXT NOT NULL,
  branch TEXT NOT NULL,
  language TEXT,
  size_bytes INTEGER,
  last_commit_hash TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(repository_id, branch, path)
);

CREATE TABLE IF NOT EXISTS code_chunks (
  id TEXT PRIMARY KEY,
  repository_id TEXT NOT NULL REFERENCES repositories(id),
  file_id TEXT NOT NULL REFERENCES files(id),
  path TEXT NOT NULL,
  start_line INTEGER NOT NULL,
  end_line INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_code_chunks_repo ON code_chunks(repository_id);
CREATE INDEX IF NOT EXISTS idx_code_chunks_path ON code_chunks(path);
