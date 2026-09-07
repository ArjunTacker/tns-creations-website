import { AlertCircle, ArrowRight, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { openLeadModal } from "@/lib/modal";

const BENEFITS = [
  "Marketing Audit",
  "1 Professional Social Media Creative",
  "1 Short Reel / Video Concept or Edit",
  "Growth Strategy Recommendations",
  "Recommended Marketing Package",
];

export function FreeTrial() {
  return (
    <section id="free-trial" data-testid="free-trial-section" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="gradient-border relative rounded-[2rem] p-[1.5px] shadow-[0_0_90px_-18px_rgba(139,92,246,0.55)]">
            <div className="relative overflow-hidden rounded-[calc(2rem-1.5px)] bg-ink-900 px-7 py-12 sm:px-12 sm:py-16">
              <div className="bg-grid-faint pointer-events-none absolute inset-0 opacity-50" />
              <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[480px] -translate-x-1/2 rounded-full bg-iris/20 blur-[100px]" />

              <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyanic">
                    04 — 3-Day Free Trial
                  </p>
                  <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    Experience TNS <span className="text-gradient">Before You Commit.</span>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                    Try our marketing approach for 3 days and experience our creativity,
                    communication and strategy before choosing a monthly plan.
                  </p>
                  <button
                    onClick={() => openLeadModal({ type: "trial" })}
                    data-testid="claim-free-trial-button"
                    className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-iris via-volt to-cyanic px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(99,102,241,0.8)] transition-transform hover:scale-[1.04]"
                  >
                    Claim Your 3-Day Free Trial
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                <div>
                  <ul className="space-y-3.5">
                    {BENEFITS.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-slate-200">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-iris to-cyanic">
                          <Check size={11} strokeWidth={3} className="text-white" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-400/80" />
                    <p className="text-xs leading-relaxed text-slate-400">
                      The free trial does not include paid advertising budget, guaranteed leads,
                      guaranteed sales or unlimited revisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
