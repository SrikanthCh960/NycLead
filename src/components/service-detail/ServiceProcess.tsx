"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Map, Cog, BarChart2, RefreshCw } from "lucide-react";

const STEPS = [
  { icon: Search,     num: "01", title: "Discover",               description: "Deep-dive workshops with your stakeholders to understand goals, constraints, current-state capabilities, and the gaps we need to close." },
  { icon: Map,        num: "02", title: "Strategy",               description: "Develop a clear roadmap — prioritized initiatives, investment cases, technology selection, and a sequenced delivery plan aligned to your business outcomes." },
  { icon: Cog,        num: "03", title: "Implementation",         description: "Agile delivery in 2-week sprints with continuous integration, regular demos, and transparent communication at every step of development." },
  { icon: BarChart2,  num: "04", title: "Optimization",           description: "Post-launch monitoring, performance tuning, and iterative improvements to ensure your solution meets and exceeds target KPIs." },
  { icon: RefreshCw,  num: "05", title: "Continuous Improvement", description: "Ongoing partnership — adapting, enhancing, and scaling your solution as your business evolves and new opportunities emerge." },
];

type Props = { accent: string; accentRgb: string };

export default function ServiceProcess({ accent, accentRgb }: Props) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#ffffff 0%,#f8fafc 55%,#ffffff 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,rgba(${accentRgb},0.15),transparent)` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-9"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: accent }}>
              Delivery Process
            </span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.12, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.07] tracking-[-0.028em]"
            >
              How We{" "}
              <span className="gradient-text-dark">Work With You</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.28, duration: 0.9 }}
            className="text-slate-500 text-[1.03rem] leading-[1.85]"
          >
            A proven engagement model that ensures clarity, consistency, and
            measurable value at every phase of the journey.
          </motion.p>
        </div>

        {/* Timeline — horizontal on large, vertical on mobile */}
        <div className="relative">

          {/* Horizontal connector line (lg) */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[calc(10%+2rem)] right-[calc(10%+2rem)] h-px"
            style={{ background: `linear-gradient(90deg,transparent,rgba(${accentRgb},0.22),${accent}55,rgba(${accentRgb},0.22),transparent)` }} />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
            {STEPS.map(({ icon: Icon, num, title, description }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.13, duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Circle node */}
                <div className="relative mb-8 z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg,rgba(${accentRgb},0.18) 0%,rgba(37,99,235,0.12) 100%)`,
                      border: `1.5px solid rgba(${accentRgb},0.35)`,
                      boxShadow: `0 0 0 6px rgba(${accentRgb},0.05)`,
                    }}
                  >
                    <Icon size={24} style={{ color: accent }} />
                  </motion.div>

                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: accent }}>
                    {i + 1}
                  </div>
                </div>

                <h3 className="text-slate-900 font-bold text-[0.97rem] mb-3">{title}</h3>
                <p className="text-slate-500 text-xs leading-[1.78]">{description}</p>

                {/* Mobile vertical connector */}
                {i < STEPS.length - 1 && (
                  <div className="md:hidden mt-6 w-px h-8 mx-auto"
                    style={{ background: `linear-gradient(180deg,rgba(${accentRgb},0.35),transparent)` }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
