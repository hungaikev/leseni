/**
 * Landing Page - Inspired by Royalty Exchange
 * Professional, clean design with clear value propositions
 */

"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
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

      {/* Stats Section - Key Metrics */}
      <StatsSection />

      {/* Trust Indicators - Stats & Press */}
      <TrustSection />

      {/* Features Section - Why Choose Us */}
      <FeaturesSection />

      {/* Live Activity Feed */}
      <div className="border-t border-gray-200">
        <LiveActivitySection />
      </div>

      {/* How It Works - Step by Step */}
      <div className="bg-gray-50">
        <HowItWorksSection />
      </div>

      {/* What We Do - Two-sided Marketplace */}
      <WhatWeDoSection />

      {/* Asset Types Showcase */}
      <div className="border-t border-gray-200 bg-gray-50">
        <AssetTypesSection />
      </div>

      {/* Featured Deals */}
      <FeaturedDealsSection />

      {/* Success Stories */}
      <div className="border-t border-gray-200">
        <SuccessStoriesSection />
      </div>

      {/* Testimonials Carousel */}
      <div className="bg-gray-50">
        <TestimonialsCarouselSection />
      </div>

      {/* The Marketplace Section */}
      <MarketplaceSection />

      {/* Newsletter Signup */}
      <div className="border-t border-gray-200 bg-gray-50">
        <NewsletterSection />
      </div>

      {/* Final CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
