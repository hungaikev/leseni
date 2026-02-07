"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const creatorFeatures = [
  "Raise money debt free",
  "Set your own terms",
  "Get funding in as quickly as a week",
];

const investorFeatures = [
  "Access income-generating assets",
  "Pre-vetted, verified listings",
  "Average ROI 10%+",
];

export function WhatWeDoSection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black">What We Do</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Leseni matches creators seeking funding with investors seeking catalogs.
            <br />
            <br />
            This gives creators the ability to raise money and fund their careers debt-free, 
            and investors access to a new, high-yield asset class.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Music Creators */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-2 border-gray-200 hover:border-[#D4AF37] transition-all bg-white">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                    <Music className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <CardTitle className="text-3xl text-black">Music Creators</CardTitle>
                </div>
                <CardDescription className="text-base text-gray-600">
                  Raise capital without giving up creative control
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {creatorFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full bg-black text-white hover:bg-gray-800 rounded-full mt-8" size="lg">
                  <Link href="/sell">
                    Get a Free Estimate
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Investors */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-2 border-gray-200 hover:border-[#D4AF37] transition-all bg-white">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <CardTitle className="text-3xl text-black">Investors</CardTitle>
                </div>
                <CardDescription className="text-base text-gray-600">
                  Build a portfolio of high-yield royalty assets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {investorFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full border-2 border-black text-black hover:bg-black hover:text-white rounded-full mt-8" size="lg">
                  <Link href="/signup">
                    Start Investing
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
