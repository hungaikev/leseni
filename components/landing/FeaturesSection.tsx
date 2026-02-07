"use client";

import { motion } from "framer-motion";
import { Shield, Zap, BarChart3, Lock, Globe, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Verified",
    description: "All catalogs undergo rigorous verification and KYC checks",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Zap,
    title: "Real-time Bidding",
    description: "Live auction updates with instant notifications",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: BarChart3,
    title: "Transparent Data",
    description: "Historical earnings and projections for every catalog",
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    icon: Lock,
    title: "Escrow Protection",
    description: "Secure transactions with automated payout systems",
    gradient: "from-amber-500/20 to-orange-500/20"
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Trade royalty streams from anywhere in the world",
    gradient: "from-indigo-500/20 to-blue-500/20"
  },
  {
    icon: Clock,
    title: "24/7 Marketplace",
    description: "Round-the-clock access to listings and auctions",
    gradient: "from-rose-500/20 to-pink-500/20"
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for creators and investors who demand excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className={`h-full p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl`}>
                <div className="w-12 h-12 rounded-xl bg-background/50 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

