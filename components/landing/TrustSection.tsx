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
    <section className="py-16 px-4 bg-muted/30 border-y">
      <div className="container mx-auto">
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Press Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="text-sm font-semibold text-muted-foreground"
            >
              {logo}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <motion.a
            href="/catalog"
            className="text-primary hover:underline font-medium"
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

