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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />

      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-blue-600 text-xs font-semibold tracking-widest uppercase">
              Why Choose Us
            </span>
          </motion.div>

          <div className="text-clip">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
            >
              Why Organizations{" "}
              <span className="gradient-text">Choose Us</span>
            </motion.h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-black/5">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.4, duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-b from-blue-600/60 to-blue-600/60 origin-top"
            />
          </div>

          <div className="space-y-0">
            {items.map(({ icon: Icon, title, body }, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`relative flex items-start gap-8 py-8 md:py-10 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-20 md:pl-0 ${isEven ? "md:text-right md:pr-16" : "md:pl-16"}`}>
                    <div
                      className={`group glass-light rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1`}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:flex-row-reverse" : ""}`}>
                        <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0">
                          <Icon size={16} className="text-blue-600" />
                        </div>
                        <h3 className="text-slate-900 font-semibold">{title}</h3>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                      className="w-4 h-4 rounded-full bg-slate-50 border-2 border-blue-600"
                    />
                  </div>

                  {/* Empty side for alternating */}
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
