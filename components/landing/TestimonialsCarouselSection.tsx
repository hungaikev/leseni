"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Music Producer",
    company: "Independent Artist",
    content: "Sold my catalog in 48 hours. The process was seamless and I received payment immediately. This gave me the freedom to focus on my next project without financial stress.",
    rating: 5,
    avatar: "SC",
    image: "🎵",
  },
  {
    name: "Michael Rodriguez",
    role: "Portfolio Investor",
    company: "Investment Firm",
    content: "Diversified my portfolio with three music catalogs. The earnings data was transparent and accurate. I've seen consistent returns and the platform is incredibly professional.",
    rating: 5,
    avatar: "MR",
    image: "📈",
  },
  {
    name: "Emma Thompson",
    role: "Independent Artist",
    company: "Singer-Songwriter",
    content: "As a creator, I love how easy it is to list and manage my catalog. The bidding system is fair and competitive. I got a great price for my work.",
    rating: 5,
    avatar: "ET",
    image: "🎤",
  },
  {
    name: "David Park",
    role: "Record Label Owner",
    company: "Urban Records",
    content: "We've sold multiple catalogs through Leseni. The platform makes it easy to monetize our back catalog while we focus on new signings. Highly recommend!",
    rating: 5,
    avatar: "DP",
    image: "🎧",
  },
  {
    name: "Lisa Anderson",
    role: "Angel Investor",
    company: "Private Investor",
    content: "Royalty investments have become a core part of my portfolio. The returns are consistent and the platform handles all the complexity. Excellent experience.",
    rating: 5,
    avatar: "LA",
    image: "💼",
  },
];

export function TestimonialsCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!mounted) {
    // Return a static version for SSR
    const current = testimonials[0];
    return (
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">What Our Community Says</h2>
            <p className="text-xl text-gray-600">
              Trusted by creators and investors worldwide
            </p>
          </div>
          <Card className="border-2 border-gray-200 shadow-xl bg-white">
            <CardContent className="p-8 md:p-12">
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-center mb-8 leading-relaxed text-gray-600">
                "{current.content}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-2xl">
                  {current.image}
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg text-black">{current.name}</div>
                  <div className="text-sm text-gray-600">{current.role}</div>
                  <div className="text-xs text-gray-500">{current.company}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">What Our Community Says</h2>
          <p className="text-xl text-gray-600">
            Trusted by creators and investors worldwide
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-gray-200 shadow-xl bg-white">
                <CardContent className="p-8 md:p-12">
                  <div className="flex gap-1 mb-6 justify-center">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-center mb-8 leading-relaxed text-gray-600">
                    "{current.content}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-2xl">
                      {current.image}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg text-black">{current.name}</div>
                      <div className="text-sm text-gray-600">{current.role}</div>
                      <div className="text-xs text-gray-500">{current.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-gray-300 text-black hover:bg-[#D4AF37] hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-[#D4AF37] w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-gray-300 text-black hover:bg-[#D4AF37] hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
