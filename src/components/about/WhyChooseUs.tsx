"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowUpRight, Medal, Clock, BarChart2, Building2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  {
    title: "End-to-End Ownership",
    body: "We don't hand off a blueprint and disappear. We stay engaged from strategy through production, ensuring every initiative lands with real impact.",
  },
  {
    title: "Cross-Domain Expertise",
    body: "Our teams combine security architects, AI engineers, cloud specialists, and business strategists — giving you an integrated perspective no single-discipline firm can offer.",
  },
  {
    title: "Executive Alignment",
    body: "We engage at the C-suite level to ensure technology investments align with board priorities, driving decisions that compound value across every layer of the enterprise.",
  },
  {
    title: "Outcome-Based Delivery",
    body: "We measure our success by your results. Every engagement has defined KPIs, regular checkpoints, and a relentless focus on delivering quantifiable business value.",
  },
];

const achievements = [
  { icon: Medal,     value: "9.4/10",  label: "Client Satisfaction Score"    },
  { icon: Clock,     value: "48hr",    label: "Average Onboarding Time"      },
  { icon: BarChart2, value: "340%",    label: "Avg. ROI on AI Engagements"   },
  { icon: Building2, value: "Fortune 500", label: "Enterprise Clients Served" },
];

function AchievementCard({ icon: Icon, value, label }: any) {
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
      className="achieve-card opacity-0 group relative rounded-2xl p-6 overflow-hidden will-change-transform"
      style={{
        background: "rgba(255,255,255,0.028)",
        border: "1px solid rgba(37,99,235,0.18)",
        backdropFilter: "blur(10px)",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        boxShadow: hovered 
          ? "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "none",
        transition: "box-shadow 0.3s",
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-full" />
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
        style={{ background: "rgba(37,99,235,0.14)", border: "1px solid rgba(37,99,235,0.25)" }}
      >
        <Icon size={17} className="text-cyan-400" />
      </div>
      <div className="text-[1.75rem] font-bold text-white leading-none mb-1.5 group-hover:text-cyan-300 transition-colors duration-300">
        {value}
      </div>
      <div className="text-white/40 text-xs font-medium">{label}</div>
    </motion.div>
  );
}

export default function AboutWhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-12%" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".achieve-card",
        { opacity: 0, y: 32, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.1, duration: 0.8, ease: "power3.out",
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
      style={{ background: "linear-gradient(160deg, #1636da 0%, #1636da 55%, #1636da 100%)" }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.7) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 68%)", filter: "blur(40px)" }} />
        <div className="absolute right-0 bottom-0 w-[380px] h-[380px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 68%)", filter: "blur(32px)" }} />
      </div>

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.5), rgba(6,182,212,0.35), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">

        {/* Split: Image Left / Content Right */}
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-24">

          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <motion.div style={{ y: imgY }} className="relative">
              {/* Halo glow */}
              <div
                className="absolute inset-[-12%] rounded-[2.5rem] pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.18) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)",
                  filter: "blur(28px)",
                }}
              />

              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 0 0 1px rgba(37,99,235,0.18), 0 40px 100px rgba(0,0,0,0.70), 0 0 60px rgba(37,99,235,0.08)",
                }}
              >
                <Image
                  src="/images/technology-strategy-workshop.png"
                  alt="Technology Strategy Workshop — NYC GravityNet"
                  width={680}
                  height={480}
                  className="w-full h-auto object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(160deg, rgba(37,99,235,0.04) 0%, transparent 40%, rgba(2,6,15,0.32) 100%)" }}
                />
              </div>

              {/* Floating label */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 12 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-5 left-5 z-10"
              >
                <div
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
                  style={{
                    background: "rgba(3,8,22,0.90)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(6,182,212,0.25)",
                    color: "#06b6d4",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
                  Enterprise Strategy Session
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-9"
              style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.28)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">Why Choose Us</span>
            </motion.div>

            <div className="overflow-hidden mb-7">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.12, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl md:text-5xl font-bold text-white leading-[1.07] tracking-[-0.025em]"
              >
                The Difference Is{" "}
                <span className="gradient-text">In Our DNA</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.95 }}
              className="text-white/50 text-[1.04rem] leading-[1.88] mb-11"
            >
              We've built our reputation on a simple belief: technology consulting
              should create lasting value, not just deliverables. Here's what
              separates us from every other firm in the market.
            </motion.p>

            <div className="space-y-5 mb-12">
              {differentiators.map(({ title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.38 + i * 0.12, duration: 0.8 }}
                  className="group flex gap-4"
                >
                  <div className="mt-0.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.28)" }}
                    >
                      <CheckCircle2 size={11} className="text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{title}</div>
                    <div className="text-white/42 text-sm leading-[1.78]">{body}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.75 }}
              className="btn-shine group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:shadow-[0_8px_40px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)" }}
            >
              Schedule a Strategy Call
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.a>
          </div>
        </div>

        {/* Achievement stat cards */}
        <div ref={statsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achieve) => (
            <AchievementCard key={achieve.label} {...achieve} />
          ))}
        </div>
      </div>
    </section>
  );
}
