export class BugAnalysisService {
  async inspectCode(code: string) {
    return { issues: [], severity: "clean" };
  }
}
