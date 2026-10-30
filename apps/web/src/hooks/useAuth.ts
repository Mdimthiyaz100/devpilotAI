import { useState } from "react";
import type { User } from "@devpilot/shared";

export function useAuth() {
  const [user] = useState<User>({
    id: "usr-mohamed",
    name: "Mohamed",
    email: "mohamed@faaztech.com",
    githubUsername: "faaztech",
  });

  return { user, isAuthenticated: true };
}
