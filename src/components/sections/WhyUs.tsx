"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Lock,
  Zap,
  BookOpen,
  TrendingUp,
  HeadphonesIcon,
} from "lucide-react";

const items = [
  {
    icon: Users,
    title: "Client-Centric Approach",
    body: "Your goals become our mission. We embed deeply into your organization to understand priorities, culture, and constraints before we write a single line of code.",
  },
  {
    icon: Lock,
    title: "Security-First Mindset",
    body: "Every engagement starts with threat modeling. Security is architected in from day one, never retrofitted — protecting your data, reputation, and customers.",
  },
  {
    icon: Zap,
    title: "Agile Delivery",
    body: "Rapid iteration, transparent communication, and continuous delivery mean you see progress weekly — not quarterly. Speed without sacrificing quality.",
  },
  {
    icon: BookOpen,
    title: "Industry Expertise",
    body: "Deep domain knowledge across healthcare, finance, retail, and manufacturing means we speak your language and understand your regulatory landscape.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    body: "We architect for where you're going, not just where you are. Our solutions grow gracefully from startup scale to enterprise grade without costly rewrites.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    body: "Named account teams, 24/7 monitoring, and proactive optimization mean you're never left managing technology complexity on your own.",
  },
];

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="why" ref={ref} className="relative py-32 bg-slate-50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-line" />

      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/4 rounded-full blur-3xl" />
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-cyan-500/4 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">
              Why Choose Us
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-[-0.02em]"
            >
              Why Organizations{" "}
              <span className="gradient-text-dark">Choose Us</span>
            </motion.h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-200">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.4, duration: 1.6, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-b from-blue-600/70 to-cyan-500/50 origin-top"
            />
          </div>

          <div className="space-y-0">
            {items.map(({ icon: Icon, title, body }, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: isEven ? -36 : 36 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.28 + i * 0.14,
                    duration: 0.9,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`relative flex items-start gap-8 py-8 md:py-10 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div
                    className={`flex-1 pl-20 md:pl-0 ${
                      isEven ? "md:text-right md:pr-16" : "md:pl-16"
                    }`}
                  >
                    <div className="card-surface group rounded-2xl p-6 transition-all duration-500">
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isEven ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200/60 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors duration-300">
                          <Icon size={16} className="text-blue-600" />
                        </div>
                        <h3 className="text-slate-900 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                          {title}
                        </h3>
                      </div>
                      <p className="text-slate-500 text-sm leading-[1.75]">{body}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.14, duration: 0.4 }}
                      className="w-4 h-4 rounded-full bg-white border-2 border-blue-600 shadow-sm"
                    />
                  </div>

                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
