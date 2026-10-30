export class TestGenerationService {
  async generateTests(code: string, framework = "Vitest") {
    return `// Tests generated for ${framework}\nimport { describe, it } from "${framework.toLowerCase()}";`;
  }
}
