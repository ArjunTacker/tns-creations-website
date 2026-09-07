import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Clapperboard,
  Globe,
  Heart,
  MessageCircle,
  Play,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { openLeadModal } from "@/lib/modal";
import { scrollToId } from "@/lib/lenis";
import type { MouseEvent } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const TRUST_TAGS = [
  { icon: Sparkles, label: "Creative Strategy" },
  { icon: TrendingUp, label: "Performance Marketing" },
  { icon: Clapperboard, label: "Content Production" },
  { icon: Globe, label: "Web Experiences" },
];

function HeadlineLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 16 });
  const sy = useSpring(my, { stiffness: 55, damping: 16 });
  const farX = useTransform(sx, (v) => v * 26);
  const farY = useTransform(sy, (v) => v * 18);
  const nearX = useTransform(sx, (v) => v * -14);
  const nearY = useTransform(sy, (v) => v * -10);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      onMouseMove={onMove}
      className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:min-h-screen lg:pb-24 lg:pt-40"
    >
      <div className="bg-grid-faint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      <div className="animate-drift pointer-events-none absolute -left-40 top-24 h-[480px] w-[480px] rounded-full bg-iris/20 blur-[130px]" />
      <div className="animate-drift pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-cyanic/15 blur-[130px] [animation-delay:-7s]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-iris to-cyanic" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              Creative · Performance · Growth
            </span>
          </motion.div>

          <h1 className="mt-7 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem] xl:text-6xl">
            <HeadlineLine delay={0.15}>Creative Marketing</HeadlineLine>
            <HeadlineLine delay={0.27}>That Turns Attention</HeadlineLine>
            <HeadlineLine delay={0.39}>
              Into <span className="text-gradient">Growth.</span>
            </HeadlineLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base"
          >
            TNS Creations helps modern businesses build stronger brands, create engaging content,
            generate quality leads and grow through strategic digital marketing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => openLeadModal({ type: "trial" })}
              data-testid="hero-free-trial-button"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-iris via-volt to-cyanic px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_36px_-8px_rgba(99,102,241,0.75)] transition-transform hover:scale-[1.04]"
            >
              Start Your 3-Day Free Trial
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToId("#portfolio")}
              data-testid="hero-view-work-button"
              className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-white/35 hover:bg-white/[0.07]"
            >
              View Our Work
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
            data-testid="hero-trust-tags"
          >
            {TRUST_TAGS.map((t) => (
              <span key={t.label} className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <t.icon size={14} className="text-iris" />
                {t.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Floating marketing visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          className="relative mx-auto h-[440px] w-full max-w-[460px] sm:h-[500px]"
          data-testid="hero-visual"
        >
          <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/15 blur-[100px]" />

          {/* Social creative card */}
          <motion.div style={{ x: farX, y: farY }} className="absolute left-0 top-6 w-44 sm:w-48">
            <div className="animate-floaty glass rounded-2xl p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]">
              <div className="flex h-32 flex-col justify-between rounded-xl bg-gradient-to-br from-iris via-volt to-cyanic p-3 sm:h-36">
                <Sparkles size={16} className="text-white/80" />
                <div>
                  <p className="font-heading text-[13px] font-bold text-white">New Drop</p>
                  <p className="text-[10px] text-white/70">Brand campaign creative</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 px-1 text-slate-400">
                <Heart size={13} className="text-rose-400" />
                <MessageCircle size={13} />
                <span className="ml-auto text-[10px] font-medium">Social Creative</span>
              </div>
            </div>
          </motion.div>

          {/* Reel preview */}
          <motion.div style={{ x: nearX, y: nearY }} className="absolute right-0 top-0 w-32 sm:w-36">
            <div className="animate-floaty glass rounded-2xl p-2.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] [animation-delay:-2s]">
              <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-ink-800 to-ink-950 sm:h-52">
                <div className="bg-grid-faint absolute inset-0 opacity-60" />
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                  <Play size={15} className="ml-0.5 text-white" />
                </span>
                <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                  00:15
                </span>
              </div>
              <p className="mt-2 px-1 text-[10px] font-medium text-slate-400">Reel Preview</p>
            </div>
          </motion.div>

          {/* Analytics card */}
          <motion.div style={{ x: nearX, y: farY }} className="absolute bottom-16 left-4 w-52 sm:bottom-10 sm:w-56">
            <div className="animate-floaty glass rounded-2xl p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] [animation-delay:-4s]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Reach</span>
                <BarChart3 size={14} className="text-cyanic" />
              </div>
              <svg viewBox="0 0 200 64" className="mt-3 w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="spark" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="55%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <polyline
                  points="0,52 28,44 56,48 84,30 112,34 140,18 168,22 200,8"
                  fill="none"
                  stroke="url(#spark)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="mt-2 flex gap-1.5">
                {[14, 22, 17, 28, 24, 34, 30].map((h, i) => (
                  <span
                    key={i}
                    className="w-full rounded-sm bg-gradient-to-t from-iris/50 to-cyanic/50"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
              <p className="mt-2.5 text-[10px] text-slate-500">Weekly performance · illustrative</p>
            </div>
          </motion.div>

          {/* Ad dashboard card */}
          <motion.div style={{ x: farX, y: nearY }} className="absolute bottom-0 right-2 w-44 sm:w-48">
            <div className="animate-floaty glass rounded-2xl p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] [animation-delay:-1s]">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Campaigns</p>
              {[
                { name: "Meta Ads", w: "72%" },
                { name: "Google Ads", w: "58%" },
              ].map((c) => (
                <div key={c.name} className="mt-3">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{c.name}</span>
                    <span className="text-slate-500">Active</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-iris to-cyanic" style={{ width: c.w }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
