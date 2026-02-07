/**
 * Portfolio Page - Investor positions and cashflows
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data - replace with real data from InstantDB
const mockPositions = [
  {
    id: "1",
    catalogTitle: "Indie Pop Collection",
    sharePercentage: 25,
    acquisitionPrice: 125000,
    acquiredAt: new Date("2024-01-15"),
    ltmEarnings: 15000,
    totalReceived: 3750,
    termType: "PERPETUAL",
  },
  {
    id: "2",
    catalogTitle: "Electronic Dance Catalog",
    sharePercentage: 50,
    acquisitionPrice: 78000,
    acquiredAt: new Date("2024-03-20"),
    ltmEarnings: 12000,
    totalReceived: 3000,
    termType: "TERM",
    termEndDate: new Date("2034-03-20"),
  },
];

export default function PortfolioPage() {
  const [selectedTab, setSelectedTab] = useState<"positions" | "cashflows">("positions");

  const totalInvested = mockPositions.reduce((sum, pos) => sum + pos.acquisitionPrice, 0);
  const totalReceived = mockPositions.reduce((sum, pos) => sum + pos.totalReceived, 0);
  const totalValue = mockPositions.reduce((sum, pos) => sum + (pos.ltmEarnings * (pos.sharePercentage / 100)), 0);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-black">My Portfolio</h1>
        <div className="w-24 h-1 bg-[#D4AF37] mb-4" />
        <p className="text-xl text-gray-600 max-w-2xl">
          Track your royalty investments, positions, and cashflow distributions
        </p>
      </div>

      {/* Portfolio Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="border-2 border-gray-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Invested</p>
                <p className="text-2xl font-bold text-black">${totalInvested.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Received</p>
                <p className="text-2xl font-bold text-black">${totalReceived.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Portfolio Value</p>
                <p className="text-2xl font-bold text-black">${totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setSelectedTab("positions")}
          className={`pb-4 px-2 font-medium transition-colors ${
            selectedTab === "positions"
              ? "text-black border-b-2 border-[#D4AF37]"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Positions
        </button>
        <button
          onClick={() => setSelectedTab("cashflows")}
          className={`pb-4 px-2 font-medium transition-colors ${
            selectedTab === "cashflows"
              ? "text-black border-b-2 border-[#D4AF37]"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Cashflows
        </button>
      </div>

      {/* Positions Tab */}
      {selectedTab === "positions" && (
        <div className="space-y-6">
          {mockPositions.length === 0 ? (
            <Card className="border-2 border-gray-200 bg-white">
              <CardContent className="p-12 text-center">
                <p className="text-gray-600 mb-4">You don't have any positions yet.</p>
                <Button asChild className="bg-black text-white hover:bg-gray-800 rounded-full">
                  <Link href="/catalog">
                    Browse Catalogs
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            mockPositions.map((position) => (
              <Card key={position.id} className="border-2 border-gray-200 hover:border-[#D4AF37] transition-all bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-black mb-2">{position.catalogTitle}</CardTitle>
                      <CardDescription className="text-gray-600">
                        Acquired on {position.acquiredAt.toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]">
                      {position.sharePercentage}% Share
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Acquisition Price</p>
                      <p className="text-xl font-bold text-black">${position.acquisitionPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">LTM Earnings</p>
                      <p className="text-xl font-bold text-black">${position.ltmEarnings.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Received</p>
                      <p className="text-xl font-bold text-emerald-600">${position.totalReceived.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Term Type</p>
                      <p className="text-lg font-semibold text-black">{position.termType}</p>
                      {position.termEndDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          Ends {position.termEndDate.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Button asChild variant="outline" className="border-gray-300 text-black hover:bg-gray-100 rounded-full">
                      <Link href={`/catalog/${position.id}`}>
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Cashflows Tab */}
      {selectedTab === "cashflows" && (
        <Card className="border-2 border-gray-200 bg-white">
          <CardContent className="p-12 text-center">
            <p className="text-gray-600 mb-4">Cashflow history will appear here once distributions are made.</p>
            <p className="text-sm text-gray-500">
              You'll receive notifications when new cashflows are distributed to your positions.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

