"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/landing/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-1 pt-20">
        {children}
      </div>
      <Footer />
    </div>
  );
}
