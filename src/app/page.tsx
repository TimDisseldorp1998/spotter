import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { BentoTools } from "@/components/BentoTools";
import { HowItWorks } from "@/components/HowItWorks";
import { SocialTraining } from "@/components/SocialTraining";
import { Testimonials } from "@/components/Testimonials";
import { CtaSection } from "@/components/CtaSection";
import { SiteFooter } from "@/components/SiteFooter";

/*
 * Sectievolgorde volgt het "Bento Grid Showcase"-patroon van de skill,
 * met social proof vóór de CTA (landing.csv: social-proof-focused).
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <StatsStrip />
        <BentoTools />
        <HowItWorks />
        <SocialTraining />
        <Testimonials />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
