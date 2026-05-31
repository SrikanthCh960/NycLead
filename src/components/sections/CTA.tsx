"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, Phone, Calendar } from "lucide-react";

const contactOptions = [
  { icon: Mail, label: "Email Us", sub: "hello@nycgravitynet.com" },
  { icon: Phone, label: "Call Us", sub: "+1 (212) 555-0190" },
  { icon: Calendar, label: "Book a Call", sub: "30-min strategy session" },
];

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgParallax = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden" style={{ minHeight: "640px" }}>

      {/* Background — Image 2: Cybersecurity (low opacity, parallax) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y: bgParallax }} className="absolute inset-[-10%]">
          <Image
            src="/images/cybersecurity-command-center.png"
            alt=""
            fill
            className="object-cover object-center scale-110"
            sizes="100vw"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* Dark overlay stack — creates depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-blue-950/97 via-slate-950/95 to-[#060d1a]/97" />

      {/* Center radial glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none"
      >
        <div
          className="float-orb w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.16) 0%, rgba(6,182,212,0.06) 45%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px z-[3]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.8), rgba(6,182,212,0.6), transparent)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-40">
        <div className="text-center mb-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
            style={{ background: "rgba(37,99,235,0.14)", border: "1px solid rgba(37,99,235,0.32)", backdropFilter: "blur(8px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
            <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">Get Started Today</span>
          </motion.div>

          {/* Heading */}
          <div className="overflow-hidden mb-7">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold text-white leading-[1.06] tracking-[-0.028em]"
            >
              Ready to Accelerate Your{" "}
              <span className="gradient-text">Digital Transformation?</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.95 }}
            className="text-white/52 text-lg md:text-[1.15rem] max-w-2xl mx-auto mb-14 leading-[1.8]"
          >
            Partner with NYC GravityNet to build secure, scalable, and
            future-ready technology solutions that position you ahead of the
            competition.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.85 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-5"
          >
            <motion.a
              href="mailto:hello@nycgravitynet.com"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setPos({ x: (e.clientX - r.left - r.width / 2) * 0.28, y: (e.clientY - r.top - r.height / 2) * 0.28 });
              }}
              onMouseLeave={() => setPos({ x: 0, y: 0 })}
              animate={{ x: pos.x, y: pos.y }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="btn-shine group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-[1.05rem] text-white transition-all duration-300 hover:shadow-[0_0_80px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)" }}
            >
              Book a Free Consultation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>

            <motion.a
              href="#services"
              className="group inline-flex items-center gap-2.5 px-8 py-5 rounded-2xl border border-white/12 hover:border-white/25 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white/75 hover:text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Services
              <ArrowRight size={15} className="text-white/35 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="text-white/28 text-sm font-medium"
          >
            No commitment required · Response within 24 hours · Trusted by 200+ enterprises
          </motion.p>
        </div>

        {/* Contact option cards */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {contactOptions.map(({ icon: Icon, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85 + i * 0.12, duration: 0.7 }}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl text-center cursor-default transition-all duration-400 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ background: "rgba(37,99,235,0.18)", border: "1px solid rgba(37,99,235,0.3)" }}
              >
                <Icon size={18} className="text-cyan-400" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold mb-0.5">{label}</div>
                <div className="text-white/40 text-xs">{sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
