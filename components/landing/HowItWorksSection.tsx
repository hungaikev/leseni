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
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple, transparent process for both creators and investors
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Creator Flow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">For Creators</h3>
              <p className="text-muted-foreground">Sell your royalty streams in 4 simple steps</p>
            </div>
            <div className="space-y-6">
              {creatorSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-2 hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <step.icon className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-primary">STEP {step.step}</span>
                          </div>
                          <h4 className="text-lg font-bold mb-1">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
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
              <h3 className="text-2xl font-bold mb-2">For Investors</h3>
              <p className="text-muted-foreground">Start investing in royalties in 4 simple steps</p>
            </div>
            <div className="space-y-6">
              {investorSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-2 hover:border-emerald-500/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <step.icon className="w-6 h-6 text-emerald-500" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-emerald-500">STEP {step.step}</span>
                          </div>
                          <h4 className="text-lg font-bold mb-1">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
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
