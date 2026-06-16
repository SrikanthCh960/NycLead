"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap, Target, TrendingUp } from "lucide-react";

const intro_pillars = [
  {
    icon: Target,
    label: "Strategic Alignment",
    body: "Every solution starts with your business objectives — not technology for technology's sake.",
    accent: "#2563eb",
  },
  {
    icon: Zap,
    label: "Rapid Delivery",
    body: "Agile methodology and experienced teams mean you see results in weeks, not quarters.",
    accent: "#06b6d4",
  },
  {
    icon: TrendingUp,
    label: "Scalable Outcomes",
    body: "We architect for where you're going, ensuring solutions compound value as you grow.",
    accent: "#a78bfa",
  },
];

function PillarCard({
  icon: Icon, label, body, accent, index, inView,
}: {
  icon: React.ElementType; label: string; body: string; accent: string; index: number; inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cfg = { stiffness: 180, damping: 28, mass: 0.6 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]), cfg);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-7, 7]), cfg);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    setGlowPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }, [rawX, rawY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.55 + index * 0.12, duration: 0.85 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative flex flex-col items-center text-center p-8 rounded-2xl overflow-hidden cursor-default will-change-transform h-full"
        style={{
          rotateX, rotateY, transformStyle: "preserve-3d",
          background: "#ffffff",
          border: `1px solid ${hovered ? `${accent}30` : "rgba(0,0,0,0.07)"}`,
          boxShadow: hovered
            ? `0 16px 48px rgba(0,0,0,0.08), 0 0 24px ${accent}18`
            : "0 2px 12px rgba(0,0,0,0.04)",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        {/* Mouse-follow glow */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${accent}0d 0%, transparent 65%)` }}
          />
        )}

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full transition-transform duration-500 origin-center"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
          }}
        />

        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          animate={hovered ? { scale: 1.12 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ background: `${accent}10`, border: `1px solid ${accent}22` }}
        >
          <Icon size={20} style={{ color: accent }} />
        </motion.div>

        <motion.h3
          className="text-slate-900 font-semibold text-[0.97rem] mb-3 transition-colors duration-300"
          style={{ color: hovered ? accent : undefined }}
        >
          {label}
        </motion.h3>
        <p className="text-slate-500 text-sm leading-[1.78]">{body}</p>

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-6 right-6 h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}50, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ServicesIntro() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#edf0ff" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.15),transparent)" }} />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[460px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center,rgba(37,99,235,0.032) 0%,transparent 68%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-32 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-9"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">What We Do</span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-8">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-slate-900 leading-[1.07] tracking-[-0.025em]"
          >
            Empowering Businesses{" "}
            <span className="gradient-text-dark">Through Technology</span>
          </motion.h2>
        </div>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28, duration: 0.9 }}
          className="text-slate-600 text-[1.07rem] leading-[1.88] mb-5 max-w-3xl mx-auto"
        >
          At NYC GravityNet, we provide end-to-end technology services that help
          organizations overcome challenges, accelerate innovation, and achieve
          sustainable growth.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="text-slate-500 text-base leading-[1.88] mb-16 max-w-3xl mx-auto"
        >
          Our team combines strategic consulting, technical expertise, and
          industry best practices to deliver solutions tailored to your unique
          business needs — from first concept through long-term support.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 1.0 }}
          className="w-16 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mb-16 origin-center"
        />

        {/* Three pillar cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {intro_pillars.map((pillar, i) => (
            <PillarCard key={pillar.label} {...pillar} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
