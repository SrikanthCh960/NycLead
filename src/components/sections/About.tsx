"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { CheckCircle2, ArrowUpRight, Target, Shield, TrendingUp, Users, ArrowRight } from "lucide-react";

const pillars = [
  { num: "01", title: "Strategic Vision", body: "We align every technology decision with your long-term business objectives, ensuring every solution compounds value over time.", icon: Target, accent: "#2563eb", accentB: "#1e3a8a", accentRgb: "37,99,235" },
  { num: "02", title: "Secure by Design", body: "Security isn't bolted on after the fact. It's woven into the fabric of every architecture, pipeline, and process we build.", icon: Shield, accent: "#06b6d4", accentB: "#2563eb", accentRgb: "6,182,212" },
  { num: "03", title: "Measurable Outcomes", body: "We track what matters. From cost reduction to revenue enablement, our engagements deliver quantifiable, board-level results.", icon: TrendingUp, accent: "#38bdf8", accentB: "#0284c7", accentRgb: "56,189,248" },
  { num: "04", title: "Continuous Partnership", body: "We don't disappear after delivery. We evolve alongside your organization, adapting to every shift in the technology landscape.", icon: Users, accent: "#3b82f6", accentB: "#06b6d4", accentRgb: "59,130,246" },
];

function PillarCard({ num, title, body, icon: Icon, accent, accentB, accentRgb, index }: {
  num: string; title: string; body: string; icon: React.ElementType;
  accent: string; accentB: string; accentRgb: string; index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  // Spring-based 3D tilt
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
    setGlowPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }, [rawX, rawY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay: index * 0.1, duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 1000 }}
    >
      {/* Gradient border wrapper */}
      <div
        className="rounded-2xl p-[1.5px]"
        style={{ background: hovered ? `linear-gradient(135deg, ${accent}55, ${accentB}33)` : "linear-gradient(135deg, rgba(37,99,235,0.14), rgba(6,182,212,0.10))" }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX, rotateY,
            transformStyle: "preserve-3d",
            boxShadow: hovered ? `0 20px 60px rgba(${accentRgb},0.13), 0 4px 20px rgba(0,0,0,0.06)` : "0 2px 12px rgba(0,0,0,0.05)",
          }}
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="rounded-[14px] overflow-hidden cursor-pointer transition-shadow duration-300 bg-white will-change-transform"
        >
          {/* Gradient icon header */}
          <div
            className="relative flex items-center justify-center"
            style={{
              height: 140,
              background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #06b6d4 100%)",
            }}
          >
            {/* Mouse-follow spotlight */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(320px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.12) 0%, transparent 65%)`,
                opacity: hovered ? 1 : 0,
              }}
            />
            {/* Number */}
            <span className="absolute top-4 right-5 text-white/20 text-3xl font-black leading-none select-none">{num}</span>
            {/* Icon box */}
            <div
              className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)" }}
            >
              <Icon size={26} className="text-white" strokeWidth={1.8} />
            </div>
          </div>

          {/* White content area */}
          <div className="p-6 bg-white">
            <h3 className="text-slate-900 font-bold text-[1rem] mb-3 leading-snug">{title}</h3>
            <p className="text-slate-500 text-sm leading-[1.75] mb-5">{body}</p>

            {/* Learn More CTA */}
            <div className="flex items-center gap-1.5 overflow-hidden" style={{ color: "#2563eb" }}>
              <span className="text-sm font-semibold">Learn More</span>
              <div className="relative w-4 h-4 overflow-hidden">
                <motion.div
                  animate={hovered ? { x: [0, 18] } : { x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <ArrowRight size={14} strokeWidth={2.5} />
                </motion.div>
                <motion.div
                  animate={hovered ? { x: ["-100%", "0%"] } : { x: "-100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <ArrowRight size={14} strokeWidth={2.5} />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

const consultingPoints = [
  "Digital Strategy & Executive Roadmapping",
  "IT Transformation & Legacy Modernization",
  "Cloud & Infrastructure Architecture",
  "Innovation Labs & Growth Engineering",
];

const impactStats = [
  { value: "$2.4M", label: "Avg. Cost Savings", delta: "+18.6%", color: "#22c55e" },
  { value: "42.8%", label: "Efficiency Gain", delta: "+12.7%", color: "#06b6d4" },
  { value: "3.2x", label: "Faster Time-to-Market", delta: "+35%", color: "#a78bfa" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const consultingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });
  const consultingInView = useInView(consultingRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({ target: consultingRef, offset: ["start end", "end start"] });
  const imgParallax = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const bgParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden">

      {/* ── Part 1: Who We Are ── */}
      <div className="relative py-36 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/60 to-white pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent to-blue-500/20 pointer-events-none" />

        {/* Subtle bg orb */}
        <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-start mb-28">

            {/* Left sticky */}
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-9"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">Who We Are</span>
              </motion.div>

              <div className="overflow-hidden mb-7">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-4xl md:text-5xl lg:text-[3.6rem] font-bold leading-[1.06] tracking-[-0.025em] text-slate-900"
                >
                  Your Strategic{" "}
                  <span className="gradient-text-dark">Technology</span>{" "}
                  Partner
                </motion.h2>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.55, duration: 0.9 }}
                className="w-12 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 origin-left rounded-full mb-8"
              />

              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="group inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-300"
              >
                Work With Us
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.a>
            </div>

            {/* Right paragraphs */}
            <div className="space-y-8">
              {[
                { text: "At NYC GravityNet, we help businesses navigate the complexities of today's digital landscape through innovative, secure, and scalable technology solutions.", large: true },
                { text: "Our team of seasoned technologists, architects, and strategists combine deep domain expertise with a relentless focus on outcomes. We don't just implement tools — we architect transformations that position your organization as a technology leader in your industry.", large: false },
                { text: "From Fortune 500 enterprises to high-growth scale-ups, our clients share one thing in common: they chose NYC GravityNet to solve their hardest technology challenges and unlock new possibilities.", large: false },
              ].map(({ text, large }, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.28 + i * 0.15, duration: 0.95 }}
                  className={`leading-[1.85] ${large ? "text-slate-700 text-[1.1rem] font-[450]" : "text-slate-500 text-base"}`}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Pillars */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar, i) => (
              <PillarCard key={pillar.num} {...pillar} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Part 2: Technology Consulting — Image 3 ── */}
      <div
        ref={consultingRef}
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #060d1e 0%, #0d1f3c 45%, #050d1c 100%)" }}
      >
        {/* Parallax bg texture */}
        <motion.div
          style={{ y: bgParallax }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage: "linear-gradient(rgba(37,99,235,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.7) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </motion.div>

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div className="absolute right-1/4 top-1/3 w-[300px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", filter: "blur(32px)" }} />
        </div>

        <div className="absolute top-0 left-0 right-0 h-px section-line" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Left — Content */}
            <div className="order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={consultingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-9"
                style={{ background: "rgba(37,99,235,0.14)", border: "1px solid rgba(37,99,235,0.32)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">Technology Consulting</span>
              </motion.div>

              <div className="overflow-hidden mb-7">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  animate={consultingInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-4xl md:text-5xl font-bold text-white leading-[1.08] tracking-[-0.025em]"
                >
                  Strategy.{" "}
                  <span className="gradient-text">Innovation.</span>{" "}
                  Transformation.
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={consultingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.95 }}
                className="text-white/55 text-[1.05rem] leading-[1.85] mb-11"
              >
                We partner with executive leadership to design and execute
                technology strategies that align with business goals, drive
                efficiency, and unlock competitive advantage across every layer
                of the enterprise.
              </motion.p>

              <div className="space-y-4 mb-12">
                {consultingPoints.map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: 24 }}
                    animate={consultingInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.38 + i * 0.1, duration: 0.75 }}
                    className="flex items-center gap-3.5"
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)" }}>
                      <CheckCircle2 size={12} className="text-cyan-400" />
                    </div>
                    <span className="text-white/70 text-sm font-medium">{point}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 16 }}
                animate={consultingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.78, duration: 0.75 }}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:shadow-[0_8px_40px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)" }}
              >
                Explore Consulting Services
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.a>
            </div>

            {/* Right — Image: Enterprise Consulting Team */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={consultingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative order-2"
            >
              <motion.div style={{ y: imgParallax }} className="relative">
                {/* Warm glow halo */}
                <div
                  className="absolute inset-[-12%] rounded-[3rem] pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 55%, rgba(37,99,235,0.22) 0%, rgba(6,182,212,0.10) 50%, transparent 70%)",
                    filter: "blur(28px)",
                  }}
                />

                {/* Main image */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 0 0 1px rgba(37,99,235,0.20), 0 40px 100px rgba(0,0,0,0.60), 0 0 60px rgba(37,99,235,0.08)",
                  }}
                >
                  <Image
                    src="/images/enterprise-consulting-team.jpg"
                    alt="Enterprise Consulting Team — Digital Transformation"
                    width={660}
                    height={480}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(160deg, rgba(255,255,255,0.03) 0%, transparent 45%, rgba(6,12,28,0.28) 100%)",
                    }}
                  />
                </div>

                {/* Floating impact cards */}
                {impactStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, y: 14 }}
                    animate={consultingInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.2, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute z-10"
                    style={{
                      ...(i === 0 ? { top: "10%", right: "-5%" } :
                          i === 1 ? { bottom: "18%", right: "-4%" } :
                          { top: "42%", left: "-6%" }),
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -7, 0] }}
                      transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div
                        className="px-4 py-3.5 rounded-2xl"
                        style={{
                          background: "rgba(5,12,28,0.85)",
                          backdropFilter: "blur(16px)",
                          border: `1px solid ${stat.color}28`,
                          boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px ${stat.color}12, inset 0 1px 0 rgba(255,255,255,0.06)`,
                          minWidth: "140px",
                        }}
                      >
                        <div className="text-white/40 text-[10px] font-medium mb-1">{stat.label}</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-white text-xl font-bold leading-none">{stat.value}</span>
                          <span className="text-xs font-semibold" style={{ color: stat.color }}>{stat.delta}</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
