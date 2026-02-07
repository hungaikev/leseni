"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users, Music } from "lucide-react";

const stats = [
  { icon: DollarSign, value: "$2.4M+", label: "Total Volume Traded", color: "text-[#D4AF37]" },
  { icon: TrendingUp, value: "156%", label: "Avg. Annual Return", color: "text-[#D4AF37]" },
  { icon: Users, value: "1,200+", label: "Active Investors", color: "text-[#D4AF37]" },
  { icon: Music, value: "450+", label: "Catalogs Listed", color: "text-[#D4AF37]" },
];

export function StatsSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white border-y border-gray-200">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-black">
            Leseni in Numbers
          </h2>
          <p className="text-gray-600 text-lg">
            The story the numbers tell – growth, trust, and real-world value
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#D4AF37]/10 mb-6 group-hover:bg-[#D4AF37]/20 transition-colors">
                <stat.icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.color}`} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-3 text-black"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

