import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  chapter: string;
  label: string;
  title: ReactNode;
  sub?: string;
  align?: "left" | "center";
}

export function SectionHeading({ chapter, label, title, sub, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`mb-12 lg:mb-16 ${centered ? "text-center" : ""}`}>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="font-heading text-xs font-semibold tracking-[0.25em] text-iris">{chapter}</span>
        <span className="h-px w-10 bg-gradient-to-r from-iris/70 to-transparent" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{label}</span>
      </div>
      <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base ${centered ? "mx-auto" : ""}`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}
