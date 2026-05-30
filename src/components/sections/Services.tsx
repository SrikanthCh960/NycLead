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
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Shield,
    num: "01",
    title: "Cybersecurity Services",
    description:
      "Comprehensive security frameworks, threat detection, zero-trust architecture, compliance, and incident response — protecting your most critical assets.",
    accent: "#2563eb",
    tags: ["Zero Trust", "SOC", "Compliance", "Pen Testing"],
  },
  {
    icon: Brain,
    num: "02",
    title: "AI & Intelligent Automation",
    description:
      "Enterprise-grade AI solutions from strategy to deployment — LLMs, computer vision, predictive analytics, and intelligent process automation at scale.",
    accent: "#06b6d4",
    tags: ["LLMs", "MLOps", "RPA", "Computer Vision"],
  },
  {
    icon: Cloud,
    num: "03",
    title: "Cloud & DevOps",
    description:
      "End-to-end cloud migrations, multi-cloud architecture, Kubernetes orchestration, and CI/CD pipelines that enable velocity without compromise.",
    accent: "#2563eb",
    tags: ["AWS", "Azure", "GCP", "Kubernetes"],
  },
  {
    icon: Code2,
    num: "04",
    title: "Custom Software Development",
    description:
      "From greenfield platforms to legacy modernization — we engineer software that scales with your ambition and adapts to your evolving requirements.",
    accent: "#06b6d4",
    tags: ["Full-Stack", "Microservices", "APIs", "Mobile"],
  },
  {
    icon: BarChart3,
    num: "05",
    title: "Data & Analytics",
    description:
      "Transform raw data into strategic intelligence. Data warehousing, real-time pipelines, business intelligence, and predictive modeling for informed decisions.",
    accent: "#2563eb",
    tags: ["Data Lake", "BI", "ETL", "Real-time"],
  },
  {
    icon: Layers,
    num: "06",
    title: "Digital Transformation Consulting",
    description:
      "Enterprise-wide digital strategy, technology roadmapping, change management, and operating model redesign to future-proof your organization.",
    accent: "#06b6d4",
    tags: ["Strategy", "Roadmap", "Change Mgmt", "Innovation"],
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="services" ref={ref} className="relative py-32 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px section-line" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">
              Core Services
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-[-0.02em]"
            >
              Technology Solutions{" "}
              <span className="gradient-text-dark">Built For Growth</span>
            </motion.h2>
          </div>
        </div>

        {/* Service grid — premium cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {services.map(({ icon: Icon, num, title, description, accent, tags }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12 + i * 0.09, duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="card-surface group relative rounded-2xl p-8 transition-all duration-500 overflow-hidden cursor-default"
            >
              {/* Hover top accent bar */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
              />

              {/* Large number watermark */}
              <span
                className="absolute top-5 right-6 text-[3.5rem] font-black leading-none select-none transition-colors duration-500 opacity-[0.04] group-hover:opacity-[0.07]"
                style={{ color: accent }}
              >
                {num}
              </span>

              {/* Icon */}
              <div
                className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-400"
                style={{
                  backgroundColor: `${accent}10`,
                  border: `1px solid ${accent}22`,
                }}
              >
                <Icon size={20} style={{ color: accent }} />
              </div>

              {/* Content */}
              <h3 className="text-slate-900 font-semibold text-[1.05rem] leading-snug mb-3 group-hover:text-slate-800 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-[1.75] mb-6">{description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md font-medium"
                    style={{
                      backgroundColor: `${accent}09`,
                      color: accent,
                      border: `1px solid ${accent}20`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow — appears on hover */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <ArrowUpRight size={16} style={{ color: accent }} />
              </div>
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
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            View All Services
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
