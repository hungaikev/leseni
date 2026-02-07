"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Music, TrendingUp } from "lucide-react";
import Link from "next/link";

const featuredCatalogs = [
  {
    title: "Indie Pop Collection",
    artist: "Various Artists",
    earnings: "$45K",
    period: "12M",
    type: "MUSIC",
    status: "Live Auction",
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    title: "Electronic Dance Catalog",
    artist: "EDM Collective",
    earnings: "$78K",
    period: "12M",
    type: "MUSIC",
    status: "Fixed Price",
    gradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    title: "Hip-Hop Master Rights",
    artist: "Urban Records",
    earnings: "$120K",
    period: "12M",
    type: "MUSIC",
    status: "Live Auction",
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
];

export function FeaturedCatalogs() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Catalogs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover high-performing royalty streams available now
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {featuredCatalogs.map((catalog, index) => (
            <motion.div
              key={catalog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl group overflow-hidden">
                <div className={`h-32 bg-gradient-to-br ${catalog.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-4 left-4">
                    <Music className="w-8 h-8 text-white/80" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{catalog.title}</h3>
                      <p className="text-sm text-muted-foreground">{catalog.artist}</p>
                    </div>
                    <Badge variant={catalog.status === "Live Auction" ? "default" : "secondary"}>
                      {catalog.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div>
                      <div className="text-2xl font-bold">{catalog.earnings}</div>
                      <div className="text-xs text-muted-foreground">Trailing {catalog.period}</div>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-500">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">+12%</span>
                    </div>
                  </div>

                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link href="/catalog">
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/catalog">
              View All Catalogs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

