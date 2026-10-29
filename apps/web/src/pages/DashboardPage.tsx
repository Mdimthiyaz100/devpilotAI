import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUp,
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Code2,
  Command,
  Copy,
  ExternalLink,
  FileCode2,
  Files,
  Folder,
  FolderOpen,
  GitBranch,
  GitPullRequest,
  Globe2,
  History,
  Layers,
  LockKeyhole,
  Maximize2,
  MessageSquare,
  Mic,
  Moon,
  MoreHorizontal,
  Plus,
  Radio,
  Search,
  Send,
  Settings,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Sun,
  TestTube2,
  User as UserIcon,
  X,
  Zap,
} from "lucide-react";
import type {
  ChatMessage,
  FileNode,
  PullRequest,
  SearchResultItem,
  SourceReference,
} from "@devpilot/shared";

// Initial repository files tree matching screenshot (faaztech / cafe4x)
const initialTree: FileNode[] = [
  {
    name: "frontend",
    path: "frontend",
    type: "folder",
    depth: 0,
    children: [
      {
        name: "frontend",
        path: "frontend/frontend",
        type: "folder",
        depth: 1,
        children: [
          {
            name: "src",
            path: "frontend/frontend/src",
            type: "folder",
            depth: 2,
            children: [
              { name: "components", path: "frontend/frontend/src/components", type: "folder", depth: 3 },
              { name: "pages", path: "frontend/frontend/src/pages", type: "folder", depth: 3 },
              { name: "features", path: "frontend/frontend/src/features", type: "folder", depth: 3 },
              { name: "hooks", path: "frontend/frontend/src/hooks", type: "folder", depth: 3 },
              { name: "services", path: "frontend/frontend/src/services", type: "folder", depth: 3 },
              { name: "utils", path: "frontend/frontend/src/utils", type: "folder", depth: 3 },
              { name: "app.tsx", path: "frontend/frontend/src/app.tsx", type: "file", depth: 3, language: "tsx" },
              { name: "main.tsx", path: "frontend/frontend/src/main.tsx", type: "file", depth: 3, language: "tsx" },
              { name: "index.css", path: "frontend/frontend/src/index.css", type: "file", depth: 3, language: "css" },
              { name: "package.json", path: "frontend/frontend/src/package.json", type: "file", depth: 3, language: "json" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "backend",
    path: "backend",
    type: "folder",
    depth: 0,
    children: [
      {
        name: "src",
        path: "backend/src",
        type: "folder",
        depth: 1,
        children: [
          { name: "controllers", path: "backend/src/controllers", type: "folder", depth: 2 },
          { name: "routes", path: "backend/src/routes", type: "folder", depth: 2 },
          { name: "middleware", path: "backend/src/middleware", type: "folder", depth: 2 },
          { name: "services", path: "backend/src/services", type: "folder", depth: 2 },
          { name: "db", path: "backend/src/db", type: "folder", depth: 2 },
        ],
      },
    ],
  },
  {
    name: "doc",
    path: "doc",
    type: "folder",
    depth: 0,
    children: [
      { name: "schema.sql", path: "doc/schema.sql", type: "file", depth: 1, language: "sql" },
    ],
  },
];

// Seeded Result Hub entries matching the screenshot
const defaultResults: SearchResultItem[] = [
  {
    id: "res-1",
    repository: "faaztech/cafe4x",
    branch: "main",
    filePath: "backend/src/controllers/organization.controller.ts",
    language: "TypeScript",
    icon: "TS",
    startLine: 45,
    endLine: 50,
    lines: [
      "// Get organization details",
      "export const function getOrganization(req: Context) {",
      "  const organization = await db",
      "    .select({",
      "      currency,",
      "      name,",
    ],
    snippet: [
      "// Get organization details",
      "export const function getOrganization(req: Context) {",
      "  const organization = await db",
      "    .select({",
      "      currency,",
      "      name,",
    ],
    highlightQuery: "currency",
  },
  {
    id: "res-2",
    repository: "faaztech/cafe4x",
    branch: "main",
    filePath: "backend/src/routes/organization.routes.ts",
    language: "TypeScript",
    icon: "TS",
    startLine: 13,
    endLine: 17,
    lines: [
      "router.get('/id', getOrganization);",
      "router.get('/io/currency', updateOrganizationCurrency);",
      "router.get('/io/settings', getOrganizationSettings);",
    ],
    snippet: [
      "router.get('/id', getOrganization);",
      "router.get('/io/currency', updateOrganizationCurrency);",
      "router.get('/io/settings', getOrganizationSettings);",
    ],
    highlightQuery: "currency",
  },
  {
    id: "res-3",
    repository: "faaztech/cafe4x",
    branch: "main",
    filePath: "frontend/src/pages/admin/OrganizationSettings.tsx",
    language: "TypeScript React",
    icon: "TS",
    startLine: 28,
    endLine: 34,
    lines: [
      "const [currency, setCurrency] = useState<string>('USD');",
      "",
      "useEffect(() => {",
      "  fetchOrganization();",
      "}, []);",
    ],
    snippet: [
      "const [currency, setCurrency] = useState<string>('USD');",
      "",
      "useEffect(() => {",
      "  fetchOrganization();",
      "}, []);",
    ],
    highlightQuery: "currency",
  },
  {
    id: "res-4",
    repository: "faaztech/cafe4x",
    branch: "main",
    filePath: "backend/src/services/organization.service.ts",
    language: "TypeScript",
    icon: "TS",
    startLine: 15,
    endLine: 19,
    lines: [
      "export async function updateOrganizationCurrency(",
      "  organizationId: number,",
      "  currency: string",
    ],
    snippet: [
      "export async function updateOrganizationCurrency(",
      "  organizationId: number,",
      "  currency: string",
    ],
    highlightQuery: "currency",
  },
];

// Initial chat message matching screenshot
const initialMessages: ChatMessage[] = [
  {
    id: "msg-user-1",
    role: "user",
    content: "Where is organization currency configured?",
    timestamp: "10:14 AM",
  },
  {
    id: "msg-ai-1",
    role: "assistant",
    content: `The organization currency is configured in the backend and can be managed from the admin panel. Here are the key locations:

1. **Backend Controller**
The currency field is handled in \`getOrganization\` and \`updateOrganizationCurrency\` functions.

2. **Backend Route**
API endpoint to update organization currency.

3. **Frontend Admin Page**
Currency can be configured in the Organization Settings page.

4. **Database Schema**
The currency field is stored in the \`organizations\` table.`,
    timestamp: "10:14 AM",
    sourceReferences: [
      {
        repository: "faaztech/cafe4x",
        branch: "main",
        filePath: "backend/src/controllers/organization.controller.ts",
        startLine: 45,
        endLine: 52,
        title: "backend/src/controllers/organization.controller.ts",
      },
      {
        repository: "faaztech/cafe4x",
        branch: "main",
        filePath: "backend/src/routes/organization.routes.ts",
        startLine: 12,
        endLine: 18,
        title: "backend/src/routes/organization.routes.ts",
      },
      {
        repository: "faaztech/cafe4x",
        branch: "main",
        filePath: "frontend/src/pages/admin/OrganizationSettings.tsx",
        startLine: 28,
        endLine: 39,
        title: "frontend/src/pages/admin/OrganizationSetting...",
      },
      {
        repository: "faaztech/cafe4x",
        branch: "main",
        filePath: "backend/src/db/schema.sql",
        startLine: 18,
        endLine: 24,
        title: "backend/src/db/schema.sql",
      },
    ],
  },
];

// Sample Pull Request #42 matching screenshot
const samplePR: PullRequest = {
  id: "pr-42",
  number: 42,
  title: "Fix pagination and add search",
  author: "faaztech-dev",
  status: "open",
  openedAt: "2 days ago",
  changedFilesCount: 3,
  additions: 105,
  deletions: 25,
  findings: [
    {
      id: "f-1",
      severity: "high",
      title: "Missing error handling",
      summary: "API errors are not properly handled in itemList.tsx",
      filePath: "frontend/src/components/itemList.tsx",
      lineRange: [42, 58],
      evidence: "fetch('/api/items') missing catch or error boundary check.",
      suggestedFix: "Wrap fetch inside try-catch block and update local error state.",
      verified: true,
    },
    {
      id: "f-2",
      severity: "medium",
      title: "Potential performance issue",
      summary: "Search query is not debounced",
      filePath: "frontend/src/components/itemList.tsx",
      lineRange: [65, 78],
      evidence: "Direct onChange triggers search request on every keystroke.",
      suggestedFix: "Introduce useDebounce hook with a 300ms delay window.",
      verified: true,
    },
    {
      id: "f-3",
      severity: "info",
      title: "Add unit tests",
      summary: "Consider adding tests for pagination logic",
      filePath: "frontend/src/components/__tests__/itemList.test.tsx",
      evidence: "Pagination bounds checking has no associated test suite.",
      suggestedFix: "Generate Vitest unit tests verifying page increment/decrement.",
      verified: false,
    },
  ],
};

export default function DashboardPage() {
  // Navigation & View state
  const [activeNav, setActiveNav] = useState("Code Search");
  const [collapsedNav, setCollapsedNav] = useState(false);
  const [diffView, setDiffView] = useState(false);

  // Repository & Branch context
  const [selectedOrg, setSelectedOrg] = useState("faaztech");
  const [selectedRepo, setSelectedRepo] = useState("cafe4x");
  const [selectedBranch, setSelectedBranch] = useState("main");
  const [allRepos, setAllRepos] = useState(false);
  const [regex, setRegex] = useState(false);
  const [matchCase, setMatchCase] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(false);

  // File explorer state
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    frontend: true,
    "frontend/frontend": true,
    "frontend/frontend/src": true,
    backend: true,
    "backend/src": true,
    doc: true,
  });
  const [selectedFile, setSelectedFile] = useState("backend/src/controllers/organization.controller.ts");
  const [coverageToggle, setCoverageToggle] = useState(false);

  // Search workspace state
  const [searchQuery, setSearchQuery] = useState("organization currency");
  const [submittedQuery, setSubmittedQuery] = useState("organization currency");
  const [searchTime, setSearchTime] = useState("0.14s");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>(defaultResults);
  const [activeTab, setActiveTab] = useState("Result Hub");

  // AI Assistant panel state
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<number>(50); // 0 (Accurate) to 100 (Inaccurate)

  // Bottom panels state
  const [selectedPR, setSelectedPR] = useState<PullRequest>(samplePR);
  const [prTab, setPrTab] = useState<"AI Review" | "Files" | "Conversation">("AI Review");
  const [testFramework, setTestFramework] = useState("Vitest");
  const [testAssertion, setTestAssertion] = useState("Customizable test");
  const [testFile, setTestFile] = useState("frontend/src/components/itemList.tsx");
  const [includeEdgeCases, setIncludeEdgeCases] = useState(true);
  const [includeInvalidInputs, setIncludeInvalidInputs] = useState(true);
  const [mockDependencies, setMockDependencies] = useState(false);
  const [isGeneratingTests, setIsGeneratingTests] = useState(false);

  // Notification & Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleFolder = (path: string) => {
    setOpenFolders((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handleSearch = (q: string = searchQuery) => {
    if (!q.trim()) return;
    setSubmittedQuery(q.trim());
    setSearchTime((0.1 + Math.random() * 0.1).toFixed(2) + "s");

    // Filter results locally or provide filtered preview
    const queryLower = q.toLowerCase();
    const filtered = defaultResults.filter(
      (r) =>
        r.filePath.toLowerCase().includes(queryLower) ||
        r.lines.some((line) => line.toLowerCase().includes(queryLower)),
    );

    if (filtered.length > 0) {
      setSearchResults(filtered);
    } else {
      // Create a contextual match for user's actual typed query
      setSearchResults([
        {
          id: "custom-res",
          repository: `${selectedOrg}/${selectedRepo}`,
          branch: selectedBranch,
          filePath: selectedFile,
          language: "TypeScript",
          icon: "TS",
          startLine: 1,
          endLine: 4,
          lines: [
            `// Match found for: "${q}" in ${selectedFile}`,
            `export function handleRequest() {`,
            `  return processQuery("${q}");`,
            `}`,
          ],
          snippet: [
            `// Match found for: "${q}" in ${selectedFile}`,
            `export function handleRequest() {`,
            `  return processQuery("${q}");`,
            `}`,
          ],
          highlightQuery: q,
        },
      ]);
    }
    showToast(`Found results for "${q}"`);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setChatInput("");

    const newMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: userText,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiReply: ChatMessage = {
        id: "msg-ai-" + Date.now(),
        role: "assistant",
        content: `Regarding **"${userText}"** in repository \`${selectedOrg}/${selectedRepo}\` on branch \`${selectedBranch}\`:

I analyzed the indexed files and discovered relevant implementations in \`${selectedFile}\`.

Here is the breakdown:
- Context references were retrieved across active modules.
- Verification confirms that the configuration is anchored in database models and exposed via API endpoints.`,
        timestamp: "Just now",
        sourceReferences: [
          {
            repository: `${selectedOrg}/${selectedRepo}`,
            branch: selectedBranch,
            filePath: selectedFile,
            startLine: 15,
            endLine: 35,
            title: selectedFile,
          },
        ],
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 700);
  };

  const handleSnippetAction = (action: "Explain" | "Fix" | "Refactor", item: SearchResultItem) => {
    setSelectedFile(item.filePath);
    setChatInput(`${action} this code snippet in ${item.filePath}: lines ${item.startLine}-${item.endLine}`);
    showToast(`${action} action triggered for ${item.filePath}`);
  };

  const handleGenerateTests = () => {
    setIsGeneratingTests(true);
    setTimeout(() => {
      setIsGeneratingTests(false);
      showToast(`Generated ${testFramework} test suite for ${testFile}!`);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#080D16] text-[#F3F6FC] select-none font-sans">
      {/* 4. TOP APPLICATION BAR */}
      <header className="h-[46px] min-h-[46px] border-b border-[#1E293B] bg-[#080D16] px-3 flex items-center justify-between text-xs z-30">
        {/* Brand */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveNav("Dashboard")}>
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#7957FF] to-[#08D9F2] flex items-center justify-center shadow-lg shadow-[#7957FF]/30">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-[#F3F6FC]">
            DevPilot <span className="text-[#08D9F2]">AI</span>
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search repositories, files, and chat... (e.g. pattern: 'organization currency')"
              className="w-full h-8 pl-8 pr-16 bg-[#0D1420] border border-[#1E293B] rounded-lg text-xs text-[#F3F6FC] placeholder-[#64748B] focus:outline-none focus:border-[#7957FF] transition-all"
            />
            <div className="absolute right-2.5 flex items-center gap-1 text-[10px] text-[#64748B] bg-[#151E2D] px-1.5 py-0.5 rounded border border-[#1E293B]">
              <Command size={10} />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("Live Share session: devpilot.io/share/s-98a4f10 (Copied)")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#111A2B] hover:bg-[#151E2D] border border-[#1E293B] text-[#9BA8BC] hover:text-[#F3F6FC] transition-colors"
          >
            <Radio size={13} className="text-[#08D9F2]" />
            <span>Create Live Share</span>
          </button>

          <button
            onClick={() => showToast("Repository static analysis completed: 0 critical vulnerabilities")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#111A2B] hover:bg-[#151E2D] border border-[#1E293B] text-[#9BA8BC] hover:text-[#F3F6FC] transition-colors"
          >
            <Activity size={13} className="text-[#20D6A0]" />
            <span>Run Analytics</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="w-8 h-8 rounded-md bg-[#111A2B] hover:bg-[#151E2D] border border-[#1E293B] flex items-center justify-center text-[#9BA8BC] hover:text-[#F3F6FC] relative"
              aria-label="Notifications"
            >
              <Bell size={14} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#20D6A0] text-black font-bold text-[9px] rounded-full flex items-center justify-center">
                1
              </span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#0D1420] border border-[#1E293B] rounded-lg shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
                  <span className="font-semibold text-xs">Notifications</span>
                  <button
                    onClick={() => {
                      setNotifOpen(false);
                      showToast("All notifications marked as read");
                    }}
                    className="text-[11px] text-[#7957FF] hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <div className="p-2 rounded bg-[#151E2D] border border-[#1E293B]">
                    <div className="font-medium text-[#F3F6FC]">PR #42 Ready for Review</div>
                    <div className="text-[11px] text-[#9BA8BC] mt-0.5">
                      AI identified 3 review findings in faaztech/cafe4x.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-md bg-[#111A2B] hover:bg-[#151E2D] border border-[#1E293B] text-xs"
            >
              <div className="w-5 h-5 rounded-full bg-[#7957FF] text-white flex items-center justify-center font-bold text-[10px]">
                M
              </div>
              <span className="font-medium text-[#F3F6FC]">Mohamed</span>
              <ChevronDown size={12} className="text-[#64748B]" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0D1420] border border-[#1E293B] rounded-lg shadow-2xl p-1.5 z-50 text-xs">
                <button
                  onClick={() => {
                    setActiveNav("Settings");
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#151E2D] text-[#F3F6FC]"
                >
                  Account Settings
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    showToast("Connected to GitHub (@faaztech)");
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#151E2D] text-[#9BA8BC]"
                >
                  GitHub Connections
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    showToast("AI Quota: 12,450 / 50,000 tokens used");
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#151E2D] text-[#9BA8BC]"
                >
                  AI Usage
                </button>
                <div className="h-[1px] bg-[#1E293B] my-1" />
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    showToast("Signed out successfully");
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#FF5267]/20 text-[#FF5267]"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 6. REPOSITORY CONTEXT BAR */}
      <div className="h-[38px] min-h-[38px] border-b border-[#1E293B] bg-[#090F1C] px-3 flex items-center justify-between text-xs">
        {/* Org / Repo Breadcrumb & All Repos Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#9BA8BC]">
            <span className="text-[#64748B]">org:</span>
            <span className="text-[#F3F6FC] font-medium">{selectedOrg}</span>
            <span className="text-[#64748B]">/</span>
            <span className="text-[#64748B]">repo:</span>
            <span className="text-[#F3F6FC] font-medium">{selectedRepo}</span>
          </div>

          {/* All Repositories Switch */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#1E293B]">
            <span className="text-[#9BA8BC] text-[11px]">All Repositories</span>
            <div
              className={`switch-track ${allRepos ? "active" : ""}`}
              onClick={() => {
                setAllRepos(!allRepos);
                showToast(allRepos ? "Searching in cafe4x" : "Searching across all 4 authorized repos");
              }}
            >
              <div className="switch-thumb" />
            </div>
          </div>

          {/* Branch Selector */}
          <div className="flex items-center gap-1.5 pl-3 border-l border-[#1E293B]">
            <GitBranch size={13} className="text-[#9BA8BC]" />
            <span className="text-[#64748B] text-[11px]">Branch:</span>
            <button
              onClick={() => {
                const nextBranch = selectedBranch === "main" ? "develop" : "main";
                setSelectedBranch(nextBranch);
                showToast(`Switched branch to ${nextBranch}`);
              }}
              className="flex items-center gap-1 text-[#F3F6FC] font-medium hover:text-[#08D9F2] transition-colors"
            >
              <span>{selectedBranch}</span>
              <ChevronDown size={11} className="text-[#64748B]" />
            </button>
          </div>
        </div>

        {/* Search Toggles (RegEx, Match Case, Global Filter) & Collaborators */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#9BA8BC] text-[11px]">RegEx</span>
            <div
              className={`switch-track ${regex ? "active" : ""}`}
              onClick={() => setRegex(!regex)}
            >
              <div className="switch-thumb" />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#9BA8BC] text-[11px]">Match Case</span>
            <div
              className={`switch-track ${matchCase ? "active" : ""}`}
              onClick={() => setMatchCase(!matchCase)}
            >
              <div className="switch-thumb" />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#9BA8BC] text-[11px]">Global Filter</span>
            <div
              className={`switch-track ${globalFilter ? "active" : ""}`}
              onClick={() => setGlobalFilter(!globalFilter)}
            >
              <div className="switch-thumb" />
            </div>
          </div>

          {/* Collaborator Avatars */}
          <div className="flex items-center -space-x-1.5 pl-2 border-l border-[#1E293B]">
            <div className="w-5 h-5 rounded-full bg-[#F4B740] border border-[#080D16] text-[9px] font-bold text-black flex items-center justify-center">
              D
            </div>
            <div className="w-5 h-5 rounded-full bg-[#08D9F2] border border-[#080D16] text-[9px] font-bold text-black flex items-center justify-center">
              A
            </div>
            <div className="w-5 h-5 rounded-full bg-[#7957FF] border border-[#080D16] text-[9px] font-bold text-white flex items-center justify-center">
              M
            </div>
            <ChevronDown size={11} className="text-[#64748B] ml-2" />
          </div>
        </div>
      </div>

      {/* WORKSPACE BODY */}
      <div className="flex-1 flex overflow-hidden">
        {/* 5. LEFT NAVIGATION RAIL */}
        <nav
          className={`border-r border-[#1E293B] bg-[#0B1220] flex flex-col justify-between py-2 transition-all duration-200 z-20 ${
            collapsedNav ? "w-[50px] items-center" : "w-[130px] px-2"
          }`}
        >
          {/* Main Nav Items */}
          <div className="space-y-1">
            {[
              { label: "Dashboard", icon: Layers },
              { label: "Explorer", icon: Folder },
              { label: "Code Search", icon: Search },
              { label: "Repos", icon: Files },
              { label: "AI Agent", icon: Sparkles },
              { label: "History", icon: History },
              { label: "Performance", icon: Activity },
              { label: "Settings", icon: Settings },
            ].map(({ label, icon: Icon }) => {
              const isActive = activeNav === label;
              return (
                <button
                  key={label}
                  onClick={() => setActiveNav(label)}
                  title={label}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#7957FF] text-white shadow-md shadow-[#7957FF]/30"
                      : "text-[#9BA8BC] hover:text-[#F3F6FC] hover:bg-[#151E2D]"
                  }`}
                >
                  <Icon size={16} />
                  {!collapsedNav && <span className="truncate">{label}</span>}
                </button>
              );
            })}
          </div>

          {/* AI Usage Card & Controls at bottom of rail */}
          <div className="space-y-3 pt-2 border-t border-[#1E293B]/60">
            {!collapsedNav && (
              <div className="p-2 rounded-lg bg-[#0D1420] border border-[#1E293B] text-[10px]">
                <div className="text-[#9BA8BC] font-medium">AI Usage</div>
                <div className="mt-1 flex justify-between text-[#F3F6FC] font-semibold text-[11px]">
                  <span>12,450 / 50,000</span>
                  <span className="text-[#20D6A0]">25%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-[#1E293B] rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#7957FF] to-[#08D9F2] w-[25%]" />
                </div>
                <button
                  onClick={() => showToast("Upgrade Plan: DevPilot Pro ($29/mo)")}
                  className="w-full mt-2 py-1 rounded bg-gradient-to-r from-[#20D6A0] to-[#08D9F2] text-black font-semibold text-center hover:opacity-90 transition-opacity"
                >
                  Upgrade
                </button>
              </div>
            )}

            {/* Theme & Collapse Controls */}
            <div className="flex items-center justify-between text-[#9BA8BC] px-1">
              <button
                onClick={() => showToast("Dark mode active")}
                className="hover:text-[#F3F6FC]"
                title="Theme"
              >
                <Moon size={14} />
              </button>
              <button
                onClick={() => setCollapsedNav(!collapsedNav)}
                className="flex items-center gap-1 hover:text-[#F3F6FC] text-[11px]"
                title="Collapse Rail"
              >
                <ChevronLeft size={14} className={collapsedNav ? "rotate-180" : ""} />
                {!collapsedNav && <span>Collapse</span>}
              </button>
            </div>
          </div>
        </nav>

        {/* 7. REPOSITORY FILE EXPLORER PANEL */}
        <aside className="w-[230px] min-w-[210px] border-r border-[#1E293B] bg-[#0A101C] flex flex-col justify-between overflow-hidden text-xs">
          {/* Header */}
          <div className="p-2.5 pb-1 flex items-center justify-between border-b border-[#1E293B]/50">
            <span className="font-semibold text-[11px] tracking-wider text-[#9BA8BC]">
              FILE EXPLORER
            </span>
            <div className="flex items-center gap-1 text-[#64748B]">
              <button
                onClick={() => showToast("Added custom file")}
                className="hover:text-[#F3F6FC]"
                title="New file"
              >
                <Plus size={13} />
              </button>
              <button
                onClick={() => showToast("Explorer options")}
                className="hover:text-[#F3F6FC]"
                title="Options"
              >
                <MoreHorizontal size={13} />
              </button>
            </div>
          </div>

          {/* Tree Structure */}
          <div className="flex-1 overflow-y-auto px-1.5 py-1 space-y-0.5 text-xs">
            {/* Render Recursive Tree */}
            {initialTree.map((node) => (
              <div key={node.path}>
                <div
                  onClick={() => toggleFolder(node.path)}
                  className="flex items-center gap-1 py-1 px-1.5 rounded hover:bg-[#151E2D] cursor-pointer text-[#9BA8BC] hover:text-[#F3F6FC]"
                >
                  <ChevronDown
                    size={12}
                    className={`transition-transform ${openFolders[node.path] ? "" : "-rotate-90"}`}
                  />
                  {openFolders[node.path] ? (
                    <FolderOpen size={13} className="text-[#7957FF]" />
                  ) : (
                    <Folder size={13} className="text-[#7957FF]" />
                  )}
                  <span className="font-medium text-[#F3F6FC]">{node.name}</span>
                </div>

                {openFolders[node.path] && node.children && (
                  <div className="pl-3.5 space-y-0.5 border-l border-[#1E293B]/60 ml-2">
                    {node.children.map((subNode) => (
                      <div key={subNode.path}>
                        <div
                          onClick={() => toggleFolder(subNode.path)}
                          className="flex items-center gap-1 py-0.5 px-1.5 rounded hover:bg-[#151E2D] cursor-pointer text-[#9BA8BC] hover:text-[#F3F6FC]"
                        >
                          {subNode.type === "folder" ? (
                            <>
                              <ChevronDown
                                size={11}
                                className={`transition-transform ${
                                  openFolders[subNode.path] ? "" : "-rotate-90"
                                }`}
                              />
                              <Folder size={12} className="text-[#9BA8BC]" />
                            </>
                          ) : (
                            <FileCode2 size={12} className="text-[#08D9F2]" />
                          )}
                          <span
                            onClick={(e) => {
                              if (subNode.type === "file") {
                                e.stopPropagation();
                                setSelectedFile(subNode.path);
                                showToast(`Selected file: ${subNode.path}`);
                              }
                            }}
                            className={
                              selectedFile === subNode.path
                                ? "text-[#08D9F2] font-semibold"
                                : ""
                            }
                          >
                            {subNode.name}
                          </span>
                        </div>

                        {/* Nested sub-children */}
                        {openFolders[subNode.path] && subNode.children && (
                          <div className="pl-3 space-y-0.5 border-l border-[#1E293B]/60 ml-2">
                            {subNode.children.map((leaf) => (
                              <div
                                key={leaf.path}
                                onClick={() => {
                                  if (leaf.type === "file") {
                                    setSelectedFile(leaf.path);
                                    showToast(`Selected file: ${leaf.path}`);
                                  } else {
                                    toggleFolder(leaf.path);
                                  }
                                }}
                                className={`flex items-center gap-1.5 py-0.5 px-1.5 rounded cursor-pointer transition-colors ${
                                  selectedFile === leaf.path
                                    ? "bg-[#151E2D] text-[#08D9F2] font-medium"
                                    : "text-[#9BA8BC] hover:text-[#F3F6FC] hover:bg-[#151E2D]"
                                }`}
                              >
                                {leaf.type === "folder" ? (
                                  <Folder size={11} className="text-[#64748B]" />
                                ) : (
                                  <span className="text-[10px] font-bold text-[#08D9F2] px-0.5 bg-[#08D9F2]/10 rounded">
                                    {leaf.language?.toUpperCase() || "TS"}
                                  </span>
                                )}
                                <span className="truncate">{leaf.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contributor and Code Metrics sparkline widgets from screenshot */}
          <div className="p-2 border-t border-[#1E293B] bg-[#080D16] space-y-2">
            {/* Active Contributors Sparkline */}
            <div>
              <div className="flex justify-between items-center text-[10px] text-[#9BA8BC]">
                <span>Active Contributors</span>
              </div>
              <svg className="w-full h-8 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                <path
                  d="M0,20 Q15,5 30,18 T60,8 T85,15 L100,5"
                  fill="none"
                  stroke="#20D6A0"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Complexity Sparkline */}
            <div>
              <div className="flex justify-between items-center text-[10px] text-[#9BA8BC]">
                <span>Complexity</span>
              </div>
              <svg className="w-full h-8 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                <path
                  d="M0,15 Q20,25 40,5 T70,20 T100,10"
                  fill="none"
                  stroke="#9B70FF"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Coverage Sparkline & Switch */}
            <div>
              <div className="flex justify-between items-center text-[10px] text-[#9BA8BC]">
                <span>Coverage</span>
                <div
                  className={`switch-track ${coverageToggle ? "active" : ""}`}
                  onClick={() => setCoverageToggle(!coverageToggle)}
                >
                  <div className="switch-thumb" />
                </div>
              </div>
              <svg className="w-full h-8 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                <path
                  d="M0,22 Q25,18 50,10 T80,14 T100,6"
                  fill="none"
                  stroke="#08D9F2"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </aside>

        {/* 8. CENTRAL CODE SEARCH WORKSPACE ("Result Hub") */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#080D16] overflow-hidden">
          {/* Result Hub Tab Header */}
          <div className="h-[36px] min-h-[36px] bg-[#0A101C] border-b border-[#1E293B] px-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#080D16] border-t-2 border-[#7957FF] text-[#F3F6FC] rounded-t font-medium">
                <Code2 size={13} className="text-[#7957FF]" />
                <span>Result Hub</span>
                <button
                  onClick={() => showToast("Search tab kept open")}
                  className="text-[#64748B] hover:text-[#F3F6FC] ml-1"
                >
                  <X size={11} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#64748B] text-xs">
                <Maximize2 size={13} className="cursor-pointer hover:text-[#F3F6FC]" />
                <MoreHorizontal size={13} className="cursor-pointer hover:text-[#F3F6FC]" />
              </div>
            </div>
          </div>

          {/* Search Workspace Title & Diff View Toggle */}
          <div className="px-4 pt-3 pb-2 flex items-center justify-between">
            <div>
              <h1 className="text-base font-semibold text-[#F3F6FC]">Result Hub</h1>
              <p className="text-xs text-[#9BA8BC] mt-0.5">
                {searchResults.length} results found across 4 repos • search time {searchTime}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#9BA8BC]">Diff View</span>
              <div
                className={`switch-track ${diffView ? "active" : ""}`}
                onClick={() => {
                  setDiffView(!diffView);
                  showToast(diffView ? "Standard view" : "Diff view enabled");
                }}
              >
                <div className="switch-thumb" />
              </div>
            </div>
          </div>

          {/* Search Results List (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
            <div className="text-[11px] font-medium text-[#64748B]">
              {searchResults.length} results found
            </div>

            {searchResults.map((result) => (
              <article
                key={result.id}
                className="rounded-lg bg-[#0D1420] border border-[#1E293B] overflow-hidden hover:border-[#7957FF]/40 transition-colors shadow-sm"
              >
                {/* Result Card Header */}
                <div className="px-3 py-2 bg-[#111A2B] border-b border-[#1E293B] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#1E293B] text-[#08D9F2] font-bold text-[10px]">
                      {result.icon}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedFile(result.filePath);
                        showToast(`Opened ${result.filePath}`);
                      }}
                      className="text-[#F3F6FC] font-mono hover:text-[#08D9F2] transition-colors"
                    >
                      {result.filePath}
                    </button>
                  </div>

                  {/* Actions: Explain, Fix, Refactor */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSnippetAction("Explain", result)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-[#151E2D] hover:bg-[#1E293B] text-[#9BA8BC] hover:text-[#F3F6FC] transition-colors"
                    >
                      <CircleHelp size={12} className="text-[#08D9F2]" />
                      <span>Explain</span>
                    </button>

                    <button
                      onClick={() => handleSnippetAction("Fix", result)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-[#151E2D] hover:bg-[#1E293B] text-[#9BA8BC] hover:text-[#F3F6FC] transition-colors"
                    >
                      <Zap size={12} className="text-[#F4B740]" />
                      <span>Fix</span>
                    </button>

                    <button
                      onClick={() => handleSnippetAction("Refactor", result)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-[#151E2D] hover:bg-[#1E293B] text-[#9BA8BC] hover:text-[#F3F6FC] transition-colors"
                    >
                      <Sparkles size={12} className="text-[#7957FF]" />
                      <span>Refactor</span>
                    </button>
                  </div>
                </div>

                {/* Code Snippet with Line Numbers */}
                <div className="p-2.5 font-mono text-[11px] leading-5 bg-[#090F1C] overflow-x-auto text-[#9BA8BC]">
                  {result.lines.map((line, idx) => {
                    const lineNum = result.startLine + idx;
                    // Highlight match if present
                    const isHighlighted = line.includes("currency") || line.includes("organization");
                    return (
                      <div key={idx} className="flex hover:bg-[#151E2D]/40">
                        <span className="w-9 text-[#475569] select-none text-right pr-3">
                          {lineNum}
                        </span>
                        <code className="text-[#F3F6FC] flex-1">
                          {isHighlighted ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: line.replace(
                                  /(currency|organization)/gi,
                                  '<span class="code-highlight text-[#08D9F2]">$1</span>',
                                ),
                              }}
                            />
                          ) : (
                            line
                          )}
                        </code>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* 9. RIGHT AI ASSISTANT PANEL */}
        <aside className="w-[340px] min-w-[300px] border-l border-[#1E293B] bg-[#0A101C] flex flex-col justify-between overflow-hidden text-xs">
          {/* Header */}
          <div className="h-[36px] min-h-[36px] px-3 bg-[#0D1420] border-b border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#20D6A0]" />
              <span className="font-semibold text-xs text-[#F3F6FC]">AI assistant</span>
              <span className="text-[#20D6A0] text-[10px] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#20D6A0]" /> Online
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[#64748B]">
              <button
                onClick={() => {
                  setMessages([]);
                  showToast("Cleared conversation");
                }}
                className="hover:text-[#F3F6FC]"
                title="New Chat"
              >
                <Plus size={13} />
              </button>
              <button
                onClick={() => showToast("Assistant settings")}
                className="hover:text-[#F3F6FC]"
                title="Options"
              >
                <MoreHorizontal size={13} />
              </button>
              <button
                onClick={() => showToast("Assistant pinned to workspace")}
                className="hover:text-[#F3F6FC]"
                title="Close"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-1.5">
                {msg.role === "user" ? (
                  <div className="flex justify-end">
                    <div className="flex items-start gap-2 max-w-[90%]">
                      <div className="p-2.5 rounded-xl rounded-tr-none bg-[#151E2D] border border-[#1E293B] text-xs text-[#F3F6FC]">
                        {msg.content}
                      </div>
                      <div className="w-5 h-5 rounded-full bg-[#7957FF] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        M
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 max-w-[95%]">
                    <div className="w-6 h-6 rounded-lg bg-[#7957FF] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-[#7957FF]/30">
                      <Sparkles size={13} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-[11px] font-semibold text-[#F3F6FC]">DevPilot AI</div>
                      <div className="text-xs text-[#9BA8BC] leading-relaxed whitespace-pre-line">
                        {msg.content}
                      </div>

                      {/* Source References Citations Cards */}
                      {msg.sourceReferences && (
                        <div className="space-y-1 pt-1">
                          {msg.sourceReferences.map((ref, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setSelectedFile(ref.filePath);
                                showToast(`Navigating to ${ref.filePath}:${ref.startLine}`);
                              }}
                              className="w-full flex items-center justify-between p-1.5 rounded bg-[#0D1420] hover:bg-[#151E2D] border border-[#1E293B] text-left text-[11px] font-mono group transition-colors"
                            >
                              <div className="flex items-center gap-1.5 truncate">
                                <span className="px-1 py-0.2 bg-[#7957FF]/20 text-[#7957FF] rounded text-[9px] font-bold">
                                  TS
                                </span>
                                <span className="text-[#F3F6FC] group-hover:text-[#08D9F2] truncate">
                                  {ref.filePath}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#64748B] shrink-0 pl-1">
                                Lines {ref.startLine}:{ref.endLine}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#7957FF]">
                <Sparkles size={14} className="animate-spin" />
                <span>DevPilot is analyzing repository context...</span>
              </div>
            )}
          </div>

          {/* Inline Feedback Control from Screenshot */}
          <div className="px-3 py-2 border-t border-[#1E293B] bg-[#080D16]">
            <div className="flex items-center justify-between text-[11px] text-[#9BA8BC] mb-1">
              <span>Inline feedback</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#20D6A0]">Accurate</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={feedbackRating}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFeedbackRating(val);
                    showToast(val < 50 ? "Marked accurate" : "Marked needs refinement");
                  }}
                  className="w-16"
                />
                <span className="text-[10px] text-[#FF5267]">Inaccurate</span>
              </div>
            </div>

            {/* Chat Input Bar */}
            <div className="relative mt-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask anything... Use @ to target files, for commands, # for issues"
                className="w-full h-9 pl-3 pr-16 bg-[#0D1420] border border-[#1E293B] rounded-lg text-xs text-[#F3F6FC] placeholder-[#64748B] focus:outline-none focus:border-[#7957FF]"
              />
              <div className="absolute right-2 top-2 flex items-center gap-1.5 text-[#64748B]">
                <Mic
                  size={14}
                  className="cursor-pointer hover:text-[#F3F6FC]"
                  onClick={() => showToast("Voice input ready")}
                />
                <button
                  onClick={handleSendMessage}
                  className="w-5 h-5 rounded bg-[#7957FF] text-white flex items-center justify-center hover:opacity-90"
                >
                  <Send size={11} />
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* BOTTOM WORKSPACE PANELS */}
      <footer className="h-[200px] min-h-[190px] border-t border-[#1E293B] bg-[#0A101C] grid grid-cols-12 divide-x divide-[#1E293B] text-xs">
        {/* 10. PULL REQUEST REVIEW PANEL (Cols 1-4) */}
        <section className="col-span-4 flex flex-col justify-between p-3 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-[#7957FF]/20 text-[#7957FF] flex items-center justify-center">
                <GitPullRequest size={12} />
              </div>
              <span className="font-semibold text-xs text-[#F3F6FC]">Pull Request Review</span>
            </div>
            <button
              onClick={() => showToast("All pull requests listed")}
              className="text-[11px] text-[#9BA8BC] hover:text-[#F3F6FC] flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight size={11} />
            </button>
          </div>

          {/* PR Details */}
          <div className="mt-1 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-[#F3F6FC]">#{selectedPR.number} {selectedPR.title}</span>
              <span className="px-1.5 py-0.2 rounded bg-[#20D6A0]/10 text-[#20D6A0] text-[10px] font-semibold">
                ● Open
              </span>
            </div>
          </div>
          <div className="text-[10px] text-[#64748B]">
            {selectedPR.author} opened {selectedPR.openedAt} • {selectedPR.changedFilesCount} files changed •{" "}
            <span className="text-[#20D6A0]">+{selectedPR.additions}</span>{" "}
            <span className="text-[#FF5267]">-{selectedPR.deletions}</span>
          </div>

          {/* Tabs: AI Review, Files, Conversation */}
          <div className="flex items-center gap-4 border-b border-[#1E293B] text-[11px] pb-1 mt-1">
            <button
              onClick={() => setPrTab("AI Review")}
              className={`font-medium ${
                prTab === "AI Review" ? "text-[#7957FF] border-b border-[#7957FF]" : "text-[#9BA8BC]"
              }`}
            >
              AI Review
            </button>
            <button
              onClick={() => setPrTab("Files")}
              className={`font-medium ${
                prTab === "Files" ? "text-[#7957FF] border-b border-[#7957FF]" : "text-[#9BA8BC]"
              }`}
            >
              Files ({selectedPR.changedFilesCount})
            </button>
            <button
              onClick={() => setPrTab("Conversation")}
              className={`font-medium ${
                prTab === "Conversation" ? "text-[#7957FF] border-b border-[#7957FF]" : "text-[#9BA8BC]"
              }`}
            >
              Conversation (5)
            </button>
          </div>

          {/* Findings List */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pt-1.5">
            {selectedPR.findings.map((f) => (
              <div
                key={f.id}
                onClick={() => {
                  setSelectedFile(f.filePath);
                  showToast(`Finding: ${f.title} (${f.evidence})`);
                }}
                className="flex items-center justify-between p-1.5 rounded bg-[#0D1420] hover:bg-[#151E2D] border border-[#1E293B] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      f.severity === "high"
                        ? "bg-[#FF5267]/20 text-[#FF5267]"
                        : f.severity === "medium"
                        ? "bg-[#F4B740]/20 text-[#F4B740]"
                        : "bg-[#08D9F2]/20 text-[#08D9F2]"
                    }`}
                  >
                    ! {f.severity.toUpperCase()}
                  </span>
                  <div>
                    <div className="font-semibold text-[11px] text-[#F3F6FC]">{f.title}</div>
                    <div className="text-[10px] text-[#64748B] truncate">{f.summary}</div>
                  </div>
                </div>
                <ChevronRight size={12} className="text-[#64748B]" />
              </div>
            ))}
          </div>
        </section>

        {/* 11. UNIT TEST GENERATION PANEL (Cols 5-8) */}
        <section className="col-span-4 flex flex-col justify-between p-3 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-[#08D9F2]/20 text-[#08D9F2] flex items-center justify-center">
                <TestTube2 size={12} />
              </div>
              <span className="font-semibold text-xs text-[#F3F6FC]">Test Generation</span>
            </div>
            <button
              onClick={() => showToast("Test generation run history")}
              className="text-[11px] text-[#9BA8BC] hover:text-[#F3F6FC] flex items-center gap-0.5"
            >
              <History size={11} />
              <span>History</span>
              <ChevronRight size={11} />
            </button>
          </div>

          {/* Form Fields: Framework & Assertion */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div>
              <label className="text-[10px] text-[#9BA8BC] block">Testing Framework</label>
              <select
                value={testFramework}
                onChange={(e) => setTestFramework(e.target.value)}
                className="w-full h-7 mt-0.5 px-2 bg-[#0D1420] border border-[#1E293B] rounded text-[11px] text-[#F3F6FC] focus:outline-none focus:border-[#7957FF]"
              >
                <option>Vitest</option>
                <option>Jest</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-[#9BA8BC] block">Test Assertion</label>
              <select
                value={testAssertion}
                onChange={(e) => setTestAssertion(e.target.value)}
                className="w-full h-7 mt-0.5 px-2 bg-[#0D1420] border border-[#1E293B] rounded text-[11px] text-[#F3F6FC] focus:outline-none focus:border-[#7957FF]"
              >
                <option>Customizable test</option>
                <option>Standard assertions</option>
              </select>
            </div>
          </div>

          {/* Select File */}
          <div className="mt-1">
            <label className="text-[10px] text-[#9BA8BC] block">Select File</label>
            <input
              type="text"
              value={testFile}
              onChange={(e) => setTestFile(e.target.value)}
              className="w-full h-7 mt-0.5 px-2 bg-[#0D1420] border border-[#1E293B] rounded text-[11px] font-mono text-[#F3F6FC] focus:outline-none focus:border-[#7957FF]"
            />
          </div>

          {/* Checkboxes: Edge cases, Invalid inputs, Mock dependencies */}
          <div className="flex items-center gap-3 text-[10px] text-[#9BA8BC] mt-1">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={includeEdgeCases}
                onChange={(e) => setIncludeEdgeCases(e.target.checked)}
                className="rounded bg-[#0D1420] border-[#1E293B] text-[#7957FF]"
              />
              <span>Include edge cases</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={includeInvalidInputs}
                onChange={(e) => setIncludeInvalidInputs(e.target.checked)}
                className="rounded bg-[#0D1420] border-[#1E293B] text-[#7957FF]"
              />
              <span>Include invalid inputs</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={mockDependencies}
                onChange={(e) => setMockDependencies(e.target.checked)}
                className="rounded bg-[#0D1420] border-[#1E293B] text-[#7957FF]"
              />
              <span>Mock dependencies</span>
            </label>
          </div>

          {/* Generate & Execute Tests Button */}
          <button
            onClick={handleGenerateTests}
            disabled={isGeneratingTests}
            className="w-full h-8 mt-2 rounded-lg bg-[#08D9F2] hover:bg-[#06b6cb] text-black font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#08D9F2]/20 transition-all"
          >
            {isGeneratingTests ? (
              <>
                <Sparkles size={13} className="animate-spin" />
                <span>Generating & Executing...</span>
              </>
            ) : (
              <span>Generate & Execute Tests</span>
            )}
          </button>
        </section>

        {/* 12. CONTEXT OVERVIEW PANEL (Cols 9-12) */}
        <section className="col-span-4 flex flex-col justify-between p-3 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-[#9B70FF]/20 text-[#9B70FF] flex items-center justify-center">
                <Layers size={12} />
              </div>
              <span className="font-semibold text-xs text-[#F3F6FC]">Context Overview</span>
            </div>
            <span className="text-[10px] text-[#64748B] font-mono truncate max-w-[150px]">
              {selectedFile}
            </span>
          </div>

          {/* Summary */}
          <p className="text-xs text-[#9BA8BC] leading-relaxed mt-1">
            This component displays a list of stores with organization, search and filtering options.
            It fetches data from the API and renders the items in a table format.
          </p>

          {/* Context Badges from Screenshot */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="px-2 py-0.5 rounded-full bg-[#20D6A0]/15 text-[#20D6A0] text-[10px] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#20D6A0]" /> State Management
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#F4B740]/15 text-[#F4B740] text-[10px] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4B740]" /> API Call
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#FF5267]/15 text-[#FF5267] text-[10px] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5267]" /> Pagination
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#7957FF]/15 text-[#7957FF] text-[10px] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7957FF]" /> Filtered results
            </span>
          </div>

          {/* View More Link */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => showToast("Expanded detailed architectural breakdown")}
              className="text-[#08D9F2] hover:underline text-[11px] flex items-center gap-0.5"
            >
              <span>View more</span>
              <ChevronRight size={11} />
            </button>
          </div>
        </section>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#151E2D] border border-[#7957FF] text-xs text-[#F3F6FC] shadow-2xl animate-fade-in">
          <Sparkles size={14} className="text-[#08D9F2]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
