-- AI Conversations, Reviews, and Test Generations

CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  repository_id TEXT REFERENCES repositories(id),
  title TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- user, assistant, system
  content TEXT NOT NULL,
  source_references_json TEXT, -- array of source citations
  feedback TEXT, -- accurate, inaccurate, helpful, etc.
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pull_request_reviews (
  id TEXT PRIMARY KEY,
  repository_id TEXT NOT NULL REFERENCES repositories(id),
  pr_number INTEGER NOT NULL,
  pr_title TEXT NOT NULL,
  author TEXT NOT NULL,
  status TEXT NOT NULL,
  findings_json TEXT NOT NULL, -- structured findings
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS test_generations (
  id TEXT PRIMARY KEY,
  repository_id TEXT REFERENCES repositories(id),
  file_path TEXT NOT NULL,
  framework TEXT NOT NULL,
  generated_code TEXT NOT NULL,
  execution_status TEXT, -- not_run, passed, failed
  stdout TEXT,
  stderr TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
