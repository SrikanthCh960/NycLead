"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Share2, ExternalLink, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/#industries" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Cybersecurity Services", href: "/services/cybersecurity" },
  { label: "AI & Automation", href: "/services/ai-automation" },
  { label: "Cloud & DevOps", href: "/services/cloud-devops" },
  { label: "Custom Software", href: "/services/custom-software" },
  { label: "Data & Analytics", href: "/services/data-analytics" },
  { label: "Digital Transformation", href: "/services/digital-transformation" },
];

const socials = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: Share2, href: "#", label: "LinkedIn" },
  { icon: ExternalLink, href: "#", label: "Twitter" },
];

const contactItems = [
  { icon: MapPin, text: "New York City, NY 10001" },
  { icon: Phone, text: "+1 (212) 555-0100" },
  { icon: Mail, text: "hello@nycgravitynet.com" },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

function AnimatedLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center text-slate-500 hover:text-slate-800 text-sm transition-colors duration-300"
    >
      {children}
      <span className="absolute -bottom-px left-0 w-0 h-px bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300 rounded-full" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 border-t border-black/[0.06] overflow-hidden">
      {/* Top gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.30), rgba(6,182,212,0.20), transparent)" }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/[0.05] to-transparent pointer-events-none" />

      {/* Subtle right orb */}
      <div
        className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/images/nyc-logo.avif"
                alt="NYC GravityNet"
                width={140}
                height={48}
                className="h-10 w-auto object-contain mb-6 opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-7">
              Transforming businesses through AI, cybersecurity, and digital innovation.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-[0_4px_16px_rgba(37,99,235,0.12)] transition-colors duration-300"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeUp}>
            <h4 className="text-slate-800 font-semibold mb-6 text-xs uppercase tracking-[0.14em]">
              Company
            </h4>
            <ul className="space-y-3.5">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <AnimatedLink href={href}>{label}</AnimatedLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUp}>
            <h4 className="text-slate-800 font-semibold mb-6 text-xs uppercase tracking-[0.14em]">
              Services
            </h4>
            <ul className="space-y-3.5">
              {services.map(({ label, href }) => (
                <li key={label}>
                  <AnimatedLink href={href}>{label}</AnimatedLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="text-slate-800 font-semibold mb-6 text-xs uppercase tracking-[0.14em]">
              Contact
            </h4>
            <ul className="space-y-4 mb-8">
              {contactItems.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-slate-500">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={13} className="text-blue-600" />
                  </div>
                  <span className="leading-snug pt-1">{text}</span>
                </li>
              ))}
            </ul>

            <motion.a
              href="/contact"
              whileHover={{ y: -2 }}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_6px_24px_rgba(37,99,235,0.35)]"
              style={{ background: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)" }}
            >
              Get in Touch
              <ArrowUpRight
                size={13}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="border-t border-black/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} NYC GravityNet. All rights reserved.
          </p>
          <div className="flex gap-6">
            <AnimatedLink href="#">Privacy Policy</AnimatedLink>
            <AnimatedLink href="#">Terms of Service</AnimatedLink>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
