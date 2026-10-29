import { useMemo, useState } from "react";
import { Activity, Archive, ArrowDown, ArrowUp, Bell, BookOpen, Bot, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Code2, Command, Copy, FileCode2, FilePlus2, Files, Folder, GitBranch, GitPullRequest, Globe2, History, Layers, LockKeyhole, Menu, MessageSquare, Moon, MoreHorizontal, PanelRight, Play, Plus, Radio, Search, Send, Settings, Shield, SlidersHorizontal, Sparkles, Sun, TerminalSquare, TestTube2, X, Zap } from "lucide-react";

type IconType = typeof Search;
type Result = { file: string; language: string; icon: string; lines: [number, number]; snippet: string[]; highlight?: string };

const sampleResults: Result[] = [
  { file: "apps/api/src/app.ts", language: "TypeScript", icon: "TS", lines: [1, 8], snippet: ['import { Hono } from "hono";', 'import { cors } from "hono/cors";', '', 'const app = new Hono();', 'app.use("*", cors());', 'app.get("/health", (c) => c.json({ status: "ok" }));', 'export default app;'], highlight: "app" },
  { file: "apps/web/src/main.tsx", language: "TypeScript React", icon: "TSX", lines: [1, 12], snippet: ['import React from "react";', 'import ReactDOM from "react-dom/client";', 'import { QueryClient, QueryClientProvider } from "@tanstack/react-query";', 'import { BrowserRouter } from "react-router-dom";', 'import App from "./App";', '', 'const queryClient = new QueryClient();'], highlight: "App" },
  { file: "apps/web/src/routes/AppRouter.tsx", language: "TypeScript React", icon: "TSX", lines: [1, 9], snippet: ['import { Navigate, Route, Routes } from "react-router-dom";', 'import DashboardPage from "../pages/DashboardPage";', '', 'export function AppRouter() {', '  return <Routes>', '    <Route path="/" element={<Navigate to="/dashboard" replace />} />', '    <Route path="/dashboard" element={<DashboardPage />} />', '  </Routes>;', '}'], highlight: "Route" },
];

const tree = [
  { name: "apps", type: "folder", depth: 0, open: true },
  { name: "web", type: "folder", depth: 1, open: true },
  { name: "src", type: "folder", depth: 2, open: true },
  { name: "components", type: "folder", depth: 3 },
  { name: "code-editor", type: "folder", depth: 4 },
  { name: "CodeEditor.tsx", type: "file", depth: 5 },
  { name: "code-search", type: "folder", depth: 4 },
  { name: "pages", type: "folder", depth: 3 },
  { name: "DashboardPage.tsx", type: "file", depth: 3 },
  { name: "main.tsx", type: "file", depth: 3 },
  { name: "styles.css", type: "file", depth: 3 },
  { name: "api", type: "folder", depth: 1 },
  { name: "src", type: "folder", depth: 2 },
  { name: "app.ts", type: "file", depth: 3 },
  { name: "package.json", type: "file", depth: 1 },
];

const navItems: { label: string; icon: IconType }[] = [
  { label: "Dashboard", icon: Layers }, { label: "Explorer", icon: Folder }, { label: "Code Search", icon: Search }, { label: "Repositories", icon: Files }, { label: "AI Agent", icon: Sparkles }, { label: "History", icon: History }, { label: "Performance", icon: Activity }, { label: "Settings", icon: Settings },
];

function IconButton({ icon: Icon, label, onClick, active = false }: { icon: IconType; label: string; onClick?: () => void; active?: boolean }) {
  return <button type="button" className={`icon-button ${active ? "is-active" : ""}`} onClick={onClick} title={label} aria-label={label}><Icon size={16} /></button>;
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label?: string }) {
  return <button className={`switch ${checked ? "checked" : ""}`} role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)}><span /></button>;
}

