"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 28, mass: 0.6 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(nx);
    rawY.set(ny);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-200 bg-white shrink-0 mx-2 cursor-default will-change-transform overflow-hidden"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        borderColor: hovered ? "rgba(147, 197, 253, 1)" : "rgb(226, 232, 240)",
        backgroundColor: hovered ? "rgba(239, 246, 255, 1)" : "white",
        boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
        transition: "border-color 0.3s, background-color 0.3s, box-shadow 0.3s",
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-slate-100 border border-blue-200/60 flex items-center justify-center shrink-0">
        <span className="text-[9px] font-bold text-blue-700 tracking-wide">{abbr}</span>
      </div>
      <span className="text-slate-600 text-sm font-medium group-hover:text-blue-700 transition-colors whitespace-nowrap">
        {name}
      </span>
    </motion.div>
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
