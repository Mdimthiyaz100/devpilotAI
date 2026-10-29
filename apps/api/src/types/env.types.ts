export interface Env {
  DB: D1Database;
  FILES?: R2Bucket;
  INDEXING_QUEUE?: Queue<any>;
  OPENAI_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  GITHUB_ACCESS_TOKEN?: string;
  JWT_SECRET?: string;
}
