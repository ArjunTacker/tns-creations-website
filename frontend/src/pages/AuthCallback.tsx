import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { AuthUser } from "@/lib/auth";

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;
    const sessionId = new URLSearchParams(location.hash.replace(/^#/, "")).get("session_id");
    if (!sessionId) {
      navigate("/login", { replace: true });
      return;
    }
    apiPost<AuthUser>("/auth/session", { session_id: sessionId })
      .then((user) => {
        setUser(user);
        window.history.replaceState(null, "", location.pathname);
        navigate("/admin", { replace: true, state: { user } });
      })
      .catch(() => {
        toast.error("Google sign-in failed. Please try again.");
        window.history.replaceState(null, "", "/login");
        navigate("/login", { replace: true });
      });
  }, [location, navigate, setUser]);

  return (
    <div className="grid min-h-screen place-items-center bg-ink-950 text-slate-400" data-testid="auth-callback">
      <p className="text-sm">Signing you in…</p>
    </div>
  );
}
