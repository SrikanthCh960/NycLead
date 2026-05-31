"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users2, ShieldCheck, Target, GitMerge, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  { icon: Users2,    title: "Experienced Consultants",       body: "Our teams bring decades of combined expertise across every technology domain. You work with senior practitioners — not junior resources managed from a distance.", accent: "#2563eb" },
  { icon: GitMerge,  title: "Proven Delivery Methodology",   body: "A structured, agile engagement model with clear milestones, transparent reporting, and consistent quality checkpoints at every stage of delivery.", accent: "#06b6d4" },
  { icon: ShieldCheck,title: "Security-First Mindset",       body: "Every architecture, pipeline, and process is designed with security as a first principle — protecting your data, your customers, and your reputation.", accent: "#ef4444" },
  { icon: Target,    title: "Business-Focused Approach",     body: "Technology decisions are always anchored to your business objectives. We measure our success by your KPIs — not by the number of deliverables we ship.", accent: "#f59e0b" },
  { icon: Handshake, title: "Long-Term Partnership",         body: "We stay engaged through implementation, optimization, and evolution. Our goal is to be the technology partner that grows alongside your organization for years.", accent: "#22c55e" },
];

type Props = { accent: string; accentRgb: string };

export default function ServiceWhyUs({ accent, accentRgb }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-12%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".why-detail-card",
        { opacity: 0, x: -28, scale: 0.97 },
        {
          opacity: 1, x: 0, scale: 1,
          stagger: 0.1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%", once: true },
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
          backgroundImage: `linear-gradient(rgba(${accentRgb},0.55) 1px,transparent 1px),linear-gradient(90deg,rgba(${accentRgb},0.55) 1px,transparent 1px)`,
          backgroundSize: "64px 64px",
        }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,rgba(${accentRgb},0.45),rgba(37,99,235,0.3),transparent)` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-9"
            style={{ background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.28)` }}
          >
            <span className="w-1.5 h-1.5 rounded-full pulse-glow" style={{ background: accent }} />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: accent }}>
              Why NYC GravityNet
            </span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.12, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl font-bold text-white leading-[1.07] tracking-[-0.028em]"
            >
              The Partner Built for{" "}
              <span className="gradient-text">Your Success</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.28, duration: 0.9 }}
            className="text-white/45 text-[1.03rem] leading-[1.85]"
          >
            What makes NYC GravityNet the trusted technology partner for 200+
            enterprises across 40+ countries.
          </motion.p>
        </div>

        {/* Cards: 3+2 layout */}
        <div ref={cardsRef}>
          <div className="grid md:grid-cols-3 gap-5 mb-5">
            {REASONS.slice(0, 3).map(({ icon: Icon, title, body, accent: a }) => (
              <div key={title}
                className="why-detail-card opacity-0 group relative rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.025)", border: `1px solid rgba(255,255,255,0.07)`, backdropFilter: "blur(10px)" }}>
                <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                  style={{ background: `linear-gradient(90deg,transparent,${a},transparent)` }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${a}14`, border: `1px solid ${a}28` }}>
                  <Icon size={20} style={{ color: a }} />
                </div>
                <h3 className="text-white font-semibold text-[1.02rem] mb-3">{title}</h3>
                <p className="text-white/44 text-sm leading-[1.80]">{body}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {REASONS.slice(3).map(({ icon: Icon, title, body, accent: a }) => (
              <div key={title}
                className="why-detail-card opacity-0 group relative rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.025)", border: `1px solid rgba(255,255,255,0.07)`, backdropFilter: "blur(10px)" }}>
                <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                  style={{ background: `linear-gradient(90deg,transparent,${a},transparent)` }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${a}14`, border: `1px solid ${a}28` }}>
                  <Icon size={20} style={{ color: a }} />
                </div>
                <h3 className="text-white font-semibold text-[1.02rem] mb-3">{title}</h3>
                <p className="text-white/44 text-sm leading-[1.80]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
