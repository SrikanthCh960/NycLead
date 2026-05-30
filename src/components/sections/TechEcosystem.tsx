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
  { name: "Snowflake", abbr: "SNF" },
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
    <div className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50 transition-all duration-300 hover:-translate-y-0.5 cursor-default shrink-0 mx-2 hover:shadow-md">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-slate-100 border border-blue-200/60 flex items-center justify-center shrink-0">
        <span className="text-[9px] font-bold text-blue-700 tracking-wide">{abbr}</span>
      </div>
      <span className="text-slate-600 text-sm font-medium group-hover:text-blue-700 transition-colors whitespace-nowrap">
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
      <div className="absolute top-0 left-0 right-0 h-px section-line" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto px-6 lg:px-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">
              Technology Ecosystem
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-[-0.02em]"
            >
              Technologies We{" "}
              <span className="gradient-text-dark">Work With</span>
            </motion.h2>
          </div>
        </div>

        {/* Marquee rows — fade edges match bg-slate-50 (#f8fafc) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="space-y-4"
        >
          {/* Row 1 */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, #f8fafc, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
              style={{ background: "linear-gradient(-90deg, #f8fafc, transparent)" }} />
            <div className="marquee-track">
              {[...techRow1, ...techRow1].map((t, i) => (
                <TechPill key={i} {...t} />
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, #f8fafc, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
              style={{ background: "linear-gradient(-90deg, #f8fafc, transparent)" }} />
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
