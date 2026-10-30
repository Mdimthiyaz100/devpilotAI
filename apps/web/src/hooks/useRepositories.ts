import { useState } from "react";
import type { Repository } from "@devpilot/shared";
import { repositoriesApi } from "../services/repositories.api";

export function useRepositories() {
  const [repositories] = useState<Repository[]>([
    {
      id: "repo-cafe4x",
      org: "faaztech",
      name: "cafe4x",
      fullName: "faaztech/cafe4x",
      isPrivate: true,
      defaultBranch: "main",
      branches: ["main", "develop"],
    },
  ]);

  return { repositories };
}
