-- Repository Indexing and Search Migration

CREATE TABLE IF NOT EXISTS indexing_jobs (
  id TEXT PRIMARY KEY,
  repository_id TEXT NOT NULL REFERENCES repositories(id),
  branch TEXT NOT NULL,
  status TEXT NOT NULL, -- queued, running, completed, failed
  files_total INTEGER DEFAULT 0,
  files_processed INTEGER DEFAULT 0,
  error_message TEXT,
  started_at DATETIME,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS search_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  query TEXT NOT NULL,
  repository_scope TEXT,
  results_count INTEGER,
  search_duration_ms REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
