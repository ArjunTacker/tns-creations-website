# TNS Creations — Agency Website PRD

## Original Problem Statement (summary)
Build a premium, dark-themed, high-converting marketing website for digital agency **TNS CREATIONS** ("Create. Connect. Grow."). Goals: generate qualified leads via 3 CTAs — 3-Day Free Trial, Book a Consultation, WhatsApp. No fake claims, stats, logos or testimonials. 16 sections: header, kinetic hero, trust strip, about, 6 services, why-choose, free-trial spotlight, filterable portfolio with lightbox, 6-step process, 3 pricing packages (₹7,999 / ₹15,999 / ₹24,999), industries, testimonial placeholders, audit lead form, final CTA, contact, footer. SEO meta + schema, fully responsive, premium motion.

## User Choices
- Stack: React (Vite + TS + Tailwind v4 + motion + lenis)
- Design: dark navy/black + purple/blue/cyan per brief; colorful logo sits on top
- Leads: frontend validation + success message, persisted to MongoDB
- Contact details: user to share real phone/email/domain — PLACEHOLDERS in use meanwhile

## Architecture
- Frontend: `/app/frontend` — Vite + React 19 + TS. Sections as components in `src/components/`, composed in `src/pages/Home.tsx`. Brand/contact constants in `src/config/site.ts`. Smooth scroll: `src/lib/lenis.ts`. Lead-modal pub/sub: `src/lib/modal.ts`.
- Backend: `/app/backend/server.py` — FastAPI, `POST /api/leads` (types: audit | trial | consultation), `GET /api/leads`. Mongo `leads` collection, uuid string ids, ISO timestamps, pydantic validation.
- Logo asset: `/app/frontend/public/assets/tns-logo.png`.

## User Personas
- Small business owner (restaurant/gym/clinic) exploring digital presence → Free Trial / Starter
- Growing brand wanting consistent content + ads → Growth package / Audit form
- Established business wanting full creative + performance setup → Business Growth / Consultation

## Implemented (v1 — initial build)
- All 16 sections, dark glassmorphism theme, Sora/Inter typography, grid + noise + glow textures
- Kinetic hero: masked line-by-line headline reveal, mouse-parallax floating marketing cards (creative, reel, analytics, ad dashboard), animated blobs
- Editorial marquee trust strip; numbered manifesto chapters (01–11)
- Lenis momentum scrolling + motion scroll-reveals + hover micro-interactions
- Portfolio: category filters, animated grid, lightbox modal (placeholder frames, no fake work)
- Packages with Most Popular highlight + ad-spend disclaimer
- Lead capture: audit form + trial/consultation modals → validated client-side, stored in MongoDB, success state "Thank you! Your request has been received. Our team will contact you shortly." + toast
- SEO: meta title/description, OG tags, canonical placeholder, ProfessionalService JSON-LD
- Responsive verified at 1920px and 390px; no horizontal overflow; no console errors

## Known Placeholders (intentional, per brief)
- Phone / WhatsApp / email / domain in `src/config/site.ts` — swap when real details arrive
- Portfolio project frames and testimonial cards — clearly labelled placeholders
- Google Maps card — placeholder until address confirmed
- Privacy Policy / Terms links are `#` stubs

## Backlog (prioritized)
- P0: Wire real contact details (phone, WhatsApp, email, domain) into config
- P0: Leads inbox — password-protected view of `/api/leads`
- P1: Email notification on new lead (Resend)
- P1: Replace portfolio/testimonial placeholders with real client work
- P2: Real Google Maps embed, legal pages, blog/case-study routes
- P2: Lighthouse audit + image optimization pass
