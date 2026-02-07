/**
 * Catalog Detail Page
 * 
 * Shows catalog details, listing info, and bidding/purchase interface.
 */

import { db } from '@/lib/instant/client';
import { notFound } from 'next/navigation';
import { AuctionWidget } from '@/components/catalog/AuctionWidget';
import { EarningsChart } from '@/components/catalog/EarningsChart';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils/format';

interface CatalogDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CatalogDetailPage({ params }: CatalogDetailPageProps) {
  const { id } = await params;

  // Fetch catalog with listing, bids, and cashflows
  let catalog: any = null;
  let listing: any = null;
  let cashflows: any[] = [];

  try {
    const { data } = await db.query({
      catalogs: {
        $: { where: { id } },
        listings: {
          bids: {},
        },
        cashflows: {
          $: { order: { periodStart: 'desc' }, limit: 24 }, // Last 24 periods
        },
      },
    });

    if (data?.catalogs && data.catalogs.length > 0) {
      catalog = data.catalogs[0];
      listing = catalog.listings?.[0];
      cashflows = catalog.cashflows || [];
    }
  } catch (error) {
    console.warn('InstantDB not configured:', error);
  }

  if (!catalog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Catalog Header */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">{catalog.title}</h1>
                <div className="w-24 h-1 bg-[#D4AF37] mb-4" />
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline" className="border-gray-300 text-gray-700">
                    {catalog.type}
                  </Badge>
                  <Badge variant="outline" className="border-gray-300 text-gray-700">
                    {catalog.rightsType}
                  </Badge>
                  <Badge variant="outline" className="border-gray-300 text-gray-700">
                    {catalog.termType}
                  </Badge>
                </div>
              </div>
              {catalog.artworkUrl && (
                <img
                  src={catalog.artworkUrl}
                  alt={catalog.title}
                  className="w-32 h-32 object-cover rounded-lg ml-4"
                />
              )}
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{catalog.description}</p>
          </div>

          {/* Earnings Chart */}
          <Card className="border-2 border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-black">Historical Earnings</CardTitle>
              <CardDescription className="text-gray-600">
                Trailing 12 months: {formatCurrency(catalog.trailing12MonthsEarnings, catalog.currency)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EarningsChart cashflows={cashflows} currency={catalog.currency} />
            </CardContent>
          </Card>

          {/* Catalog Metrics */}
          <Card className="border-2 border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-black">Catalog Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Trailing 12M Earnings</p>
                  <p className="text-2xl font-bold text-black">
                    {formatCurrency(catalog.trailing12MonthsEarnings, catalog.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Avg Annual Earnings</p>
                  <p className="text-2xl font-bold text-black">
                    {formatCurrency(catalog.avgAnnualEarnings, catalog.currency)}
                  </p>
                </div>
                {catalog.termEndDate && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Term End Date</p>
                    <p className="text-lg font-semibold text-black">
                      {formatDate(new Date(catalog.termEndDate))}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Listing & Action */}
        <div className="lg:col-span-1">
          {listing ? (
            <AuctionWidget
              listing={listing}
              catalog={catalog}
              bids={listing.bids || []}
            />
          ) : (
            <Card className="border-2 border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-black">Not Currently Listed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This catalog is not currently available for purchase.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
