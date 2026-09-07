import { useState } from "react";
import { CheckCircle2, Loader2, ScanSearch } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { apiPost } from "@/lib/api";
import { SERVICES } from "@/config/site";

const BUDGETS = ["Under ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹50,000", "₹50,000+", "Not sure yet"];
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const empty = {
  full_name: "",
  business_name: "",
  phone: "",
  email: "",
  website_url: "",
  service_required: "",
  monthly_budget: "",
  message: "",
};

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-iris/60 focus:bg-white/[0.06]";

export function AuditForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.full_name.trim().length < 2) errs.full_name = "Please enter your full name.";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) errs.phone = "Enter a valid phone number.";
    if (!EMAIL_RE.test(form.email)) errs.email = "Enter a valid email address.";
    if (!form.service_required) errs.service_required = "Please choose a service.";
    if (!form.monthly_budget) errs.monthly_budget = "Please select a budget range.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    try {
      await apiPost("/leads", {
        type: "audit",
        full_name: form.full_name.trim(),
        business_name: form.business_name.trim() || null,
        phone: form.phone.trim(),
        email: form.email.trim(),
        website_url: form.website_url.trim() || null,
        service_required: form.service_required,
        monthly_budget: form.monthly_budget,
        message: form.message.trim() || null,
      });
      setDone(true);
      toast.success("Audit request received. Our team will contact you shortly.");
    } catch {
      toast.error("Something went wrong. Please try again or reach us on WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const err = (k: string) => errors[k] && <p className="mt-1.5 text-xs text-rose-400">{errors[k]}</p>;

  return (
    <section id="audit" data-testid="audit-section" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-1/4 h-[380px] w-[380px] rounded-full bg-volt/[0.08] blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            chapter="10"
            label="Free Audit"
            title={
              <>
                Want to Know What Your Business Can <span className="text-gradient">Improve Online?</span>
              </>
            }
            sub="Request a free digital marketing audit and discover opportunities across your content, branding, website and advertising."
          />
          <Reveal delay={0.1}>
            <ul className="-mt-6 space-y-3 lg:-mt-8">
              {["Content & brand presence review", "Website & conversion check", "Advertising opportunity map"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-slate-300">
                  <ScanSearch size={15} className="shrink-0 text-cyanic" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glass rounded-3xl p-7 sm:p-9">
            {done ? (
              <div className="py-12 text-center" data-testid="audit-success">
                <CheckCircle2 className="mx-auto text-emerald-400" size={48} />
                <h3 className="mt-5 font-heading text-xl font-semibold text-white">Thank you!</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                  Your request has been received. Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" data-testid="lead-audit-form" noValidate>
                <div>
                  <input className={inputCls} placeholder="Full Name *" value={form.full_name} onChange={set("full_name")} data-testid="audit-input-name" />
                  {err("full_name")}
                </div>
                <div>
                  <input className={inputCls} placeholder="Business Name" value={form.business_name} onChange={set("business_name")} data-testid="audit-input-business" />
                </div>
                <div>
                  <input className={inputCls} placeholder="Phone Number *" value={form.phone} onChange={set("phone")} data-testid="audit-input-phone" />
                  {err("phone")}
                </div>
                <div>
                  <input className={inputCls} type="email" placeholder="Email *" value={form.email} onChange={set("email")} data-testid="audit-input-email" />
                  {err("email")}
                </div>
                <div className="sm:col-span-2">
                  <input className={inputCls} placeholder="Website / Instagram URL" value={form.website_url} onChange={set("website_url")} data-testid="audit-input-url" />
                </div>
                <div>
                  <select className={`${inputCls} appearance-none ${form.service_required ? "" : "text-slate-500"}`} value={form.service_required} onChange={set("service_required")} data-testid="audit-input-service">
                    <option value="" disabled className="bg-ink-900">Service Required *</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s} className="bg-ink-900">{s}</option>
                    ))}
                    <option value="Other / Not sure" className="bg-ink-900">Other / Not sure</option>
                  </select>
                  {err("service_required")}
                </div>
                <div>
                  <select className={`${inputCls} appearance-none ${form.monthly_budget ? "" : "text-slate-500"}`} value={form.monthly_budget} onChange={set("monthly_budget")} data-testid="audit-input-budget">
                    <option value="" disabled className="bg-ink-900">Monthly Marketing Budget *</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b} className="bg-ink-900">{b}</option>
                    ))}
                  </select>
                  {err("monthly_budget")}
                </div>
                <div className="sm:col-span-2">
                  <textarea className={`${inputCls} min-h-[110px] resize-none`} placeholder="Message — tell us about your goals" value={form.message} onChange={set("message")} data-testid="audit-input-message" />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  data-testid="audit-submit-button"
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-iris via-volt to-cyanic py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(99,102,241,0.7)] transition-transform hover:scale-[1.02] disabled:opacity-60 sm:col-span-2"
                >
                  {sending && <Loader2 size={16} className="animate-spin" />}
                  Request Free Audit
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
