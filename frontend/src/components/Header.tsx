import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/config/site";
import { scrollToId } from "@/lib/lenis";
import { openLeadModal } from "@/lib/modal";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header
      data-testid="nav-header"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/[0.07] bg-[#07090E]/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => go("#home")}
          data-testid="nav-logo"
          className="flex items-center gap-3"
          aria-label="TNS Creations — home"
        >
          <span className="rounded-lg bg-white px-2 py-1">
            <img src={SITE.logo} alt="TNS Creations logo" className="h-7 w-auto" />
          </span>
          <span className="hidden font-heading text-sm font-bold tracking-[0.18em] text-white sm:block">
            TNS <span className="text-gradient">CREATIONS</span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-[13px] font-medium text-slate-400 transition-colors hover:text-white"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openLeadModal({ type: "trial" })}
            data-testid="header-free-trial-button"
            className="hidden rounded-full bg-gradient-to-r from-iris via-volt to-cyanic px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_0_28px_-8px_rgba(99,102,241,0.7)] transition-transform hover:scale-[1.04] sm:block"
          >
            Start Free Trial
          </button>
          <button
            onClick={() => setOpen(!open)}
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
            className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/[0.07] bg-[#07090E]/95 backdrop-blur-xl lg:hidden"
            aria-label="Mobile"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  openLeadModal({ type: "trial" });
                }}
                data-testid="mobile-free-trial-button"
                className="mt-2 w-full rounded-full bg-gradient-to-r from-iris via-volt to-cyanic py-3 text-sm font-semibold text-white"
              >
                Start Free Trial
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
