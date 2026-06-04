"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Shield, Brain, Cloud, Code2, BarChart3, Layers,
  ArrowRight, AlertTriangle, Activity, Lock, Wifi,
} from "lucide-react";

// ─── Service data — unified blue→cyan brand palette ────────────────────────────
const services = [
  {
    icon: Shield,
    num: "01",
    title: "Cybersecurity Services",
    description: "Comprehensive security frameworks, threat detection, zero-trust architecture, compliance, and incident response — protecting your most critical assets.",
    accent: "#2563eb",
    accentB: "#1e3a8a",
    accentRgb: "37,99,235",
    tags: ["Zero Trust", "SOC", "Compliance"],
    slug: "cybersecurity",
    visual: "cyber" as const,
  },
  {
    icon: Brain,
    num: "02",
    title: "AI & Intelligent Automation",
    description: "Enterprise-grade AI solutions from strategy to deployment — LLMs, computer vision, predictive analytics, and intelligent process automation at scale.",
    accent: "#06b6d4",
    accentB: "#2563eb",
    accentRgb: "6,182,212",
    tags: ["LLMs", "MLOps", "RPA"],
    slug: "ai-automation",
    visual: "ai" as const,
  },
  {
    icon: Cloud,
    num: "03",
    title: "Cloud & DevOps",
    description: "End-to-end cloud migrations, multi-cloud architecture, Kubernetes orchestration, and CI/CD pipelines that enable velocity without compromise.",
    accent: "#38bdf8",
    accentB: "#0284c7",
    accentRgb: "56,189,248",
    tags: ["AWS", "Azure", "Kubernetes"],
    slug: "cloud-devops",
    visual: "cloud" as const,
  },
  {
    icon: Code2,
    num: "04",
    title: "Custom Software Development",
    description: "From greenfield platforms to legacy modernization — we engineer software that scales with your ambition and adapts to your evolving requirements.",
    accent: "#3b82f6",
    accentB: "#06b6d4",
    accentRgb: "59,130,246",
    tags: ["Full-Stack", "APIs", "Mobile"],
    slug: "software-development",
    visual: "software" as const,
  },
  {
    icon: BarChart3,
    num: "05",
    title: "Data & Analytics",
    description: "Transform raw data into strategic intelligence. Data warehousing, real-time pipelines, business intelligence, and predictive modeling for informed decisions.",
    accent: "#0ea5e9",
    accentB: "#2563eb",
    accentRgb: "14,165,233",
    tags: ["Data Lake", "BI", "Real-time"],
    slug: "data-analytics",
    visual: "data" as const,
  },
  {
    icon: Layers,
    num: "06",
    title: "Digital Transformation",
    description: "Enterprise-wide digital strategy, technology roadmapping, change management, and operating model redesign to future-proof your organization.",
    accent: "#06b6d4",
    accentB: "#1e40af",
    accentRgb: "6,182,212",
    tags: ["Strategy", "Roadmap", "Change Mgmt"],
    slug: "digital-transformation",
    visual: "transform" as const,
  },
];

const cyberMetrics = [
  { icon: AlertTriangle, label: "Threats Detected (24h)", value: "1,247", delta: "+23%", color: "#ef4444" },
  { icon: Lock, label: "System Integrity", value: "98.9%", delta: "Secure", color: "#22c55e" },
  { icon: Activity, label: "Active Incidents", value: "7", delta: "+2", color: "#06b6d4" },
  { icon: Wifi, label: "Network Traffic", value: "2.4 Tbps", delta: "+18%", color: "#06b6d4" },
];

// ─── Animated visual per card ──────────────────────────────────────────────────
type VisualType = "cyber" | "ai" | "cloud" | "software" | "data" | "transform";

