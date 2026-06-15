"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain, ShieldCheck, Target, GitMerge, Handshake,
  Users2, Award, Clock4, BarChart2, Globe2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Brain,
    title: "Technology Expertise",
    body: "Our multi-disciplinary teams span AI, security, cloud, and engineering — delivering breadth and depth no single-practice firm can match.",
    accent: "#06b6d4",
  },
  {
    icon: ShieldCheck,
    title: "Security-First Approach",
    body: "We architect security in from day one. Every solution is designed with threat modelling, compliance, and risk management baked into its foundation.",
    accent: "#ef4444",
  },
  {
    icon: Target,
    title: "Business-Focused Solutions",
    body: "Technology decisions are always anchored to your business objectives — we measure success by outcomes, not deliverables.",
    accent: "#2563eb",
  },
  {
    icon: GitMerge,
    title: "Proven Delivery Methodology",
    body: "Our structured, agile engagement model ensures predictable delivery, transparent communication, and consistent quality across every project.",
    accent: "#a78bfa",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnerships",
    body: "We don't disappear after go-live. Our teams stay engaged, optimising your solutions and adapting as your business and technology landscape evolve.",
    accent: "#22c55e",
  },
];

const stats = [
  { icon: Users2,   value: "200+",  label: "Enterprise Clients",      color: "#06b6d4" },
  { icon: Award,    value: "15+",   label: "Years of Excellence",     color: "#2563eb" },
  { icon: Clock4,   value: "98%",   label: "On-Time Delivery",        color: "#22c55e" },
  { icon: BarChart2,value: "340%",  label: "Avg. Client ROI",         color: "#f59e0b" },
  { icon: Globe2,   value: "40+",   label: "Countries Served",        color: "#a78bfa" },
];

function WhyServiceCard({ icon: Icon, title, body, accent, index }: any) {
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
      className={`why-svc-card opacity-0 group relative rounded-2xl p-8 overflow-hidden cursor-default will-change-transform ${index === 4 ? "lg:col-start-2" : ""}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        background: "#ffffff",
        border: `1px solid ${hovered ? `${accent}80` : "rgba(226,232,240,1)"}`,
        backdropFilter: "blur(10px)",
        boxShadow: hovered ? `0 12px 30px rgba(0,0,0,0.08), 0 0 20px ${accent}22` : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      <div
        className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
        style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }}
      />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
        style={{ background: `${accent}10`, border: `1px solid ${accent}22` }}
      >
        <Icon size={20} style={{ color: accent }} />
      </div>
      <h3
        className="text-slate-900 font-semibold text-[1.02rem] mb-3 transition-colors duration-300"
      >
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-[1.82]">{body}</p>
    </motion.div>
  );
}

export default function ServicesWhyUs() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const inView      = useInView(sectionRef, { once: true, margin: "-12%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-svc-card",
        { opacity: 0, x: -28, scale: 0.97 },
        {
          opacity: 1, x: 0, scale: 1,
          stagger: 0.1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        ".stat-svc-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.09, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 82%", once: true },
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
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.7) 1px,transparent 1px), linear-gradient(90deg,rgba(37,99,235,0.7) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(37,99,235,0.08) 0%,transparent 68%)", filter: "blur(40px)" }} />
        <div className="absolute right-1/4 bottom-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(6,182,212,0.06) 0%,transparent 68%)", filter: "blur(36px)" }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.5),rgba(6,182,212,0.35),transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-9"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">Why NYC GravityNet</span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.12, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-slate-900 leading-[1.07] tracking-[-0.028em]"
            >
              Built for{" "}
              <span className="gradient-text-dark">Enterprise Success</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="text-slate-500 text-[1.04rem] leading-[1.85]"
          >
            We've built our reputation on a simple belief: technology should create
            lasting value. Here's what makes the difference.
          </motion.p>
        </div>

        {/* Highlights grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {highlights.map((highlight, i) => (
            <WhyServiceCard key={highlight.title} {...highlight} index={i} />
          ))}
        </div>

        {/* Stats strip */}
        <div
          ref={statsRef}
          className="mt-16 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg,#1636da 0%,#1636da 100%)",
            border: "1px solid rgba(37,99,235,0.16)",
          }}
        >
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
            {stats.map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className="stat-svc-card opacity-0 group flex flex-col items-center justify-center text-center py-10 px-6 transition-all duration-300 hover:bg-white/[0.025]"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${color}14`, border: `1px solid ${color}28` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div
                  className="text-[2rem] font-bold leading-none mb-2 transition-colors duration-300"
                  style={{ color }}
                >
                  {value}
                </div>
                <div className="text-white/60 text-xs font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
