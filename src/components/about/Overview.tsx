"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowUpRight, Award, Globe2, Users2, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  "End-to-end digital transformation strategy and execution",
  "Deep expertise across AI, cybersecurity, cloud, and engineering",
  "Partnerships with Fortune 500 enterprises and high-growth startups",
  "Measurable outcomes — cost reduction, revenue growth, efficiency gains",
];

const milestones = [
  { icon: Award,     value: "2009",  label: "Founded in New York City" },
  { icon: Globe2,    value: "40+",   label: "Countries Served Globally" },
  { icon: Users2,    value: "1,200+",label: "Technology Professionals" },
  { icon: TrendingUp,value: "$2.1B+",label: "Client Value Delivered" },
];

export default function AboutOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-12%" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".milestone-card",
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 82%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 60%, #ffffff 100%)" }}
    >
      {/* top divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.18), transparent)" }} />

      {/* subtle bg orb */}
      <div className="absolute right-0 top-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.038) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">

        {/* ── Split: Image Left / Content Right ── */}
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-28 items-center mb-28">

          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <motion.div ref={imageRef} style={{ y: imgY }} className="relative">
              {/* Glow halo */}
              <div
                className="absolute inset-[-10%] rounded-[2.5rem] pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.10) 0%, rgba(6,182,212,0.05) 50%, transparent 70%)",
                  filter: "blur(28px)",
                }}
              />

              {/* Image */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 0 0 1px rgba(37,99,235,0.10), 0 32px 80px rgba(0,0,0,0.10), 0 8px 24px rgba(37,99,235,0.06)",
                }}
              >
                <Image
                  src="/images/company-overview-team.png"
                  alt="NYC GravityNet Consulting Team — Strategic Planning Session"
                  width={680}
                  height={500}
                  className="w-full h-auto object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                {/* subtle warm highlight */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 55%)" }}
                />
              </div>

              {/* Floating "Our Approach" tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-5 -right-4 z-10"
              >
                <div
                  className="px-5 py-4 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.97)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(37,99,235,0.14)",
                    boxShadow: "0 16px 48px rgba(37,99,235,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.18em] mb-1">
                    Engagement Model
                  </div>
                  <div className="text-slate-900 font-bold text-sm leading-snug">
                    Consult · Strategize<br />Implement · Optimize
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-9"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">Who We Are</span>
            </motion.div>

            <div className="overflow-hidden mb-7">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.1, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.07] tracking-[-0.025em]"
              >
                Your Strategic{" "}
                <span className="gradient-text-dark">Technology Partner</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="w-12 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 origin-left rounded-full mb-9"
            />

            {[
              {
                text: "NYC GravityNet is a premier technology consulting firm headquartered in New York City, dedicated to helping organizations harness the full power of digital transformation.",
                large: true,
              },
              {
                text: "Our multidisciplinary teams of architects, engineers, and strategists bring decades of combined expertise across AI & automation, cybersecurity, cloud infrastructure, and custom software engineering.",
                large: false,
              },
              {
                text: "We operate as an extension of your leadership team — translating complex technology challenges into clear strategies, and those strategies into measurable, lasting outcomes.",
                large: false,
              },
            ].map(({ text, large }, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.9 }}
                className={`leading-[1.88] mb-6 ${large ? "text-slate-700 text-[1.07rem] font-[450]" : "text-slate-500 text-base"}`}
              >
                {text}
              </motion.p>
            ))}

            {/* Key highlight points */}
            <div className="space-y-3 mt-8 mb-10">
              {highlights.map((h, i) => (
                <motion.div
                  key={h}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.62 + i * 0.1, duration: 0.75 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={16} className="text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-slate-600 text-sm leading-[1.75] font-medium">{h}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.75 }}
              className="group inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-300"
            >
              Start Your Transformation
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.a>
          </div>
        </div>

        {/* ── Milestone stats row ── */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="milestone-card opacity-0 group relative card-surface rounded-2xl px-7 py-7 overflow-hidden transition-all duration-500"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-full" />
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                <Icon size={18} className="text-blue-600" />
              </div>
              <div className="text-[2rem] font-bold text-slate-900 leading-none mb-2 group-hover:text-blue-700 transition-colors duration-300">
                {value}
              </div>
              <div className="text-slate-500 text-sm font-medium leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
