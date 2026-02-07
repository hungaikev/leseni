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
    <section className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black">Asset Types</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-4" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
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
              <Card className="h-full border-2 border-gray-200 hover:border-[#D4AF37] transition-all hover:shadow-xl group bg-white relative overflow-hidden cursor-pointer">
                {/* Sliding Gold Overlay - slides up from bottom */}
                <div className="absolute inset-0 bg-[#D4AF37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" 
                     style={{ transitionDelay: '0.2s' }} />
                
                <CardContent className="p-6 relative z-10">
                  {/* Icon Container - Black bg with gold icon by default, transparent bg with black icon on hover */}
                  <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-transparent transition-all duration-500"
                       style={{ transitionDelay: '0.2s' }}>
                    <asset.icon className="w-8 h-8 text-[#D4AF37] group-hover:text-black transition-colors duration-500"
                                style={{ transitionDelay: '0.2s' }} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 text-black group-hover:text-black transition-colors duration-500"
                      style={{ transitionDelay: '0.2s' }}>
                    {asset.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed group-hover:text-black/90 transition-colors duration-500"
                     style={{ transitionDelay: '0.2s' }}>
                    {asset.description}
                  </p>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {asset.examples.map((example, i) => (
                      <Badge 
                        key={i} 
                        variant="secondary" 
                        className="text-xs bg-gray-100 text-gray-700 group-hover:bg-black/20 group-hover:text-black border-0 group-hover:border-black/30 transition-all duration-500"
                        style={{ transitionDelay: `${0.2 + (i * 0.05)}s` }}
                      >
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

