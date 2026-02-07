"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="w-full h-full">
        <div className="grid lg:grid-cols-2 h-screen">
          {/* Left Column - Content */}
          <div className="flex items-center justify-center p-8 lg:p-16 bg-white">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl space-y-8"
            >
              {/* Headline with Gold Accent */}
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                  <span className="text-black">Creating</span>
                  <br />
                  <span className="flex items-center gap-3">
                    <Music className="w-12 h-12 md:w-16 md:h-16 text-[#D4AF37]" />
                    <span className="text-[#D4AF37]">Musical</span>
                  </span>
                  <br />
                  <span className="text-black">Wealth</span>
                </h1>
                
                {/* Gold Separator Line */}
                <div className="w-24 h-1 bg-[#D4AF37] mt-6" />
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                We envision a marketplace that connects creators with investors, 
                providing debt-free funding for artists while offering investors 
                access to high-yield royalty assets in an evolving musical landscape.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  asChild
                  className="rounded-full font-semibold px-8 py-6 h-auto text-base group"
                >
                  <Link href="/catalog">
                    EXPLORE OUR MARKETPLACE
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual with Gold Accent */}
          <div className="relative bg-black overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(212, 175, 55, 0.1) 10px,
                  rgba(212, 175, 55, 0.1) 20px
                )`
              }} />
            </div>

            {/* Main Visual Element */}
            <div className="relative h-full flex items-center justify-center p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative"
              >
                {/* Gold Accent Element - Music Note or Instrument */}
                <div className="relative">
                  {/* Decorative Gold Circle */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#D4AF37] opacity-20 blur-3xl" />
                  
                  {/* Main Gold Element */}
                  <div className="relative z-10">
                    <Music className="w-64 h-64 md:w-80 md:h-80 text-[#D4AF37]" strokeWidth={1.5} />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-10 left-10 w-16 h-16 rounded-full bg-[#D4AF37] opacity-30 blur-xl"
                  />
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-[#D4AF37] opacity-20 blur-xl"
                  />
                </div>
              </motion.div>
            </div>

            {/* Curved Bottom Edge */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg
                viewBox="0 0 1200 120"
                fill="white"
                className="w-full h-24 md:h-32"
                preserveAspectRatio="none"
              >
                <path d="M0,120 Q300,60 600,80 T1200,100 L1200,120 Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
