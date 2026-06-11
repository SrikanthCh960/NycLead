"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Lock, Zap, BookOpen, TrendingUp, HeadphonesIcon, Code2, GitBranch, Layers, ArrowUpRight, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { icon: Users, title: "Client-Centric Approach", body: "Your goals become our mission. We embed deeply into your organization to understand priorities, culture, and constraints before we write a single line of code." },
  { icon: Lock, title: "Security-First Mindset", body: "Every engagement starts with threat modeling. Security is architected in from day one, never retrofitted — protecting your data, reputation, and customers." },
  { icon: Zap, title: "Agile Delivery", body: "Rapid iteration, transparent communication, and continuous delivery mean you see progress weekly — not quarterly. Speed without sacrificing quality." },
  { icon: BookOpen, title: "Industry Expertise", body: "Deep domain knowledge across healthcare, finance, retail, and manufacturing means we speak your language and understand your regulatory landscape." },
  { icon: TrendingUp, title: "Scalable Solutions", body: "We architect for where you're going, not just where you are. Our solutions grow gracefully from startup scale to enterprise grade without costly rewrites." },
  { icon: HeadphonesIcon, title: "Dedicated Support", body: "Named account teams, 24/7 monitoring, and proactive optimization mean you're never left managing technology complexity on your own." },
];

