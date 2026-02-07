/**
 * Catalog Card Component
 * Displays a catalog listing in the grid view
 */

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/format";
import type { Listing, Catalog } from "@/lib/types/domain";
import { ArrowRight } from "lucide-react";

interface CatalogCardProps {
  listing: Listing;
  catalog: Catalog;
}

export function CatalogCard({ listing, catalog }: CatalogCardProps) {
  const price = listing.buyNowPrice || listing.currentHighestBid || listing.reservePrice;
  const isAuction = listing.mode === "AUCTION";

  return (
    <Link href={`/catalog/${catalog.id}`}>
      <Card className="hover:shadow-xl transition-all cursor-pointer h-full border-2 border-gray-200 hover:border-[#D4AF37] bg-white group">
        {catalog.artworkUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img
              src={catalog.artworkUrl}
              alt={catalog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-lg line-clamp-2 text-black group-hover:text-[#D4AF37] transition-colors">
              {catalog.title}
            </CardTitle>
            <Badge 
              variant="outline" 
              className={isAuction ? "border-[#D4AF37] text-[#D4AF37]" : "border-gray-300 text-gray-600"}
            >
              {isAuction ? "Auction" : "Fixed"}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 text-gray-600">
            {catalog.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Price</span>
              <span className="text-xl font-bold text-black">
                {formatCurrency(price, listing.currency)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">12M Earnings</span>
              <span className="text-sm font-semibold text-gray-800">
                {formatCurrency(catalog.trailing12MonthsEarnings, catalog.currency)}
              </span>
            </div>
            <div className="flex gap-2 pt-2">
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                {catalog.type}
              </Badge>
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                {catalog.rightsType}
              </Badge>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center text-sm text-[#D4AF37] font-medium group-hover:gap-2 transition-all">
                View Details
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
