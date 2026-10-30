export class IndexingService {
  async indexRepository(repoId: string, branch = "main") {
    return { indexed: true, files: 148 };
  }
}
