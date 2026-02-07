"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";

const successStories = [
  {
    title: "Indie Artist Portfolio Sale",
    creator: "Independent Music Producer",
    salePrice: "$450,000",
    multiple: "8.5x",
    timeframe: "2 weeks",
    description: "An independent producer sold their entire catalog of 50+ songs, receiving upfront funding to launch their next project without debt.",
    metrics: {
      ltm: "$52,941",
      catalogSize: "50+ songs",
    },
  },
  {
    title: "Hip-Hop Publishing Rights",
    creator: "Urban Records",
    salePrice: "$1,250,000",
    multiple: "6.92x",
    timeframe: "3 weeks",
    description: "A record label monetized their publishing catalog, including hits with over 2 billion streams, to fund new artist signings.",
    metrics: {
      ltm: "$180,636",
      catalogSize: "200+ tracks",
    },
  },
  {
    title: "Electronic Dance Catalog",
    creator: "EDM Collective",
    salePrice: "$275,000",
    multiple: "4.57x",
    timeframe: "10 days",
    description: "An electronic music collective sold a 10-year term on their catalog, maintaining creative control while securing financial stability.",
    metrics: {
      ltm: "$60,175",
      catalogSize: "30+ releases",
    },
  },
];

export function SuccessStoriesSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real creators who've successfully funded their careers through Leseni
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge variant="secondary" className="mb-2">Success Story</Badge>
                    <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{story.description}</p>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <DollarSign className="w-3 h-3" />
                          Sale Price
                        </div>
                        <div className="text-2xl font-bold">{story.salePrice}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <TrendingUp className="w-3 h-3" />
                          Multiple
                        </div>
                        <div className="text-2xl font-bold">{story.multiple}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">LTM Earnings</div>
                        <div className="font-semibold">{story.metrics.ltm}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Catalog Size</div>
                        <div className="font-semibold">{story.metrics.catalogSize}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                      <Calendar className="w-4 h-4" />
                      <span>Closed in {story.timeframe}</span>
                    </div>
                  </div>
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
          className="text-center mt-12"
        >
          <a href="/success-stories" className="text-primary hover:underline font-medium">
            View All Success Stories →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

