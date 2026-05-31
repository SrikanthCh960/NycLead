"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, ShieldCheck, Lightbulb, Star, Users2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: "Client First",
    tagline: "Your success is our success.",
    body: "Every decision we make starts with one question: what is best for the client? We invest deeply in understanding your business, culture, and goals before recommending a single solution.",
    accent: "#ef4444",
    number: "01",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    tagline: "Honest, transparent, accountable.",
    body: "We say what we mean and deliver what we promise. When challenges arise — and they always do — we communicate proactively, own our responsibilities, and find solutions without finger-pointing.",
    accent: "#2563eb",
    number: "02",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    tagline: "Boldly challenge convention.",
    body: "We continuously explore emerging technologies and unconventional approaches. We encourage our teams to question assumptions and bring creative, forward-thinking solutions to every engagement.",
    accent: "#f59e0b",
    number: "03",
  },
  {
    icon: Star,
    title: "Excellence",
    tagline: "Quality in every detail.",
    body: "We hold ourselves to the highest standards of craft, rigor, and professionalism. From architecture reviews to final delivery, we don't ship mediocrity — we engineer work we're proud to put our name on.",
    accent: "#06b6d4",
    number: "04",
  },
  {
    icon: Users2,
    title: "Collaboration",
    tagline: "Better together, always.",
    body: "Great outcomes emerge from diverse perspectives working in unison. We embed deeply with client teams, foster psychological safety, and build bridges across organizational silos to unlock collective intelligence.",
    accent: "#a78bfa",
    number: "05",
  },
];

export default function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-12%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".value-card",
        { opacity: 0, y: 44, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)" }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.18), transparent)" }} />

      {/* Decorative blob */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.035) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-9"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">Core Values</span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.12, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.06] tracking-[-0.028em]"
            >
              The Principles That{" "}
              <span className="gradient-text-dark">Guide Us</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="text-slate-500 text-[1.04rem] leading-[1.85]"
          >
            These aren't words on a wall. They're the commitments we make to our
            clients, our people, and the broader technology community every single day.
          </motion.p>
        </div>

        {/* Values grid: 3 top + 2 bottom (centered) */}
        <div ref={gridRef}>
          {/* Top row: 3 cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-5">
            {values.slice(0, 3).map(({ icon: Icon, title, tagline, body, accent, number }) => (
              <div
                key={title}
                className="value-card opacity-0 group relative card-surface rounded-2xl p-8 overflow-hidden transition-all duration-500 cursor-default"
              >
                {/* Top accent line on hover */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />

                {/* Number watermark */}
                <span
                  className="absolute top-5 right-6 text-[3.5rem] font-black leading-none select-none opacity-[0.038] group-hover:opacity-[0.07] transition-opacity duration-500"
                  style={{ color: accent }}
                >
                  {number}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${accent}10`, border: `1px solid ${accent}22` }}
                >
                  <Icon size={22} style={{ color: accent }} />
                </div>

                <h3 className="text-slate-900 font-bold text-[1.08rem] mb-1.5 transition-colors duration-300">
                  {title}
                </h3>
                <div
                  className="text-xs font-semibold uppercase tracking-[0.14em] mb-4"
                  style={{ color: accent }}
                >
                  {tagline}
                </div>
                <p className="text-slate-500 text-sm leading-[1.82]">{body}</p>

                {/* Bottom glow line on hover */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}55, transparent)` }}
                />
              </div>
            ))}
          </div>

          {/* Bottom row: 2 cards centered */}
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {values.slice(3).map(({ icon: Icon, title, tagline, body, accent, number }) => (
              <div
                key={title}
                className="value-card opacity-0 group relative card-surface rounded-2xl p-8 overflow-hidden transition-all duration-500 cursor-default"
              >
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />
                <span
                  className="absolute top-5 right-6 text-[3.5rem] font-black leading-none select-none opacity-[0.038] group-hover:opacity-[0.07] transition-opacity duration-500"
                  style={{ color: accent }}
                >
                  {number}
                </span>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${accent}10`, border: `1px solid ${accent}22` }}
                >
                  <Icon size={22} style={{ color: accent }} />
                </div>
                <h3 className="text-slate-900 font-bold text-[1.08rem] mb-1.5">{title}</h3>
                <div
                  className="text-xs font-semibold uppercase tracking-[0.14em] mb-4"
                  style={{ color: accent }}
                >
                  {tagline}
                </div>
                <p className="text-slate-500 text-sm leading-[1.82]">{body}</p>
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}55, transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
