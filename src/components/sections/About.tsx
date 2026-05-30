"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const pillars = [
  {
    num: "01",
    title: "Strategic Vision",
    body: "We align every technology decision with your long-term business objectives, ensuring every solution compounds value over time.",
  },
  {
    num: "02",
    title: "Secure by Design",
    body: "Security isn't bolted on after the fact. It's woven into the fabric of every architecture, pipeline, and process we build.",
  },
  {
    num: "03",
    title: "Measurable Outcomes",
    body: "We track what matters. From cost reduction to revenue enablement, our engagements deliver quantifiable, board-level results.",
  },
  {
    num: "04",
    title: "Continuous Partnership",
    body: "We don't disappear after delivery. We evolve alongside your organization, adapting to every shift in the technology landscape.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/70 to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-blue-600/25" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-24">
          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">
                Who We Are
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-[-0.02em] text-slate-900 mb-6"
              >
                Your Strategic{" "}
                <span className="gradient-text-dark">Technology</span>{" "}
                Partner
              </motion.h2>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="w-14 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 origin-left rounded-full"
            />
          </div>

          {/* Right — paragraphs */}
          <div className="space-y-7">
            {[
              "At NYC GravityNet, we help businesses navigate the complexities of today's digital landscape through innovative, secure, and scalable technology solutions.",
              "Our team of seasoned technologists, architects, and strategists combine deep domain expertise with a relentless focus on outcomes. We don't just implement tools — we architect transformations that position your organization as a technology leader in your industry.",
              "From Fortune 500 enterprises to high-growth scale-ups, our clients share one thing in common: they chose NYC GravityNet to solve their hardest technology challenges and unlock new possibilities.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.28 + i * 0.14, duration: 0.9 }}
                className={`leading-[1.8] ${
                  i === 0
                    ? "text-slate-700 text-lg font-[450]"
                    : "text-slate-500 text-base"
                }`}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Pillars — white cards with accent numbers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map(({ num, title, body }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.1, duration: 0.85 }}
              className="card-surface group relative rounded-2xl p-8 transition-all duration-500 overflow-hidden"
            >
              {/* Top accent bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-full" />

              <span className="block text-[2.5rem] font-black text-slate-100 leading-none mb-4 select-none group-hover:text-blue-50 transition-colors duration-300">
                {num}
              </span>
              <h3 className="text-slate-900 font-semibold mb-3 group-hover:text-blue-700 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-[1.75]">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
