"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Film, BookOpen, Tag, Radio, Headphones } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const assetTypes = [
  {
    icon: Music,
    title: "Music Catalogs",
    description: "Master recordings, publishing rights, and performance royalties from music catalogs",
    examples: ["Album royalties", "Song publishing", "Performance rights"],
    color: "from-blue-500/20 to-purple-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: Film,
    title: "Film Rights",
    description: "Royalties from film and television productions, including soundtrack and licensing",
    examples: ["Film soundtracks", "TV show royalties", "Streaming royalties"],
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
  },
  {
    icon: Radio,
    title: "Sync Rights",
    description: "Music synchronization rights for use in commercials, films, and media",
    examples: ["Commercial sync", "Film placement", "TV sync"],
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
  },
  {
    icon: BookOpen,
    title: "Publishing Rights",
    description: "Literary and music publishing royalties from books, songs, and compositions",
    examples: ["Book royalties", "Music publishing", "Composition rights"],
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
  },
  {
    icon: Tag,
    title: "Trademark Royalties",
    description: "Licensing royalties from trademarked brands, characters, and intellectual property",
    examples: ["Brand licensing", "Character royalties", "IP licensing"],
    color: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-500",
  },
  {
    icon: Headphones,
    title: "Performance Rights",
    description: "Royalties from live performances, radio play, and public performances",
    examples: ["Performance royalties", "Radio play", "Live performance"],
    color: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-500",
  },
];

export function AssetTypesSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Asset Types</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Invest in diverse royalty streams across multiple asset classes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assetTypes.map((asset, index) => (
            <motion.div
              key={asset.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${asset.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <asset.icon className={`w-8 h-8 ${asset.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{asset.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {asset.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {asset.examples.map((example, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

