"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gavel, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const activities = [
  {
    type: "bid",
    message: "New bid placed on 'Indie Pop Collection'",
    amount: "$125,000",
    time: "2 minutes ago",
    icon: Gavel,
    color: "text-[#D4AF37]",
  },
  {
    type: "listing",
    message: "New listing: 'Electronic Dance Catalog'",
    price: "$78,000",
    time: "15 minutes ago",
    icon: TrendingUp,
    color: "text-[#D4AF37]",
  },
  {
    type: "sale",
    message: "Deal completed: 'Hip-Hop Master Rights'",
    amount: "$1,250,000",
    time: "1 hour ago",
    icon: CheckCircle2,
    color: "text-[#D4AF37]",
  },
  {
    type: "ending",
    message: "Auction ending soon: 'Classic Rock Collection'",
    time: "3 hours left",
    icon: Clock,
    color: "text-[#D4AF37]",
  },
];

export function LiveActivitySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    // Return static version for SSR
    return (
      <section className="py-16 px-4 bg-black border-y border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Live Marketplace Activity</h2>
              </div>
              <p className="text-gray-400">Real-time updates from our marketplace</p>
            </div>
            <Badge variant="outline" className="text-sm border-[#D4AF37] text-[#D4AF37]">
              Live
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activities.map((activity, index) => (
              <Card key={index} className="border-2 border-gray-800 bg-gray-900">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1 line-clamp-2 text-white">
                        {activity.message}
                      </p>
                      {(activity.amount || activity.price) && (
                        <p className="text-lg font-bold text-[#D4AF37] mb-1">
                          {activity.amount || activity.price}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-black border-y border-gray-800">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Live Marketplace Activity</h2>
            </div>
            <p className="text-gray-400">Real-time updates from our marketplace</p>
          </div>
          <Badge variant="outline" className="text-sm border-[#D4AF37] text-[#D4AF37]">
            Live
          </Badge>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activities.map((activity, index) => {
            const isActive = index === currentIndex;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1 : 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <Card className={`border-2 transition-all bg-gray-900 ${isActive ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20' : 'border-gray-800'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 ${isActive ? 'scale-110' : ''} transition-transform`}>
                        <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1 line-clamp-2 text-white">
                          {activity.message}
                        </p>
                        {(activity.amount || activity.price) && (
                          <p className="text-lg font-bold text-[#D4AF37] mb-1">
                            {activity.amount || activity.price}
                          </p>
                        )}
                        <p className="text-xs text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
