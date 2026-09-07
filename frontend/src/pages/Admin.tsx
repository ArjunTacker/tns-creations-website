import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Loader2, LogOut, RefreshCw, ShieldAlert } from "lucide-react";
import { SITE } from "@/config/site";
import { apiGet } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { endSession } from "@/lib/session";
import { LeadsTable } from "@/components/admin/LeadsTable";
import type { Lead } from "@/components/admin/LeadsTable";

type Filter = "all" | Lead["type"];
const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "trial", label: "Free Trial" },
  { key: "consultation", label: "Consultation" },
  { key: "audit", label: "Audit" },
];

export default function Admin() {
  const { user } = useAuth();
  const isAdmin = user && user.role === "admin";
  const [filter, setFilter] = useState<Filter>("all");
  const leadsQuery = useQuery({
    queryKey: ["leads"],
    queryFn: () => apiGet<Lead[]>("/leads"),
    enabled: !!isAdmin,
  });

  const leads = leadsQuery.data ?? [];
  const counts = useMemo(() => {
    const c = { all: leads.length, trial: 0, consultation: 0, audit: 0 };
    leads.forEach((l) => (c[l.type] += 1));
    return c;
  }, [leads]);
  const visible = filter === "all" ? leads : leads.filter((l) => l.type === filter);

  return (
    <div className="min-h-screen bg-ink-950 font-sans text-slate-100 antialiased" data-testid="admin-dashboard">
      <header className="border-b border-white/[0.07] bg-ink-900/60 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3" data-testid="admin-logo">
            <span className="rounded-lg bg-white px-2 py-1">
              <img src={SITE.logo} alt="TNS Creations" className="h-6 w-auto" />
            </span>
            <span className="hidden font-heading text-xs font-bold tracking-[0.18em] text-white sm:block">
              LEADS <span className="text-gradient">DASHBOARD</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden items-center gap-2.5 sm:flex" data-testid="admin-user">
                {user.picture ? (
                  <img src={user.picture} alt="" className="h-8 w-8 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                ) : (
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-r from-iris to-cyanic text-xs font-bold">
                    {user.name.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <div className="leading-tight">
                  <p className="text-xs font-medium text-white">{user.name}</p>
                  <p className="text-[11px] text-slate-500">{user.email}</p>
                </div>
              </div>
            )}
            <button
              onClick={() => endSession("/login")}
              data-testid="admin-logout-button"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {!isAdmin ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8 text-center" data-testid="admin-no-access">
            <ShieldAlert className="mx-auto text-amber-400" size={40} />
            <h1 className="mt-5 font-heading text-xl font-semibold text-white">Access pending</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              You're signed in as <span className="text-white">{user && user.email}</span>, but this account isn't on the admin list yet.
              Ask the site owner to add your email to <code className="text-cyan-300">ADMIN_EMAILS</code>.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-iris">Inbox</p>
                <h1 className="mt-2 font-heading text-3xl font-semibold text-white sm:text-4xl">Captured leads</h1>
                <p className="mt-2 text-sm text-slate-400">Every trial, consultation and audit request from the website, newest first.</p>
              </div>
              <div className="flex items-center gap-2">
                <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 hover:text-white" data-testid="admin-view-site">
                  <ExternalLink size={14} /> View site
                </a>
                <button
                  onClick={() => leadsQuery.refetch()}
                  data-testid="admin-refresh-button"
                  className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 hover:text-white"
                >
                  <RefreshCw size={14} className={leadsQuery.isFetching ? "animate-spin" : ""} /> Refresh
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  data-testid={`leads-filter-${f.key}`}
                  className={`rounded-2xl border p-5 text-left transition-colors ${
                    filter === f.key ? "border-iris/50 bg-iris/10" : "border-white/[0.08] bg-ink-900/60 hover:border-white/20"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{f.label}</p>
                  <p className="mt-2 font-heading text-3xl font-semibold text-white" data-testid={`leads-count-${f.key}`}>
                    {counts[f.key]}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-8">
              {leadsQuery.isLoading ? (
                <div className="grid place-items-center py-20" data-testid="leads-loading">
                  <Loader2 className="animate-spin text-iris" size={26} />
                </div>
              ) : leadsQuery.isError ? (
                <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-300" data-testid="leads-error">
                  Couldn't load leads. Please refresh.
                </p>
              ) : (
                <LeadsTable leads={visible} />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
