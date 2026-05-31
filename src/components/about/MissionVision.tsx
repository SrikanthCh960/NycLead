"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye, Compass, Lightbulb, ShieldCheck, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Target,
    tag: "Our Mission",
    heading: "Empowering Organizations Through Technology",
    body: "To be the trusted partner that enables enterprises to harness the full potential of modern technology — delivering secure, scalable, and intelligent solutions that create sustainable competitive advantage and measurable business outcomes.",
    accent: "#2563eb",
    accentSoft: "rgba(37,99,235,0.12)",
    accentBorder: "rgba(37,99,235,0.25)",
  },
  {
    icon: Eye,
    tag: "Our Vision",
    heading: "A Future Built on Intelligent, Trusted Technology",
    body: "We envision a world where every organization — regardless of size or industry — has access to world-class technology leadership that drives innovation, strengthens security, and creates equal opportunity to compete and thrive in the digital era.",
    accent: "#06b6d4",
    accentSoft: "rgba(6,182,212,0.10)",
    accentBorder: "rgba(6,182,212,0.22)",
  },
  {
    icon: Compass,
    tag: "Our Purpose",
    heading: "Technology That Truly Transforms",
    body: "Beyond implementation — we architect transformations. Every engagement is guided by a singular purpose: to leave your organization fundamentally stronger, more secure, and better positioned for the future than when we arrived.",
    accent: "#a78bfa",
    accentSoft: "rgba(167,139,250,0.10)",
    accentBorder: "rgba(167,139,250,0.22)",
  },
];

const principles = [
  { icon: ShieldCheck, label: "Security First", desc: "Security is a design principle, not an afterthought." },
  { icon: Lightbulb,  label: "Bold Innovation", desc: "We challenge the status quo to unlock new possibilities." },
  { icon: Handshake,  label: "Trusted Partnership", desc: "Long-term relationships built on transparency and results." },
];

export default function AboutMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-12%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mvv-card",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.14, duration: 0.9, ease: "power3.out",
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
      style={{ background: "linear-gradient(160deg, #030912 0%, #060d1e 55%, #040b18 100%)" }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.048] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.7) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 68%)", filter: "blur(40px)" }}
        />
        <div
          className="absolute right-1/4 bottom-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 68%)", filter: "blur(32px)" }}
        />
      </div>

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.55), rgba(6,182,212,0.4), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-9"
            style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.28)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
            <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">
              Mission · Vision · Purpose
            </span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.12, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.06] tracking-[-0.028em]"
            >
              What Drives{" "}
              <span className="gradient-text">Everything We Do</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="text-white/48 text-[1.05rem] leading-[1.85]"
          >
            Our north star in every engagement — from the first strategy session
            to the last line of code.
          </motion.p>
        </div>

        {/* MVV Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 mb-20">
          {cards.map(({ icon: Icon, tag, heading, body, accent, accentSoft, accentBorder }) => (
            <div
              key={tag}
              className="mvv-card opacity-0 group relative rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${accentBorder}`,
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Inner corner glow */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle, ${accentSoft} 0%, transparent 70%)`, filter: "blur(20px)" }}
              />
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-300"
                style={{ background: accentSoft, border: `1px solid ${accentBorder}` }}
              >
                <Icon size={22} style={{ color: accent }} />
              </div>

              {/* Tag */}
              <div
                className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
                style={{ color: accent }}
              >
                {tag}
              </div>

              <h3 className="text-white font-semibold text-[1.05rem] leading-snug mb-4">
                {heading}
              </h3>
              <p className="text-white/45 text-sm leading-[1.82]">{body}</p>
            </div>
          ))}
        </div>

        {/* Principles strip */}
        <div
          className="grid md:grid-cols-3 gap-4 p-1"
        >
          {principles.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.12, duration: 0.85 }}
              className="flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.03]"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.22)" }}
              >
                <Icon size={18} className="text-cyan-400" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm mb-1">{label}</div>
                <div className="text-white/40 text-xs leading-[1.72]">{desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
