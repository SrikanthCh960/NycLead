"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, TrendingUp, Brain, Shield, Activity } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const floatingCards = [
  {
    icon: TrendingUp,
    label: "Prediction Accuracy",
    value: "98.7%",
    delta: "+2.4%",
    deltaColor: "#22c55e",
    accentColor: "#22c55e",
    position: { top: "6%", right: "2%" },
    delay: 0.1,
    floatDuration: 4.2,
  },
  {
    icon: Brain,
    label: "Models Deployed",
    value: "24",
    delta: "+12%",
    deltaColor: "#06b6d4",
    accentColor: "#06b6d4",
    position: { bottom: "22%", right: "-2%" },
    delay: 0.35,
    floatDuration: 5.1,
  },
  {
    icon: Shield,
    label: "Uptime SLA",
    value: "99.99%",
    delta: "+0.01%",
    deltaColor: "#a78bfa",
    accentColor: "#a78bfa",
    position: { bottom: "4%", left: "10%" },
    delay: 0.55,
    floatDuration: 4.7,
  },
  {
    icon: Activity,
    label: "Active Pipelines",
    value: "18",
    delta: "+5 this week",
    deltaColor: "#f59e0b",
    accentColor: "#f59e0b",
    position: { top: "42%", left: "-4%" },
    delay: 0.2,
    floatDuration: 3.9,
  },
];

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "40+", label: "Industries Served" },
  { value: "98%", label: "Client Satisfaction" },
];

const headline = ["Transforming Businesses", "Through AI, Cybersecurity", "& Digital Innovation"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const [primaryPos, setPrimaryPos] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 800], [0, 160]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const imageParallax = useTransform(scrollY, [0, 800], [0, 80]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Zoom in on the NYC banner background
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 3.5, ease: "power3.out" }
      );

      gsap.fromTo(
        imageWrapRef.current,
        { opacity: 0, scale: 1.06, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: "power3.out", delay: 1.0 }
      );

      // Subtle pulse glow on image
      gsap.to(".hero-glow-ring", {
        opacity: 0.6,
        scale: 1.04,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* NYC Banner background image */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src="/images/nyc-banner.avif"
          alt="NYC GravityNet"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Dark overlay — keeps text readable, preserves image depth */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(135deg, rgba(2,8,23,0.92) 0%, rgba(10,22,40,0.85) 40%, rgba(6,16,32,0.80) 100%)",
        }}
      />

      {/* Animated dot grid */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.20) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Left radial glow */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 70% at 20% 50%, rgba(37,99,235,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Right ambient glow (behind image) */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[90%] z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(6,182,212,0.10) 0%, rgba(37,99,235,0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.0, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px z-20 origin-left"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.8), rgba(6,182,212,0.6), transparent)",
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-24 w-full"
      >
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-20 items-center min-h-[80vh]">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full mb-10"
              style={{
                background: "rgba(37,99,235,0.14)",
                border: "1px solid rgba(37,99,235,0.35)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
              <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">
                Enterprise Technology Consulting
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mb-8">
              {headline.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5 + i * 0.14, duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h1
                      className={`font-bold leading-[1.04] tracking-[-0.028em] ${i === 2
                          ? "gradient-text text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem]"
                          : "text-white text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem]"
                        }`}
                    >
                      {line}
                    </h1>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.95 }}
              className="text-white/55 text-lg md:text-[1.15rem] leading-[1.75] mb-12 max-w-[500px]"
            >
              NYC GravityNet helps organizations secure, modernize, and scale
              with intelligent technology solutions that drive measurable
              business outcomes.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.28, duration: 0.85 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <motion.a
                href="#contact"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setPrimaryPos({
                    x: (e.clientX - r.left - r.width / 2) * 0.3,
                    y: (e.clientY - r.top - r.height / 2) * 0.3,
                  });
                }}
                onMouseLeave={() => setPrimaryPos({ x: 0, y: 0 })}
                animate={{ x: primaryPos.x, y: primaryPos.y }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="btn-shine group relative flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:shadow-[0_8px_48px_rgba(37,99,235,0.5)]"
                style={{ background: "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)" }}
              >
                Schedule a Consultation
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>

              <a
                href="#services"
                className="group flex items-center gap-2.5 px-8 py-4 rounded-xl border border-white/12 hover:border-white/28 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white/75 hover:text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Services
                <ArrowRight size={15} className="text-white/35 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.9 }}
              className="flex flex-wrap gap-0"
            >
              {stats.map(({ value, label }, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1 py-2 ${i !== 0 ? "pl-7 border-l border-white/12 ml-7" : ""
                    }`}
                >
                  <span className="text-[1.6rem] font-bold text-white leading-none tracking-tight">
                    {value}
                  </span>
                  <span className="text-white/38 text-[11px] font-medium leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: AI Dashboard image ── */}
          <div ref={imageWrapRef} className="hidden lg:block relative opacity-0">
            <motion.div style={{ y: imageParallax }} className="relative">
              {/* Outer glow ring */}
              <div
                className="hero-glow-ring absolute inset-[-15%] rounded-[2.5rem] pointer-events-none opacity-50"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(37,99,235,0.32) 0%, rgba(6,182,212,0.12) 45%, transparent 70%)",
                  filter: "blur(32px)",
                }}
              />

              {/* Dashboard image */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 0 0 1px rgba(37,99,235,0.25), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(37,99,235,0.12)",
                }}
              >
                <Image
                  src="/images/ai-operations-dashboard.png"
                  alt="AI Operations Dashboard"
                  width={720}
                  height={500}
                  priority
                  className="w-full h-auto object-cover"
                  sizes="55vw"
                />
                {/* Glass overlay — top shine */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, transparent 40%, rgba(0,0,0,0.22) 100%)",
                  }}
                />
                {/* Bottom fade for depth */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(2,8,23,0.6), transparent)" }}
                />
              </div>

              {/* Floating stat cards */}
              {floatingCards.map((card, i) => {
                const IconComp = card.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.75, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.8 + card.delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: "absolute", ...card.position }}
                    className="z-10"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: card.floatDuration, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                        style={{
                          background: "rgba(5,12,28,0.82)",
                          backdropFilter: "blur(16px)",
                          border: `1px solid ${card.accentColor}28`,
                          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${card.accentColor}10, inset 0 1px 0 rgba(255,255,255,0.06)`,
                          minWidth: "158px",
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background: `${card.accentColor}16`,
                            border: `1px solid ${card.accentColor}28`,
                          }}
                        >
                          <IconComp size={15} style={{ color: card.accentColor }} />
                        </div>
                        <div>
                          <div className="text-white/45 text-[10px] font-medium mb-0.5">{card.label}</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-white text-[15px] font-bold leading-none">{card.value}</span>
                            <span className="text-[10px] font-semibold" style={{ color: card.deltaColor }}>
                              {card.delta}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-semibold text-white/25 tracking-[0.22em] uppercase">Scroll</span>
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-cyan-400/50 to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
}
