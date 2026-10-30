import type { ReactNode } from "react";
import { Activity, Bot, Boxes, ChevronLeft, Code2, FolderGit2, History, LayoutDashboard, Settings2, Sparkles } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "Explorer", to: "/explorer", icon: FolderGit2 },
  { label: "Code Search", to: "/search", icon: Code2 },
  { label: "Repositories", to: "/repositories", icon: Boxes },
  { label: "AI Agent", to: "/ai-agent", icon: Bot },
  { label: "History", to: "/history", icon: History },
  { label: "Performance", to: "/performance", icon: Activity },
  { label: "Settings", to: "/settings", icon: Settings2 },
];

export function WorkspaceLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="workspace-shell">
      <header className="workspace-brandbar">
        <NavLink to="/dashboard" className="brand-lockup" aria-label="DevPilot AI home">
          <span className="brand-mark"><Sparkles size={16} /></span>
          <span>DevPilot <b>AI</b></span>
        </NavLink>
        <span className="workspace-label">DEVELOPER WORKSPACE</span>
      </header>
      <div className="workspace-frame">
        <aside className="workspace-sidebar">
          <div className="sidebar-heading">WORKSPACE</div>
          <nav aria-label="Main navigation" className="sidebar-navigation">
            {navigation.map(({ label, to, icon: Icon }) => (
              <NavLink key={to} to={to} title={label} className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}>
                <Icon size={16} strokeWidth={1.8} /><span>{label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="workspace-card">
              <span className="workspace-card-icon"><Sparkles size={14} /></span>
              <div><strong>AI workspace</strong><small>Connect a provider to begin</small></div>
            </div>
            <button className="collapse-control" type="button" title="Sidebar is expanded" disabled><ChevronLeft size={15} />Collapse sidebar</button>
          </div>
        </aside>
        <main className="workspace-main">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}
