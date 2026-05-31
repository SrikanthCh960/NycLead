"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield, Brain, Cloud, Code2, BarChart3, Layers, ArrowUpRight,
  AlertTriangle, Activity, Lock, Wifi,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Shield, num: "01", title: "Cybersecurity Services", description: "Comprehensive security frameworks, threat detection, zero-trust architecture, compliance, and incident response — protecting your most critical assets.", accent: "#2563eb", tags: ["Zero Trust", "SOC", "Compliance", "Pen Testing"] },
  { icon: Brain, num: "02", title: "AI & Intelligent Automation", description: "Enterprise-grade AI solutions from strategy to deployment — LLMs, computer vision, predictive analytics, and intelligent process automation at scale.", accent: "#06b6d4", tags: ["LLMs", "MLOps", "RPA", "Computer Vision"] },
  { icon: Cloud, num: "03", title: "Cloud & DevOps", description: "End-to-end cloud migrations, multi-cloud architecture, Kubernetes orchestration, and CI/CD pipelines that enable velocity without compromise.", accent: "#2563eb", tags: ["AWS", "Azure", "GCP", "Kubernetes"] },
  { icon: Code2, num: "04", title: "Custom Software Development", description: "From greenfield platforms to legacy modernization — we engineer software that scales with your ambition and adapts to your evolving requirements.", accent: "#06b6d4", tags: ["Full-Stack", "Microservices", "APIs", "Mobile"] },
  { icon: BarChart3, num: "05", title: "Data & Analytics", description: "Transform raw data into strategic intelligence. Data warehousing, real-time pipelines, business intelligence, and predictive modeling for informed decisions.", accent: "#2563eb", tags: ["Data Lake", "BI", "ETL", "Real-time"] },
  { icon: Layers, num: "06", title: "Digital Transformation Consulting", description: "Enterprise-wide digital strategy, technology roadmapping, change management, and operating model redesign to future-proof your organization.", accent: "#06b6d4", tags: ["Strategy", "Roadmap", "Change Mgmt", "Innovation"] },
];

const cyberMetrics = [
  { icon: AlertTriangle, label: "Threats Detected (24h)", value: "1,247", delta: "+23%", color: "#ef4444" },
  { icon: Lock, label: "System Integrity", value: "98.9%", delta: "Secure", color: "#22c55e" },
  { icon: Activity, label: "Active Incidents", value: "7", delta: "+2", color: "#f59e0b" },
  { icon: Wifi, label: "Network Traffic", value: "2.4 Tbps", delta: "+18%", color: "#06b6d4" },
];

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cyberRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-10%" });
  const cyberInView = useInView(cyberRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({ target: cyberRef, offset: ["start end", "end start"] });
  const imgParallax = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".service-card", { opacity: 0, y: 40, scale: 0.97 }, {
        opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 78%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Service Grid ── */}
      <section id="services" ref={gridRef} className="relative py-36 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 right-0 h-px section-line" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/40 to-white pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">Core Services</span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  animate={gridInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.06] tracking-[-0.025em]"
                >
                  Technology Solutions{" "}
                  <span className="gradient-text-dark">Built For Growth</span>
                </motion.h2>
              </div>
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={gridInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="group shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md self-start lg:self-end"
            >
              View All Services
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.a>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, num, title, description, accent, tags }) => (
              <div
                key={title}
                className="service-card card-surface group relative rounded-2xl p-8 transition-all duration-500 overflow-hidden cursor-default opacity-0"
              >
                <div
                  className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />
                <span
                  className="absolute top-5 right-6 text-[3.5rem] font-black leading-none select-none opacity-[0.035] group-hover:opacity-[0.065] transition-opacity duration-500"
                  style={{ color: accent }}
                >
                  {num}
                </span>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${accent}10`, border: `1px solid ${accent}22` }}
                >
                  <Icon size={20} style={{ color: accent }} />
                </div>
                <h3 className="text-slate-900 font-semibold text-[1.02rem] leading-snug mb-3 group-hover:text-slate-800 transition-colors duration-300">{title}</h3>
                <p className="text-slate-500 text-sm leading-[1.78] mb-6">{description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-md font-medium"
                      style={{ backgroundColor: `${accent}09`, color: accent, border: `1px solid ${accent}20` }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <ArrowUpRight size={16} style={{ color: accent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cybersecurity Command Center — Image 2 ── */}
      <section
        ref={cyberRef}
        id="cybersecurity"
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #020810 0%, #080f1e 50%, #020810 100%)" }}
      >
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(37,99,235,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.8) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Red-blue ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 65%)", filter: "blur(40px)" }} />
          <div className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)", filter: "blur(32px)" }} />
        </div>

        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.4), rgba(37,99,235,0.4), transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Left — Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={cyberInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-9"
                style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.28)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 pulse-glow" />
                <span className="text-red-400 text-xs font-semibold tracking-[0.18em] uppercase">Cybersecurity Command Center</span>
              </motion.div>

              <div className="overflow-hidden mb-7">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  animate={cyberInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-4xl md:text-5xl font-bold text-white leading-[1.08] tracking-[-0.025em]"
                >
                  24/7 Protection.{" "}
                  <span style={{ background: "linear-gradient(135deg,#ef4444 0%,#f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Real-Time Defense.
                  </span>
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={cyberInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.95 }}
                className="text-white/52 text-[1.05rem] leading-[1.85] mb-12"
              >
                Our Security Operations Center provides continuous monitoring,
                global threat intelligence, and rapid incident response across
                your entire attack surface — detecting and neutralizing threats
                before they impact your business.
              </motion.p>

              {/* Live metrics grid */}
              <div className="grid grid-cols-2 gap-3">
                {cyberMetrics.map(({ icon: Icon, label, value, delta, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={cyberInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: 0.38 + i * 0.1, duration: 0.7 }}
                    className="relative rounded-xl p-4 overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid ${color}20`,
                    }}
                  >
                    {/* Subtle corner glow */}
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${color}15 0%, transparent 70%)` }} />
                    <Icon size={14} style={{ color }} className="mb-2.5" />
                    <div className="text-xl font-bold text-white leading-none mb-1">{value}</div>
                    <div className="text-white/38 text-[10px] font-medium leading-tight mb-1.5">{label}</div>
                    <div className="text-[10px] font-bold" style={{ color }}>{delta}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Image 2: Cybersecurity Command Center */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={cyberInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <motion.div style={{ y: imgParallax }} className="relative">
                {/* Multi-layer glow behind image */}
                <div
                  className="absolute inset-[-12%] rounded-[2.5rem] pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 45% 50%, rgba(239,68,68,0.18) 0%, rgba(37,99,235,0.14) 45%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />

                {/* Image */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 0 0 1px rgba(239,68,68,0.18), 0 0 0 3px rgba(239,68,68,0.05), 0 40px 100px rgba(0,0,0,0.75), 0 0 60px rgba(239,68,68,0.08)",
                  }}
                >
                  <Image
                    src="/images/cybersecurity-command-center.png"
                    alt="Cybersecurity Command Center — 24/7 Monitoring"
                    width={660}
                    height={440}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(160deg, rgba(239,68,68,0.04) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)",
                    }}
                  />

                  {/* LIVE badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <motion.div
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white"
                      style={{ background: "rgba(239,68,68,0.88)", backdropFilter: "blur(8px)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      LIVE MONITORING
                    </motion.div>
                  </div>

                  {/* Bottom scan line animation */}
                  <motion.div
                    className="absolute left-0 right-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.6), transparent)" }}
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
