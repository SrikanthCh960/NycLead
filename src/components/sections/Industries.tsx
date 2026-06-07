"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, DollarSign, ShoppingBag, Factory, Briefcase, Cpu } from "lucide-react";

const industries = [
  {
    icon: Heart,
    title: "Healthcare",
    description:
      "HIPAA-compliant solutions, clinical data platforms, telehealth infrastructure, and AI diagnostics.",
    color: "#ef4444",
  },
  {
    icon: DollarSign,
    title: "Financial Services",
    description:
      "Risk management systems, regulatory compliance, fraud detection, and real-time trading platforms.",
    color: "#22c55e",
  },
  {
    icon: ShoppingBag,
    title: "Retail & eCommerce",
    description:
      "Omnichannel platforms, personalization engines, inventory optimization, and loyalty ecosystems.",
    color: "#f59e0b",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description:
      "IIoT connectivity, predictive maintenance, supply chain visibility, and digital twin solutions.",
    color: "#8b5cf6",
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description:
      "Practice management, knowledge management, client portals, and workflow automation platforms.",
    color: "#06b6d4",
  },
  {
    icon: Cpu,
    title: "Technology",
    description:
      "Platform engineering, developer tooling, AI infrastructure, and SaaS product development.",
    color: "#2563eb",
  },
];

function IndustryCard({
  icon: Icon,
  title,
  description,
  color,
  index,
  inView,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

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
      key={title}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: 0.15 + index * 0.1,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="card-surface group relative rounded-2xl p-8 overflow-hidden cursor-default h-full will-change-transform"
      >
        {/* Shimmer sweep on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          initial={{ opacity: 0, x: "-100%" }}
          animate={hovered ? { opacity: 1, x: "200%" } : { opacity: 0, x: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${color}18 50%, transparent 60%)`,
          }}
        />

        {/* Mouse-follow radial glow */}
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${color}14 0%, transparent 65%)`,
              opacity: 0.9,
            }}
          />
        )}

        {/* Top accent bar */}
        <motion.div
          className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full origin-center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        {/* Icon with pulse ring */}
        <div className="relative mb-6 w-fit">
          {hovered && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", repeat: Infinity }}
              style={{ backgroundColor: color }}
            />
          )}
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center relative z-10"
            animate={hovered ? { scale: 1.12, rotate: [0, -6, 6, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
            style={{ backgroundColor: `${color}12`, border: `1px solid ${color}30` }}
          >
            <Icon size={22} style={{ color }} />
          </motion.div>
        </div>

        <motion.h3
          className="text-slate-900 font-semibold text-lg mb-3"
          animate={hovered ? { x: 3 } : { x: 0 }}
          transition={{ duration: 0.25 }}
        >
          {title}
        </motion.h3>
        <p className="text-slate-500 text-sm leading-[1.75]">{description}</p>

        {/* Bottom glow line */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-px"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
        />

        {/* Corner accent dots */}
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

export default function Industries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="industries" ref={ref} className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #020810 0%, #080f1e 50%, #020810 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.4), rgba(6,182,212,0.4), transparent)" }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: "rgba(37,99,235,0.14)", border: "1px solid rgba(37,99,235,0.32)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">
              Industries
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.02em]"
            >
              Industry{" "}
              <span className="gradient-text-dark">Expertise</span>
            </motion.h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((industry, i) => (
            <IndustryCard key={industry.title} {...industry} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
