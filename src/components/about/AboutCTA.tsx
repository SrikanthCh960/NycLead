"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Mail, MessageSquare } from "lucide-react";

const ctaOptions = [
  {
    icon: Calendar,
    title: "Schedule a Consultation",
    sub: "30-min strategy session — no commitment required.",
    href: "/contact",
    primary: true,
  },
  {
    icon: Mail,
    title: "Contact Our Team",
    sub: "hello@nycgravitynet.com · Response within 24 hours.",
    href: "mailto:hello@nycgravitynet.com",
    primary: false,
  },
];

const trustItems = [
  "No commitment required",
  "Fortune 500 experience",
  "Results-driven engagements",
  "Trusted by 200+ enterprises",
];

export default function AboutCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1636da 0%, #1636da 55%, #1636da 100%)" }}
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.8) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
        }}
      />

      {/* Ambient glows */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[900px] h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(6,182,212,0.05) 45%, transparent 68%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.7), rgba(6,182,212,0.5), transparent)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-40 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
          style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.28)", backdropFilter: "blur(8px)" }}
        >
          <MessageSquare size={12} className="text-cyan-400" />
          <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">
            Let's Talk
          </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-[3.8rem] xl:text-[4.2rem] font-bold text-white leading-[1.05] tracking-[-0.03em]"
          >
            Let's Build the Future
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.22, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-[3.8rem] xl:text-[4.2rem] font-bold leading-[1.05] tracking-[-0.03em] gradient-text"
          >
            Together.
          </motion.h2>
        </div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.38, duration: 0.95 }}
          className="text-white/50 text-[1.08rem] leading-[1.88] max-w-2xl mx-auto mb-16"
        >
          Whether you're modernizing infrastructure, enhancing security, or driving
          innovation through AI, NYC GravityNet is ready to help you navigate every
          step of your digital transformation journey.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.52, duration: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          {ctaOptions.map(({ icon: Icon, title, href, primary }, i) =>
            primary ? (
              <motion.a
                key={title}
                href={href}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setMagnetPos({
                    x: (e.clientX - r.left - r.width / 2) * 0.28,
                    y: (e.clientY - r.top - r.height / 2) * 0.28,
                  });
                }}
                onMouseLeave={() => setMagnetPos({ x: 0, y: 0 })}
                animate={{ x: magnetPos.x, y: magnetPos.y }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="btn-shine group inline-flex items-center gap-3 px-9 py-4.5 rounded-2xl font-bold text-[1.02rem] text-white transition-all duration-300 hover:shadow-[0_0_70px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)" }}
              >
                <Icon size={17} />
                {title}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
            ) : (
              <a
                key={title}
                href={href}
                className="group inline-flex items-center gap-2.5 px-8 py-4.5 rounded-2xl border border-white/12 hover:border-white/25 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <Icon size={15} />
                {title}
                <ArrowRight size={14} className="text-white/30 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all duration-300" />
              </a>
            )
          )}
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.75, duration: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
        >
          {trustItems.map((item, i) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-cyan-500/60" />
              <span className="text-white/30 text-xs font-medium">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
