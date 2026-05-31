"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".why-card", { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, stagger: 0.12, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: whyRef.current, start: "top 78%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

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
                    className="card-surface group rounded-2xl p-5 transition-all duration-400 hover:-translate-y-0.5"
                  >
                    <div className="text-[1.8rem] font-bold text-slate-900 leading-none mb-1.5 group-hover:text-blue-700 transition-colors duration-300">
                      {value}
                    </div>
                    <div className="text-slate-500 text-xs font-semibold mb-1">{label}</div>
                    <div className="text-emerald-600 text-[10px] font-medium">{sub}</div>
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
                    src="/images/ai-operations-dashboard.png"
                    alt="AI Operations Dashboard"
                    width={660}
                    height={440}
                    className="w-full h-auto object-cover"
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

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 16 }}
                animate={stratInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.78, duration: 0.75 }}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:shadow-[0_8px_40px_rgba(37,99,235,0.35)] hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)" }}
              >
                Schedule a Strategy Call
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.a>
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
              {reasons.map(({ icon: Icon, title, body }, i) => (
                <div
                  key={title}
                  className="why-card card-surface group relative rounded-2xl p-8 transition-all duration-500 overflow-hidden opacity-0"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-full" />
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center mb-6 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                  <span className="absolute top-6 right-7 text-[2.8rem] font-black text-slate-100 leading-none select-none group-hover:text-blue-50 transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-slate-900 font-semibold text-[1.02rem] mb-3 group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
                  <p className="text-slate-500 text-sm leading-[1.78]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
