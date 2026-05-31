"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { ServiceConfig } from "@/lib/services-data";

type Props = { overview: ServiceConfig["overview"]; accent: string; accentRgb: string };

export default function ServiceOverview({ overview, accent, accentRgb }: Props) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#ffffff 0%,#f8fafc 60%,#ffffff 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,rgba(${accentRgb},0.16),transparent)` }} />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center,rgba(37,99,235,0.032) 0%,transparent 68%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-9"
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: accent }}>
            Service Overview
          </span>
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.12, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl lg:text-[3rem] font-bold text-slate-900 leading-[1.07] tracking-[-0.025em] max-w-3xl"
          >
            {overview.heading}
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* LEFT — intro + value */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.9 }}
              className="text-slate-600 text-[1.06rem] leading-[1.88] mb-8"
            >
              {overview.intro}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="w-12 h-[2px] rounded-full origin-left mb-8"
              style={{ background: `linear-gradient(90deg,${accent},#2563eb)` }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.42, duration: 0.9 }}
              className="text-slate-500 text-base leading-[1.88]"
            >
              {overview.value}
            </motion.p>
          </div>

          {/* RIGHT — challenge cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {overview.challenges.map(({ title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.8 }}
                className="group relative card-surface rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-full"
                  style={{ background: `linear-gradient(90deg,${accent},#2563eb)` }} />

                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `rgba(${accentRgb},0.09)`, border: `1px solid rgba(${accentRgb},0.20)` }}>
                  <AlertTriangle size={15} style={{ color: accent }} />
                </div>

                <h4 className="text-slate-900 font-semibold text-sm mb-2 group-hover:text-blue-700 transition-colors duration-300">
                  {title}
                </h4>
                <p className="text-slate-500 text-xs leading-[1.78]">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
