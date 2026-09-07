import { NAV_LINKS, SERVICES, SITE } from "@/config/site";
import { scrollToId } from "@/lib/lenis";

export function Footer() {
  const quick = NAV_LINKS.filter((l) => ["#home", "#about", "#services", "#portfolio", "#packages", "#contact"].includes(l.href));

  return (
    <footer data-testid="footer" className="border-t border-white/[0.06] bg-ink-900/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-white px-2 py-1">
              <img src={SITE.logo} alt="TNS Creations logo" className="h-8 w-auto" />
            </span>
            <span className="font-heading text-sm font-bold tracking-[0.18em] text-white">
              TNS <span className="text-gradient">CREATIONS</span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
            A creative and growth-focused digital marketing agency. {SITE.tagline}
          </p>
        </div>

        <nav aria-label="Quick links">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Quick Links</p>
          <ul className="mt-5 space-y-3">
            {quick.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => scrollToId(l.href)}
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Services</p>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((s) => (
              <li key={s}>
                <button
                  onClick={() => scrollToId("#services")}
                  data-testid={`footer-service-${s.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="text-left text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {s.replace("Graphic Design & Branding", "Graphic Design").replace("Meta Ads & Lead Generation", "Meta Ads").replace("Website Design & Development", "Web Development").replace("Video Editing & Reels", "Video Editing").replace("Social Media Management", "Social Media")}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Legal</p>
          <ul className="mt-5 space-y-3">
            <li>
              <a href="#" data-testid="footer-privacy-link" className="text-sm text-slate-400 transition-colors hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" data-testid="footer-terms-link" className="text-sm text-slate-400 transition-colors hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-slate-600 sm:px-6 lg:px-8">
          © 2026 TNS Creations. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
