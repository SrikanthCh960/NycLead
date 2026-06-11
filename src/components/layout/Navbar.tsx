"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Shield, Brain, Cloud, Code2, BarChart3, Layers } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Cybersecurity Services", href: "/services/cybersecurity", icon: Shield, color: "#ef4444" },
  { label: "AI & Intelligent Automation", href: "/services/ai-automation", icon: Brain, color: "#06b6d4" },
  { label: "Cloud & DevOps Solutions", href: "/services/cloud-devops", icon: Cloud, color: "#2563eb" },
  { label: "Custom Software Development", href: "/services/custom-software", icon: Code2, color: "#a78bfa" },
  { label: "Data & Analytics", href: "/services/data-analytics", icon: BarChart3, color: "#f59e0b" },
  { label: "Digital Transformation", href: "/services/digital-transformation", icon: Layers, color: "#22c55e" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > lastScrollY.current && y > 120);
    setScrolled(y > 60);
    lastScrollY.current = y;
  });

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b border-white/5" : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link href="/">
              <Image
                src="/images/nyc-logo.png"
                alt="NYC GravityNet"
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {/* Home */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link
                href="/"
                className={`text-base font-medium transition-colors duration-300 relative group ${pathname === "/"
                  ? "text-white"
                  : scrolled ? "text-white/70 hover:text-white" : "text-white/90 hover:text-white"}`}
              >
                Home
                <span className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${pathname === "/" ? "w-full bg-cyan-400" : `w-0 group-hover:w-full ${scrolled ? "bg-cyan-400" : "bg-blue-600"}`}`} />
              </Link>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.6 }}
            >
              <Link
                href="/about"
                className={`text-base font-medium transition-colors duration-300 relative group ${pathname === "/about"
                  ? "text-white"
                  : scrolled ? "text-white/70 hover:text-white" : "text-white/90 hover:text-white"}`}
              >
                About
                <span className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${pathname === "/about" ? "w-full bg-cyan-400" : `w-0 group-hover:w-full ${scrolled ? "bg-cyan-400" : "bg-blue-600"}`}`} />
              </Link>
            </motion.div>

            {/* Services dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56, duration: 0.6 }}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={`text-base font-medium transition-colors duration-300 relative group inline-flex items-center gap-1 ${pathname.startsWith("/services")
                  ? "text-white"
                  : scrolled ? "text-white/70 hover:text-white" : "text-white/90 hover:text-white"}`}
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                />
                <span className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${pathname.startsWith("/services") ? "w-full bg-cyan-400" : `w-0 group-hover:w-full ${scrolled ? "bg-cyan-400" : "bg-blue-600"}`}`} />
              </Link>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl overflow-hidden z-50"
                    style={{
                      background: "rgba(6,12,28,0.96)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(37,99,235,0.12)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <div className="px-2 py-2">
                      {serviceLinks.map(({ label, href, icon: Icon, color }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl group/item transition-all duration-200 hover:bg-white/[0.06]"
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover/item:scale-110"
                            style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                          >
                            <Icon size={13} style={{ color }} />
                          </div>
                          <span className="text-sm font-medium text-white/70 group-hover/item:text-white transition-colors duration-200">
                            {label}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 pb-3 pt-1 border-t border-white/[0.06]">
                      <Link
                        href="/services"
                        className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                      >
                        View All Services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.64, duration: 0.6 }}
            >
              <Link
                href="/contact"
                className={`text-base font-medium transition-colors duration-300 relative group ${pathname === "/contact"
                  ? "text-white"
                  : scrolled ? "text-white/70 hover:text-white" : "text-white/90 hover:text-white"}`}
              >
                Contact
                <span className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${pathname === "/contact" ? "w-full bg-cyan-400" : `w-0 group-hover:w-full ${scrolled ? "bg-cyan-400" : "bg-blue-600"}`}`} />
              </Link>
            </motion.div>
            <motion.a
              href="/contact"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="btn-shine px-5 py-2.5 text-base font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 hover:shadow-[0_4px_20px_rgba(37,99,235,0.45)]"
            >
              Schedule Consultation
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${scrolled ? "text-white" : "text-white/90 hover:text-white"
              }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed inset-0 z-40 glass lg:hidden pt-20 overflow-y-auto"
      >
        <div className="flex flex-col gap-6 p-8">
          <Link href="/" onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semibold border-b pb-4 transition-colors ${pathname === "/" ? "text-white border-cyan-400" : "text-white/90 border-white/10 hover:text-white"}`}>
            Home
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semibold border-b pb-4 transition-colors ${pathname === "/about" ? "text-white border-cyan-400" : "text-white/90 border-white/10 hover:text-white"}`}>
            About
          </Link>

          {/* Mobile Services accordion */}
          <div className="border-b border-white/10 pb-4">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between text-2xl font-semibold text-white/90"
            >
              Services
              <ChevronDown size={20} className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {mobileServicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 flex flex-col gap-1">
                    {serviceLinks.map(({ label, href, icon: Icon, color }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                          <Icon size={13} style={{ color }} />
                        </div>
                        <span className="text-base font-medium text-white/70">{label}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/contact" onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semibold border-b pb-4 transition-colors ${pathname === "/contact" ? "text-white border-cyan-400" : "text-white/90 border-white/10 hover:text-white"}`}>
            Contact
          </Link>
          <a
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-6 py-3 text-center font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            Schedule Consultation
          </a>
        </div>
      </motion.div>
    </>
  );
}
