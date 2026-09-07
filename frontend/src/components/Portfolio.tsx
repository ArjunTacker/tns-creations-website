import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clapperboard, Code2, Megaphone, Palette, Search, Share2 } from "lucide-react";
import { Modal } from "./Modal";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const CATEGORIES = ["All", "Social Media", "Branding", "Reels", "Advertising", "Websites"] as const;

const PROJECTS = [
  { title: "Social Campaign Series", category: "Social Media", icon: Share2, hue: "from-iris/70 via-volt/50 to-ink-950", tall: false },
  { title: "Brand Identity Concept", category: "Branding", icon: Palette, hue: "from-fuchsia-600/60 via-iris/50 to-ink-950", tall: true },
  { title: "Reel Production Set", category: "Reels", icon: Clapperboard, hue: "from-volt/60 via-cyanic/40 to-ink-950", tall: false },
  { title: "Lead Generation Campaign", category: "Advertising", icon: Megaphone, hue: "from-cyanic/60 via-volt/40 to-ink-950", tall: true },
  { title: "Business Website Concept", category: "Websites", icon: Code2, hue: "from-iris/60 via-ink-800 to-ink-950", tall: false },
  { title: "Search Campaign Concept", category: "Advertising", icon: Search, hue: "from-volt/50 via-iris/40 to-ink-950", tall: false },
];

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [active, setActive] = useState<(typeof PROJECTS)[number] | null>(null);

  const visible = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="portfolio" data-testid="portfolio-section" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="05"
          label="Portfolio"
          title={
            <>
              Selected <span className="text-gradient">Work.</span>
            </>
          }
          sub="A curated showcase framework — live client case studies are published here as engagements launch."
        />

        <Reveal className="mb-10 flex flex-wrap gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-testid={`portfolio-tab-${c.toLowerCase().replace(/\s+/g, "-")}`}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                filter === c
                  ? "bg-gradient-to-r from-iris via-volt to-cyanic text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.7)]"
                  : "border border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white"
              } px-4`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.button
                layout
                key={p.title}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(p)}
                data-testid={`portfolio-card-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                className={`group glass relative block overflow-hidden rounded-3xl text-left ${p.tall ? "sm:row-span-2" : ""}`}
              >
                <div className={`relative flex ${p.tall ? "h-72 sm:h-full sm:min-h-[420px]" : "h-52"} flex-col justify-between bg-gradient-to-br ${p.hue} p-6`}>
                  <div className="bg-grid-faint absolute inset-0 opacity-40" />
                  <span className="relative w-fit rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur">
                    {p.category}
                  </span>
                  <p.icon size={30} className="relative text-white/25 transition-all duration-500 group-hover:scale-110 group-hover:text-white/50" />
                </div>
                <div className="relative p-6">
                  <h3 className="font-heading text-base font-semibold text-white transition-colors group-hover:text-iris">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500">Showcase placeholder — client case study coming soon</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} labelledBy="portfolio-modal-title" wide>
        {active && (
          <div data-testid="portfolio-modal">
            <div className={`relative flex h-56 items-end rounded-2xl bg-gradient-to-br ${active.hue} p-6 sm:h-64`}>
              <div className="bg-grid-faint absolute inset-0 rounded-2xl opacity-40" />
              <span className="relative rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur">
                {active.category}
              </span>
            </div>
            <h3 id="portfolio-modal-title" className="mt-6 font-heading text-xl font-semibold text-white sm:text-2xl">
              {active.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              This is a placeholder project frame. A full case study — including the brief, creative
              process, deliverables and outcomes — will be published here once a live client
              engagement in this category goes live.
            </p>
            <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-slate-500">
              We never show invented client work. Real projects replace these frames as they launch.
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
}
