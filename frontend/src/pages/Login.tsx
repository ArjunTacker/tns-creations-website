import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import { SITE } from "@/config/site";
import { apiPost, ApiError } from "@/lib/api";
import { formatApiError, startGoogleLogin, useAuth } from "@/lib/auth";
import type { AuthUser } from "@/lib/auth";
import { beginSession } from "@/lib/session";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-iris/60 focus:bg-white/[0.06]";

export default function Login() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [sending, setSending] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!EMAIL_RE.test(form.email.trim())) errs.email = "Enter a valid email address.";
    if (!form.password) errs.password = "Enter your password.";
    setErrors(errs);
    setServerError("");
    if (Object.keys(errs).length) return;
    setSending(true);
    try {
      const u = await apiPost<AuthUser>("/auth/login", { email: form.email.trim(), password: form.password });
      beginSession();
      setUser(u);
    } catch (err) {
      setServerError(err instanceof ApiError ? formatApiError(err.body, "Invalid email or password") : "Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-950 font-sans text-slate-100 antialiased">
      <div className="pointer-events-none absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-iris/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-[-10%] h-[520px] w-[520px] rounded-full bg-cyanic/15 blur-[140px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/" data-testid="login-back-home" className="inline-flex w-fit items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white">
          <ArrowLeft size={16} /> Back to website
        </Link>

        <div className="flex flex-1 items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-ink-900/70 p-8 shadow-[0_30px_80px_-30px_rgba(99,102,241,0.45)] backdrop-blur-xl sm:p-10"
            data-testid="login-card"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-white px-2 py-1">
                <img src={SITE.logo} alt="TNS Creations" className="h-7 w-auto" />
              </span>
              <span className="font-heading text-sm font-bold tracking-[0.18em] text-white">
                TNS <span className="text-gradient">CREATIONS</span>
              </span>
            </div>

            <p className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-iris">
              <Lock size={12} /> Team Access
            </p>
            <h1 className="mt-3 font-heading text-2xl font-semibold text-white sm:text-3xl">Sign in to your dashboard</h1>
            <p className="mt-2 text-sm text-slate-400">View and manage every lead captured from the website.</p>

            <button
              type="button"
              onClick={startGoogleLogin}
              data-testid="google-login-button"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.02]"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-slate-600">
              <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={submit} className="space-y-4" noValidate data-testid="login-form">
              <div>
                <input
                  className={inputCls}
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                  value={form.email}
                  data-testid="login-email-input"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <p className="mt-1.5 text-xs text-rose-400" data-testid="login-email-error">{errors.email}</p>}
              </div>
              <div>
                <input
                  className={inputCls}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={form.password}
                  data-testid="login-password-input"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                {errors.password && <p className="mt-1.5 text-xs text-rose-400" data-testid="login-password-error">{errors.password}</p>}
              </div>
              {serverError && (
                <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-300" data-testid="login-server-error">
                  {serverError}
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                data-testid="login-submit-button"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-iris via-volt to-cyanic py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {sending && <Loader2 size={16} className="animate-spin" />}
                Sign in with Email
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.5 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.5-4.1 7-10.2 7-17.6z" />
      <path fill="#FBBC05" d="M10.5 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.8-4.6l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.3 0 11.7-2.1 15.6-5.7l-7.6-5.9c-2.1 1.4-4.8 2.3-8 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}
