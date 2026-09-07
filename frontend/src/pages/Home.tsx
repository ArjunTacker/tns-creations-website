import { useEffect } from "react";
import { initLenis } from "@/lib/lenis";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { WhyChoose } from "@/components/WhyChoose";
import { FreeTrial } from "@/components/FreeTrial";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { Packages } from "@/components/Packages";
import { Industries } from "@/components/Industries";
import { Testimonials } from "@/components/Testimonials";
import { AuditForm } from "@/components/AuditForm";
import { FinalCTA } from "@/components/FinalCTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { LeadModal } from "@/components/LeadModal";

export default function Home() {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-ink-950 font-sans text-slate-100 antialiased">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <WhyChoose />
        <FreeTrial />
        <Portfolio />
        <Process />
        <Packages />
        <Industries />
        <Testimonials />
        <AuditForm />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <LeadModal />
    </div>
  );
}
