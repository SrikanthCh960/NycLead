"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home",       href: "/"             },
  { label: "About",      href: "/about"         },
  { label: "Services",   href: "/services"      },
  { label: "Industries", href: "/#industries"   },
  { label: "Contact",    href: "/contact"       },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Image
              src="/images/nyc-logo.avif"
              alt="NYC GravityNet"
              width={140}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
              >
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${
                    scrolled
                      ? "text-white/70 hover:text-white"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${
                      scrolled ? "bg-cyan-400" : "bg-blue-600"
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="btn-shine px-5 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 hover:shadow-[0_4px_20px_rgba(37,99,235,0.45)]"
            >
              Schedule Consultation
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${
              scrolled ? "text-white" : "text-white/90 hover:text-white"
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
        className="fixed inset-0 z-40 glass lg:hidden pt-20"
      >
        <div className="flex flex-col gap-8 p-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-white/90 border-b border-white/10 pb-4 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href="#contact"
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
