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
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Do</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leseni matches creators seeking funding with investors seeking catalogs.
            <br />
            <br />
            This gives creators the ability to raise money and fund their careers debt-free, 
            and investors access to a new, high-yield asset class.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Music Creators */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Music className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Music Creators</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Raise capital without giving up creative control
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {creatorFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full mt-6" size="lg">
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
            <Card className="h-full border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-500" />
                  </div>
                  <CardTitle className="text-2xl">Investors</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Build a portfolio of high-yield royalty assets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {investorFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full mt-6" size="lg">
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

