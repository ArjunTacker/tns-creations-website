import Lenis from "lenis";

let lenis: Lenis | null = null;

export function initLenis() {
  if (lenis) return lenis;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export function scrollToId(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -76 });
  else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
}
