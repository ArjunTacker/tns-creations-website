import { BadgeCheck, Headphones, Layers, MessagesSquare, TrendingUp, Zap } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const BENEFITS = [
  { icon: Headphones, title: "Dedicated Account Support", text: "One point of contact who knows your brand inside out." },
  { icon: BadgeCheck, title: "Professional Creative Quality", text: "Every asset reviewed against a premium quality bar." },
  { icon: Zap, title: "Fast Turnaround", text: "Agile production cycles that keep your marketing moving." },
  { icon: MessagesSquare, title: "Transparent Communication", text: "Clear timelines, honest reporting, no surprises." },
  { icon: TrendingUp, title: "Performance-Focused Strategy", text: "Decisions driven by data, not guesswork." },
  { icon: Layers, title: "Flexible Growth Packages", text: "Plans that scale with your business stage." },
];

export function WhyChoose() {
  return (
    <section id="why-tns" data-testid="why-choose-section" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="03"
          label="Why TNS"
          align="center"
          title={
            <>
              Creative Thinking. <span className="text-gradient">Business-Focused Execution.</span>
            </>
          }
          sub="We focus on building long-term marketing systems rather than simply posting content."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.08}>
              <div
                data-testid={`benefit-card-${i + 1}`}
                className="group h-full rounded-3xl border border-white/[0.07] bg-ink-900/50 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-iris/35 hover:bg-ink-800/60"
              >
                <b.icon size={22} className="text-cyanic transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-4 font-heading text-base font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
