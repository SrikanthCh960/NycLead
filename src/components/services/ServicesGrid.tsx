"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield, Brain, Cloud, Code2, BarChart3, Layers,
  ArrowUpRight, Server, GitBranch, Database,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  image?: string;
  icon?: React.ElementType;
  iconBg?: string;
  iconColor?: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
  tags: string[];
};

const services: Service[] = [
  {
    slug: "cybersecurity",
    title: "Cybersecurity Services",
    shortDesc:
      "Protect your organization from evolving cyber threats through proactive, enterprise-grade security solutions and 24/7 monitoring.",
    image: "/images/cybersecurity-command-center.png",
    accent: "#ef4444",
    accentSoft: "rgba(239,68,68,0.10)",
    accentBorder: "rgba(239,68,68,0.22)",
    tags: ["Zero Trust", "SOC", "Compliance"],
  },
  {
    slug: "ai-automation",
    title: "AI & Intelligent Automation",
    shortDesc:
      "Leverage AI and automation to dramatically improve efficiency, accelerate innovation, and enable smarter decision-making at scale.",
    image: "/images/ai-operations-dashboard.png",
    accent: "#06b6d4",
    accentSoft: "rgba(6,182,212,0.10)",
    accentBorder: "rgba(6,182,212,0.22)",
    tags: ["LLMs", "MLOps", "RPA"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps Solutions",
    shortDesc:
      "Modernize infrastructure and accelerate delivery with scalable, resilient cloud architectures and automated CI/CD pipelines.",
    image: "/images/technology-consulting-platform.png",
    accent: "#2563eb",
    accentSoft: "rgba(37,99,235,0.10)",
    accentBorder: "rgba(37,99,235,0.22)",
    tags: ["AWS", "Azure", "Kubernetes"],
  },
  {
    slug: "custom-software",
    title: "Custom Software Development",
    shortDesc:
      "Build secure, scalable, and performant applications tailored precisely to your business needs and growth trajectory.",
    image: "/images/software-engineering-collaboration.jpeg",
    accent: "#a78bfa",
    accentSoft: "rgba(167,139,250,0.10)",
    accentBorder: "rgba(167,139,250,0.22)",
    tags: ["Full-Stack", "APIs", "Mobile"],
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    shortDesc:
      "Transform raw data into actionable business intelligence with modern data platforms, pipelines, and predictive analytics.",
    image: "/images/services-innovation-center.png",
    accent: "#f59e0b",
    accentSoft: "rgba(245,158,11,0.10)",
    accentBorder: "rgba(245,158,11,0.22)",
    tags: ["Data Lake", "BI", "Real-time"],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation Consulting",
    shortDesc:
      "Develop comprehensive strategies and technology roadmaps that drive long-term business growth and competitive advantage.",
    image: "/images/technology-strategy-workshop.png",
    accent: "#22c55e",
    accentSoft: "rgba(34,197,94,0.10)",
    accentBorder: "rgba(34,197,94,0.22)",
    tags: ["Strategy", "Roadmap", "Change Mgmt"],
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const hasImage = Boolean(service.image);

  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="svc-card opacity-0 group relative rounded-2xl overflow-hidden flex flex-col will-change-transform"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${service.accentBorder}`,
        backdropFilter: "blur(10px)",
        boxShadow: hovered 
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${service.accentSoft}, inset 0 1px 0 rgba(255,255,255,0.05)`
          : "0 4px 24px rgba(0,0,0,0.28)",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transition: "border 0.3s, box-shadow 0.3s",
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      {hovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${service.accentSoft} 0%, transparent 65%)`,
          }}
        />
      )}
      {/* ── Card Header: image OR icon ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: hasImage ? "16/9" : "auto" }}>
        {hasImage ? (
          <>
            <Image
              src={service.image!}
              alt={service.title}
              width={640}
              height={360}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
            />
            {/* Dark gradient overlay on image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(160deg, rgba(0,0,0,0.12) 0%, transparent 45%, rgba(2,6,15,0.55) 100%)",
              }}
            />
            {/* Accent tint on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `linear-gradient(160deg, ${service.accentSoft} 0%, transparent 60%)` }}
            />
          </>
        ) : (
          /* Icon-only header */
          <div
            className="flex items-center justify-center py-12"
            style={{ background: `linear-gradient(135deg, rgba(3,8,22,0.90) 0%, rgba(6,12,28,0.95) 100%)` }}
          >
            {/* Large decorative icon watermark */}
            <div className="relative flex items-center justify-center">
              <div
                className="absolute w-32 h-32 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle, ${service.accentSoft} 0%, transparent 70%)`,
                  filter: "blur(16px)",
                }}
              />
              <div
                className="relative w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-400"
                style={{
                  background: service.iconBg,
                  border: `1.5px solid ${service.accentBorder}`,
                  boxShadow: `0 0 32px ${service.accentSoft}`,
                }}
              >
                {service.icon && (
                  <service.icon size={38} style={{ color: service.accent }} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Top accent bar on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
        />
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-7">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-md"
              style={{
                background: service.accentSoft,
                color: service.accent,
                border: `1px solid ${service.accentBorder}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-bold text-white text-[1.08rem] leading-snug mb-3 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/45 text-sm leading-[1.82] flex-1 mb-7">
          {service.shortDesc}
        </p>

        {/* Learn More */}
        <Link
          href={`/services/${service.slug}`}
          className="group/btn self-start inline-flex items-center gap-2 text-xs font-semibold transition-all duration-300"
          style={{ color: service.accent }}
        >
          Learn More
          <ArrowUpRight
            size={13}
            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Bottom edge glow on hover */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}60, transparent)` }}
      />
    </motion.div>
  );
}

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-8%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services-grid"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#030912 0%,#060d1e 55%,#040b18 100%)" }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.7) 1px,transparent 1px), linear-gradient(90deg,rgba(37,99,235,0.7) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(37,99,235,0.08) 0%,transparent 68%)", filter: "blur(40px)" }} />
        <div className="absolute right-1/4 bottom-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(6,182,212,0.06) 0%,transparent 68%)", filter: "blur(36px)" }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.5),rgba(6,182,212,0.35),transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-9"
            style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.28)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
            <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">Service Portfolio</span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.12, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.07] tracking-[-0.028em]"
            >
              End-to-End Technology{" "}
              <span className="gradient-text">Solutions</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="text-white/46 text-[1.04rem] leading-[1.85]"
          >
            Six specialised practice areas, one unified team — working together
            to accelerate your digital future.
          </motion.p>
        </div>

        {/* Services grid — 3 columns */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
