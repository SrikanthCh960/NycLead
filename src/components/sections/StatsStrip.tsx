"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "15+", label: "Years of Experience", prefix: "" },
  { value: "500+", label: "Projects Delivered", prefix: "" },
  { value: "40+", label: "Industries Served", prefix: "" },
  { value: "98%", label: "Client Satisfaction", prefix: "" },
  { value: "$2.4M", label: "Avg. Cost Savings", prefix: "" },
];

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d1f3c 0%, #0a1628 50%, #061020 100%)" }}
    >
      {/* Top & bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.6), rgba(6,182,212,0.4), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)" }} />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 divide-x divide-white/10">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center justify-center text-center px-6 py-4 group"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl lg:text-4xl font-black text-white leading-none tracking-tight mb-2 group-hover:text-cyan-300 transition-colors duration-300"
                style={{ textShadow: "0 0 30px rgba(37,99,235,0.4)" }}
              >
                {value}
              </motion.span>
              <span className="text-white/45 text-[11px] font-semibold tracking-[0.14em] uppercase leading-tight">
                {label}
              </span>
              {/* Hover underline accent */}
              <div className="w-0 group-hover:w-8 h-px mt-2 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
