import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Modal } from "./Modal";
import { subscribeLeadModal } from "@/lib/modal";
import type { LeadModalPayload } from "@/lib/modal";
import { apiPost } from "@/lib/api";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function LeadModal() {
  const [payload, setPayload] = useState<LeadModalPayload | null>(null);
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(
    () =>
      subscribeLeadModal((p) => {
        setPayload(p);
        setDone(false);
        setErrors({});
        setForm({ full_name: "", phone: "", email: "", message: p.note ?? "" });
      }),
    []
  );

  const close = () => setPayload(null);
  const isTrial = payload?.type === "trial";
  const title = isTrial ? "Claim Your 3-Day Free Trial" : "Book a Consultation";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payload) return;
    const errs: Record<string, string> = {};
    if (form.full_name.trim().length < 2) errs.full_name = "Please enter your full name.";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) errs.phone = "Enter a valid phone number.";
    if (form.email && !EMAIL_RE.test(form.email)) errs.email = "Enter a valid email address.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    try {
      await apiPost("/leads", {
        type: payload.type,
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        message: form.message.trim() || null,
      });
      setDone(true);
      toast.success("Request received. Our team will contact you shortly.");
    } catch {
      toast.error("Something went wrong. Please try again or reach us on WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-iris/60 focus:bg-white/[0.06]";

  return (
    <Modal open={!!payload} onClose={close} labelledBy="lead-modal-title">
      {done ? (
        <div className="py-8 text-center" data-testid="lead-modal-success">
          <CheckCircle2 className="mx-auto text-emerald-400" size={44} />
          <h3 className="mt-5 font-heading text-xl font-semibold text-white">Thank you!</h3>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            Your request has been received. Our team will contact you shortly.
          </p>
          <button
            onClick={close}
            data-testid="lead-modal-done-button"
            className="mt-7 rounded-full bg-gradient-to-r from-iris via-volt to-cyanic px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-iris">
            {isTrial ? "Free Trial" : "Consultation"}
          </p>
          <h3 id="lead-modal-title" className="mt-3 font-heading text-xl font-semibold text-white sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            {isTrial
              ? "Tell us where to reach you — we'll set up your 3-day trial experience."
              : "Share a few details and we'll schedule a strategy call around your goals."}
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4" data-testid="lead-modal-form" noValidate>
            <div>
              <input
                className={inputCls}
                placeholder="Full Name *"
                value={form.full_name}
                data-testid="lead-modal-name-input"
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
              {errors.full_name && <p className="mt-1.5 text-xs text-rose-400">{errors.full_name}</p>}
            </div>
            <div>
              <input
                className={inputCls}
                placeholder="Phone / WhatsApp Number *"
                value={form.phone}
                data-testid="lead-modal-phone-input"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && <p className="mt-1.5 text-xs text-rose-400">{errors.phone}</p>}
            </div>
            <div>
              <input
                className={inputCls}
                type="email"
                placeholder="Email (optional)"
                value={form.email}
                data-testid="lead-modal-email-input"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>}
            </div>
            <textarea
              className={`${inputCls} min-h-[96px] resize-none`}
              placeholder="Anything we should know? (optional)"
              value={form.message}
              data-testid="lead-modal-message-input"
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button
              type="submit"
              disabled={sending}
              data-testid="lead-modal-submit-button"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-iris via-volt to-cyanic py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {sending && <Loader2 size={16} className="animate-spin" />}
              {isTrial ? "Start My Free Trial" : "Request Consultation"}
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}
