"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "40+", label: "Industries Served" },
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction Rate" },
];

const headline = ["Transforming Businesses", "Through AI, Cybersecurity", "& Digital Innovation"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [primaryPos, setPrimaryPos] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 130]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.18 },
        { scale: 1, duration: 3, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with zoom */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src="/images/nyc-banner.avif"
          alt="NYC GravityNet Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Primary overlay — white wash that lets the image breathe */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(155deg, rgba(248,250,252,0.93) 0%, rgba(239,246,255,0.82) 35%, rgba(255,255,255,0.96) 100%)",
        }}
      />
      {/* Left-side blue depth accent */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-100/30 via-transparent to-transparent" />

      {/* Subtle dot-grid for depth */}
      <div
        className="absolute inset-0 z-[11] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Animated top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px z-20 origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(37,99,235,0.7), rgba(6,182,212,0.5), transparent)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-32"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full badge-on-light mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 pulse-glow" />
          <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">
            Enterprise Technology Consulting
          </span>
        </motion.div>

        {/* Headline — cinematic word-by-word reveal */}
        <div className="mb-9">
          {headline.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.62 + i * 0.13,
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h1
                  className={`text-5xl md:text-6xl lg:text-7xl xl:text-[5.75rem] 2xl:text-[6.5rem] font-bold leading-[1.02] tracking-[-0.025em] ${
                    i === 2 ? "gradient-text-dark" : "text-slate-900"
                  }`}
                >
                  {line}
                </h1>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.12, duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-slate-600 text-lg md:text-xl max-w-xl leading-[1.7] mb-12 font-[430]"
        >
          NYC GravityNet helps organizations secure, modernize, and scale with
          intelligent technology solutions that drive measurable business outcomes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap gap-4 mb-20"
        >
          {/* Magnetic primary CTA */}
          <motion.a
            href="#contact"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPrimaryPos({
                x: (e.clientX - rect.left - rect.width / 2) * 0.28,
                y: (e.clientY - rect.top - rect.height / 2) * 0.28,
              });
            }}
            onMouseLeave={() => setPrimaryPos({ x: 0, y: 0 })}
            animate={{ x: primaryPos.x, y: primaryPos.y }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="btn-shine group relative flex items-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-300 hover:shadow-[0_8px_48px_rgba(37,99,235,0.4)]"
          >
            Schedule a Consultation
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.a>

          <a
            href="#services"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-white/70 backdrop-blur-sm hover:bg-white text-slate-700 hover:text-slate-900 font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore Services
            <ArrowRight
              size={15}
              className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300"
            />
          </a>
        </motion.div>

        {/* Stats — horizontal dividers */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.52, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap"
        >
          {stats.map(({ value, label }, i) => (
            <div
              key={i}
              className={`pr-8 py-2 flex flex-col gap-0.5 ${
                i !== 0 ? "pl-8 border-l border-slate-200" : ""
              } ${i !== stats.length - 1 ? "mr-0" : ""}`}
            >
              <span className="text-2xl md:text-[1.75rem] font-bold text-slate-900 leading-none">
                {value}
              </span>
              <span className="text-slate-500 text-xs font-medium mt-1 leading-tight">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — thin line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-semibold text-slate-400 tracking-[0.22em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-blue-500/60 to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
}
