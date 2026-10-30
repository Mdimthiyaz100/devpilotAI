import { OpenAIProvider } from "../integrations/ai/openai.provider";
import { ClaudeProvider } from "../integrations/ai/claude.provider";
import type { Env } from "../types/env.types";

export class AIService {
  private provider: any;

  constructor(env: Env) {
    if (env.ANTHROPIC_API_KEY) {
      this.provider = new ClaudeProvider(env.ANTHROPIC_API_KEY);
    } else {
      this.provider = new OpenAIProvider(env.OPENAI_API_KEY || "");
    }
  }

  async answerQuestion(question: string, repo: string, snippets: any[]) {
    return this.provider.generateResponse({
      question,
      repositoryContext: repo,
      relevantSnippets: snippets,
    });
  }
}
