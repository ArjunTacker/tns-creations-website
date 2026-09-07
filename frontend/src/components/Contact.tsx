import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SITE, whatsappLink } from "@/config/site";

export function Contact() {
  const rows = [
    { icon: Phone, label: "Phone", value: SITE.phoneDisplay, href: SITE.phoneHref, testid: "contact-phone" },
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, testid: "contact-email" },
    { icon: Globe, label: "Website", value: SITE.website, href: SITE.domain, testid: "contact-website" },
  ];

  return (
    <section id="contact" data-testid="contact-section" className="relative py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <SectionHeading
            chapter="11"
            label="Contact"
            title={
              <>
                Let’s Start the <span className="text-gradient">Conversation.</span>
              </>
            }
          />
          <Reveal delay={0.1}>
            <div className="-mt-6 lg:-mt-8">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-white px-2 py-1">
                  <img src={SITE.logo} alt="TNS Creations logo" className="h-8 w-auto" />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold tracking-[0.18em] text-white">TNS CREATIONS</p>
                  <p className="text-xs text-slate-500">{SITE.tagline}</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {rows.map((r) => (
                  <a
                    key={r.label}
                    href={r.href}
                    data-testid={r.testid}
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-ink-900/50 p-4 transition-colors hover:border-iris/35"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-iris/20 to-cyanic/10">
                      <r.icon size={16} className="text-iris" />
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-widest text-slate-500">{r.label}</span>
                      <span className="block text-sm font-medium text-slate-200 group-hover:text-white">{r.value}</span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-whatsapp-button"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.04]"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  data-testid="contact-email-button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/35"
                >
                  <Mail size={16} />
                  Email Us
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glass relative flex h-full min-h-[340px] flex-col items-center justify-center overflow-hidden rounded-3xl p-8 text-center">
            <div className="bg-grid-faint absolute inset-0 opacity-60" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/15 blur-[80px]" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-iris/25 to-cyanic/15">
              <MapPin size={22} className="text-iris" />
            </span>
            <p className="relative mt-5 font-heading text-base font-semibold text-white">Find Us on the Map</p>
            <p className="relative mt-2 max-w-xs text-xs leading-relaxed text-slate-500">
              Google Maps location will appear here once the studio address is confirmed.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
