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
import { Gavel, DollarSign } from 'lucide-react';
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
    <Card className="border-2 border-gray-200 bg-white sticky top-24">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
            <Gavel className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <CardTitle className="text-black">
              {isAuction ? 'Auction' : 'Fixed Price'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isEnded || hasEnded
                ? 'This listing has ended'
                : isAuction
                ? `Ends ${listing.endTime ? formatDate(new Date(listing.endTime)) : 'N/A'}`
                : 'Available for immediate purchase'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Price / Highest Bid */}
        <div>
          <Label className="text-sm text-gray-600 mb-2 block">
            {isAuction ? 'Current Highest Bid' : 'Price'}
          </Label>
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#D4AF37]" />
            <p className="text-3xl font-bold text-black">
              {formatCurrency(
                listing.buyNowPrice || currentHighestBid,
                listing.currency
              )}
            </p>
          </div>
          {isAuction && (
            <p className="text-sm text-gray-600 mt-2">
              Reserve: {formatCurrency(listing.reservePrice, listing.currency)}
            </p>
          )}
        </div>

        {/* Bid Count */}
        {isAuction && (
          <div>
            <Label className="text-sm text-gray-600 mb-2 block">Bids</Label>
            <p className="text-2xl font-bold text-black">{bids.length}</p>
          </div>
        )}

        {/* Buy Now Button (Fixed Price) */}
        {!isAuction && listing.buyNowPrice && isActive && (
          <Button
            onClick={handleBuyNow}
            className="w-full bg-[#D4AF37] text-black hover:bg-[#B8941F] rounded-full"
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
              <Label htmlFor="bid-amount" className="text-black">Your Bid</Label>
              <Input
                id="bid-amount"
                type="number"
                min={minNextBid}
                step={listing.minBidIncrement}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={formatCurrency(minNextBid, listing.currency)}
                disabled={isPending}
                className="bg-white border-gray-300"
              />
              <p className="text-xs text-gray-500">
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
              className="w-full bg-black text-white hover:bg-gray-800 rounded-full"
              size="lg"
              disabled={isPending || !bidAmount}
            >
              {isPending ? 'Placing Bid...' : 'Place Bid'}
            </Button>
          </>
        )}

        {/* Bid History */}
        {isAuction && bids.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <Label className="text-sm font-semibold mb-3 block text-black">Recent Bids</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {bids.slice(0, 5).map((bid) => (
                <div
                  key={bid.id}
                  className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-gray-700 font-medium">
                    {formatCurrency(bid.amount, listing.currency)}
                  </span>
                  <span className="text-gray-500">
                    {formatDate(new Date(bid.createdAt))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="pt-4 border-t border-gray-200">
          <Badge 
            variant={isActive ? 'default' : 'secondary'}
            className={isActive ? 'bg-[#D4AF37] text-black' : 'bg-gray-100 text-gray-700'}
          >
            {listing.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
