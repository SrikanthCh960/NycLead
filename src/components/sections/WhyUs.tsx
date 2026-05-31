"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Lock, Zap, BookOpen, TrendingUp, HeadphonesIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { icon: Users, title: "Client-Centric Approach", body: "Your goals become our mission. We embed deeply into your organization to understand priorities, culture, and constraints before we write a single line of code." },
  { icon: Lock, title: "Security-First Mindset", body: "Every engagement starts with threat modeling. Security is architected in from day one, never retrofitted — protecting your data, reputation, and customers." },
  { icon: Zap, title: "Agile Delivery", body: "Rapid iteration, transparent communication, and continuous delivery mean you see progress weekly — not quarterly. Speed without sacrificing quality." },
  { icon: BookOpen, title: "Industry Expertise", body: "Deep domain knowledge across healthcare, finance, retail, and manufacturing means we speak your language and understand your regulatory landscape." },
  { icon: TrendingUp, title: "Scalable Solutions", body: "We architect for where you're going, not just where you are. Our solutions grow gracefully from startup scale to enterprise grade without costly rewrites." },
  { icon: HeadphonesIcon, title: "Dedicated Support", body: "Named account teams, 24/7 monitoring, and proactive optimization mean you're never left managing technology complexity on your own." },
];

const aiHighlights = [
  { label: "Models Deployed", value: "24", sub: "+12% this quarter" },
  { label: "Predictions / 24h", value: "1.23M", sub: "+8.3% vs last week" },
  { label: "Overall Accuracy", value: "98.7%", sub: "+2.4% improvement" },
  { label: "Active Pipelines", value: "18", sub: "+5 newly launched" },
];

export default function WhyUs() {
  const aiRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const aiInView = useInView(aiRef, { once: true, margin: "-10%" });
  const whyInView = useInView(whyRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({ target: aiRef, offset: ["start end", "end start"] });
  const imgParallax = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".why-card", { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, stagger: 0.12, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: whyRef.current, start: "top 78%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="why" className="relative overflow-hidden">

      {/* ── AI Operations — Image 1 featured again ── */}
      <div
        ref={aiRef}
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px section-line" />

        {/* Subtle bg orb */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)" }} />
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Left — Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={aiInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-9"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">AI & Intelligent Automation</span>
              </motion.div>

              <div className="overflow-hidden mb-7">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  animate={aiInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.08] tracking-[-0.025em]"
                >
                  Intelligence at{" "}
                  <span className="gradient-text-dark">Enterprise Scale</span>
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={aiInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.95 }}
                className="text-slate-500 text-[1.05rem] leading-[1.85] mb-12"
              >
                Our AI Operations platform continuously monitors deployed models,
                ensures peak prediction accuracy, and automates intelligent pipelines
                — keeping your business ahead of the curve around the clock.
              </motion.p>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-4">
                {aiHighlights.map(({ label, value, sub }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={aiInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: 0.38 + i * 0.1, duration: 0.7 }}
                    className="card-surface group rounded-2xl p-5 transition-all duration-400 hover:-translate-y-0.5"
                  >
                    <div className="text-[1.8rem] font-bold text-slate-900 leading-none mb-1.5 group-hover:text-blue-700 transition-colors duration-300">
                      {value}
                    </div>
                    <div className="text-slate-500 text-xs font-semibold mb-1">{label}</div>
                    <div className="text-emerald-600 text-[10px] font-medium">{sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Image 1: AI Dashboard (floating) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aiInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <motion.div style={{ y: imgParallax }} className="relative">
                {/* Glow halo */}
                <div
                  className="absolute inset-[-10%] rounded-[2.5rem] pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(37,99,235,0.14) 0%, rgba(6,182,212,0.06) 50%, transparent 70%)",
                    filter: "blur(24px)",
                  }}
                />

                {/* Image with floating animation */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 0 0 1px rgba(37,99,235,0.14), 0 24px 70px rgba(37,99,235,0.12), 0 40px 100px rgba(0,0,0,0.08)",
                  }}
                >
                  <Image
                    src="/images/ai-operations-dashboard.png"
                    alt="AI Operations Dashboard"
                    width={660}
                    height={440}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Subtle highlight */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, transparent 50%)" }}
                  />
                </motion.div>

                {/* "All Systems Operational" floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={aiInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-4 right-4 z-10"
                >
                  <div
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
                    style={{
                      background: "rgba(5,12,28,0.82)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      color: "#22c55e",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
                    All Systems Operational
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Why Choose Us — Timeline ── */}
      <div ref={whyRef} className="relative py-36 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-px section-line" />

        {/* Decorative blobs */}
        <div className="absolute right-0 top-1/3 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)" }} />
        <div className="absolute left-0 bottom-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-9"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">Why Choose Us</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={whyInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.06] tracking-[-0.025em]"
              >
                Why Organizations{" "}
                <span className="gradient-text-dark">Choose Us</span>
              </motion.h2>
            </div>
          </div>

          {/* Modern card grid instead of timeline */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="why-card card-surface group relative rounded-2xl p-8 transition-all duration-500 overflow-hidden opacity-0"
              >
                {/* Top hover bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-full" />

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center mb-6 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                  <Icon size={20} className="text-blue-600" />
                </div>

                {/* Number watermark */}
                <span className="absolute top-6 right-7 text-[2.8rem] font-black text-slate-100 leading-none select-none group-hover:text-blue-50 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="text-slate-900 font-semibold text-[1.02rem] mb-3 group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
                <p className="text-slate-500 text-sm leading-[1.78]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
