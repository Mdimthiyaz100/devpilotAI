import { Navigate, Route, Routes } from "react-router-dom";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import ActivityPage from "../pages/ActivityPage";
import CodebaseChatPage from "../pages/CodebaseChatPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";

function SetupPage({ title, description }: { title: string; description: string }) {
  return <section className="setup-page"><div className="eyebrow">DEVPILOT AI · WORKSPACE</div><h1>{title}</h1><p>{description}</p><div className="setup-notice"><span className="setup-pulse" />Connect a GitHub repository to load live project data and enable this workspace.</div></section>;
}

export function AppRouter() {
  return <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route element={<WorkspaceLayout />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/explorer" element={<SetupPage title="Repository explorer" description="Browse indexed files, inspect source, and follow project structure." />} />
      <Route path="/search" element={<SetupPage title="Code search" description="Search indexed source across repositories, branches, and languages." />} />
      <Route path="/repositories" element={<SetupPage title="Repositories" description="Connect GitHub to import repositories, synchronize branches, and start indexing." />} />
      <Route path="/repositories/:owner/:repo" element={<SetupPage title="Repository overview" description="Repository insights become available after the repository is connected and indexed." />} />
      <Route path="/ai-agent" element={<CodebaseChatPage />} />
      <Route path="/history" element={<ActivityPage />} />
      <Route path="/performance" element={<SetupPage title="Performance analytics" description="Track repository indexing, search activity, and AI usage over time." />} />
      <Route path="/settings" element={<SetupPage title="Settings" description="Configure profile, AI providers, GitHub access, notifications, and security." />} />
      <Route path="/pull-requests" element={<SetupPage title="Pull request review" description="Connect a GitHub repository to load pull requests and review their changes." />} />
      <Route path="/reviews" element={<SetupPage title="Code reviews" description="AI assisted review findings will appear for connected pull requests." />} />
      <Route path="/tests" element={<SetupPage title="Test generation" description="Select indexed source files to generate tests. Test execution requires an isolated runner." />} />
      <Route path="/explain" element={<SetupPage title="Code explanation" description="Select code from an indexed repository to inspect its behavior and dependencies." />} />
      <Route path="/analysis" element={<SetupPage title="Code analysis" description="Connect and index a repository to analyze its source code." />} />
      <Route path="/documentation" element={<SetupPage title="Documentation" description="Generate and review documentation from indexed repository source." />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>;
}
