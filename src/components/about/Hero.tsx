"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Shield, Brain, Cloud, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const trustBadges = [
  { icon: Shield, label: "Cybersecurity" },
  { icon: Brain,  label: "AI & Automation" },
  { icon: Cloud,  label: "Cloud & DevOps" },
];

const heroStats = [
  { value: "200+", label: "Enterprise Clients" },
  { value: "15+",  label: "Years of Excellence" },
  { value: "98%",  label: "Client Retention" },
];

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgY   = useTransform(scrollYProgress, [0, 1], ["0%",  "12%"]);
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%",  "6%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* stagger the badge pills */
      gsap.fromTo(".hero-badge-pill",
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.75, ease: "power3.out", delay: 1.1 }
      );
      /* stat counters */
      gsap.fromTo(".hero-stat",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 1.4 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1636da 0%, #1636da 55%, #1636da 100%)" }}
    >
      {/* ── Animated grid texture ── */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.8) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-1/3 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 68%)", filter: "blur(40px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute right-0 bottom-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 68%)", filter: "blur(36px)" }}
        />
      </div>

      {/* ── Top accent line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.7), rgba(6,182,212,0.5), transparent)" }}
      />

      {/* ── Main content grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* ── LEFT: Content ── */}
          <motion.div style={{ y: textY }} className="relative z-10">

            {/* Page label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.30)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
              <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">About NYC GravityNet</span>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-bold text-white leading-[1.05] tracking-[-0.03em]"
              >
                Driving Innovation.
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-9">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.28, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-bold leading-[1.05] tracking-[-0.03em] gradient-text"
              >
                Delivering Results.
              </motion.h1>
            </div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.95 }}
              className="text-white/55 text-[1.07rem] leading-[1.88] mb-12 max-w-xl"
            >
              NYC GravityNet is a technology consulting and digital transformation
              company helping organizations leverage AI, cybersecurity, cloud, and
              modern software solutions to achieve sustainable growth.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.85 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <a
                href="#contact"
                className="btn-shine group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:shadow-[0_8px_40px_rgba(37,99,235,0.45)] hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)" }}
              >
                Work With Us
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#overview"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/12 hover:border-white/25 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                Learn More
                <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
              </a>
            </motion.div>

            {/* Trust / service badges */}
            <div className="flex flex-wrap gap-2.5">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="hero-badge-pill opacity-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium text-white/65"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <Icon size={12} className="text-cyan-400" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <motion.div ref={imageRef} style={{ y: imgY }} className="relative">

              {/* Glow halo */}
              <div
                className="absolute inset-[-14%] rounded-[3rem] pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 55%, rgba(37,99,235,0.22) 0%, rgba(6,182,212,0.10) 50%, transparent 68%)",
                  filter: "blur(32px)",
                }}
              />

              {/* Main image */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 0 0 1px rgba(37,99,235,0.22), 0 48px 120px rgba(0,0,0,0.75), 0 0 80px rgba(37,99,235,0.10)",
                }}
              >
                <Image
                  src="/images/about-hero-consulting.png"
                  alt="NYC GravityNet — Senior Technology Consultants"
                  width={700}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                {/* Subtle vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(37,99,235,0.05) 0%, transparent 40%, rgba(2,6,15,0.45) 100%)",
                  }}
                />
              </div>

              {/* Floating stat cards */}
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.82, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.18, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute z-10"
                  style={
                    i === 0 ? { top: "12%", left: "-7%" } :
                    i === 1 ? { bottom: "22%", left: "-6%" } :
                    { top: "45%", right: "-6%" }
                  }
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.5 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div
                      className="px-4 py-3.5 rounded-2xl"
                      style={{
                        background: "rgba(3,8,22,0.88)",
                        backdropFilter: "blur(18px)",
                        border: "1px solid rgba(37,99,235,0.22)",
                        boxShadow: "0 16px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
                        minWidth: "128px",
                      }}
                    >
                      <div className="text-[1.65rem] font-bold text-white leading-none mb-1">
                        {stat.value}
                      </div>
                      <div className="text-white/42 text-[10px] font-medium">{stat.label}</div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* "Trusted Partner" badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.7 }}
                className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white"
                style={{
                  background: "rgba(3,8,22,0.88)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(6,182,212,0.25)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
                Trusted Technology Partner
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/28 text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
