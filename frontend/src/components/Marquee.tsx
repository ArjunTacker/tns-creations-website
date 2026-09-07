import { Asterisk } from "lucide-react";

const WORDS = ["Creative", "Strategy", "Performance", "Growth"];

export function Marquee() {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {Array.from({ length: 4 }).map((_, r) =>
        WORDS.map((w) => (
          <span key={`${r}-${w}`} className="flex items-center">
            <span className="font-heading text-lg font-semibold uppercase tracking-[0.3em] text-white/25 sm:text-xl">
              {w}
            </span>
            <Asterisk size={18} className="mx-8 text-iris/60" />
          </span>
        ))
      )}
    </div>
  );

  return (
    <div
      data-testid="trust-strip"
      className="relative overflow-hidden border-y border-white/[0.06] bg-ink-900/40 py-5"
      aria-label="Creative, Strategy, Performance, Growth"
    >
      <div className="animate-marquee flex w-max">
        {row("a")}
        {row("b")}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  );
}
