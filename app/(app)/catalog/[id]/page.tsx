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

  if (!data?.catalogs || data.catalogs.length === 0) {
    notFound();
  }

  const catalog = data.catalogs[0];
  const listing = catalog.listings?.[0];
  const cashflows = catalog.cashflows || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Catalog Header */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{catalog.title}</h1>
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline">{catalog.type}</Badge>
                  <Badge variant="outline">{catalog.rightsType}</Badge>
                  <Badge variant="outline">{catalog.termType}</Badge>
                </div>
              </div>
              {catalog.artworkUrl && (
                <img
                  src={catalog.artworkUrl}
                  alt={catalog.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
            <p className="text-muted-foreground text-lg">{catalog.description}</p>
          </div>

          {/* Earnings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Historical Earnings</CardTitle>
              <CardDescription>
                Trailing 12 months: {formatCurrency(catalog.trailing12MonthsEarnings, catalog.currency)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EarningsChart cashflows={cashflows} currency={catalog.currency} />
            </CardContent>
          </Card>

          {/* Catalog Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Catalog Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Trailing 12M Earnings</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(catalog.trailing12MonthsEarnings, catalog.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Annual Earnings</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(catalog.avgAnnualEarnings, catalog.currency)}
                  </p>
                </div>
                {catalog.termEndDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Term End Date</p>
                    <p className="text-lg">{formatDate(new Date(catalog.termEndDate))}</p>
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
            <Card>
              <CardHeader>
                <CardTitle>Not Currently Listed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
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

