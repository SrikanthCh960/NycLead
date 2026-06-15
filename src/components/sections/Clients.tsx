"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const clients = [
  { name: "AT&T", file: "Attnt logo.png" },
  { name: "Comcast", file: "Comcast.jpg" },
  { name: "Verizon", file: "veri.png" },
  { name: "Meta", file: "Meta-Logo.png" },
  { name: "FedEx", file: "4373166_fedex_logo_logos_icon.png" },
  { name: "Humana", file: "Humana.jpg" },
  { name: "Cigna", file: "Cigna.png" },
  { name: "Ascension", file: "Ascension-Emblem.png" },
  { name: "Tenet Healthcare", file: "1280px-Tenet_Healthcare_logo.svg.png" },
  { name: "Abrazo Health", file: "abrazo_health_logo-h-cmyk.png" },
  { name: "CareFirst", file: "logo-carefirst.svg" },
  { name: "Beacon", file: "Beacon.png" },
  { name: "SVB", file: "SVB logo.png" },
  { name: "First Citizens Bank", file: "BrandLogo.org-First-Citizens-Bank-Logo.png" },
  { name: "Truist Bank", file: "Truist Bank.png" },
  { name: "Centene", file: "Centene_logo_PNG7.png" },
  { name: "CenterPoint Energy", file: "CenterPointEnergy.jpg" },
  { name: "Oncor", file: "oncor_logo.png" },
  { name: "Nucor", file: "Nucor.svg" },
  { name: "Champion Homes", file: "champion-homes.png" },
  { name: "Mosaic", file: "Mosaic.jpg" },
  { name: "Montgomery County", file: "Montogomery county logo.png" },
  { name: "DHHS", file: "DHHS.png" },
  { name: "Adecco", file: "adecco png.png" },
  { name: "Signit", file: "Signit.png" },
  { name: "Sreeson", file: "sreeson.png" },
];

function ClientLogo({ name, file }: { name: string; file: string }) {
  return (
    <div className="flex items-center justify-center px-6 py-3 rounded-xl border border-slate-200 bg-white shrink-0 mx-3 min-w-[140px] h-[72px] hover:border-blue-300 hover:shadow-md transition-all duration-300">
      <Image
        src={`/clients/${file}`}
        alt={name}
        width={110}
        height={48}
        className="object-contain max-h-[48px] w-auto transition-all duration-300"
        unoptimized
      />
    </div>
  );
}

const row1 = clients.slice(0, 13);
const row2 = clients.slice(13);

export default function Clients() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-line" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-on-light mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span className="text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase">
              Clients
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-[-0.02em]"
            >
              Trusted By Leading{" "}
              <span className="gradient-text-dark">Organizations</span>
            </motion.h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="space-y-4"
        >
          {/* Row 1 */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, #ffffff, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{ background: "linear-gradient(-90deg, #ffffff, transparent)" }} />
            <div className="marquee-track">
              {[...row1, ...row1].map((c, i) => (
                <ClientLogo key={i} name={c.name} file={c.file} />
              ))}
            </div>
          </div>

          {/* Row 2 reversed */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, #ffffff, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{ background: "linear-gradient(-90deg, #ffffff, transparent)" }} />
            <div className="marquee-track-reverse">
              {[...row2, ...row2].map((c, i) => (
                <ClientLogo key={i} name={c.name} file={c.file} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
