import { format } from "date-fns";
import { Mail, Phone } from "lucide-react";

export type Lead = {
  id: string;
  type: "audit" | "trial" | "consultation";
  full_name: string;
  phone: string;
  email?: string | null;
  business_name?: string | null;
  website_url?: string | null;
  service_required?: string | null;
  monthly_budget?: string | null;
  message?: string | null;
  created_at: string;
};

const TYPE_STYLES: Record<Lead["type"], string> = {
  audit: "bg-cyanic/15 text-cyan-300 border-cyanic/30",
  trial: "bg-iris/15 text-violet-300 border-iris/30",
  consultation: "bg-volt/15 text-blue-300 border-volt/30",
};

export function TypeBadge({ type }: { type: Lead["type"] }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${TYPE_STYLES[type]}`}>
      {type}
    </span>
  );
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  if (!leads.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center text-sm text-slate-500" data-testid="leads-empty">
        No leads yet for this filter.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-ink-900/60" data-testid="leads-table">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead className="border-b border-white/[0.08] text-[11px] uppercase tracking-[0.18em] text-slate-500">
          <tr>
            <th className="px-5 py-4 font-semibold">Lead</th>
            <th className="px-5 py-4 font-semibold">Type</th>
            <th className="px-5 py-4 font-semibold">Business</th>
            <th className="px-5 py-4 font-semibold">Interest</th>
            <th className="px-5 py-4 font-semibold">Message</th>
            <th className="px-5 py-4 font-semibold">Received</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.06]">
          {leads.map((l) => (
            <tr key={l.id} className="transition-colors hover:bg-white/[0.03]" data-testid={`lead-row-${l.id}`}>
              <td className="px-5 py-4 align-top">
                <p className="font-medium text-white">{l.full_name}</p>
                <a href={`tel:${l.phone}`} className="mt-1 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
                  <Phone size={12} /> {l.phone}
                </a>
                {l.email && (
                  <a href={`mailto:${l.email}`} className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
                    <Mail size={12} /> {l.email}
                  </a>
                )}
              </td>
              <td className="px-5 py-4 align-top"><TypeBadge type={l.type} /></td>
              <td className="px-5 py-4 align-top text-slate-300">
                {l.business_name || <span className="text-slate-600">—</span>}
                {l.website_url && <p className="mt-0.5 max-w-[180px] truncate text-xs text-slate-500">{l.website_url}</p>}
              </td>
              <td className="px-5 py-4 align-top text-slate-300">
                {l.service_required || <span className="text-slate-600">—</span>}
                {l.monthly_budget && <p className="mt-0.5 text-xs text-slate-500">{l.monthly_budget}</p>}
              </td>
              <td className="max-w-[260px] px-5 py-4 align-top text-xs leading-relaxed text-slate-400">
                {l.message || <span className="text-slate-600">—</span>}
              </td>
              <td className="whitespace-nowrap px-5 py-4 align-top text-xs text-slate-400">
                {format(new Date(l.created_at), "dd MMM yyyy, HH:mm")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
