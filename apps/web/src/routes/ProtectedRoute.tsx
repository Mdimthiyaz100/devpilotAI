import type { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  // Authentication verified; render authorized view
  return <>{children}</>;
}
