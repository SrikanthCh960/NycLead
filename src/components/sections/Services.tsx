"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Brain,
  Cloud,
  Code2,
  BarChart3,
  Layers,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Cybersecurity Services",
    description:
      "Comprehensive security frameworks, threat detection, zero-trust architecture, compliance, and incident response — protecting your most critical assets.",
    accent: "#06b6d4",
    tags: ["Zero Trust", "SOC", "Compliance", "Pen Testing"],
  },
  {
    icon: Brain,
    title: "AI & Intelligent Automation",
    description:
      "Enterprise-grade AI solutions from strategy to deployment — LLMs, computer vision, predictive analytics, and intelligent process automation at scale.",
    accent: "#2563eb",
    tags: ["LLMs", "MLOps", "RPA", "Computer Vision"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "End-to-end cloud migrations, multi-cloud architecture, Kubernetes orchestration, and CI/CD pipelines that enable velocity without compromise.",
    accent: "#06b6d4",
    tags: ["AWS", "Azure", "GCP", "Kubernetes"],
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "From greenfield platforms to legacy modernization — we engineer software that scales with your ambition and adapts to your evolving requirements.",
    accent: "#2563eb",
    tags: ["Full-Stack", "Microservices", "APIs", "Mobile"],
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    description:
      "Transform raw data into strategic intelligence. Data warehousing, real-time pipelines, business intelligence, and predictive modeling for informed decisions.",
    accent: "#06b6d4",
    tags: ["Data Lake", "BI", "ETL", "Real-time"],
  },
  {
    icon: Layers,
    title: "Digital Transformation Consulting",
    description:
      "Enterprise-wide digital strategy, technology roadmapping, change management, and operating model redesign to future-proof your organization.",
    accent: "#2563eb",
    tags: ["Strategy", "Roadmap", "Change Mgmt", "Innovation"],
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="services" ref={ref} className="relative py-32 overflow-hidden bg-white">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">
              Core Services
            </span>
          </motion.div>

          <div className="text-clip">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
            >
              Technology Solutions{" "}
              <span className="gradient-text">Built For Growth</span>
            </motion.h2>
          </div>
        </div>

        {/* Service grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 rounded-2xl overflow-hidden mb-12">
          {services.map(({ icon: Icon, title, description, accent, tags }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.8 }}
              className="group relative bg-slate-50 hover:bg-slate-100 p-8 transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(400px circle at 50% 0%, ${accent}08 0%, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}30` }}
              >
                <Icon size={22} style={{ color: accent }} />
              </div>

              <h3 className="text-slate-900 font-semibold text-lg mb-3 group-hover:text-cyan-200 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md font-medium"
                    style={{
                      backgroundColor: `${accent}12`,
                      color: accent,
                      border: `1px solid ${accent}25`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-center"
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 px-7 py-4 rounded-xl border border-black/10 hover:border-blue-600/40 text-slate-900 font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
          >
            View All Services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
