"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-black">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">
            Ready to Get Started?
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8" />
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of creators and investors building wealth through royalty streams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 h-auto rounded-full font-semibold group"
            >
              <Link href="/signup">
                Create Account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 h-auto border-2 border-white text-white hover:bg-white hover:text-black rounded-full"
            >
              <Link href="/catalog">
                Browse Catalogs
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
