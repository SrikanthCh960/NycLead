import type { Metadata } from "next";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/Hero";
import AboutOverview from "@/components/about/Overview";
import AboutMission from "@/components/about/MissionVision";
import AboutValues from "@/components/about/CoreValues";
import AboutWhyUs from "@/components/about/WhyChooseUs";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | NYC GravityNet — Technology Consulting",
  description:
    "Learn about NYC GravityNet — our mission, values, and why leading enterprises trust us to drive AI, cybersecurity, cloud, and digital transformation.",
};

export default function AboutPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <AboutHero />
        <AboutOverview />
        <AboutMission />
        <AboutValues />
        <AboutWhyUs />
        <AboutCTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
