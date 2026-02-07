/**
 * Catalog Card Component
 * Displays a catalog listing in the grid view
 */

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/format";
import type { Listing, Catalog } from "@/lib/types/domain";

interface CatalogCardProps {
  listing: Listing;
  catalog: Catalog;
}

export function CatalogCard({ listing, catalog }: CatalogCardProps) {
  const price = listing.buyNowPrice || listing.currentHighestBid || listing.reservePrice;
  const isAuction = listing.mode === "AUCTION";

  return (
    <Link href={`/catalog/${catalog.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        {catalog.artworkUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img
              src={catalog.artworkUrl}
              alt={catalog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-lg line-clamp-2">{catalog.title}</CardTitle>
            <Badge variant="outline">{isAuction ? "Auction" : "Fixed"}</Badge>
          </div>
          <CardDescription className="line-clamp-2">
            {catalog.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="text-lg font-bold">
                {formatCurrency(price, listing.currency)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">12M Earnings</span>
              <span className="text-sm font-medium">
                {formatCurrency(catalog.trailing12MonthsEarnings, catalog.currency)}
              </span>
            </div>
            <div className="flex gap-2 pt-2">
              <Badge variant="secondary" className="text-xs">
                {catalog.type}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {catalog.rightsType}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

