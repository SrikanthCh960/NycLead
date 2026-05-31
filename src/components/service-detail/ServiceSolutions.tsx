"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield, Brain, Cloud, Code2, BarChart3, Layers, ScanSearch, Bug, Eye,
  ShieldCheck, Siren, Sparkles, Bot, MessageSquare, TrendingUp, Lightbulb,
  Server, GitMerge, Workflow, Building2, Globe, Smartphone, Plug, RefreshCw,
  LayoutDashboard, Database, BarChart2, Map, SlidersHorizontal, Users2, Network,
  Target, Zap, Scale, Activity, ArrowUpRight,
} from "lucide-react";
import type { ServiceConfig } from "@/lib/services-data";

const iconMap: Record<string, React.ElementType> = {
  Shield, Brain, Cloud, Code2, BarChart3, Layers, ScanSearch, Bug, Eye,
  ShieldCheck, Siren, Sparkles, Bot, MessageSquare, TrendingUp, Lightbulb,
  Server, GitMerge, Workflow, Building2, Globe, Smartphone, Plug, RefreshCw,
  LayoutDashboard, Database, BarChart2, Map, SlidersHorizontal, Users2, Network,
  Target, Zap, Scale, Activity,
};

gsap.registerPlugin(ScrollTrigger);

type Props = { solutions: ServiceConfig["solutions"]; accent: string; accentRgb: string };

export default function ServiceSolutions({ solutions, accent, accentRgb }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sol-card",
        { opacity: 0, y: 48, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.11, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#030912 0%,#060d1e 55%,#040b18 100%)" }}
    >
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(${accentRgb},0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(${accentRgb},0.6) 1px,transparent 1px)`,
          backgroundSize: "64px 64px",
        }} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 w-[600px] h-[600px] rounded-full"
          style={{ background: `radial-gradient(circle,rgba(${accentRgb},0.07) 0%,transparent 68%)`, filter: "blur(44px)" }} />
        <div className="absolute right-1/4 bottom-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(37,99,235,0.06) 0%,transparent 68%)", filter: "blur(36px)" }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,rgba(${accentRgb},0.5),rgba(37,99,235,0.3),transparent)` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-9"
            style={{ background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.28)` }}
          >
            <span className="w-1.5 h-1.5 rounded-full pulse-glow" style={{ background: accent }} />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: accent }}>
              Our Solutions
            </span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.12, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl font-bold text-white leading-[1.07] tracking-[-0.028em]"
            >
              What We <span className="gradient-text">Deliver</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.28, duration: 0.9 }}
            className="text-white/45 text-[1.03rem] leading-[1.85]"
          >
            A comprehensive portfolio of solutions designed to address your most
            pressing technology challenges with precision and expertise.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map(({ iconName, title, description, tags }, i) => {
            const Icon = iconMap[iconName] ?? Shield;
            return (
              <div
                key={title}
                className="sol-card opacity-0 group relative rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid rgba(${accentRgb},0.18)`,
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                  style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }} />

                {/* Corner glow */}
                <div className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle,rgba(${accentRgb},0.12) 0%,transparent 70%)`, filter: "blur(16px)" }} />

                {/* Number */}
                <span className="absolute top-5 right-6 text-[3rem] font-black leading-none select-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.25)` }}>
                  <Icon size={22} style={{ color: accent }} />
                </div>

                <h3 className="text-white font-semibold text-[1.04rem] leading-snug mb-3">{title}</h3>
                <p className="text-white/44 text-sm leading-[1.82] flex-1 mb-6">{description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-md"
                      style={{ background: `rgba(${accentRgb},0.10)`, color: accent, border: `1px solid rgba(${accentRgb},0.20)` }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom glow */}
                <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg,transparent,${accent}55,transparent)` }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
