"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Share2, ExternalLink, Mail, Phone, MapPin } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Cybersecurity Services",
  "AI & Automation",
  "Cloud & DevOps",
  "Custom Software",
  "Data & Analytics",
  "Digital Transformation",
];

const socials = [
  { icon: Globe, href: "#" },
  { icon: Share2, href: "#" },
  { icon: ExternalLink, href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 border-t border-black/5 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/images/nyc-logo.avif"
              alt="NYC GravityNet"
              width={140}
              height={48}
              className="h-10 w-auto object-contain mb-6"
            />
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Transforming businesses through AI, cybersecurity, and digital innovation.
            </p>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-600/30 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-6 text-sm uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-slate-500 hover:text-slate-900 text-sm transition-colors duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-6 text-sm uppercase tracking-widest">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-slate-500 hover:text-slate-900 text-sm transition-colors duration-300"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-6 text-sm uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <span>New York City, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <Phone size={16} className="text-blue-600 shrink-0" />
                <span>+1 (212) 555-0100</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <Mail size={16} className="text-blue-600 shrink-0" />
                <span>hello@nycgravitynet.com</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-t border-black/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-400 text-sm">
            © 2024 NYC GravityNet. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
