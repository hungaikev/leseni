/**
 * Auction Widget (Client Component)
 * 
 * Handles bidding for auctions and "Buy Now" for fixed-price listings.
 * Uses real-time updates for bid changes.
 */

'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { placeBid } from '@/lib/actions/bid';
import { formatCurrency, formatDate } from '@/lib/utils/format';
// Toast functionality - simplified for now
const useToast = () => ({
  toast: ({ title, description, variant }: { title?: string; description?: string; variant?: string }) => {
    console.log(`Toast: ${title} - ${description}`);
  },
});
import type { Listing, Catalog, Bid } from '@/lib/types/domain';

interface AuctionWidgetProps {
  listing: Listing;
  catalog: Catalog;
  bids: Bid[];
}

export function AuctionWidget({ listing, catalog, bids }: AuctionWidgetProps) {
  const [bidAmount, setBidAmount] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Get current user ID (in real app, from auth context)
  // For now, this is a placeholder - you'd get this from InstantDB auth
  const userId = 'user_placeholder'; // TODO: Get from auth

  const currentHighestBid = listing.currentHighestBid || listing.reservePrice;
  const minNextBid = currentHighestBid + listing.minBidIncrement;

  const handlePlaceBid = async () => {
    const amount = parseFloat(bidAmount);
    
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid bid amount');
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await placeBid(
        { listingId: listing.id, amount },
        userId
      );

      if (result.success) {
        toast({
          title: 'Bid placed successfully',
          description: `Your bid of ${formatCurrency(amount, listing.currency)} has been placed.`,
        });
        setBidAmount('');
      } else {
        setError(result.error || 'Failed to place bid');
        toast({
          title: 'Bid failed',
          description: result.error || 'Failed to place bid',
          variant: 'destructive',
        });
      }
    });
  };

  const handleBuyNow = async () => {
    if (!listing.buyNowPrice) return;

    // TODO: Implement buyNow action
    toast({
      title: 'Purchase initiated',
      description: `Processing purchase for ${formatCurrency(listing.buyNowPrice, listing.currency)}`,
    });
  };

  const isAuction = listing.mode === 'AUCTION';
  const isActive = listing.status === 'ACTIVE';
  const isEnded = listing.status === 'ENDED';
  const hasEnded = listing.endTime ? Date.now() >= listing.endTime : false;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isAuction ? 'Auction' : 'Fixed Price'}
        </CardTitle>
        <CardDescription>
          {isEnded || hasEnded
            ? 'This listing has ended'
            : isAuction
            ? `Ends ${listing.endTime ? formatDate(new Date(listing.endTime)) : 'N/A'}`
            : 'Available for immediate purchase'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Price / Highest Bid */}
        <div>
          <Label className="text-sm text-muted-foreground">
            {isAuction ? 'Current Highest Bid' : 'Price'}
          </Label>
          <p className="text-3xl font-bold">
            {formatCurrency(
              listing.buyNowPrice || currentHighestBid,
              listing.currency
            )}
          </p>
          {isAuction && (
            <p className="text-sm text-muted-foreground mt-1">
              Reserve: {formatCurrency(listing.reservePrice, listing.currency)}
            </p>
          )}
        </div>

        {/* Bid Count */}
        {isAuction && (
          <div>
            <Label className="text-sm text-muted-foreground">Bids</Label>
            <p className="text-lg font-semibold">{bids.length}</p>
          </div>
        )}

        {/* Buy Now Button (Fixed Price) */}
        {!isAuction && listing.buyNowPrice && isActive && (
          <Button
            onClick={handleBuyNow}
            className="w-full"
            size="lg"
            disabled={isPending}
          >
            Buy Now - {formatCurrency(listing.buyNowPrice, listing.currency)}
          </Button>
        )}

        {/* Bid Form (Auction) */}
        {isAuction && isActive && !hasEnded && (
          <>
            <div className="space-y-2">
              <Label htmlFor="bid-amount">Your Bid</Label>
              <Input
                id="bid-amount"
                type="number"
                min={minNextBid}
                step={listing.minBidIncrement}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={formatCurrency(minNextBid, listing.currency)}
                disabled={isPending}
              />
              <p className="text-xs text-muted-foreground">
                Minimum bid: {formatCurrency(minNextBid, listing.currency)}
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handlePlaceBid}
              className="w-full"
              size="lg"
              disabled={isPending || !bidAmount}
            >
              {isPending ? 'Placing Bid...' : 'Place Bid'}
            </Button>
          </>
        )}

        {/* Bid History */}
        {isAuction && bids.length > 0 && (
          <div className="pt-4 border-t">
            <Label className="text-sm font-semibold mb-2 block">Recent Bids</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {bids.slice(0, 5).map((bid) => (
                <div
                  key={bid.id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {formatCurrency(bid.amount, listing.currency)}
                  </span>
                  <span className="text-muted-foreground">
                    {formatDate(new Date(bid.createdAt))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="pt-4 border-t">
          <Badge variant={isActive ? 'default' : 'secondary'}>
            {listing.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

