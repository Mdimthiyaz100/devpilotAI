export async function handleIndexingQueue(batch: MessageBatch<any>, env: any): Promise<void> {
  for (const message of batch.messages) {
    const { repositoryId, branch } = message.body;
    console.log(`[Queue: Indexing] Indexing repository ${repositoryId} on ${branch}`);
    // Background tree fetch and code chunk parsing
    message.ack();
  }
}
