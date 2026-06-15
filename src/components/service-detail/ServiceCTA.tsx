"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Mail } from "lucide-react";

type Props = { ctaText: string; accent: string; accentRgb: string };

export default function ServiceCTA({ ctaText, accent, accentRgb }: Props) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#1636da 0%,#1636da 55%,#1636da 100%)" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.036] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.8) 1px,transparent 1px)",
          backgroundSize: "68px 68px",
        }} />

      {/* Center orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1,1.1,1], opacity: [0.28,0.48,0.28] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[900px] h-[900px] rounded-full"
          style={{
            background: `radial-gradient(circle,rgba(${accentRgb},0.10) 0%,rgba(37,99,235,0.05) 45%,transparent 68%)`,
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,rgba(${accentRgb},0.65),rgba(37,99,235,0.45),transparent)` }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-40 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
          style={{ background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.28)`, backdropFilter: "blur(8px)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full pulse-glow" style={{ background: accent }} />
          <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: accent }}>
            Get Started
          </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.12, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-[3.8rem] xl:text-[4.2rem] font-bold leading-[1.06] tracking-[-0.03em] gradient-text"
          >
            {ctaText}
          </motion.h2>
        </div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.95 }}
          className="text-white/48 text-[1.07rem] leading-[1.88] max-w-2xl mx-auto mb-16"
        >
          Partner with NYC GravityNet to build secure, scalable, and future-ready
          solutions that deliver measurable results — from strategy through
          execution and continuous improvement.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <motion.a
            href="/contact"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setMagnet({ x: (e.clientX - r.left - r.width/2)*0.28, y: (e.clientY - r.top - r.height/2)*0.28 });
            }}
            onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
            animate={{ x: magnet.x, y: magnet.y }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="btn-shine group inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-bold text-[1rem] text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg,rgba(${accentRgb},1) 0%,#2563eb 100%)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 70px rgba(${accentRgb},0.52)`;
            }}
          >
            <Calendar size={16} />
            Schedule a Consultation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>

          <a
            href="mailto:hello@nycgravitynet.com"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl border border-white/12 hover:border-white/24 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            <Mail size={15} />
            Contact Our Team
            <ArrowRight size={14} className="text-white/30 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all duration-300" />
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
        >
          {["No commitment required","Response within 24 hours","Trusted by 200+ enterprises","Fortune 500 experience"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full" style={{ background: accent, opacity: 0.6 }} />
              <span className="text-white/28 text-xs font-medium">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
