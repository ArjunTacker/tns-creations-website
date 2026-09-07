import { Info } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { openLeadModal } from "@/lib/modal";

const PLANS = [
  {
    name: "Starter",
    price: "₹7,999",
    suitable: "Small businesses starting their digital presence.",
    from: ["Social Media Management", "Graphic Design & Branding"],
    popular: false,
  },
  {
    name: "Growth",
    price: "₹15,999",
    suitable: "Businesses wanting consistent content and stronger digital marketing.",
    from: ["Social Media Management", "Graphic Design & Branding", "Video Editing & Reels", "Meta Ads & Lead Generation"],
    popular: true,
  },
  {
    name: "Business Growth",
    price: "₹24,999",
    suitable: "Brands wanting a more complete creative and performance marketing setup.",
    from: ["Social Media Management", "Graphic Design & Branding", "Video Editing & Reels", "Meta Ads & Lead Generation", "Google Ads", "Website Design & Development"],
    popular: false,
  },
];

export function Packages() {
  return (
    <section id="packages" data-testid="packages-section" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-24 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-iris/[0.08] blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="07"
          label="Packages"
          align="center"
          title={
            <>
              Simple Plans. <span className="text-gradient">Serious Growth.</span>
            </>
          }
          sub="Transparent monthly pricing — every plan is shaped into a custom proposal before we start."
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className="h-full">
              <div
                data-testid={`package-card-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                className={`relative flex h-full flex-col rounded-3xl p-[1.5px] ${
                  p.popular ? "gradient-border shadow-[0_0_70px_-18px_rgba(139,92,246,0.6)]" : "border border-white/[0.08] bg-white/[0.02]"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-iris via-volt to-cyanic px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                    Most Popular
                  </span>
                )}
                <div className={`flex h-full flex-col rounded-[calc(1.5rem-1px)] p-8 ${p.popular ? "bg-ink-900" : "bg-ink-950"}`}>
                  <h3 className="font-heading text-lg font-semibold text-white">{p.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className={`font-heading text-4xl font-bold tracking-tight ${p.popular ? "text-gradient" : "text-white"}`}>
                      {p.price}
                    </span>
                    <span className="text-sm text-slate-500">/ month</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    <span className="font-semibold text-slate-300">Suitable for:</span> {p.suitable}
                  </p>

                  <div className="mt-6 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                      Build your plan from
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.from.map((s) => (
                        <span key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-xs italic leading-relaxed text-slate-500">
                      Deliverables are customized in your proposal based on your goals.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      openLeadModal({
                        type: "consultation",
                        note: `I'm interested in the ${p.name} package (${p.price}/month).`,
                      })
                    }
                    data-testid={`package-cta-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`mt-8 w-full rounded-full py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                      p.popular
                        ? "bg-gradient-to-r from-iris via-volt to-cyanic text-white shadow-[0_0_30px_-8px_rgba(99,102,241,0.8)]"
                        : "border border-white/15 bg-white/[0.04] text-white hover:border-iris/50"
                    }`}
                  >
                    Choose {p.name}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="mx-auto flex max-w-3xl items-start gap-2.5 text-center text-xs leading-relaxed text-slate-500 sm:justify-center">
            <Info size={14} className="mt-0.5 shrink-0 text-slate-500" />
            Advertising spend, influencer fees, production costs, paid tools, hosting and
            third-party expenses are separate unless specifically included in a proposal.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
