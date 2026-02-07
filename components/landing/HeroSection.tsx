"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                The World's Premier
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Royalty Marketplace
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-2">
                Debt-free funding for creators.
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground mb-2">
                Financial Security. Artistic Freedom.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 h-auto group">
                <Link href="/sell">
                  Get a Catalog Deal Estimate
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto border-2">
                <Link href="/catalog">
                  Get access to royalty assets
                  <TrendingUp className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Featured Listing Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-2 shadow-2xl hover:shadow-primary/10 transition-shadow">
              <CardContent className="p-0">
                {/* Featured Badge */}
                <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
                  Live Now!
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      Music From Award-Winning Film Franchise
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      This asset earns from music written for award-winning film franchises. 
                      The catalog generates royalties when the films air on TV, are streamed online, 
                      and when this music plays in soundtracks and theme park experiences.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">LTM</div>
                      <div className="text-2xl font-bold">$235,003</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">List Price</div>
                      <div className="text-2xl font-bold">$2,300,000</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Monthly</Badge>
                      <Badge variant="default">Live Now</Badge>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/catalog">
                        See the Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
