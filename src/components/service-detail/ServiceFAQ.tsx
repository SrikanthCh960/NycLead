"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { ServiceConfig } from "@/lib/services-data";

type Props = { faqs: ServiceConfig["faqs"]; accent: string; accentRgb: string };

function FAQItem({
  question, answer, accent, accentRgb, index, isOpen, onToggle,
}: {
  question: string; answer: string; accent: string; accentRgb: string;
  index: number; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.7 }}
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: isOpen ? `1px solid rgba(${accentRgb},0.28)` : "1px solid rgba(0,0,0,0.07)",
        background: isOpen ? `rgba(${accentRgb},0.025)` : "#ffffff",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-7 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-[0.97rem] leading-snug transition-colors duration-300 ${isOpen ? "" : "text-slate-900 group-hover:text-blue-700"}`}
          style={isOpen ? { color: accent } : {}}>
          {question}
        </span>
        <span className="shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? `rgba(${accentRgb},0.12)` : "rgba(0,0,0,0.04)",
            border: isOpen ? `1px solid rgba(${accentRgb},0.25)` : "1px solid rgba(0,0,0,0.08)",
          }}>
          {isOpen
            ? <Minus size={13} style={{ color: accent }} />
            : <Plus size={13} className="text-slate-500 group-hover:text-blue-600 transition-colors" />
          }
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="px-7 pb-7 text-slate-500 text-sm leading-[1.82]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServiceFAQ({ faqs, accent, accentRgb }: Props) {
  const ref      = useRef<HTMLElement>(null);
  const inView   = useInView(ref, { once: true, margin: "-12%" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#030912 0%,#060d1e 55%,#040b18 100%)" }}
    >
      <div className="absolute inset-0 opacity-[0.038] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(${accentRgb},0.55) 1px,transparent 1px),linear-gradient(90deg,rgba(${accentRgb},0.55) 1px,transparent 1px)`,
          backgroundSize: "68px 68px",
        }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,rgba(${accentRgb},0.45),rgba(37,99,235,0.3),transparent)` }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 py-36">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-9"
            style={{ background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.28)` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: accent }}>
              Frequently Asked Questions
            </span>
          </motion.div>

          <div className="overflow-hidden mb-5">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.12, duration: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl font-bold text-white leading-[1.07] tracking-[-0.028em]"
            >
              Common <span className="gradient-text">Questions</span>
            </motion.h2>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map(({ question, answer }, i) => (
            <FAQItem
              key={i}
              question={question}
              answer={answer}
              accent={accent}
              accentRgb={accentRgb}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
