"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Target, TrendingUp } from "lucide-react";

const intro_pillars = [
  {
    icon: Target,
    label: "Strategic Alignment",
    body: "Every solution starts with your business objectives — not technology for technology's sake.",
  },
  {
    icon: Zap,
    label: "Rapid Delivery",
    body: "Agile methodology and experienced teams mean you see results in weeks, not quarters.",
  },
  {
    icon: TrendingUp,
    label: "Scalable Outcomes",
    body: "We architect for where you're going, ensuring solutions compound value as you grow.",
  },
];

export default function ServicesIntro() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#ffffff 0%,#f8fafc 60%,#ffffff 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.15),transparent)" }} />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[460px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center,rgba(37,99,235,0.032) 0%,transparent 68%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-32 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-9"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">What We Do</span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-8">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-slate-900 leading-[1.07] tracking-[-0.025em]"
          >
            Empowering Businesses{" "}
            <span className="gradient-text-dark">Through Technology</span>
          </motion.h2>
        </div>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28, duration: 0.9 }}
          className="text-slate-600 text-[1.07rem] leading-[1.88] mb-5 max-w-3xl mx-auto"
        >
          At NYC GravityNet, we provide end-to-end technology services that help
          organizations overcome challenges, accelerate innovation, and achieve
          sustainable growth.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="text-slate-500 text-base leading-[1.88] mb-16 max-w-3xl mx-auto"
        >
          Our team combines strategic consulting, technical expertise, and
          industry best practices to deliver solutions tailored to your unique
          business needs — from first concept through long-term support.
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 1.0 }}
          className="w-16 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mb-16 origin-center"
        />

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          {intro_pillars.map(({ icon: Icon, label, body }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.12, duration: 0.85 }}
              className="group flex flex-col items-center text-center p-8 rounded-2xl card-surface transition-all duration-500"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-full relative" />
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                <Icon size={20} className="text-blue-600" />
              </div>
              <h3 className="text-slate-900 font-semibold text-[0.97rem] mb-3 group-hover:text-blue-700 transition-colors duration-300">
                {label}
              </h3>
              <p className="text-slate-500 text-sm leading-[1.78]">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
