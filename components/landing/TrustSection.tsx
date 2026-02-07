"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "$200M+", label: "Raised by Rightsholders" },
  { value: "2,300+", label: "Deals Completed" },
];

const logos = [
  "Rolling Stone",
  "Los Angeles Times",
  "Forbes",
  "Billboard",
  "Fast Company",
  "Wall Street Journal",
];

export function TrustSection() {
  return (
    <section className="py-20 px-4 bg-white border-y border-gray-200">
      <div className="container mx-auto">
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-16 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold mb-2 text-black">{stat.value}</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Press Logos */}
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="text-sm font-semibold text-black"
            >
              {logo}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.a
            href="/catalog"
            className="text-[#D4AF37] hover:text-[#B8941F] transition-colors font-medium uppercase tracking-wide text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            See all Listings
          </motion.a>
        </div>
      </div>
    </section>
  );
}
