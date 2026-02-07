"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users, Music } from "lucide-react";

const stats = [
  { icon: DollarSign, value: "$2.4M+", label: "Total Volume Traded", color: "text-emerald-500" },
  { icon: TrendingUp, value: "156%", label: "Avg. Annual Return", color: "text-blue-500" },
  { icon: Users, value: "1,200+", label: "Active Investors", color: "text-purple-500" },
  { icon: Music, value: "450+", label: "Catalogs Listed", color: "text-amber-500" },
];

export function StatsSection() {
  return (
    <section className="py-20 px-4 border-y border-border/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