function BrandMark() { return <span className="brand-mark"><Sparkles size={19} strokeWidth={2.5} /></span>; }

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("Connect GitHub to search your repositories");
  const [allRepos, setAllRepos] = useState(false);
  const [regex, setRegex] = useState(false);
  const [matchCase, setMatchCase] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(false);
  const [diffView, setDiffView] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState("Code Search");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ apps: true, web: true, src: true });
  const [selectedFile, setSelectedFile] = useState("apps/web/src/components/code-editor/CodeEditor.tsx");
  const [chatInput, setChatInput] = useState("");
  const [chatNotice, setChatNotice] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifRead, setNotifRead] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [prTab, setPrTab] = useState("AI Review");
  const [framework, setFramework] = useState("Vitest");
  const [toast, setToast] = useState("");
  const [globalOpen, setGlobalOpen] = useState(false);
  const results = useMemo(() => searchText.trim() ? sampleResults.filter((r) => `${r.file} ${r.snippet.join(" ")}`.toLowerCase().includes(searchText.toLowerCase()) || r.file.toLowerCase().includes(searchText.toLowerCase())).slice(0, 3) : [], [searchText]);

  const runSearch = (value = query) => {
    if (!value.trim()) { setStatus("Enter a search term to get started"); setSearchText(""); return; }
    setSearchText(value.trim());
    setStatus("Local starter files only · connect GitHub for repository search");
  };
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2800); };
  const submitChat = () => { if (!chatInput.trim()) return; setChatNotice("AI answers require a configured provider and indexed repository context."); setChatInput(""); };
  const fileAction = (action: string, file: string) => { setSelectedFile(file); setChatNotice(`${action} needs an AI provider and repository context. Configure OPENAI_API_KEY or ANTHROPIC_API_KEY on the API.`); };

  return <div className={`workspace ${theme === "light" ? "light-theme" : ""}`}>
    <header className="topbar">
      <button className="brand" onClick={() => setSelectedNav("Dashboard")}><BrandMark /><span>DevPilot <b>AI</b></span></button>
      <div className="global-search-wrap"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") runSearch(); }} onFocus={() => setGlobalOpen(true)} placeholder="Search repositories, files, and chat... (e.g. organization currency)"/><kbd><Command size={11}/> K</kbd></div>
      <div className="top-actions"><button className="top-action" onClick={() => notify("Live Share is unavailable until collaboration sessions are implemented.")}><Radio size={15}/> <span>Create Live Share</span></button><button className="top-action" onClick={() => notify("Analytics require an indexed repository and configured analysis tools.")}><Activity size={15}/> <span>Run Analytics</span></button><div className="popover-anchor"><button className="top-action notification-button" onClick={() => setNotifOpen(!notifOpen)} aria-label="Notifications"><Bell size={17}/>{!notifRead && <i>1</i>}</button>{notifOpen && <div className="popover notification-popover"><div className="popover-heading">Notifications <button onClick={() => setNotifRead(true)}>Mark all read</button></div><p className="muted">{notifRead ? "You're all caught up." : "Connect a repository to receive review and indexing updates."}</p></div>}</div><div className="popover-anchor"><button className="user-menu" onClick={() => setMenuOpen(!menuOpen)}><span className="avatar user-avatar">M</span><span>Mohamed</span><ChevronDown size={14}/></button>{menuOpen && <div className="popover user-popover"><button onClick={() => { setSelectedNav("Settings"); setMenuOpen(false); }}>Account settings</button><button onClick={() => notify("GitHub connection setup will be available when OAuth is configured.")}>GitHub connection</button><button onClick={() => notify("AI usage is not available until a provider is configured.")}>AI usage</button><button onClick={() => notify("Sign in to enable account actions.")}>Sign out</button></div>}</div></div>
    </header>
    <div className="repo-bar"><div className="repo-crumb"><span className="repo-muted">org:</span><b>your-workspace</b><span className="slash">/</span><span className="repo-muted">repo:</span><b>select a repository</b><span className="private-tag"><LockKeyhole size={11}/> private</span></div><button className="select-pill" onClick={() => notify("Connect GitHub to load your repositories.")}>All Repositories <Switch checked={allRepos} onChange={setAllRepos} /></button><span className="bar-divider"/><button className="branch-select" onClick={() => notify("Connect a repository to load branches.")}><GitBranch size={15}/> Branch: <b>—</b><ChevronDown size={14}/></button><div className="bar-spacer"/><div className="toggle-group"><span>RegEx</span><Switch checked={regex} onChange={setRegex} label="Regular expression"/><span>Match Case</span><Switch checked={matchCase} onChange={setMatchCase} label="Match case"/><span>Global Filter</span><Switch checked={globalFilter} onChange={setGlobalFilter} label="Global filter"/></div><div className="collaborators"><span className="avatar avatar-one">D</span><span className="avatar avatar-two">A</span><span className="avatar avatar-three">M</span><ChevronDown size={13}/></div></div>
    <div className={`app-body ${collapsed ? "nav-collapsed" : ""}`}>
      <aside className="nav-rail">{navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${selectedNav === label ? "selected" : ""}`} onClick={() => setSelectedNav(label)} title={collapsed ? label : undefined}><Icon size={19}/>{!collapsed && <span>{label}</span>}</button>)}<div className="rail-bottom"><button className="theme-switch" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Toggle theme">{theme === "dark" ? <Sun size={17}/> : <Moon size={17}/>}</button><button className="collapse-button" onClick={() => setCollapsed(!collapsed)}><ChevronLeft size={15}/>{!collapsed && <span>Collapse</span>}</button></div></aside>
      <aside className="explorer-panel panel">
        <div className="explorer-head"><div><span className="eyebrow">WORKSPACE</span><h2>Explorer</h2></div><div className="head-tools"><IconButton icon={Search} label="Search filenames" onClick={() => notify("Filename search becomes available when a repository is connected.")}/><IconButton icon={Plus} label="Add repository" onClick={() => notify("Connect GitHub to add a repository.")}/><IconButton icon={MoreHorizontal} label="Explorer menu" onClick={() => notify("Repository tree is a local project preview.")}/></div></div>
        <div className="repo-summary"><div className="repo-summary-icon"><GitBranch size={16}/></div><div><b>Local project</b><span>devpilot-ai · current branch</span></div><ChevronDown size={14}/></div>
        <div className="tree-toolbar"><span>PROJECT FILES</span><button onClick={() => setExpanded({ apps: true, web: true, src: true })}><ArrowUp size={12}/> Collapse all</button></div>
        <div className="file-tree">{tree.map((item, i) => <button key={`${item.name}-${i}`} className={`tree-row ${selectedFile.endsWith(item.name) ? "file-selected" : ""}`} style={{ "--depth": item.depth } as React.CSSProperties} onClick={() => { if (item.type === "folder") setExpanded((prev) => ({ ...prev, [item.name]: !prev[item.name] })); else { setSelectedFile(`apps/web/src/${item.name}`); notify(`${item.name} opened in the workspace context.`); } }}><span className="tree-indent"/>{item.type === "folder" ? <><ChevronRight size={13} className={expanded[item.name] ? "tree-open" : ""}/><Folder size={15} className="folder-icon"/><span>{item.name}</span></> : <><FileCode2 size={14} className="file-icon"/><span>{item.name}</span></>}</button>)}</div>
        <div className="explorer-footer"><div className="section-label">Repository insights <span className="subtle-chip">not indexed</span></div><div className="metric-empty"><div className="metric-icon"><Activity size={15}/></div><div><b>Contributor activity</b><span>Connect GitHub to view activity</span></div></div><div className="metric-empty"><div className="metric-icon purple"><Code2 size={15}/></div><div><b>Code metrics</b><span>Run analysis to measure complexity</span></div></div><div className="storage-card"><div><span>INDEXING STATUS</span><b>Waiting for repository</b></div><button onClick={() => notify("Connect GitHub to start indexing.")}>Connect GitHub <ArrowUp size={13}/></button></div></div>
      </aside>
      <main className="main-workspace">
        <section className="center-panel panel">
          <div className="center-toolbar"><div className="tab-active"><Search size={14}/> Code Search <button title="Close search tab"><X size={13}/></button></div><div className="toolbar-right"><span className="scope-label"><Globe2 size={13}/> Local project</span><IconButton icon={PanelRight} label="Toggle assistant" onClick={() => notify("Assistant panel is visible.")}/><IconButton icon={MoreHorizontal} label="Workspace options" onClick={() => notify("Workspace options")}/></div></div>
          <div className="search-content"><div className="result-heading"><div><h1>Code Search</h1><p>Search your codebase and explore results with AI assistance.</p></div><button className="filter-button" onClick={() => setGlobalFilter(!globalFilter)}><SlidersHorizontal size={14}/> Filters <span className="filter-count">{globalFilter ? "1" : "0"}</span></button></div>
            <div className="search-box"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runSearch()} placeholder="Search code, symbols, or file paths..."/><div className="search-options"><button className={regex ? "option-active" : ""} onClick={() => setRegex(!regex)}>.*</button><button className={matchCase ? "option-active" : ""} onClick={() => setMatchCase(!matchCase)}>Aa</button></div><button className="search-submit" onClick={() => runSearch()}><Search size={15}/> Search</button></div>
            <div className="search-meta"><span>{searchText ? `${results.length} local file${results.length === 1 ? "" : "s"} matched` : "Search is ready"}</span><span className="status-note"><span className="status-dot amber"/>{status}</span><label className="diff-label">Diff View <Switch checked={diffView} onChange={setDiffView} /></label></div>
            <div className="results-list">{results.length ? results.map((result) => <article className="result-card" key={result.file}><div className="result-card-head"><div className="file-badge">{result.icon}</div><button className="result-file" onClick={() => setSelectedFile(result.file)}>{result.file}</button><span className="language-pill">{result.language}</span><div className="result-actions"><button onClick={() => fileAction("Explain", result.file)}><CircleHelp size={13}/> Explain</button><button onClick={() => fileAction("Fix", result.file)}><Zap size={13}/> Fix</button><button onClick={() => fileAction("Refactor", result.file)}><Sparkles size={13}/> Refactor</button></div></div><div className="code-snippet">{result.snippet.map((line, n) => <div className="code-line" key={n}><span className="line-number">{result.lines[0] + n}</span><code>{line || " "}</code></div>)}</div></article>) : <div className="empty-results"><div className="empty-icon"><Search size={20}/></div><h3>{searchText ? "No local matches" : "Find anything in your code"}</h3><p>{searchText ? "No starter files matched this query. Connect GitHub to search repository contents." : "Enter a term above to search the project files available in this workspace."}</p><div className="empty-hints"><span><kbd>Enter</kbd> to search</span><span><kbd>.*</kbd> regex</span><span><kbd>Aa</kbd> match case</span></div></div>}</div>
            <div className="search-footnote"><Shield size={13}/> Repository search is disabled until GitHub OAuth and indexing are configured.</div>
          </div>
        </section>
        <aside className="assistant-panel panel"><div className="assistant-header"><div className="assistant-brand"><BrandMark/><div><b>AI assistant</b><span><i/> Provider not configured</span></div></div><div className="head-tools"><IconButton icon={Plus} label="New conversation" onClick={() => { setChatNotice(""); notify("New conversation started."); }}/><IconButton icon={MoreHorizontal} label="Assistant options" onClick={() => notify("Conversation history will be available after persistence is configured.")}/><IconButton icon={X} label="Close assistant" onClick={() => notify("Assistant stays open in this workspace.")}/></div></div>
          <div className="chat-body"><div className="chat-context"><span className="context-lock"><LockKeyhole size={13}/></span><div><b>Repository context unavailable</b><span>Connect GitHub and configure an AI provider to ask codebase questions.</span></div></div><div className="chat-empty"><div className="assistant-orb"><BrandMark/></div><h3>Understand your codebase</h3><p>Ask questions about your repository and get answers grounded in source files.</p><div className="prompt-suggestions"><button onClick={() => setChatInput("Where is authentication configured?")}><Search size={13}/> Where is authentication configured?</button><button onClick={() => setChatInput("Summarize this repository")}><BookOpen size={13}/> Summarize this repository</button><button onClick={() => setChatInput("Find potential error handling gaps")}><Shield size={13}/> Find error handling gaps</button></div></div>{chatNotice && <div className="chat-notice"><CircleHelp size={14}/><span>{chatNotice}</span><button onClick={() => setChatNotice("")}><X size={13}/></button></div>}</div><div className="chat-bottom"><div className="feedback-bar"><span>Was this workspace helpful?</span><div><button onClick={() => notify("Thanks for your feedback.")} aria-label="Helpful"><Check size={13}/></button><button onClick={() => notify("Thanks for your feedback.")} aria-label="Not helpful"><X size={13}/></button></div></div><div className="chat-compose"><textarea value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitChat(); } }} placeholder="Ask about your codebase..."/><div className="compose-tools"><span><kbd>Enter</kbd> to send · <kbd>Shift + Enter</kbd> for newline</span><button className="send-button" onClick={submitChat} disabled={!chatInput.trim()} aria-label="Send message"><Send size={16}/></button></div></div></div></aside>
      </main>
      <section className="bottom-panels">
        <article className="bottom-panel pr-panel panel"><div className="bottom-head"><div className="panel-title"><span className="title-icon purple-title"><GitPullRequest size={14}/></span><b>Pull Request Review</b><span className="subtle-chip">GitHub not connected</span></div><button className="view-all" onClick={() => notify("Connect GitHub to list pull requests.")}>View all <ChevronRight size={13}/></button></div><div className="empty-panel-state"><div className="mini-empty-icon"><GitPullRequest size={18}/></div><div><b>Review your pull requests</b><span>Connect GitHub to browse PRs and run an AI review against actual diffs.</span></div><button onClick={() => notify("Configure GitHub OAuth on the API to connect your account.")}>Connect GitHub <ArrowUp size={12}/></button></div><div className="panel-tabs">{["AI Review", "Files", "Conversation"].map((tab) => <button key={tab} className={prTab === tab ? "selected-tab" : ""} onClick={() => setPrTab(tab)}>{tab}{tab === "Files" && <span>0</span>}</button>)}<span className="tab-state">{prTab} · no pull request selected</span></div></article>
        <article className="bottom-panel test-panel panel"><div className="bottom-head"><div className="panel-title"><span className="title-icon cyan-title"><TestTube2 size={14}/></span><b>Test Generation</b><span className="subtle-chip">Preview</span></div><button className="view-all" onClick={() => notify("Test generation history will appear here.")}><History size={13}/> History</button></div><div className="form-row"><label>Testing framework<select value={framework} onChange={(e) => setFramework(e.target.value)}><option>Vitest</option><option>Jest</option></select></label><label>Test assertion style<select defaultValue="Standard assertions"><option>Standard assertions</option><option>Arrange, Act, Assert</option></select></label></div><label className="file-input-label">Source file<div className="fake-file-input"><FileCode2 size={14}/><span>{selectedFile}</span><button onClick={() => notify("Choose a source file from the explorer after connecting a repository.")}><Folder size={14}/></button></div></label><div className="check-row"><label><input type="checkbox" defaultChecked/> Edge cases</label><label><input type="checkbox" defaultChecked/> Invalid inputs</label><label><input type="checkbox"/> Mock dependencies</label></div><button className="generate-button" onClick={() => notify(`Test generation (${framework}) needs source context and an AI provider.`)}><Sparkles size={15}/> Generate Tests <span>AI provider required</span></button></article>
        <article className="bottom-panel context-panel panel"><div className="bottom-head"><div className="panel-title"><span className="title-icon violet-title"><Layers size={14}/></span><b>Context Overview</b></div><span className="file-context-label">{selectedFile.split("/").slice(-2).join("/")}</span></div><div className="context-content"><div className="context-score"><span className="score-ring"><span>—</span></span><div><b>Context unavailable</b><span>Connect a repository to analyze file context and dependencies.</span></div></div><div className="context-tags"><span className="tag green-tag"><i/> State management</span><span className="tag orange-tag"><i/> API call</span><span className="tag red-tag"><i/> Dependencies</span><span className="tag yellow-tag"><i/> Test coverage</span></div><button className="context-action" onClick={() => notify("Context analysis requires indexed repository files.")}>Analyze file context <ChevronRight size={13}/></button></div></article>
      </section>
    </div>
    {globalOpen && <div className="global-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setGlobalOpen(false); }}><div className="global-dialog"><div className="global-dialog-input"><Search size={18}/><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { runSearch(); setGlobalOpen(false); } if (e.key === "Escape") setGlobalOpen(false); }} placeholder="Search repositories, files, and chat..."/><kbd>ESC</kbd></div><div className="global-dialog-empty"><Search size={19}/><span>Search your connected repositories and conversations</span><small>GitHub connection required</small></div></div></div>}
    {toast && <div className="toast"><Check size={15}/>{toast}</div>}
  </div>;
}
