"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPos({ x: 0, y: 0 });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-40 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-[#03070f] to-cyan-950/20 gradient-animated" />

      {/* Radial glow */}
      <motion.div
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-3xl" />
      </motion.div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 pulse-glow" />
          <span className="text-blue-600 text-xs font-semibold tracking-widest uppercase">
            Get Started
          </span>
        </motion.div>

        <div className="text-clip mb-6">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 leading-tight"
          >
            Ready to Accelerate Your{" "}
            <span className="gradient-text">Digital Transformation?</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Partner with NYC GravityNet to build secure, scalable, and
          future-ready technology solutions.
        </motion.p>

        {/* Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.a
            href="mailto:hello@nycgravitynet.com"
            onMouseEnter={() => setHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-slate-900 font-bold text-lg transition-all duration-300 hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] hover:-translate-y-1"
          >
            Book a Consultation
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
