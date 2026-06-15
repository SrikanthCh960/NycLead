"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { label: "Cybersecurity" },
  { label: "AI & Automation" },
  { label: "Cloud & DevOps" },
  { label: "Custom Software" },
  { label: "Data & Analytics" },
];

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgY    = useTransform(scrollYProgress, [0, 1], ["0%",  "14%"]);
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%",  "7%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-pill",
        { opacity: 0, y: 18, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 0.7, ease: "power3.out", delay: 1.05 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(155deg, #1636da 0%, #1636da 50%, #1636da 100%)" }}
    >
      {/* ── Grid texture ── */}
      <div
        className="absolute inset-0 opacity-[0.042] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.8) 1px, transparent 1px), linear-gradient(90deg,rgba(37,99,235,0.8) 1px,transparent 1px)",
          backgroundSize: "68px 68px",
        }}
      />

      {/* ── Ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: [0.28, 0.48, 0.28], scale: [1, 1.07, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-1/3 w-[650px] h-[650px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 68%)", filter: "blur(44px)" }}
        />
        <motion.div
          animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute right-0 bottom-1/4 w-[480px] h-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 68%)", filter: "blur(36px)" }}
        />
      </div>

      {/* ── Top accent ── */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.7),rgba(6,182,212,0.5),transparent)" }} />

      {/* ── Content grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* LEFT ── */}
          <motion.div style={{ y: textY }}>

            {/* Page badge */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.28)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
              <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">Our Services</span>
            </motion.div>

            {/* Headline — 2 lines */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.18, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-bold text-white leading-[1.06] tracking-[-0.03em]"
              >
                Technology Solutions
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-9">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-bold leading-[1.06] tracking-[-0.03em] gradient-text"
              >
                Designed for Growth
              </motion.h1>
            </div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.95 }}
              className="text-white/52 text-[1.06rem] leading-[1.88] mb-12 max-w-[520px]"
            >
              From cybersecurity and AI to cloud transformation and custom
              software, NYC GravityNet delivers solutions that help businesses
              operate more efficiently, securely, and competitively.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.85 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <a
                href="#services-grid"
                className="btn-shine group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:shadow-[0_8px_44px_rgba(37,99,235,0.48)] hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)" }}
              >
                Explore Services
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/12 hover:border-white/24 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Talk to an Expert
                <ChevronDown size={14} className="rotate-[-90deg] group-hover:translate-x-0.5 transition-transform duration-300" />
              </a>
            </motion.div>

            {/* Service pills */}
            <div className="flex flex-wrap gap-2">
              {pillars.map(({ label }) => (
                <div
                  key={label}
                  className="svc-pill opacity-0 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white/55 transition-all duration-300 hover:text-white/85 hover:border-white/20"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 55 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <motion.div style={{ y: imgY }} className="relative">
              {/* Halo glow */}
              <div
                className="absolute inset-[-14%] rounded-[3rem] pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 55%, rgba(37,99,235,0.22) 0%, rgba(6,182,212,0.10) 52%, transparent 70%)",
                  filter: "blur(32px)",
                }}
              />

              {/* Image */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(37,99,235,0.20), 0 48px 120px rgba(0,0,0,0.75), 0 0 80px rgba(37,99,235,0.08)",
                }}
              >
                <Image
                  src="/images/services-innovation-center.png"
                  alt="NYC GravityNet — Technology Innovation Center"
                  width={720}
                  height={510}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width:1024px) 100vw, 52vw"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(37,99,235,0.05) 0%, transparent 42%, rgba(2,6,15,0.38) 100%)",
                  }}
                />
              </div>

              {/* Floating "Innovation Center" badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.82, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-5 left-5 z-10"
              >
                <div
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
                  style={{
                    background: "rgba(3,8,22,0.90)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(37,99,235,0.28)",
                    color: "#06b6d4",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
                  Innovation & Delivery Center
                </div>
              </motion.div>

              {/* Floating stat — "6 Core Services" */}
              <motion.div
                initial={{ opacity: 0, scale: 0.82, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-6 right-5 z-10"
                >
                  <div
                    className="px-4 py-3.5 rounded-2xl"
                    style={{
                      background: "rgba(3,8,22,0.90)",
                      backdropFilter: "blur(18px)",
                      border: "1px solid rgba(37,99,235,0.22)",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="text-[1.65rem] font-bold text-white leading-none mb-1">6</div>
                    <div className="text-white/42 text-[10px] font-medium">Core Service Areas</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
