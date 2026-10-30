import type { Env } from "../types/env.types";

export class IndexingProducer {
  private queue?: Queue<any>;

  constructor(env: Env) {
    this.queue = env.INDEXING_QUEUE;
  }

  async enqueueRepoIndexing(repositoryId: string, branch = "main"): Promise<boolean> {
    if (!this.queue) {
      console.log(`[Queue: Producer] Local fallback: queued repo ${repositoryId}`);
      return true;
    }

    await this.queue.send({
      repositoryId,
      branch,
      timestamp: new Date().toISOString(),
    });
    return true;
  }
}
