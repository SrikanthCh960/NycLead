"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const clients = [
  "Nexus Financial",
  "HealthBridge Systems",
  "Apex Retail Group",
  "CoreLogic Partners",
  "DataPulse Inc.",
  "SkyRoute Logistics",
  "MedTech Innovations",
  "PrimeEdge Capital",
  "NovaTech Labs",
  "Veritas Consulting",
  "Meridian Healthcare",
  "Cascade Digital",
];

function ClientLogo({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="group flex items-center gap-3 px-7 py-5 glass-light rounded-xl hover:bg-black/10 transition-all duration-300 shrink-0 mx-2 min-w-[180px]">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/40 to-blue-600/20 border border-black/10 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-slate-900">{initials}</span>
      </div>
      <span className="text-slate-600 text-sm font-medium group-hover:text-slate-900 transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function Clients() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">
              Clients
            </span>
          </motion.div>

          <div className="text-clip">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900"
            >
              Trusted By Leading{" "}
              <span className="gradient-text">Organizations</span>
            </motion.h2>
          </div>
        </div>

        {/* Client logo wall */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-4"
        >
          {/* Row 1 */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#03070f] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#03070f] to-transparent z-10 pointer-events-none" />
            <div className="marquee-track">
              {[...clients, ...clients].map((c, i) => (
                <ClientLogo key={i} name={c} />
              ))}
            </div>
          </div>

          {/* Row 2 reversed */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#03070f] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#03070f] to-transparent z-10 pointer-events-none" />
            <div className="marquee-track-reverse">
              {[...clients.slice(6), ...clients.slice(0, 6), ...clients.slice(6), ...clients.slice(0, 6)].map((c, i) => (
                <ClientLogo key={i} name={c} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
