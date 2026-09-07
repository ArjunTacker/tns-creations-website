// Central brand + contact config. Contact values are PLACEHOLDERS —
// swap phone / whatsappNumber / email / website / domain here once real details are shared.
export const SITE = {
  name: "TNS Creations",
  tagline: "Create. Connect. Grow.",
  logo: "/assets/tns-logo.png",
  phoneDisplay: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  whatsappNumber: "910000000000",
  email: "hello@tnscreations.in",
  website: "www.tnscreations.in",
  domain: "https://www.tnscreations.in",
};

export const whatsappLink = (
  msg = "Hi TNS Creations! I'd like to discuss digital marketing for my business."
) => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Packages", href: "#packages" },
  { label: "Free Trial", href: "#free-trial" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  "Social Media Management",
  "Graphic Design & Branding",
  "Video Editing & Reels",
  "Meta Ads & Lead Generation",
  "Google Ads",
  "Website Design & Development",
];
