/**
 * Landing Page - Inspired by Royalty Exchange
 * Professional, clean design with clear value propositions
 */

"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { LiveActivitySection } from "@/components/landing/LiveActivitySection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhatWeDoSection } from "@/components/landing/WhatWeDoSection";
import { AssetTypesSection } from "@/components/landing/AssetTypesSection";
import { FeaturedDealsSection } from "@/components/landing/FeaturedDealsSection";
import { SuccessStoriesSection } from "@/components/landing/SuccessStoriesSection";
import { TestimonialsCarouselSection } from "@/components/landing/TestimonialsCarouselSection";
import { MarketplaceSection } from "@/components/landing/MarketplaceSection";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Featured Listing */}
      <HeroSection />

      {/* Trust Indicators - Stats & Press */}
      <TrustSection />

      {/* Live Activity Feed */}
      <LiveActivitySection />

      {/* How It Works - Step by Step */}
      <HowItWorksSection />

      {/* What We Do - Two-sided Marketplace */}
      <WhatWeDoSection />

      {/* Asset Types Showcase */}
      <AssetTypesSection />

      {/* Featured Deals */}
      <FeaturedDealsSection />

      {/* Success Stories */}
      <SuccessStoriesSection />

      {/* Testimonials Carousel */}
      <TestimonialsCarouselSection />

      {/* The Marketplace Section */}
      <MarketplaceSection />

      {/* Newsletter Signup */}
      <NewsletterSection />

      {/* Final CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
