/**
 * Catalog Browse Page (Server Component)
 * 
 * Displays all active listings with filtering and sorting.
 */

import { db } from '@/lib/instant/client';
import { CatalogCard } from '@/components/catalog/CatalogCard';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import { Suspense } from 'react';

interface SearchParams {
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  minYield?: string;
  maxYield?: string;
  termType?: string;
  sort?: string;
}

interface CatalogPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  
  // Build query filters
  const where: Record<string, any> = {
    status: 'ACTIVE',
  };

  if (params.type) {
    where.type = params.type;
  }

  if (params.termType) {
    where.termType = params.termType;
  }

  // Query active listings with their catalogs
  // Note: This will fail without InstantDB configured, but won't break the app
  let listings: any[] = [];
  try {
    const { data } = await db.query({
      listings: {
        $: {
          where,
          order: getSortOrder(params.sort),
        },
        catalog: {},
      },
    });
    listings = data?.listings || [];
  } catch (error) {
    // Gracefully handle InstantDB not configured
    console.warn('InstantDB not configured:', error);
  }

  // Apply price range filter (client-side for now, could be server-side)
  const filteredListings = listings.filter((listing) => {
    const price = listing.buyNowPrice || listing.currentHighestBid || listing.reservePrice;
    
    if (params.minPrice && price < parseFloat(params.minPrice)) {
      return false;
    }
    if (params.maxPrice && price > parseFloat(params.maxPrice)) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Royalty Catalogs</h1>
        <p className="text-muted-foreground">
          Discover and invest in music, film, and other royalty streams
        </p>
      </div>

      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <Suspense fallback={<div>Loading filters...</div>}>
            <CatalogFilters />
          </Suspense>
        </aside>

        <main className="flex-1">
          {filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No active listings found. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <CatalogCard
                  key={listing.id}
                  listing={listing}
                  catalog={listing.catalog}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function getSortOrder(sort?: string): { createdAt?: 'desc' | 'asc' } | { 'catalog.trailing12MonthsEarnings'?: 'desc' | 'asc' } | { reservePrice?: 'desc' | 'asc' } {
  switch (sort) {
    case 'newest':
      return { createdAt: 'desc' };
    case 'earnings':
      return { 'catalog.trailing12MonthsEarnings': 'desc' };
    case 'price-high':
      return { reservePrice: 'desc' };
    case 'price-low':
      return { reservePrice: 'asc' };
    default:
      return { createdAt: 'desc' };
  }
}

