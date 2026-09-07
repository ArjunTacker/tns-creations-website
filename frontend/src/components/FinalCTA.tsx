import { ArrowRight, CalendarCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { openLeadModal } from "@/lib/modal";

export function FinalCTA() {
  return (
    <section id="final-cta" data-testid="final-cta-section" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] px-7 py-16 text-center sm:px-12 sm:py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-iris/[0.14] via-ink-900 to-cyanic/[0.1]" />
            <div className="bg-grid-faint absolute inset-0 opacity-40" />
            <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-[420px] -translate-x-1/2 rounded-full bg-iris/25 blur-[110px]" />

            <div className="relative">
              <h2 className="mx-auto max-w-3xl font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Ready to Build a Brand <span className="text-gradient">People Remember?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                Let’s create a marketing strategy designed around your business goals.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => openLeadModal({ type: "trial" })}
                  data-testid="final-cta-trial-button"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-iris via-volt to-cyanic px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(99,102,241,0.8)] transition-transform hover:scale-[1.04]"
                >
                  Start Free Trial
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => openLeadModal({ type: "consultation" })}
                  data-testid="final-cta-consultation-button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.08]"
                >
                  <CalendarCheck size={16} />
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
