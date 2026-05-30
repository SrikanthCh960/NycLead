"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.28,
      y: (e.clientY - rect.top - rect.height / 2) * 0.28,
    });
  };

  return (
    <section id="contact" ref={ref} className="relative py-40 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-[#03070f] to-[#060d1a] gradient-animated" />

      {/* Radial blue glow — center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[700px] h-[700px] rounded-full float-orb"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(6,182,212,0.06) 50%, transparent 75%)"
          }}
        />
      </motion.div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top edge accent */}
      <div className="absolute top-0 left-0 right-0 h-px section-line" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
          <span className="text-cyan-400 text-xs font-semibold tracking-[0.18em] uppercase">
            Get Started
          </span>
        </motion.div>

        {/* Heading — white text on dark */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-[4.25rem] font-bold text-white leading-[1.08] tracking-[-0.025em]"
          >
            Ready to Accelerate Your{" "}
            <span className="gradient-text">Digital Transformation?</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.38, duration: 0.9 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-[430]"
        >
          Partner with NYC GravityNet to build secure, scalable, and
          future-ready technology solutions.
        </motion.p>

        {/* Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.58, duration: 0.8 }}
        >
          <motion.a
            href="mailto:hello@nycgravitynet.com"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setPos({ x: 0, y: 0 })}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="btn-shine group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-base transition-all duration-300 hover:shadow-[0_0_80px_rgba(37,99,235,0.5)]"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
              color: "#ffffff",
            }}
          >
            Book a Consultation
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.a>
        </motion.div>

        {/* Social proof below CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-white/35 text-sm mt-8 font-medium"
        >
          No commitment required · Response within 24 hours
        </motion.p>
      </div>
    </section>
  );
}
