export class SearchService {
  async executeSearch(query: string) {
    return { query, matches: [] };
  }
}
