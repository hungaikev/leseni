"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function MarketplaceSection() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold">The Marketplace</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The marketplace is where deals happen. It is an open, transparent platform that 
            connects creators with investors.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of registered investors and make offers directly on hundreds of 
            royalty assets - from music catalogs to trademark royalties. New assets are listed weekly.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All listed assets have historical income, cleared for assignment by our team, 
            and open for offers today.
          </p>
          <div className="pt-6">
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <Link href="/catalog">
                Go To The Marketplace
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

