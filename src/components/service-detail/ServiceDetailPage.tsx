import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar       from "@/components/layout/Navbar";
import Footer       from "@/components/layout/Footer";
import ServiceHero      from "./ServiceHero";
import ServiceOverview  from "./ServiceOverview";
import ServiceSolutions from "./ServiceSolutions";
import ServiceBenefits  from "./ServiceBenefits";
import ServiceWhyUs     from "./ServiceWhyUs";
import ServiceProcess   from "./ServiceProcess";
import ServiceFAQ       from "./ServiceFAQ";
import ServiceCTA       from "./ServiceCTA";
import type { ServiceConfig } from "@/lib/services-data";

export default function ServiceDetailPage({ config }: { config: ServiceConfig }) {
  const { hero, overview, solutions, benefits, faqs } = config;
  const accent    = hero.accent;
  const accentRgb = hero.accentRgb;

  return (
    <SmoothScroll>
      <Navbar />
      <main>
        {/* 1 — Hero */}
        <ServiceHero config={hero} slug={config.slug} />

        {/* 2 — Overview */}
        <ServiceOverview overview={overview} accent={accent} accentRgb={accentRgb} />

        {/* 3 — Solutions */}
        <ServiceSolutions solutions={solutions} accent={accent} accentRgb={accentRgb} />

        {/* 4 — Benefits */}
        <ServiceBenefits benefits={benefits} accent={accent} accentRgb={accentRgb} />

        {/* 5 — Why NYC GravityNet */}
        <ServiceWhyUs accent={accent} accentRgb={accentRgb} />

        {/* 6 — Delivery Process */}
        <ServiceProcess accent={accent} accentRgb={accentRgb} />

        {/* 7 — FAQ */}
        <ServiceFAQ faqs={faqs} accent={accent} accentRgb={accentRgb} />

        {/* 8 — CTA */}
        <ServiceCTA ctaText={hero.ctaText} accent={accent} accentRgb={accentRgb} />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
