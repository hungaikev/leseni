"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const featuredDeals = [
  {
    title: "Honeymoon Album Royalties",
    description: "Producer royalties from Lana Del Rey's gold certified classic Honeymoon album that has over 1.8 billion streams on Spotify.",
    salePrice: "$77,000",
    multiple: "9.9x",
    type: "Life of Rights",
  },
  {
    title: "You Broke Me First Royalties",
    description: "Publishing royalties from Tate McRae's breakthrough international hit song \"You Broke Me First\", that's been streamed over 2 billion times.",
    salePrice: "$1,250,000",
    multiple: "6.92x",
    type: "Life of Rights",
  },
  {
    title: "Location Royalties",
    description: "Publishing royalties featuring megahits from Khalid's debut album including \"Location\" and \"Saved\".",
    salePrice: "$275,000",
    multiple: "4.57x",
    type: "10 Years",
  },
];

export function FeaturedDealsSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Deals</h2>
          <p className="text-xl text-muted-foreground">
            Recent completed transactions on our platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredDeals.map((deal, index) => (
            <motion.div
              key={deal.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-[5px] border-[#D4AF37] hover:border-[#B8941F] transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{deal.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {deal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Sale Price</div>
                      <div className="text-2xl font-bold">{deal.salePrice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Sales Multiple</div>
                      <div className="text-2xl font-bold">{deal.multiple}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{deal.type}</Badge>
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/catalog">
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
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
          <Button asChild variant="outline" size="lg">
            <Link href="/catalog">
              View All Listings
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

