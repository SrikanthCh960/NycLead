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
      style={{ background: "linear-gradient(155deg,#dde4f8 0%,#e8edfb 52%,#eef1fc 100%)" }}
    >
      {/* Full-screen background image */}
      {config.image && (
        <motion.div style={{ y: imgY }} className="absolute inset-0 pointer-events-none">
          <Image
            src={config.image}
            alt={config.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay so text stays readable */}
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(155deg,rgba(2,8,16,0.88) 0%,rgba(5,13,29,0.78) 50%,rgba(3,9,18,0.85) 100%)` }} />
          {/* Accent tint overlay */}
          <div className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 30% 50%,rgba(${accentRgb},0.12) 0%,transparent 60%)` }} />
        </motion.div>
      )}

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
          className="flex items-center gap-2 mb-12 text-slate-400 text-xs font-medium"
        >
          <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/services" className="hover:text-slate-700 transition-colors">Services</Link>
          <ChevronRight size={12} />
          <span style={{ color: accent }}>{config.badge}</span>
        </motion.div>

        <div className="max-w-3xl">

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
            className="text-[1.05rem] leading-[1.88] mb-12 max-w-[580px]" style={{ color: "#f2f2f2" }}
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
              className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors duration-300"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
              All Services
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div style={{ opacity: fadeOut }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <motion.div animate={{ y: [0,6,0] }} transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-slate-400/40 to-transparent" />
      </motion.div>
    </section>
  );
}
