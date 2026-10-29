export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  githubUsername?: string;
}

export interface Repository {
  id: string;
  org: string;
  name: string;
  fullName: string;
  isPrivate: boolean;
  defaultBranch: string;
  branches: string[];
  description?: string;
  stars?: number;
  language?: string;
  updatedAt?: string;
}

export interface FileNode {
  name: string;
  path: string;
  type: "file" | "folder";
  depth: number;
  children?: FileNode[];
  language?: string;
  size?: number;
}

export interface SearchResultItem {
  id: string;
  repository: string;
  branch: string;
  filePath: string;
  language: string;
  icon: string;
  startLine: number;
  endLine: number;
  lines: string[];
  snippet: string[];
  highlightQuery?: string;
  matchScore?: number;
}

export interface SearchQuery {
  query: string;
  repository?: string;
  allRepositories?: boolean;
  branch?: string;
  regex?: boolean;
  matchCase?: boolean;
  globalFilter?: boolean;
  language?: string;
  pathFilter?: string;
}

export interface SourceReference {
  repository: string;
  branch: string;
  filePath: string;
  startLine: number;
  endLine: number;
  snippet?: string;
  title: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  sourceReferences?: SourceReference[];
  feedback?: "helpful" | "partially" | "incorrect" | "accurate" | "inaccurate";
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  messages: ChatMessage[];
  repositoryContext?: string;
}

export type Severity = "high" | "medium" | "low" | "info";

export interface ReviewFinding {
  id: string;
  severity: Severity;
  title: string;
  summary: string;
  filePath: string;
  lineRange?: [number, number];
  evidence: string;
  suggestedFix?: string;
  verified?: boolean;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  author: string;
  status: "open" | "closed" | "merged";
  openedAt: string;
  changedFilesCount: number;
  additions: number;
  deletions: number;
  findings: ReviewFinding[];
  diff?: string;
}

export interface TestGenerationRequest {
  framework: "vitest" | "jest" | "mocha";
  assertionStyle?: "standard" | "aaa";
  filePath: string;
  codeContext?: string;
  includeEdgeCases: boolean;
  includeInvalidInputs: boolean;
  mockDependencies: boolean;
}

export interface TestGenerationResult {
  id: string;
  framework: string;
  filePath: string;
  testCode: string;
  explanation: string;
  executionStatus?: "not_run" | "passed" | "failed" | "isolated_timeout";
  stdout?: string;
  stderr?: string;
}

export interface ContextAnalysis {
  filePath: string;
  summary: string;
  stateManagement: string[];
  apiCalls: string[];
  dependencies: string[];
  importantFunctions: string[];
  relatedFiles: string[];
  patterns: string[];
  tags: string[];
}
