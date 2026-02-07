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
    color: "text-blue-500",
  },
  {
    type: "listing",
    message: "New listing: 'Electronic Dance Catalog'",
    price: "$78,000",
    time: "15 minutes ago",
    icon: TrendingUp,
    color: "text-emerald-500",
  },
  {
    type: "sale",
    message: "Deal completed: 'Hip-Hop Master Rights'",
    amount: "$1,250,000",
    time: "1 hour ago",
    icon: CheckCircle2,
    color: "text-purple-500",
  },
  {
    type: "ending",
    message: "Auction ending soon: 'Classic Rock Collection'",
    time: "3 hours left",
    icon: Clock,
    color: "text-amber-500",
  },
];

export function LiveActivitySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary/5 via-background to-primary/5 border-y">
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
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-2xl font-bold">Live Marketplace Activity</h2>
            </div>
            <p className="text-muted-foreground">Real-time updates from our marketplace</p>
          </div>
          <Badge variant="outline" className="text-sm">
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
                <Card className={`border-2 transition-all ${isActive ? 'border-primary/50 shadow-lg' : 'border-border'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 ${isActive ? 'scale-110' : ''} transition-transform`}>
                        <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1 line-clamp-2">
                          {activity.message}
                        </p>
                        {(activity.amount || activity.price) && (
                          <p className="text-lg font-bold text-primary mb-1">
                            {activity.amount || activity.price}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
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

