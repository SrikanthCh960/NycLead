"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const headline = ["Transforming Businesses", "Through AI, Cybersecurity", "& Digital Innovation"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [primaryPos, setPrimaryPos] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  // Parallax on background — moves slower than scroll
  const bgY = useTransform(scrollY, [0, 800], ["0%", "20%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium continuous Ken Burns effect
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });

      // Start slightly scaled and offset
      gsap.set(bgRef.current, { scale: 1.2, x: "2%", y: "1.5%" });

      tl.to(bgRef.current, {
        scale: 1.1,
        x: "-3%",
        y: "-2.5%",
        duration: 12,
        ease: "sine.inOut",
      })
      .to(bgRef.current, {
        scale: 1.25,
        x: "3%",
        y: "-1.5%",
        duration: 13,
        ease: "sine.inOut",
      })
      .to(bgRef.current, {
        scale: 1.15,
        x: "-1.5%",
        y: "3%",
        duration: 12,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── NYC Banner background with parallax ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 will-change-transform overflow-hidden"
      >
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <Image
            src="/images/nyc-banner.avif"
            alt="NYC GravityNet"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </motion.div>

      {/* ── Overlay layers ── */}
      {/* Strong left-to-right gradient — text area is dark, right side lets image breathe */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(100deg, rgba(2,6,18,0.92) 0%, rgba(3,9,24,0.85) 38%, rgba(4,12,28,0.70) 65%, rgba(2,8,20,0.50) 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[2]"
        style={{ background: "linear-gradient(to top, rgba(2,6,18,0.95), transparent)" }}
      />
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 z-[2]"
        style={{ background: "linear-gradient(to bottom, rgba(2,6,18,0.75), transparent)" }}
      />

      {/* Blue accent glow behind text */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 0% 55%, rgba(37,99,235,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(ellipse 60% 90% at 30% 50%, black 10%, transparent 100%)",
        }}
      />

      {/* ── Top accent line ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.0, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px z-20 origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(37,99,235,0.9), rgba(6,182,212,0.7), rgba(255,255,255,0.3), transparent)",
        }}
      />

      {/* ── Main content — centered ── */}
      <motion.div
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-24 w-full"
      >
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(37,99,235,0.22)",
              border: "1px solid rgba(99,179,237,0.45)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 pulse-glow" />
            <span className="text-cyan-200 text-xs font-bold tracking-[0.18em] uppercase">
              Enterprise Technology Consulting
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-6">
            {headline.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.14,
                    duration: 1.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <h1
                    className={`font-extrabold leading-[1.08] tracking-[-0.024em]
                      text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                      ${i === 2
                        ? "gradient-text"
                        : "text-white"
                      }`}
                    style={i !== 2 ? {
                      textShadow: "0 2px 24px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)",
                    } : {}}
                  >
                    {line}
                  </h1>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.95 }}
            className="text-slate-200 text-sm sm:text-base md:text-lg leading-[1.8] mb-10 max-w-2xl font-[430]"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.8)" }}
          >
            NYC GravityNet helps organizations secure, modernize, and scale
            with intelligent technology solutions that drive measurable
            business outcomes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.28, duration: 0.85 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="/contact"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setPrimaryPos({
                  x: (e.clientX - r.left - r.width / 2) * 0.3,
                  y: (e.clientY - r.top - r.height / 2) * 0.3,
                });
              }}
              onMouseLeave={() => setPrimaryPos({ x: 0, y: 0 })}
              animate={{ x: primaryPos.x, y: primaryPos.y }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="btn-shine group relative flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:shadow-[0_8px_48px_rgba(37,99,235,0.65)] hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#1d4ed8 0%,#0891b2 100%)" }}
            >
              Schedule a Consultation
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>

            <a
              href="#services"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(14px)",
              }}
            >
              Explore Services
              <ArrowRight size={15} className="ml-0.5 text-white/60 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all duration-300" />
            </a>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-semibold text-white/35 tracking-[0.22em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
}
