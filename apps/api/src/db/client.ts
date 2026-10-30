import type { Env } from "../types/env.types";

export class DatabaseClient {
  private db: D1Database;

  constructor(env: Env) {
    this.db = env.DB;
  }

  get raw(): D1Database {
    return this.db;
  }
}
