"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const techRow1 = [
  { name: "Microsoft", abbr: "MS" },
  { name: "Amazon Web Services", abbr: "AWS" },
  { name: "Microsoft Azure", abbr: "AZ" },
  { name: "Google Cloud", abbr: "GCP" },
  { name: "Salesforce", abbr: "SF" },
  { name: "Oracle", abbr: "ORA" },
  { name: "SAP", abbr: "SAP" },
  { name: "OpenAI", abbr: "AI" },
  { name: "Kubernetes", abbr: "K8s" },
  { name: "Terraform", abbr: "TF" },
];

const techRow2 = [
  { name: "Docker", abbr: "DKR" },
  { name: "GitHub", abbr: "GH" },
  { name: "Snowflake", abbr: "SF" },
  { name: "Databricks", abbr: "DB" },
  { name: "HashiCorp", abbr: "HC" },
  { name: "Red Hat", abbr: "RH" },
  { name: "Datadog", abbr: "DD" },
  { name: "Elastic", abbr: "EL" },
  { name: "Confluent", abbr: "CFK" },
  { name: "MongoDB", abbr: "MDB" },
];

function TechPill({ name, abbr }: { name: string; abbr: string }) {
  return (
    <div className="group flex items-center gap-3 px-6 py-3.5 glass-light rounded-xl hover:bg-black/10 transition-all duration-300 hover:-translate-y-0.5 cursor-default shrink-0 mx-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/30 to-blue-600/20 border border-black/10 flex items-center justify-center">
        <span className="text-[10px] font-bold text-blue-500 tracking-wide">{abbr}</span>
      </div>
      <span className="text-slate-600 text-sm font-medium group-hover:text-slate-900 transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function TechEcosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-32 bg-slate-50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-blue-600 text-xs font-semibold tracking-widest uppercase">
              Technology Ecosystem
            </span>
          </motion.div>

          <div className="text-clip">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900"
            >
              Technologies We{" "}
              <span className="gradient-text">Work With</span>
            </motion.h2>
          </div>
        </div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-4"
        >
          {/* Row 1 — left direction */}
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060d1a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060d1a] to-transparent z-10 pointer-events-none" />
            <div className="marquee-track">
              {[...techRow1, ...techRow1].map((t, i) => (
                <TechPill key={i} {...t} />
              ))}
            </div>
          </div>

          {/* Row 2 — right direction */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060d1a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060d1a] to-transparent z-10 pointer-events-none" />
            <div className="marquee-track-reverse">
              {[...techRow2, ...techRow2].map((t, i) => (
                <TechPill key={i} {...t} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
