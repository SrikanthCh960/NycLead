"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

const stats = [
  { raw: "15+",   display: "15",  suffix: "+",  prefix: "",  label: "Years of Experience" },
  { raw: "500+",  display: "500", suffix: "+",  prefix: "",  label: "Projects Delivered" },
  { raw: "40+",   display: "40",  suffix: "+",  prefix: "",  label: "Industries Served" },
  { raw: "98%",   display: "98",  suffix: "%",  prefix: "",  label: "Client Satisfaction" },
  { raw: "$2.4M", display: "2.4", suffix: "M",  prefix: "$", label: "Avg. Cost Savings" },
];

function useCounter(target: number, decimals: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (elapsed < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [trigger, target, decimals]);

  return count;
}

function StatItem({
  display,
  suffix,
  prefix,
  label,
  index,
  inView,
}: {
  display: string;
  suffix: string;
  prefix: string;
  label: string;
  index: number;
  inView: boolean;
}) {
  const target = parseFloat(display);
  const decimals = display.includes(".") ? 1 : 0;
  const count = useCounter(target, decimals, inView);

  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 200, damping: 28, mass: 0.5 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), springCfg);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), springCfg);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }, [rawX, rawY]);

  const displayValue = inView
    ? decimals > 0
      ? count.toFixed(decimals)
      : Math.round(count).toString()
    : "0";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 600,
      }}
      whileHover={{ y: -6 }}
      className="flex flex-col items-center justify-center text-center px-6 py-6 group relative rounded-xl overflow-hidden cursor-default will-change-transform transition-colors duration-300"
    >
      {/* hover glow backdrop */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          background: hovered
            ? "radial-gradient(circle at 50% 60%, rgba(37,99,235,0.13) 0%, transparent 75%)"
            : "radial-gradient(circle at 50% 60%, transparent 0%, transparent 75%)",
          borderColor: hovered ? "rgba(37,99,235,0.30)" : "rgba(255,255,255,0)",
        }}
        style={{ border: "1px solid rgba(255,255,255,0)" }}
        transition={{ duration: 0.35 }}
      />

      {/* value */}
      <motion.span
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-3xl lg:text-4xl font-black text-white leading-none tracking-tight mb-2 transition-colors duration-300"
        style={{
          color: hovered ? "#67e8f9" : "#ffffff",
          textShadow: hovered
            ? "0 0 40px rgba(6,182,212,0.55), 0 0 80px rgba(37,99,235,0.3)"
            : "0 0 30px rgba(37,99,235,0.3)",
        }}
      >
        {prefix}{displayValue}{suffix}
      </motion.span>

      <span className="relative z-10 text-white/45 text-[11px] font-semibold tracking-[0.14em] uppercase leading-tight">
        {label}
      </span>

      {/* bottom accent */}
      <motion.div
        className="relative z-10 h-px mt-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
        animate={{ width: hovered ? "2.5rem" : "0rem" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  );
}

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d1f3c 0%, #0a1628 50%, #061020 100%)" }}
    >
      {/* Top & bottom accent lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.6), rgba(6,182,212,0.4), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)" }}
      />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 divide-x divide-white/[0.07]">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
