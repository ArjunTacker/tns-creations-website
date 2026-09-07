import {
  Briefcase,
  Building2,
  Cpu,
  Dumbbell,
  GraduationCap,
  Store,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const INDUSTRIES = [
  { icon: UtensilsCrossed, name: "Restaurants & Cafes" },
  { icon: Dumbbell, name: "Gyms & Fitness" },
  { icon: GraduationCap, name: "Education & Institutes" },
  { icon: Cpu, name: "Technology & IT" },
  { icon: Wifi, name: "Internet Service Providers" },
  { icon: Building2, name: "Real Estate" },
  { icon: Store, name: "Local Businesses" },
  { icon: Briefcase, name: "Professional Services" },
];

export function Industries() {
  return (
    <section id="industries" data-testid="industries-section" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="08"
          label="Industries"
          title={
            <>
              Marketing Built Around <span className="text-gradient">Your Business.</span>
            </>
          }
          sub="Different industries need different playbooks — we adapt strategy, creative and channels to yours."
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 4) * 0.07}>
              <div
                data-testid={`industry-card-${i + 1}`}
                className="group flex h-full flex-col items-center gap-3.5 rounded-3xl border border-white/[0.07] bg-ink-900/50 px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-cyanic/35"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-volt/15 to-cyanic/10 transition-transform duration-300 group-hover:scale-110">
                  <ind.icon size={20} className="text-cyanic" />
                </span>
                <span className="text-sm font-medium text-slate-200">{ind.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
