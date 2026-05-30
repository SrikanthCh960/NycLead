"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";

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

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 2,
          ease: "power2.out" as gsap.EaseString,
        }
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
      {/* Background Image */}
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

      {/* Layered overlays */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-10 bg-gradient-to-b from-white/90 via-white/70 to-white"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/80 via-transparent to-white/50" />

      {/* Animated accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent z-20 origin-left"
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
          transition={{ delay: 0.5, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600 pulse-glow" />
          <span className="text-blue-600 text-xs font-semibold tracking-widest uppercase">
            Enterprise Technology Consulting
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-8">
          {headline.map((line, i) => (
            <div key={i} className="text-clip">
              <motion.div
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.7 + i * 0.15,
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <h1
                  className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight ${i === 2 ? "gradient-text" : "text-slate-900"
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
        >
          NYC GravityNet helps organizations secure, modernize, and scale with
          intelligent technology solutions that drive measurable business outcomes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <a
            href="#contact"
            className="group relative flex items-center gap-2 px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-slate-900 font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-0.5"
          >
            Schedule a Consultation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href="#services"
            className="group flex items-center gap-2 px-7 py-4 rounded-xl glass-light hover:bg-black/10 text-slate-900 font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore Services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/5 rounded-2xl overflow-hidden max-w-3xl"
        >
          {stats.map(({ value, label }, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm px-6 py-5 flex flex-col"
            >
              <span className="text-3xl md:text-4xl font-bold gradient-text-blue mb-1">{value}</span>
              <span className="text-slate-500 text-xs font-medium leading-tight">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