function CardVisual({ type, accent, accentB, hovered }: {
  type: VisualType; accent: string; accentB: string; hovered: boolean;
}) {
  const r = accentB;

  if (type === "cyber") return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="hex-c" x="0" y="0" width="36" height="41" patternUnits="userSpaceOnUse">
            <polygon points="18,2 34,11 34,30 18,39 2,30 2,11" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.25" />
          </pattern>
        </defs>
        <rect width="300" height="200" fill={`url(#hex-c)`} />
        {/* Pulsing nodes */}
        {[[60, 60], [240, 60], [150, 100], [80, 150], [220, 140]].map(([cx, cy], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r={3} fill={accent}
            animate={{ opacity: hovered ? [0.4, 1, 0.4] : [0.15, 0.4, 0.15], scale: hovered ? [1, 1.8, 1] : 1 }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }} />
        ))}
        {/* Connections */}
        {[[60, 60, 150, 100], [240, 60, 150, 100], [150, 100, 80, 150], [150, 100, 220, 140]].map(([x1, y1, x2, y2], i) => (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={accent} strokeWidth="0.8"
            animate={{ opacity: hovered ? [0.15, 0.5, 0.15] : 0.08 }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }} />
        ))}
      </svg>
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: hovered ? [1, 1.12, 1] : 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-2xl blur-xl opacity-50" style={{ background: accent, transform: "scale(1.4)" }} />
          <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accent}30, ${accentB}18)`, border: `1px solid ${accent}50` }}>
            <Shield size={28} style={{ color: accent }} strokeWidth={1.5} />
          </div>
        </motion.div>
      </div>
      {/* Scan line */}
      <motion.div className="absolute left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
        animate={hovered ? { top: ["0%", "100%"] } : { top: "50%" }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />
    </div>
  );

  if (type === "ai") return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="dot-a" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1" fill={accent} opacity="0.2" />
          </pattern>
        </defs>
        <rect width="300" height="200" fill="url(#dot-a)" />
        {/* Neural edges */}
        {[[50, 100, 120, 55], [50, 100, 120, 100], [50, 100, 120, 145], [120, 55, 200, 80], [120, 100, 200, 80], [120, 100, 200, 120], [120, 145, 200, 120], [200, 80, 260, 100], [200, 120, 260, 100]].map(([x1, y1, x2, y2], i) => (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={accent} strokeWidth="0.8"
            animate={{ opacity: hovered ? [0.1, 0.55, 0.1] : 0.1 }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18 }} />
        ))}
        {[[50, 100], [120, 55], [120, 100], [120, 145], [200, 80], [200, 120], [260, 100]].map(([cx, cy], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r={i === 0 || i === 6 ? 5 : 4} fill={accent}
            animate={{ opacity: hovered ? [0.4, 1, 0.4] : [0.2, 0.5, 0.2], r: hovered ? [i === 0 || i === 6 ? 5 : 4, (i === 0 || i === 6 ? 5 : 4) * 1.7, i === 0 || i === 6 ? 5 : 4] : i === 0 || i === 6 ? 5 : 4 }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.22 }} />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div animate={{ rotate: hovered ? [0, 5, -5, 0] : 0 }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="relative">
          <div className="absolute inset-0 rounded-2xl blur-xl opacity-40" style={{ background: accent, transform: "scale(1.5)" }} />
          <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accent}30, ${accentB}18)`, border: `1px solid ${accent}50` }}>
            <Brain size={28} style={{ color: accent }} strokeWidth={1.5} />
          </div>
        </motion.div>
      </div>
    </div>
  );

  if (type === "cloud") return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid-cl" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30,0 L0,0 0,30" fill="none" stroke={accent} strokeWidth="0.4" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="300" height="200" fill="url(#grid-cl)" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Orbiting rings */}
        <motion.div className="absolute rounded-full border" style={{ width: 130, height: 130, borderColor: `${accent}35` }}
          animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }}>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ background: accentB, boxShadow: `0 0 8px ${accentB}` }} />
        </motion.div>
        <motion.div className="absolute rounded-full border" style={{ width: 88, height: 88, borderColor: `${accentB}30` }}
          animate={{ rotate: -360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
        </motion.div>
        <motion.div animate={{ scale: hovered ? [1, 1.1, 1] : 1 }} transition={{ duration: 2.5, repeat: Infinity }} className="relative z-10">
          <div className="absolute inset-0 rounded-2xl blur-xl opacity-40" style={{ background: accent, transform: "scale(1.5)" }} />
          <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accent}30, ${accentB}18)`, border: `1px solid ${accent}50` }}>
            <Cloud size={28} style={{ color: accent }} strokeWidth={1.5} />
          </div>
        </motion.div>
      </div>
    </div>
  );

  if (type === "software") return (
    <div className="relative w-full h-full overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid-sw" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30,0 L0,0 0,30" fill="none" stroke={accent} strokeWidth="0.4" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="300" height="200" fill="url(#grid-sw)" />
      </svg>
      {/* Code window lines */}
      <div className="absolute inset-0 flex flex-col justify-center px-10 gap-2">
        {[
          { text: "const deploy = async () => {", color: accent, w: "75%" },
          { text: "  await build.optimize(cfg)", color: `${accent}90`, w: "65%" },
          { text: "  return ship.to('prod')", color: `${accent}90`, w: "55%" },
          { text: "} // ✓ Deployed", color: "#22c55e", w: "40%" },
        ].map(({ text, color, w }, i) => (
          <motion.div key={i} className="font-mono text-[10px] overflow-hidden whitespace-nowrap"
            style={{ color }}
            animate={hovered ? { width: [0, w, w] } : { width: w }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: "easeOut" }}>
            {text}
          </motion.div>
        ))}
      </div>
      <div className="absolute top-6 right-8">
        <motion.div animate={{ rotate: hovered ? [0, -8, 8, -8, 0] : 0 }} transition={{ duration: 0.6 }} className="relative">
          <div className="absolute inset-0 rounded-2xl blur-xl opacity-40" style={{ background: accent, transform: "scale(1.5)" }} />
          <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accent}30, ${accentB}18)`, border: `1px solid ${accent}50` }}>
            <Code2 size={24} style={{ color: accent }} strokeWidth={1.5} />
          </div>
        </motion.div>
      </div>
    </div>
  );

  if (type === "data") return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="dot-d" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="9" y="9" width="2" height="2" fill={accent} opacity="0.18" />
          </pattern>
        </defs>
        <rect width="300" height="200" fill="url(#dot-d)" />
        {/* Line chart */}
        <motion.polyline
          points="30,150 70,120 110,135 160,80 200,95 240,55 280,70"
          fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          animate={{ opacity: hovered ? [0.4, 0.9, 0.7] : 0.35 }}
          transition={{ duration: 2, repeat: Infinity }} />
        {/* Area fill */}
        <motion.polygon
          points="30,150 70,120 110,135 160,80 200,95 240,55 280,70 280,170 30,170"
          fill={accent} opacity={hovered ? 0.07 : 0.03}
          style={{ transition: "opacity 0.4s" }} />
        {/* Bars */}
        {[[40, 160, 30, 40], [90, 160, 30, 55], [140, 160, 30, 70], [190, 160, 30, 48], [240, 160, 30, 80]].map(([x, y, w, h], i) => (
          <motion.rect key={i} x={x} y={y - h} width={w} height={h} rx="3"
            fill={i === 4 ? accent : `${accent}55`}
            animate={{ opacity: hovered ? [0.5, 1, 0.7] : 0.4, y: hovered ? [y - h, y - h - 4, y - h] : y - h }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.1 }} />
        ))}
      </svg>
      <div className="absolute top-5 right-6">
        <motion.div animate={{ y: hovered ? [0, -4, 0] : 0 }} transition={{ duration: 2, repeat: Infinity }} className="relative">
          <div className="absolute inset-0 rounded-2xl blur-xl opacity-40" style={{ background: accent, transform: "scale(1.5)" }} />
          <div className="relative w-13 h-13 w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accent}30, ${accentB}18)`, border: `1px solid ${accent}50` }}>
            <BarChart3 size={24} style={{ color: accent }} strokeWidth={1.5} />
          </div>
        </motion.div>
      </div>
    </div>
  );

  // transform
  return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid-tr" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30,0 L0,0 0,30" fill="none" stroke={accent} strokeWidth="0.4" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="300" height="200" fill="url(#grid-tr)" />
        {/* Flowchart */}
        {[
          [30, 100, 100, 55], [30, 100, 100, 100], [30, 100, 100, 145],
          [100, 55, 200, 80], [100, 100, 200, 80], [100, 100, 200, 120],
          [100, 145, 200, 120], [200, 80, 270, 100], [200, 120, 270, 100],
        ].map(([x1, y1, x2, y2], i) => (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={accent} strokeWidth="0.8" strokeDasharray="5 3"
            animate={{ strokeDashoffset: hovered ? [0, -16] : 0 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
        ))}
        {[[30, 100], [100, 55], [100, 100], [100, 145], [200, 80], [200, 120], [270, 100]].map(([cx, cy], i) => (
          <motion.rect key={i} x={cx - 18} y={cy - 11} width="36" height="22" rx="5"
            fill={`${accent}18`} stroke={accent} strokeWidth="0.9"
            animate={{ opacity: hovered ? [0.5, 1, 0.5] : [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
        ))}
      </svg>
      <div className="absolute bottom-5 right-6">
        <motion.div animate={{ scale: hovered ? [1, 1.08, 1] : 1 }} transition={{ duration: 2.2, repeat: Infinity }} className="relative">
          <div className="absolute inset-0 rounded-2xl blur-xl opacity-40" style={{ background: accent, transform: "scale(1.5)" }} />
          <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accent}30, ${accentB}18)`, border: `1px solid ${accent}50` }}>
            <Layers size={24} style={{ color: accent }} strokeWidth={1.5} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Premium 3D tilt card ──────────────────────────────────────────────────────
function ServiceCard(props: typeof services[0] & { index: number }) {
  const { icon: Icon, num, title, description, accent, accentB, accentRgb, tags, slug, visual, index } = props;

  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position for glow
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  // Spring-based 3D tilt
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
      initial={{ opacity: 0, y: 48, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.75, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="h-full flex flex-col"
    >
      {/* Gradient border shell */}
      <motion.div
        className="relative rounded-[28px] p-[1.5px] h-full flex flex-col"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${accent}48 0%, ${accent}14 40%, ${accentB}36 100%)`
            : `linear-gradient(135deg, ${accent}16 0%, transparent 50%, ${accentB}12 100%)`,
          transition: "background 0.4s ease",
        }}
      >
        {/* 3D tiltable card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="relative rounded-[27px] overflow-hidden cursor-pointer will-change-transform h-full flex flex-col"
          css-note="GPU accelerated via transform3d"
        >
          {/* Base surface */}
          <div
            className="absolute inset-0 rounded-[27px]"
            style={{
              background: "linear-gradient(160deg, rgba(12,18,40,0.97) 0%, rgba(6,10,24,0.99) 100%)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          />

          {/* Mouse-follow spotlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[27px]"
            style={{
              background: `radial-gradient(380px circle at ${glowPos.x}% ${glowPos.y}%, rgba(${accentRgb}, 0.07) 0%, transparent 65%)`,
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          />

          {/* Ambient corner glow */}
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, rgba(${accentRgb},0.09) 0%, transparent 70%)`,
              filter: "blur(20px)",
              opacity: hovered ? 0.7 : 0.25,
            }}
          />

          {/* ── Visual header ── */}
          <div
            className="relative overflow-hidden"
            style={{
              height: 210,
              background: `linear-gradient(155deg, rgba(${accentRgb},0.07) 0%, rgba(0,0,0,0) 65%)`,
            }}
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(${accentRgb},0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(${accentRgb},0.05) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
            {/* Radial glow at top */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% -10%, rgba(${accentRgb},0.12) 0%, transparent 60%)`,
              }}
            />
            {/* Animated illustration */}
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <CardVisual type={visual} accent={accent} accentB={accentB} hovered={hovered} />
            </motion.div>
            {/* Service number */}
            <span
              className="absolute top-4 left-5 text-[10px] font-black tracking-[0.22em] uppercase select-none"
              style={{ color: `rgba(${accentRgb},0.45)` }}
            >
              {num}
            </span>
            {/* Bottom vignette */}
            <div
              className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(6,10,24,0.99) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* ── Content ── */}
          <div className="relative px-7 pb-7 pt-2 flex-1 flex flex-col justify-between">
            {/* Top content wrapper */}
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    animate={{ borderColor: hovered ? `rgba(${accentRgb},0.45)` : `rgba(${accentRgb},0.2)` }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center text-[10px] px-2.5 py-1 rounded-full font-bold tracking-[0.12em] uppercase"
                    style={{
                      color: accent,
                      background: `rgba(${accentRgb}, 0.09)`,
                      border: `1px solid rgba(${accentRgb}, 0.2)`,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-[1.05rem] leading-snug mb-3 tracking-[-0.01em]">
                {title}
              </h3>

              {/* Description */}
              <p className="text-white/40 text-[0.82rem] leading-[1.8] mb-6">
                {description}
              </p>
            </div>

            {/* Bottom content wrapper */}
            <div>
              {/* Divider */}
              <motion.div
                className="w-full h-[1px] mb-5"
                style={{ background: `linear-gradient(90deg, rgba(${accentRgb},0.2), transparent)` }}
                animate={{ opacity: hovered ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
              />

            {/* CTA */}
            <div className="flex items-center justify-between">
              <Link href={`/services/${slug}`} className="group/btn flex items-center gap-2.5">
                <div
                  className="relative overflow-hidden flex items-center gap-2 text-[0.78rem] font-bold tracking-wide uppercase"
                  style={{ color: accent }}
                >
                  <span>Explore Service</span>
                  {/* Animated arrow cluster */}
                  <div className="relative w-4 h-4 overflow-hidden">
                    <motion.div
                      animate={{ x: hovered ? [0, 18] : 0 }}
                      transition={{ duration: 0.25, ease: "easeIn" }}
                      className="absolute inset-0 flex items-center"
                    >
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </motion.div>
                    <motion.div
                      animate={{ x: hovered ? ["-100%", "0%"] : "-100%" }}
                      transition={{ duration: 0.25, ease: "easeOut", delay: hovered ? 0.05 : 0 }}
                      className="absolute inset-0 flex items-center"
                    >
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </div>
              </Link>

              {/* Accent icon badge */}
              <motion.div
                animate={{
                  background: hovered
                    ? `rgba(${accentRgb}, 0.18)`
                    : `rgba(${accentRgb}, 0.08)`,
                  borderColor: hovered
                    ? `rgba(${accentRgb}, 0.4)`
                    : `rgba(${accentRgb}, 0.18)`,
                  boxShadow: hovered
                    ? `0 0 16px rgba(${accentRgb}, 0.25)`
                    : "none",
                }}
                transition={{ duration: 0.35 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center border"
              >
                <Icon size={15} style={{ color: accent }} strokeWidth={1.8} />
              </motion.div>
            </div>
          </div>
        </div>

          {/* Bottom edge glow on hover */}
          <motion.div
            className="absolute bottom-0 left-8 right-8 h-[1.5px] rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, ${accentB}, transparent)` }}
            animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Premium layered box-shadow — CSS via inline (Framer can't do multi-layer) */}
          <motion.div
            className="absolute inset-0 rounded-[27px] pointer-events-none"
            animate={{
              boxShadow: hovered
                ? `0 0 0 1px rgba(${accentRgb},0.35), 0 20px 60px rgba(0,0,0,0.6), 0 8px 24px rgba(${accentRgb},0.15), 0 0 80px rgba(${accentRgb},0.08)`
                : `0 0 0 0 transparent, 0 4px 20px rgba(0,0,0,0.4), 0 0 0 transparent`,
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cyberRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-10%" });
  const cyberInView = useInView(cyberRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({ target: cyberRef, offset: ["start end", "end start"] });
  const imgParallax = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <>
      {/* ── Services Grid ── */}
      <section
        id="services"
        ref={gridRef}
        className="relative py-36 overflow-hidden bg-white"
      >
        {/* Subtle light bg textures */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(37,99,235,0.04) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(6,182,212,0.03) 0%, transparent 55%)" }} />

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 left-1/3 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 65%)", filter: "blur(90px)" }} />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)", filter: "blur(90px)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 badge-on-light"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 pulse-glow" />
                <span className="text-blue-700 text-[11px] font-bold tracking-[0.2em] uppercase">Core Services</span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  animate={gridInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.06] tracking-[-0.03em]"
                >
                  Technology Solutions{" "}
                  <span className="gradient-text-dark">Built For Growth</span>
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.28, duration: 0.9 }}
                className="text-slate-500 text-[1.04rem] leading-[1.82] mt-5"
              >
                Six practice areas, one partner. From zero-trust security to AI-powered automation
                — everything your enterprise needs to operate, scale, and lead.
              </motion.p>
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 10 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
              whileHover={{ y: -2, scale: 1.02 }}
              className="group shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm text-white transition-all duration-300 self-start lg:self-end btn-shine hover:shadow-[0_8px_32px_rgba(37,99,235,0.25)]"
              style={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)",
              }}
            >
              View All Services
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <ServiceCard key={svc.slug} {...svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Cybersecurity Command Center ── */}
      <section
        ref={cyberRef}
        id="cybersecurity"
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #020810 0%, #080f1e 50%, #020810 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(37,99,235,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.8) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 65%)", filter: "blur(40px)" }} />
          <div className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)", filter: "blur(32px)" }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.4), rgba(37,99,235,0.4), transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={cyberInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-9"
                style={{ background: "rgba(37,99,235,0.14)", border: "1px solid rgba(37,99,235,0.32)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">Cybersecurity Command Center</span>
              </motion.div>

              <div className="overflow-hidden mb-7">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  animate={cyberInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl font-bold text-white leading-[1.08] tracking-[-0.025em]"
                >
                  <span className="text-cyan-300">24/7 Protection.</span>{" "}
                  <span className="gradient-text-dark">
                    Real-Time Defense.
                  </span>
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={cyberInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.95 }}
                className="text-white/52 text-[1.05rem] leading-[1.85] mb-12"
              >
                Our Security Operations Center provides continuous monitoring,
                global threat intelligence, and rapid incident response across
                your entire attack surface — detecting and neutralizing threats
                before they impact your business.
              </motion.p>

              <div className="grid grid-cols-2 gap-3">
                {cyberMetrics.map(({ icon: MIcon, label, value, delta, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={cyberInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: 0.38 + i * 0.1, duration: 0.7 }}
                    className="relative rounded-xl p-4 overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${color}20` }}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${color}15 0%, transparent 70%)` }} />
                    <MIcon size={14} style={{ color }} className="mb-2.5" />
                    <div className="text-xl font-bold text-white leading-none mb-1">{value}</div>
                    <div className="text-white/38 text-[10px] font-medium leading-tight mb-1.5">{label}</div>
                    <div className="text-[10px] font-bold" style={{ color }}>{delta}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={cyberInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div style={{ y: imgParallax }} className="relative">
                <div
                  className="absolute inset-[-12%] rounded-[2.5rem] pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 45% 50%, rgba(239,68,68,0.18) 0%, rgba(37,99,235,0.14) 45%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 0 0 1px rgba(239,68,68,0.18), 0 0 0 3px rgba(239,68,68,0.05), 0 40px 100px rgba(0,0,0,0.75), 0 0 60px rgba(239,68,68,0.08)",
                  }}
                >
                  <Image
                    src="/images/cybersecurity-command-center.png"
                    alt="Cybersecurity Command Center — 24/7 Monitoring"
                    width={660}
                    height={440}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(160deg, rgba(239,68,68,0.04) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)" }}
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <motion.div
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white"
                      style={{ background: "rgba(239,68,68,0.88)", backdropFilter: "blur(8px)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      LIVE MONITORING
                    </motion.div>
                  </div>
                  <motion.div
                    className="absolute left-0 right-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.6), transparent)" }}
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
