/**
 * Landing Page - Inspired by Royalty Exchange
 * Professional, clean design with clear value propositions
 */

"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { WhatWeDoSection } from "@/components/landing/WhatWeDoSection";
import { MarketplaceSection } from "@/components/landing/MarketplaceSection";
import { FeaturedDealsSection } from "@/components/landing/FeaturedDealsSection";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Featured Listing */}
      <HeroSection />

      {/* Trust Indicators - Stats & Press */}
      <TrustSection />

      {/* What We Do - Two-sided Marketplace */}
      <WhatWeDoSection />

      {/* The Marketplace Section */}
      <MarketplaceSection />

      {/* Featured Deals */}
      <FeaturedDealsSection />

      {/* Newsletter Signup */}
      <NewsletterSection />

      {/* Final CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
