"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Music } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ 
        y: 0,
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.95)",
        boxShadow: scrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none"
      }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-[#D4AF37] opacity-20 blur-sm group-hover:opacity-30 transition-opacity" />
              <div className="relative w-10 h-10 rounded-lg bg-[#D4AF37] flex items-center justify-center">
                <Music className="w-6 h-6 text-black" />
              </div>
            </div>
            <span className="text-xl font-bold text-black">LESENI</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/catalog" className="text-sm font-medium text-black hover:text-[#D4AF37] transition-colors uppercase tracking-wide">
              Browse
            </Link>
            <Link href="/sell" className="text-sm font-medium text-black hover:text-[#D4AF37] transition-colors uppercase tracking-wide">
              Sell
            </Link>
            <Link href="/portfolio" className="text-sm font-medium text-black hover:text-[#D4AF37] transition-colors uppercase tracking-wide">
              Portfolio
            </Link>
            <Link href="/help" className="text-sm font-medium text-black hover:text-[#D4AF37] transition-colors uppercase tracking-wide">
              Help
            </Link>
            <Button asChild variant="ghost" className="text-black hover:text-[#D4AF37]">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="rounded-full bg-[#D4AF37] hover:bg-[#B8941F] text-black">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-200 bg-white"
        >
          <div className="container mx-auto px-6 py-4 space-y-4">
            <Link href="/catalog" className="block text-sm font-medium text-black uppercase">Browse</Link>
            <Link href="/sell" className="block text-sm font-medium text-black uppercase">Sell</Link>
            <Link href="/portfolio" className="block text-sm font-medium text-black uppercase">Portfolio</Link>
            <Link href="/help" className="block text-sm font-medium text-black uppercase">Help</Link>
            <div className="flex gap-2 pt-2">
              <Button asChild variant="ghost" className="flex-1 text-black">
                <Link href="/login">Login</Link>
              </Button>
                <Button asChild className="flex-1 rounded-full bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                  <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

