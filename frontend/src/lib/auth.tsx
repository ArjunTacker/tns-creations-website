import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { apiGet } from "./api";

export type AuthUser = {
  user_id: string;
  email: string;
  name: string;
  picture?: string | null;
  role: "admin" | "user";
  auth_provider: "password" | "google";
};

// null = checking, false = signed out, object = signed in
type AuthState = AuthUser | null | false;

type AuthContextValue = {
  user: AuthState;
  setUser: (u: AuthUser | false) => void;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState>(null);

  const refresh = useCallback(async () => {
    try {
      setUser(await apiGet<AuthUser>("/auth/me"));
    } catch {
      setUser(false);
    }
  }, []);

  useEffect(() => {
    // Returning from Google OAuth: AuthCallback exchanges the session_id first.
    if (window.location.hash?.includes("session_id=")) {
      setUser(false);
      return;
    }
    refresh();
  }, [refresh]);

  return <AuthContext.Provider value={{ user, setUser, refresh }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function startGoogleLogin() {
  // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
  const redirectUrl = window.location.origin + "/admin";
  window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
}

export function formatApiError(body: unknown, fallback = "Something went wrong. Please try again.") {
  const detail = (body as { detail?: unknown } | null)?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : "")).filter(Boolean).join(" ") || fallback;
  return fallback;
}
