"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TrendingDown, CheckCircle2, Clock, DollarSign, Users, Zap, Brain, Rocket,
  TrendingUp, Eye, Target, ShieldCheck, Globe2, Scale, Activity, BarChart2,
} from "lucide-react";
import type { ServiceConfig } from "@/lib/services-data";

const iconMap: Record<string, React.ElementType> = {
  TrendingDown, CheckCircle2, Clock, DollarSign, Users, Zap, Brain, Rocket,
  TrendingUp, Eye, Target, ShieldCheck, Globe2, Scale, Activity, BarChart2,
};

gsap.registerPlugin(ScrollTrigger);

type Props = { benefits: ServiceConfig["benefits"]; accent: string; accentRgb: string };

export default function ServiceBenefits({ benefits, accent, accentRgb }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-12%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ben-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.1, duration: 0.88, ease: "power3.out",
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
      style={{ background: "linear-gradient(180deg,#ffffff 0%,#f8fafc 55%,#ffffff 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,rgba(${accentRgb},0.15),transparent)` }} />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center,rgba(37,99,235,0.030) 0%,transparent 68%)" }} />

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
              Business Benefits
            </span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.12, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.07] tracking-[-0.028em]"
            >
              Outcomes That{" "}
              <span className="gradient-text-dark">Move the Needle</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.28, duration: 0.9 }}
            className="text-slate-500 text-[1.03rem] leading-[1.85]"
          >
            Measurable business outcomes — not just technology deliverables — define
            the success of every engagement.
          </motion.p>
        </div>

        {/* Benefit cards */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map(({ iconName, stat, title, description, color }) => {
            const Icon = iconMap[iconName] ?? TrendingUp;
            return (
              <div
                key={title}
                className="ben-card opacity-0 group relative card-surface rounded-2xl p-8 overflow-hidden transition-all duration-500"
              >
                <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                  style={{ background: `linear-gradient(90deg,transparent,${color},transparent)` }} />

                {/* Stat watermark */}
                <span className="absolute top-4 right-6 text-[2.5rem] font-black leading-none select-none opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500"
                  style={{ color }}>
                  {stat}
                </span>

                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
                  <Icon size={20} style={{ color }} />
                </div>

                {/* Stat */}
                <div className="text-[2.2rem] font-bold leading-none mb-2 transition-colors duration-300"
                  style={{ color }}>
                  {stat}
                </div>

                <h3 className="text-slate-900 font-semibold text-[1.02rem] mb-3 group-hover:text-blue-700 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-[1.78]">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
