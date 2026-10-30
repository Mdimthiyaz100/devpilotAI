export interface AIProviderOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GroundedCodePrompt {
  question: string;
  repositoryContext: string;
  relevantSnippets: Array<{
    filePath: string;
    startLine: number;
    endLine: number;
    code: string;
  }>;
}

export interface AIResponse {
  answer: string;
  suggestedAction?: string;
  citations: Array<{
    filePath: string;
    startLine: number;
    endLine: number;
    snippet: string;
  }>;
}

export interface AIProvider {
  name: string;
  generateResponse(prompt: GroundedCodePrompt, options?: AIProviderOptions): Promise<AIResponse>;
  generateExplanation(code: string, language: string): Promise<string>;
  generateFix(code: string, issue: string): Promise<{ proposedCode: string; rationale: string }>;
  generateRefactor(code: string, goal?: string): Promise<{ refactoredCode: string; tradeOffs: string }>;
}