const cardColors = ["#2563eb", "#06b6d4", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444"];

function WhyCard({
  icon: Icon,
  title,
  body,
  index,
  inView,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const color = cardColors[index % cardColors.length];

  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 28, mass: 0.6 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-7, 7]), springConfig);
  const glowX = useSpring(useTransform(rawX, [-0.5, 0.5], [20, 80]), springConfig);
  const glowY = useSpring(useTransform(rawY, [-0.5, 0.5], [20, 80]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(nx);
    rawY.set(ny);
    setGlowPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }, [rawX, rawY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "linear-gradient(145deg, #0d1526 0%, #080f1e 100%)",
          border: `1px solid ${hovered ? `${color}40` : "rgba(37,99,235,0.18)"}`,
          boxShadow: hovered
            ? `0 8px 40px rgba(0,0,0,0.50), 0 0 30px ${color}18, inset 0 1px 0 rgba(255,255,255,0.05)`
            : "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="group relative rounded-2xl p-7 overflow-hidden cursor-default h-full will-change-transform"
      >
        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          initial={{ opacity: 0, x: "-100%" }}
          animate={hovered ? { opacity: 1, x: "200%" } : { opacity: 0, x: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ background: `linear-gradient(105deg, transparent 40%, ${color}18 50%, transparent 60%)` }}
        />

        {/* Mouse-follow glow */}
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${color}18 0%, transparent 65%)`,
            }}
          />
        )}

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <motion.div
          className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full origin-center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        {/* Icon with pulse ring */}
        <div className="relative mb-5 w-fit">
          {hovered && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", repeat: Infinity }}
              style={{ backgroundColor: color }}
            />
          )}
          <motion.div
            className="w-11 h-11 rounded-xl flex items-center justify-center relative z-10"
            animate={hovered ? { scale: 1.12, rotate: [0, -6, 6, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: `linear-gradient(135deg, ${color}30 0%, ${color}18 100%)`,
              border: `1px solid ${color}50`,
            }}
          >
            <Icon size={18} style={{ color }} strokeWidth={1.8} />
          </motion.div>
        </div>

        {/* Number */}
        <motion.span
          className="absolute top-5 right-6 text-[2.5rem] font-black leading-none select-none"
          animate={{ color: hovered ? `${color}25` : "rgba(37,99,235,0.12)" }}
          transition={{ duration: 0.3 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        <motion.h3
          className="font-semibold text-[0.97rem] mb-2.5 transition-colors duration-300"
          animate={{ color: hovered ? color : "#fff", x: hovered ? 3 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {title}
        </motion.h3>
        <p className="text-white/45 text-sm leading-[1.78]">{body}</p>

        {/* Bottom glow line */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-px"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
        />

        {/* Corner dots */}
        <motion.div
          className="absolute top-3 right-3 w-1 h-1 rounded-full"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ backgroundColor: color }}
        />
        <motion.div
          className="absolute bottom-3 left-3 w-1 h-1 rounded-full"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          style={{ backgroundColor: color }}
        />
      </motion.div>
    </motion.div>
  );
}

const aiHighlights = [
  { label: "Models Deployed", value: "24", sub: "+12% this quarter" },
  { label: "Predictions / 24h", value: "1.23M", sub: "+8.3% vs last week" },
  { label: "Overall Accuracy", value: "98.7%", sub: "+2.4% improvement" },
  { label: "Active Pipelines", value: "18", sub: "+5 newly launched" },
];

const engineeringPoints = [
  "Full-Stack Product Engineering & Architecture",
  "Legacy Modernization & Platform Migration",
  "Microservices, APIs & Event-Driven Systems",
  "Agile Delivery — Sprints, CI/CD & DevOps Culture",
];

const engineeringStats = [
  { value: "200+", label: "Engineers Delivered", color: "#06b6d4" },
  { value: "98%", label: "On-Time Delivery", color: "#22c55e" },
  { value: "4.9★", label: "Client Satisfaction", color: "#a78bfa" },
];

const strategyPoints = [
  "C-Suite Technology Advisory & Digital Roadmapping",
  "Build-vs-Buy Analysis & Vendor Selection",
  "Operating Model Redesign & Change Management",
  "Innovation Labs, Proof-of-Concepts & Growth Engineering",
];

export default function WhyUs() {
  const aiRef = useRef<HTMLDivElement>(null);
  const engRef = useRef<HTMLDivElement>(null);
  const stratRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const aiInView = useInView(aiRef, { once: true, margin: "-10%" });
  const engInView = useInView(engRef, { once: true, margin: "-10%" });
  const stratInView = useInView(stratRef, { once: true, margin: "-10%" });
  const whyInView = useInView(whyRef, { once: true, margin: "-10%" });

  const { scrollYProgress: aiScroll } = useScroll({ target: aiRef, offset: ["start end", "end start"] });
  const { scrollYProgress: engScroll } = useScroll({ target: engRef, offset: ["start end", "end start"] });
  const { scrollYProgress: stratScroll } = useScroll({ target: stratRef, offset: ["start end", "end start"] });
  const imgParallax = useTransform(aiScroll, [0, 1], ["-7%", "7%"]);
  const engParallax = useTransform(engScroll, [0, 1], ["-6%", "6%"]);
  const stratParallax = useTransform(stratScroll, [0, 1], ["-6%", "6%"]);


  return (
    <section id="why" className="relative overflow-hidden">

      {/* ── AI Operations — Image 1 featured again ── */}
      <div
        ref={aiRef}
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px section-line" />

        {/* Subtle bg orb */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)" }} />
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Left — Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={aiInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-9"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">AI & Intelligent Automation</span>
              </motion.div>

              <div className="overflow-hidden mb-7">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  animate={aiInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.08] tracking-[-0.025em]"
                >
                  Intelligence at{" "}
                  <span className="gradient-text-dark">Enterprise Scale</span>
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={aiInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.95 }}
                className="text-slate-500 text-[1.05rem] leading-[1.85] mb-12"
              >
                Our AI Operations platform continuously monitors deployed models,
                ensures peak prediction accuracy, and automates intelligent pipelines
                — keeping your business ahead of the curve around the clock.
              </motion.p>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-4">
                {aiHighlights.map(({ label, value, sub }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={aiInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: 0.38 + i * 0.1, duration: 0.7 }}
                    className="group relative rounded-2xl p-5 overflow-hidden transition-all duration-400 hover:-translate-y-1"
                    style={{
                      background: "linear-gradient(145deg, #0d1526 0%, #080f1e 100%)",
                      border: "1px solid rgba(37,99,235,0.20)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 60%)" }} />
                    <div className="text-[1.8rem] font-bold text-white leading-none mb-1.5 group-hover:text-cyan-300 transition-colors duration-300">
                      {value}
                    </div>
                    <div className="text-white/45 text-xs font-semibold mb-1">{label}</div>
                    <div className="text-emerald-400 text-[10px] font-medium">{sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Image 1: AI Dashboard (floating) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aiInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <motion.div style={{ y: imgParallax }} className="relative">
                {/* Glow halo */}
                <div
                  className="absolute inset-[-10%] rounded-[2.5rem] pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(37,99,235,0.14) 0%, rgba(6,182,212,0.06) 50%, transparent 70%)",
                    filter: "blur(24px)",
                  }}
                />

                {/* Image with floating animation */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 0 0 1px rgba(37,99,235,0.14), 0 24px 70px rgba(37,99,235,0.12), 0 40px 100px rgba(0,0,0,0.08)",
                  }}
                >
                  <Image
                    src="/images/languages.jpg"
                    alt="AI Operations Dashboard"
                    width={660}
                    height={440}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Subtle highlight */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, transparent 50%)" }}
                  />
                </motion.div>

                {/* "All Systems Operational" floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={aiInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-4 right-4 z-10"
                >
                  <div
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
                    style={{
                      background: "rgba(5,12,28,0.82)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      color: "#22c55e",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
                    All Systems Operational
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Software Engineering / Development Excellence ── */}
      <div
        ref={engRef}
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #020810 0%, #080f1e 50%, #020810 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(6,182,212,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.7) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div className="absolute right-0 bottom-0 w-[350px] h-[350px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)", filter: "blur(32px)" }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.35), rgba(37,99,235,0.35), transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Left — Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={engInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-9"
                style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.30)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">Software Engineering</span>
              </motion.div>

              <div className="overflow-hidden mb-7">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  animate={engInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-4xl md:text-5xl font-bold text-white leading-[1.08] tracking-[-0.025em]"
                >
                  Engineering{" "}
                  <span style={{ background: "linear-gradient(135deg,#06b6d4 0%,#2563eb 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Excellence.
                  </span>{" "}
                  Delivered.
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={engInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.95 }}
                className="text-white/55 text-[1.05rem] leading-[1.85] mb-11"
              >
                We build high-performance software that scales — from initial
                architecture through production. Our engineering teams embrace
                agile methodologies, modern tooling, and a quality-first culture
                that ships features fast without accumulating debt.
              </motion.p>

              <div className="space-y-4 mb-12">
                {engineeringPoints.map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -24 }}
                    animate={engInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.38 + i * 0.1, duration: 0.75 }}
                    className="flex items-center gap-3.5"
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.30)" }}>
                      <CheckCircle2 size={12} className="text-cyan-400" />
                    </div>
                    <span className="text-white/70 text-sm font-medium">{point}</span>
                  </motion.div>
                ))}
              </div>

              {/* Mini stats row */}
              <div className="flex gap-8">
                {engineeringStats.map(({ value, label, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={engInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.75 + i * 0.12, duration: 0.7 }}
                  >
                    <div className="text-2xl font-bold leading-none mb-1" style={{ color }}>{value}</div>
                    <div className="text-white/38 text-xs font-medium">{label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Image: Software Engineering Collaboration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={engInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <motion.div style={{ y: engParallax }} className="relative">
                <div
                  className="absolute inset-[-10%] rounded-[2.5rem] pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.18) 0%, rgba(37,99,235,0.10) 50%, transparent 70%)",
                    filter: "blur(28px)",
                  }}
                />
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 0 0 1px rgba(6,182,212,0.18), 0 40px 100px rgba(0,0,0,0.70), 0 0 60px rgba(6,182,212,0.08)",
                  }}
                >
                  <Image
                    src="/images/software-engineering-collaboration.jpeg"
                    alt="Software Engineering — Agile Team Collaboration"
                    width={660}
                    height={460}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(160deg, rgba(6,182,212,0.04) 0%, transparent 40%, rgba(0,0,0,0.28) 100%)" }}
                  />

                  {/* Agile badge */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={engInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1, duration: 0.7 }}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white"
                      style={{ background: "rgba(5,12,28,0.88)", backdropFilter: "blur(14px)", border: "1px solid rgba(6,182,212,0.25)" }}
                    >
                      <GitBranch size={12} className="text-cyan-400" />
                      Agile · CI/CD · DevOps
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Why Choose Us — Strategic Consulting + Cards ── */}
      <div
        ref={stratRef}
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px section-line" />
        <div className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">
          {/* Split: Image Left + Content Right */}
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-28">

            {/* Left — Image: Technology Strategy Workshop */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={stratInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <motion.div style={{ y: stratParallax }} className="relative">
                <div
                  className="absolute inset-[-8%] rounded-[2.5rem] pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.10) 0%, rgba(6,182,212,0.05) 50%, transparent 70%)",
                    filter: "blur(24px)",
                  }}
                />
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 0 0 1px rgba(37,99,235,0.12), 0 32px 80px rgba(0,0,0,0.10)",
                  }}
                >
                  <Image
                    src="/images/technology-strategy-workshop.png"
                    alt="Technology Strategy Workshop — Roadmap Planning"
                    width={660}
                    height={460}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 50%)" }}
                  />
                </div>

                {/* Floating label */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={stratInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-5 right-6 z-10"
                >
                  <div
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.96)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(37,99,235,0.15)",
                      boxShadow: "0 12px 40px rgba(37,99,235,0.10)",
                      color: "#2563eb",
                    }}
                  >
                    <Layers size={13} className="text-blue-600" />
                    Strategic Roadmapping
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right — Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={stratInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-9"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">Why Choose Us</span>
              </motion.div>

              <div className="overflow-hidden mb-7">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  animate={stratInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.08] tracking-[-0.025em]"
                >
                  Technology Leadership{" "}
                  <span className="gradient-text-dark">You Can Trust</span>
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={stratInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.95 }}
                className="text-slate-500 text-[1.05rem] leading-[1.85] mb-11"
              >
                We help organizations chart bold technology futures. Our advisory
                practice combines executive-level strategic thinking with hands-on
                implementation expertise — bridging the gap between vision and delivery.
              </motion.p>

              <div className="space-y-4 mb-12">
                {strategyPoints.map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: 24 }}
                    animate={stratInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.38 + i * 0.1, duration: 0.75 }}
                    className="flex items-center gap-3.5"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200/60 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} className="text-blue-600" />
                    </div>
                    <span className="text-slate-600 text-sm font-medium">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose Us Cards */}
          <div ref={whyRef}>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={whyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">Our Differentiators</span>
              </motion.div>
              <div className="overflow-hidden">
                <motion.h3
                  initial={{ y: "100%", opacity: 0 }}
                  animate={whyInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-3xl md:text-4xl font-bold text-slate-900 leading-[1.1] tracking-[-0.02em]"
                >
                  What Sets Us{" "}
                  <span className="gradient-text-dark">Apart</span>
                </motion.h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reasons.map(({ icon, title, body }, i) => (
                <WhyCard key={title} icon={icon} title={title} body={body} index={i} inView={whyInView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
