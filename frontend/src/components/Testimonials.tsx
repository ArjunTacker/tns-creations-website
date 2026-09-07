import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const SLOTS = [
  { role: "Founder", industry: "Local Business" },
  { role: "Marketing Head", industry: "Education" },
  { role: "Owner", industry: "Food & Beverage" },
];

export function Testimonials() {
  return (
    <section id="testimonials" data-testid="testimonials-section" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="09"
          label="Testimonials"
          align="center"
          title={
            <>
              What Clients <span className="text-gradient">Say.</span>
            </>
          }
          sub="Real words from real engagements — published here as clients share them. No invented reviews, ever."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {SLOTS.map((s, i) => (
            <Reveal key={i} delay={i * 0.09}>
              <figure
                data-testid={`testimonial-placeholder-${i + 1}`}
                className="flex h-full flex-col rounded-3xl border border-dashed border-white/15 bg-ink-900/40 p-8"
              >
                <div className="flex items-center justify-between">
                  <Quote size={22} className="text-iris/50" />
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Placeholder
                  </span>
                </div>
                <blockquote className="mt-6 flex-1 text-sm italic leading-relaxed text-slate-500">
                  “Client testimonial will appear here.”
                </blockquote>
                <figcaption className="mt-6 border-t border-white/[0.06] pt-5">
                  <p className="text-sm font-medium text-slate-400">Client Name</p>
                  <p className="mt-0.5 text-xs text-slate-600">
                    {s.role} · {s.industry}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
