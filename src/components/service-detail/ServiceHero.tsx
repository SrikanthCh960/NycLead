"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import type { ServiceConfig } from "@/lib/services-data";

type Props = { config: ServiceConfig["hero"]; slug: string };

export default function ServiceHero({ config, slug }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgY   = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const accent    = config.accent;
  const accentRgb = config.accentRgb;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(155deg,#020810 0%,#050d1d 52%,#030912 100%)" }}
    >
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.042] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(${accentRgb},0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(${accentRgb},0.6) 1px,transparent 1px)`,
          backgroundSize: "68px 68px",
        }} />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: [0.25,0.42,0.25], scale: [1,1.07,1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-1/3 w-[650px] h-[650px] rounded-full"
          style={{ background: `radial-gradient(circle,rgba(${accentRgb},0.12) 0%,transparent 68%)`, filter: "blur(44px)" }}
        />
        <motion.div
          animate={{ opacity: [0.15,0.28,0.15], scale: [1,1.05,1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute right-0 bottom-1/4 w-[480px] h-[480px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(37,99,235,0.08) 0%,transparent 68%)", filter: "blur(36px)" }}
        />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,rgba(${accentRgb},0.7),rgba(37,99,235,0.4),transparent)` }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-12 text-white/35 text-xs font-medium"
        >
          <Link href="/" className="hover:text-white/65 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/services" className="hover:text-white/65 transition-colors">Services</Link>
          <ChevronRight size={12} />
          <span style={{ color: accent }}>{config.badge}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* LEFT — Content */}
          <motion.div style={{ y: textY }}>
            {/* Service badge */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{ background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.28)` }}
            >
              <span className="w-1.5 h-1.5 rounded-full pulse-glow" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: accent }}>
                {config.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] font-bold text-white leading-[1.07] tracking-[-0.028em]"
              >
                {config.title}
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.95 }}
              className="text-white/52 text-[1.05rem] leading-[1.88] mb-12 max-w-[520px]"
            >
              {config.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.85 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="btn-shine group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg,rgba(${accentRgb},1) 0%,#2563eb 100%)`,
                  boxShadow: `0 0 0 0 rgba(${accentRgb},0)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px rgba(${accentRgb},0.42)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 rgba(${accentRgb},0)`;
                }}
              >
                {config.ctaText}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-white/50 hover:text-white/80 font-medium text-sm transition-colors duration-300"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
                All Services
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT — Image or Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 55 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {config.image ? (
              <motion.div style={{ y: imgY }} className="relative">
                {/* Halo */}
                <div className="absolute inset-[-14%] rounded-[3rem] pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 55%,rgba(${accentRgb},0.22) 0%,rgba(37,99,235,0.08) 52%,transparent 70%)`,
                    filter: "blur(32px)",
                  }} />

                <div className="relative rounded-2xl overflow-hidden"
                  style={{ boxShadow: `0 0 0 1px rgba(${accentRgb},0.20),0 48px 120px rgba(0,0,0,0.75),0 0 80px rgba(${accentRgb},0.08)` }}>
                  <Image
                    src={config.image}
                    alt={config.title}
                    width={720}
                    height={510}
                    className="w-full h-auto object-cover"
                    priority
                    sizes="(max-width:1024px) 100vw,52vw"
                  />
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: `linear-gradient(160deg,rgba(${accentRgb},0.04) 0%,transparent 42%,rgba(2,6,15,0.40) 100%)` }} />
                </div>

                {/* Live badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.7, ease: [0.16,1,0.3,1] }}
                  className="absolute top-5 left-5 z-10 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
                  style={{
                    background: "rgba(3,8,22,0.90)",
                    backdropFilter: "blur(14px)",
                    border: `1px solid rgba(${accentRgb},0.28)`,
                    color: accent,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full pulse-glow" style={{ background: accent }} />
                  {config.badge}
                </motion.div>
              </motion.div>
            ) : (
              /* No-image: premium icon illustration */
              <motion.div style={{ y: imgY }} className="relative flex items-center justify-center">
                <div className="absolute inset-[-10%] rounded-[3rem] pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%,rgba(${accentRgb},0.18) 0%,rgba(37,99,235,0.06) 50%,transparent 70%)`,
                    filter: "blur(32px)",
                  }} />
                <div className="relative w-full aspect-square max-w-[440px] rounded-3xl flex flex-col items-center justify-center gap-8 p-12"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: `1px solid rgba(${accentRgb},0.22)`,
                    backdropFilter: "blur(12px)",
                    boxShadow: `0 40px 100px rgba(0,0,0,0.55), 0 0 60px rgba(${accentRgb},0.06)`,
                  }}>
                  {/* Large accent number */}
                  <div className="text-[7rem] font-black leading-none select-none"
                    style={{ color: `rgba(${accentRgb},0.12)` }}>
                    NYC
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold text-xl mb-2">{config.badge}</div>
                    <div className="text-white/40 text-sm leading-relaxed max-w-xs">{config.subtitle.slice(0, 80)}…</div>
                  </div>
                  {/* Decorative dots */}
                  <div className="flex gap-2">
                    {[0,1,2,3,4].map(i => (
                      <motion.div key={i} animate={{ opacity: [0.2,0.8,0.2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i*0.3 }}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: accent }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div style={{ opacity: fadeOut }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <motion.div animate={{ y: [0,6,0] }} transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/18 to-transparent" />
      </motion.div>
    </section>
  );
}
