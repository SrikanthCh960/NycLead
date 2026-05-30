"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, DollarSign, ShoppingBag, Factory, Briefcase, Cpu } from "lucide-react";

const industries = [
  {
    icon: Heart,
    title: "Healthcare",
    description:
      "HIPAA-compliant solutions, clinical data platforms, telehealth infrastructure, and AI diagnostics.",
    color: "#ef4444",
  },
  {
    icon: DollarSign,
    title: "Financial Services",
    description:
      "Risk management systems, regulatory compliance, fraud detection, and real-time trading platforms.",
    color: "#22c55e",
  },
  {
    icon: ShoppingBag,
    title: "Retail & eCommerce",
    description:
      "Omnichannel platforms, personalization engines, inventory optimization, and loyalty ecosystems.",
    color: "#f59e0b",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description:
      "IIoT connectivity, predictive maintenance, supply chain visibility, and digital twin solutions.",
    color: "#8b5cf6",
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description:
      "Practice management, knowledge management, client portals, and workflow automation platforms.",
    color: "#06b6d4",
  },
  {
    icon: Cpu,
    title: "Technology",
    description:
      "Platform engineering, developer tooling, AI infrastructure, and SaaS product development.",
    color: "#2563eb",
  },
];

export default function Industries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="industries" ref={ref} className="relative py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-line" />

      {/* Decorative center glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">
              Industries
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-[-0.02em]"
            >
              Industry{" "}
              <span className="gradient-text-dark">Expertise</span>
            </motion.h2>
          </div>
        </div>

        {/* Grid — white cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map(({ icon: Icon, title, description, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24, y: 16 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{
                delay: 0.18 + i * 0.09,
                duration: 0.85,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="card-surface group relative rounded-2xl p-8 transition-all duration-500 overflow-hidden cursor-default"
            >
              {/* Top accent bar on hover */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${color}10`, border: `1px solid ${color}22` }}
              >
                <Icon size={22} style={{ color }} />
              </div>

              <h3 className="text-slate-900 font-semibold text-lg mb-3 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-[1.75]">{description}</p>

              {/* Bottom glow line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${color}50, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
