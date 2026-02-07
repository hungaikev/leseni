"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, TrendingUp, DollarSign, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();

  // For now, redirect to catalog as the main dashboard
  // You can replace this with an actual dashboard later
  useEffect(() => {
    // Optionally redirect, or show dashboard content
    // router.push("/catalog");
  }, [router]);

  const stats = [
    {
      icon: DollarSign,
      label: "Total Invested",
      value: "$0",
      color: "text-emerald-500",
    },
    {
      icon: TrendingUp,
      label: "Active Positions",
      value: "0",
      color: "text-blue-500",
    },
    {
      icon: Music,
      label: "Catalogs Owned",
      value: "0",
      color: "text-purple-500",
    },
    {
      icon: BarChart3,
      label: "Total Returns",
      value: "$0",
      color: "text-amber-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-black">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Leseni dashboard</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-2 border-gray-200 hover:border-[#D4AF37] transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1 text-black">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-2 border-gray-200 hover:border-[#D4AF37] transition-all">
          <CardHeader>
            <CardTitle className="text-2xl">Browse Catalogs</CardTitle>
            <CardDescription>
              Explore available royalty catalogs and investment opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full rounded-full">
              <Link href="/catalog">
                View Catalog
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 hover:border-[#D4AF37] transition-all">
          <CardHeader>
            <CardTitle className="text-2xl">Sell Your Catalog</CardTitle>
            <CardDescription>
              List your royalty catalog for sale on the marketplace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full rounded-full">
              <Link href="/sell">
                Create Listing
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Section */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl">Your Portfolio</CardTitle>
          <CardDescription>
            View your active investments and royalty positions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You don't have any active positions yet.</p>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/catalog">
                Start Investing
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

