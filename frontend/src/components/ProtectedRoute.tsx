import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user === null) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink-950" data-testid="auth-loading">
        <Loader2 className="animate-spin text-iris" size={28} />
      </div>
    );
  }
  if (user === false) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <>{children}</>;
}
