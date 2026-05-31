import type { Metadata } from "next";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesHero         from "@/components/services/Hero";
import ServicesIntro        from "@/components/services/Introduction";
import ServicesGrid         from "@/components/services/ServicesGrid";
import ServicesWhyUs        from "@/components/services/WhyUs";
import ServicesCTA          from "@/components/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Services | NYC GravityNet — Technology Solutions",
  description:
    "Explore NYC GravityNet's full portfolio: cybersecurity, AI & automation, cloud & DevOps, custom software, data analytics, and digital transformation consulting.",
};

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesIntro />
        <ServicesGrid />
        <ServicesWhyUs />
        <ServicesCTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
