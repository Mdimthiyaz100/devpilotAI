import { useState } from "react";

export function useWorkspaceStore() {
  const [selectedRepo, setSelectedRepo] = useState("cafe4x");
  const [selectedBranch, setSelectedBranch] = useState("main");

  return { selectedRepo, setSelectedRepo, selectedBranch, setSelectedBranch };
}
