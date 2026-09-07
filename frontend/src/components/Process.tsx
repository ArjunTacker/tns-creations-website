import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  { n: "01", title: "Discover", text: "Understand the business, goals, audience and competition." },
  { n: "02", title: "Strategy", text: "Develop the marketing direction and content plan." },
  { n: "03", title: "Create", text: "Design creatives, videos and campaign assets." },
  { n: "04", title: "Launch", text: "Publish content or launch campaigns." },
  { n: "05", title: "Optimize", text: "Analyze performance and improve execution." },
  { n: "06", title: "Grow", text: "Scale what works and strengthen the brand." },
];

export function Process() {
  return (
    <section id="process" data-testid="process-section" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[360px] w-[360px] rounded-full bg-cyanic/[0.07] blur-[110px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="06"
          label="Process"
          title={
            <>
              From Idea to <span className="text-gradient">Growth.</span>
            </>
          }
          sub="A clear six-step operating system — you always know which stage your brand is in."
        />

        {/* Desktop: horizontal */}
        <div className="relative hidden lg:block">
          <div className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-iris/50 via-volt/40 to-cyanic/50" />
          <div className="grid grid-cols-6 gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.09}>
                <div data-testid={`process-step-${s.n}`} className="group relative pt-16">
                  <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-iris/40 bg-ink-950 font-heading text-sm font-bold text-iris shadow-[0_0_24px_-6px_rgba(139,92,246,0.6)] transition-transform duration-300 group-hover:scale-110">
                    {s.n}
                  </span>
                  <h3 className="font-heading text-base font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="relative lg:hidden">
          <div className="absolute bottom-4 left-6 top-4 w-px bg-gradient-to-b from-iris/50 via-volt/40 to-cyanic/50" />
          <div className="space-y-9">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div data-testid={`process-step-mobile-${s.n}`} className="relative flex gap-5 pl-0">
                  <span className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-iris/40 bg-ink-950 font-heading text-sm font-bold text-iris">
                    {s.n}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-heading text-base font-semibold text-white">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
