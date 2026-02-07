"use client";

import Link from "next/link";
import { Music, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37] flex items-center justify-center">
                <Music className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold text-black">LESENI</span>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              The premier marketplace for royalty streams. Connect creators with investors.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-black uppercase tracking-wide text-sm">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/catalog" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                  Browse Catalogs
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                  Sell Your Catalog
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-black uppercase tracking-wide text-sm">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-black uppercase tracking-wide text-sm">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Leseni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
