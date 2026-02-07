"use client";

import { motion } from "framer-motion";
import { Shield, Zap, BarChart3, Lock, Globe, Clock } from "lucide-react";

const features = [
  {
    number: "01",
    icon: Shield,
    title: "Secure & Verified",
    description: "All catalogs undergo rigorous verification and KYC checks to ensure authenticity and compliance",
  },
  {
    number: "02",
    icon: Zap,
    title: "Real-time Bidding",
    description: "Live auction updates with instant notifications so you never miss an opportunity",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Transparent Data",
    description: "Historical earnings and projections for every catalog with full financial transparency",
  },
  {
    number: "04",
    icon: Lock,
    title: "Escrow Protection",
    description: "Secure transactions with automated payout systems protecting both buyers and sellers",
  },
  {
    number: "05",
    icon: Globe,
    title: "Global Access",
    description: "Trade royalty streams from anywhere in the world with seamless cross-border transactions",
  },
  {
    number: "06",
    icon: Clock,
    title: "24/7 Marketplace",
    description: "Round-the-clock access to listings and auctions whenever you're ready to trade",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Why Choose Our Platform
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-4" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Built for creators and investors who demand excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full">
                {/* Large Number Background */}
                <div className="relative mb-6">
                  <div className="text-7xl md:text-8xl font-bold text-gray-100 group-hover:text-[#D4AF37]/20 transition-colors duration-300">
                    {feature.number}
                  </div>
                  <div className="absolute top-0 left-0 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-black group-hover:text-[#D4AF37] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

