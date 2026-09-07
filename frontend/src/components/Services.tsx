import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Clapperboard,
  Code2,
  PenTool,
  Search,
  Share2,
  Target,
} from "lucide-react";
import { Modal } from "./Modal";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { scrollToId } from "@/lib/lenis";

const SERVICES = [
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "Strategic content planning, creative design and consistent social media management built around your brand.",
    points: ["Monthly content calendars", "Platform-native creative design", "Caption & hashtag strategy", "Consistency your audience can trust"],
  },
  {
    icon: PenTool,
    title: "Graphic Design & Branding",
    desc: "Professional social creatives, campaign graphics, brand assets and visual communication designed to make your business stand out.",
    points: ["Social & campaign creatives", "Brand asset systems", "Visual identity refreshes", "Print & digital collateral"],
  },
  {
    icon: Clapperboard,
    title: "Video Editing & Reels",
    desc: "Engaging short-form videos, promotional reels, commercial edits and social-first video content.",
    points: ["Short-form reels & edits", "Promotional video cuts", "Motion graphics overlays", "Platform-optimised formats"],
  },
  {
    icon: Target,
    title: "Meta Ads & Lead Generation",
    desc: "Strategic Facebook and Instagram advertising campaigns focused on reaching the right audience and generating meaningful enquiries.",
    points: ["Audience & funnel strategy", "Campaign setup & management", "Creative testing", "Enquiry-focused optimisation"],
  },
  {
    icon: Search,
    title: "Google Ads",
    desc: "Search-focused advertising strategies designed to connect businesses with customers actively looking for their services.",
    points: ["Search campaign strategy", "Keyword & intent mapping", "Ad copy that converts", "Ongoing bid optimisation"],
  },
  {
    icon: Code2,
    title: "Website Design & Development",
    desc: "Modern, responsive and conversion-focused business websites built for performance, credibility and lead generation.",
    points: ["Conversion-first layouts", "Mobile-first development", "Speed & SEO foundations", "Lead capture built in"],
  },
];

export function Services() {
  const [active, setActive] = useState<(typeof SERVICES)[number] | null>(null);

  return (
    <section id="services" data-testid="services-section" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-volt/[0.07] blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="02"
          label="Services"
          title={
            <>
              Everything Your Brand Needs to <span className="text-gradient">Grow Online.</span>
            </>
          }
          sub="Six focused capabilities, one integrated growth system — pick a single service or let us build the full engine."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <motion.button
                onClick={() => setActive(s)}
                data-testid={`service-card-${i + 1}`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group glass relative block h-full w-full overflow-hidden rounded-3xl p-7 text-left transition-colors hover:border-iris/40"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-iris/10 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-iris/20 to-cyanic/10">
                  <s.icon size={20} className="text-iris" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-iris">
                  Explore Service
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} labelledBy="service-modal-title">
        {active && (
          <div data-testid="service-modal">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-iris/20 to-cyanic/10">
              <active.icon size={20} className="text-iris" />
            </span>
            <h3 id="service-modal-title" className="mt-5 font-heading text-xl font-semibold text-white sm:text-2xl">
              {active.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{active.desc}</p>
            <ul className="mt-5 space-y-2.5">
              {active.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <span className="h-1 w-1 rounded-full bg-gradient-to-r from-iris to-cyanic" />
                  {p}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setActive(null);
                scrollToId("#audit");
              }}
              data-testid="service-modal-cta"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-iris via-volt to-cyanic px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Request This Service
              <ArrowUpRight size={15} />
            </button>
          </div>
        )}
      </Modal>
    </section>
  );
}
