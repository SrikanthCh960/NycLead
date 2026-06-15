"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight, Clock, Sparkles, Printer } from "lucide-react";
import { submitContactForm } from "./actions";
import { CONTACT_EMAIL } from "@/lib/contact-config";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ── Reusable 3D-tilt hook ────────────────────────────────────────────── */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cfg = { stiffness: 180, damping: 28, mass: 0.6 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]), cfg);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-7, 7]), cfg);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [rawX, rawY]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

/* ── Contact Info Card ────────────────────────────────────────────────── */
function ContactInfoCard() {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();
  const [hovered, setHovered] = useState(false);

  const contactItems = [
    { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, clickable: true },
    {
      icon: MapPin, label: "New York Office", value: (
        <>
          NYC GRAVITYNET LLC<br />
          445 Broadhollow Rd, Suite 210<br />
          Melville, NY 11747
        </>
      ), href: null, clickable: false
    },
    {
      icon: MapPin, label: "Hyderabad Office", value: (
        <>
          Ground Floor, Sidhi Vinayak Nilayam<br />
          Plot No 63, Nallagandla Rd<br />
          Hyderabad, Telangana 500019
        </>
      ), href: null, clickable: false
    },
    { icon: Phone, label: "Office (US)", value: "631-390-8621", href: "tel:6313908621", clickable: true },
    { icon: Phone, label: "Office (India)", value: "099890 57925", href: "tel:09989057925", clickable: true },
    { icon: Printer, label: "Fax", value: "631-390-8620", href: null, clickable: false },
  ];

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { onMouseLeave(); setHovered(false); }}
      className="relative rounded-2xl p-8 overflow-hidden cursor-default will-change-transform"
      style={{
        rotateX, rotateY, transformStyle: "preserve-3d",
        background: "#ffffff",
        border: `1px solid ${hovered ? "rgba(37,99,235,0.25)" : "rgba(0,0,0,0.06)"}`,
        boxShadow: hovered
          ? "0 16px 48px rgba(37,99,235,0.10), 0 4px 16px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.04)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full transition-transform duration-500 origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, #2563eb, #06b6d4, transparent)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
        }}
      />

      <h2 className="text-base font-semibold text-slate-900 mb-6">Contact Information</h2>

      <ul className="space-y-5">
        {contactItems.map(({ icon: Icon, label, value, href, clickable }) => (
          <li key={label} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.12em] font-semibold mb-0.5">{label}</p>
              {clickable && href ? (
                <a href={href} className="text-slate-700 hover:text-blue-600 transition-colors text-sm font-medium">
                  {value}
                </a>
              ) : (
                <span className="text-slate-700 text-sm font-medium">{value}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ── Office Hours Card ────────────────────────────────────────────────── */
function OfficeHoursCard() {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { onMouseLeave(); setHovered(false); }}
      className="relative rounded-2xl p-8 overflow-hidden cursor-default will-change-transform"
      style={{
        rotateX, rotateY, transformStyle: "preserve-3d",
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #0284c7 100%)",
        boxShadow: hovered
          ? "0 20px 48px rgba(37,99,235,0.45), inset 0 1px 0 rgba(255,255,255,0.15)"
          : "0 8px 32px rgba(37,99,235,0.22)",
        transition: "box-shadow 0.3s",
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      {/* Shine overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-30"
        style={{ background: "radial-gradient(ellipse at top left, rgba(255,255,255,0.2) 0%, transparent 60%)" }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
            <Clock size={15} className="text-white" />
          </div>
          <h3 className="font-semibold text-white text-base">Office Hours</h3>
        </div>

        <div className="space-y-2.5">
          {[
            { day: "Monday – Friday", hours: "9 AM – 6 PM EST" },
            { day: "Saturday", hours: "10 AM – 2 PM EST" },
            { day: "Sunday", hours: "Closed" },
          ].map(({ day, hours }) => (
            <div key={day} className="flex items-center justify-between">
              <span className="text-white/70 text-xs font-medium">{day}</span>
              <span className="text-white text-xs font-semibold">{hours}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-white/15">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/75 text-xs font-medium">24/7 Emergency Support Available</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Contact Page ────────────────────────────────────────────────── */
export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10%" });

  return (
    <SmoothScroll>
      <Navbar />
      <main
        className="min-h-screen pt-28 pb-24 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #1636da 0%, #1636da 50%, #1636da 100%)" }}
      >
        {/* Ambient decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-60"
            style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage: "linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

          {/* ── Header ── */}
          <div ref={headerRef} className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
              <span className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase">Get In Touch</span>
            </motion.div>

            <div className="overflow-hidden mb-5">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.12, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.06] tracking-[-0.025em]"
              >
                Let&apos;s Build Something{" "}
                <span className="gradient-text-dark">Extraordinary</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="text-white/60 text-[1.05rem] max-w-xl mx-auto leading-[1.85]"
            >
              Have a project in mind? We&apos;d love to hear about it. Send us a message
              and we&apos;ll get back to you within 24 hours.
            </motion.p>
          </div>

          {/* ── Grid: Sidebar + Form ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="space-y-5"
              style={{ perspective: 1000 }}
            >
              <ContactInfoCard />
              <OfficeHoursCard />
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="lg:col-span-2"
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 4px 32px rgba(37,99,235,0.06), 0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {/* Form header accent */}
                <div
                  className="px-8 lg:px-10 pt-8 pb-6 border-b border-slate-100"
                  style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.03) 0%, rgba(6,182,212,0.02) 100%)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <Sparkles size={15} className="text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-slate-900 font-semibold text-base">Send us a message</h2>
                      <p className="text-slate-400 text-xs mt-0.5">We respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                <form action={submitContactForm} className="px-8 lg:px-10 py-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-600 uppercase tracking-[0.1em] mb-2">
                        Full Name <span className="text-red-400 normal-case">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Smith"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-500 focus:bg-white transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-600 uppercase tracking-[0.1em] mb-2">
                        Email Address <span className="text-red-400 normal-case">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-500 focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-600 uppercase tracking-[0.1em] mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (212) 555-0100"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-500 focus:bg-white transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-slate-600 uppercase tracking-[0.1em] mb-2">
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Project inquiry"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-500 focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-600 uppercase tracking-[0.1em] mb-2">
                      Message <span className="text-red-400 normal-case">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us about your project, goals, or challenges — we'd love to help..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-500 focus:bg-white transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit + Trust */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-1">
                    <button
                      type="submit"
                      className="btn-shine group inline-flex items-center justify-center gap-2.5 px-10 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:shadow-[0_8px_32px_rgba(37,99,235,0.40)] hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)" }}
                    >
                      Send Message
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>

                    <p className="text-slate-400 text-xs leading-relaxed">
                      By submitting, you agree to our{" "}
                      <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                      We&apos;ll never share your information.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
