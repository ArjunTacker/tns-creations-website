import { Compass, PenTool, MessagesSquare, Target } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const PILLARS = [
  { icon: Compass, title: "Strategy-First Approach", text: "Every creative decision starts from a clear marketing direction." },
  { icon: PenTool, title: "Creative Execution", text: "Design and content crafted to make your brand impossible to ignore." },
  { icon: MessagesSquare, title: "Transparent Communication", text: "You always know what is happening, why, and what comes next." },
  { icon: Target, title: "Business-Focused Marketing", text: "Work measured by the opportunities it creates, not vanity metrics." },
];

export function About() {
  return (
    <section id="about" data-testid="about-section" className="relative py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <SectionHeading
            chapter="01"
            label="About TNS"
            title={
              <>
                Not Just Another <span className="text-gradient">Marketing Agency.</span>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="-mt-6 text-sm leading-relaxed text-slate-400 sm:text-base lg:-mt-8">
              TNS Creations combines creative thinking, performance marketing and digital strategy
              to help businesses create a strong online presence and turn attention into meaningful
              business opportunities.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              We work as an extension of your team — obsessing over the details of your brand,
              your audience and your funnel, so every post, campaign and page has a job to do.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-iris/10 blur-3xl" />
            <div className="glass relative rounded-3xl p-7 sm:p-9">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-iris">
                How We Work
              </p>
              <div className="mt-6 space-y-6">
                {PILLARS.map((p, i) => (
                  <div key={p.title} className="flex gap-4" data-testid={`about-pillar-${i + 1}`}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-iris/20 to-cyanic/10">
                      <p.icon size={18} className="text-iris" />
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-white">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
