"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search, Gavel, TrendingUp, Upload, CheckCircle2, DollarSign, BarChart3 } from "lucide-react";

const creatorSteps = [
  {
    icon: Upload,
    title: "Create Your Catalog",
    description: "Upload your catalog details, historical earnings data, and supporting documents",
    step: "1",
  },
  {
    icon: FileText,
    title: "Submit for Review",
    description: "Our team reviews and verifies your catalog before listing",
    step: "2",
  },
  {
    icon: CheckCircle2,
    title: "Get Approved",
    description: "Once approved, your listing goes live on the marketplace",
    step: "3",
  },
  {
    icon: DollarSign,
    title: "Receive Funding",
    description: "Get paid upfront when your catalog is sold - debt-free funding",
    step: "4",
  },
];

const investorSteps = [
  {
    icon: Search,
    title: "Browse Catalogs",
    description: "Explore verified royalty assets with transparent earnings data",
    step: "1",
  },
  {
    icon: BarChart3,
    title: "Analyze & Research",
    description: "Review historical earnings, projections, and asset details",
    step: "2",
  },
  {
    icon: Gavel,
    title: "Place Your Bid",
    description: "Participate in auctions or buy fixed-price listings instantly",
    step: "3",
  },
  {
    icon: TrendingUp,
    title: "Own & Earn",
    description: "Receive ongoing cashflows as royalties are distributed",
    step: "4",
  },
];

export function HowItWorksSection() {
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
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black">How It Works</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-4" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A simple, transparent process for both creators and investors
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Creator Flow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-2 text-black">For Creators</h3>
              <p className="text-gray-600">Sell your royalty streams in 4 simple steps</p>
            </div>
            <div className="relative space-y-6">
              {/* Vertical Connector Line */}
              <div className="hidden lg:block absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200" />
              
              {creatorSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Dot */}
                  <div className="hidden lg:block absolute left-7 top-6 w-3 h-3 rounded-full bg-[#D4AF37] border-4 border-white z-10 -translate-x-1/2" />
                  
                  <Card className="border-2 border-gray-200 hover:border-[#D4AF37] transition-all bg-white ml-0 lg:ml-12">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                            <step.icon className="w-7 h-7 text-[#D4AF37]" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl font-bold text-gray-300 mr-2">
                              {step.step.padStart(2, '0')}
                            </span>
                            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wide">STEP</span>
                          </div>
                          <h4 className="text-lg font-bold mb-1 text-black">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Investor Flow */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-2 text-black">For Investors</h3>
              <p className="text-gray-600">Start investing in royalties in 4 simple steps</p>
            </div>
            <div className="relative space-y-6">
              {/* Vertical Connector Line */}
              <div className="hidden lg:block absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200" />
              
              {investorSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Dot */}
                  <div className="hidden lg:block absolute left-7 top-6 w-3 h-3 rounded-full bg-[#D4AF37] border-4 border-white z-10 -translate-x-1/2" />
                  
                  <Card className="border-2 border-gray-200 hover:border-[#D4AF37] transition-all bg-white ml-0 lg:ml-12">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                            <step.icon className="w-7 h-7 text-[#D4AF37]" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl font-bold text-gray-300 mr-2">
                              {step.step.padStart(2, '0')}
                            </span>
                            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wide">STEP</span>
                          </div>
                          <h4 className="text-lg font-bold mb-1 text-black">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
