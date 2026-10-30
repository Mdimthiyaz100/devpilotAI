export const PROMPTS = {
  CODE_SEARCH_EXPLAIN: (code: string, language: string) => `
You are a senior staff engineer. Explain this ${language} code concisely:
\`\`\`${language}
${code}
\`\`\`
Provide:
1. Executive summary
2. Critical state or side-effects
3. Potential edge cases
`,

  CODE_FIX_SUGGESTION: (code: string, issue: string) => `
Analyze the code and suggest a fix for: ${issue}
\`\`\`
${code}
\`\`\`
Return the corrected code block and explain why it addresses the problem.
`,

  PULL_REQUEST_REVIEW: (diff: string) => `
Review this pull request diff like a CodeRabbit-style reviewer:
\`\`\`diff
${diff}
\`\`\`
Categorize findings by High, Medium, Low, or Informational severity.
`,

  TEST_GENERATION: (code: string, framework: string, options: { edgeCases: boolean; invalidInputs: boolean; mocks: boolean }) => `
Generate comprehensive unit tests using ${framework} for:
\`\`\`
${code}
\`\`\`
Include edge cases: ${options.edgeCases}
Include invalid inputs: ${options.invalidInputs}
Mock dependencies: ${options.mocks}
`,
};
