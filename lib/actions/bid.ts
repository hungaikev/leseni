/**
 * Server Actions for Bidding
 */

'use server';

import { db } from '@/lib/instant/client';
import { placeBidSchema, type PlaceBidInput } from '@/lib/utils/validation';
import { revalidatePath } from 'next/cache';

interface PlaceBidResult {
  success: boolean;
  error?: string;
  bidId?: string;
}

/**
 * Place a bid on an auction listing
 * 
 * Validations:
 * - User must be authenticated
 * - User must have KYC status APPROVED
 * - Listing must exist and be ACTIVE
 * - Current time must be before listing endTime
 * - Bid amount must be >= currentHighestBid + minBidIncrement
 * - Bid amount must be >= reservePrice (if no bids yet)
 * - User cannot bid on their own listing
 */
export async function placeBid(
  input: PlaceBidInput,
  userId: string
): Promise<PlaceBidResult> {
  try {
    // Validate input
    const validated = placeBidSchema.parse(input);

    // Get current user
    const { data: user } = await db.query({
      users: {
        $: { where: { id: userId } },
      },
    });

    if (!user || user.length === 0) {
      return { success: false, error: 'User not found' };
    }

    const currentUser = user[0];

    // Check KYC status
    if (currentUser.kycStatus !== 'APPROVED') {
      return {
        success: false,
        error: 'You must complete KYC verification before placing bids',
      };
    }

    // Get listing with catalog
    const { data: listings } = await db.query({
      listings: {
        $: { where: { id: validated.listingId } },
        catalog: {},
      },
    });

    if (!listings || listings.length === 0) {
      return { success: false, error: 'Listing not found' };
    }

    const listing = listings[0];

    // Validate listing status
    if (listing.status !== 'ACTIVE') {
      return {
        success: false,
        error: 'This listing is not currently active',
      };
    }

    // Validate listing mode
    if (listing.mode !== 'AUCTION') {
      return {
        success: false,
        error: 'This listing is not an auction',
      };
    }

    // Check if user is the seller
    if (listing.sellerId === userId) {
      return {
        success: false,
        error: 'You cannot bid on your own listing',
      };
    }

    // Validate timing
    const now = Date.now();
    if (listing.endTime && now >= listing.endTime) {
      return {
        success: false,
        error: 'This auction has ended',
      };
    }

    // Validate bid amount
    const currentHighest = listing.currentHighestBid || 0;
    const minBid = currentHighest > 0
      ? currentHighest + listing.minBidIncrement
      : listing.reservePrice;

    if (validated.amount < minBid) {
      return {
        success: false,
        error: `Bid must be at least ${minBid.toLocaleString('en-US', {
          style: 'currency',
          currency: listing.currency,
        })}`,
      };
    }

    // Create bid
    const bidId = `bid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const updates = [
      async () => {
        await db.tx.bids[bidId].update({
          listingId: validated.listingId,
          bidderId: userId,
          amount: validated.amount,
          isMaxProxyBid: false,
          createdAt: now,
        });
      },
      async () => {
        await db.tx.listings[validated.listingId].update({
          currentHighestBid: validated.amount,
          currentHighestBidderId: userId,
          updatedAt: now,
        });
      },
    ];
    
    await db.transact(updates);

    // Revalidate relevant pages
    revalidatePath(`/catalog/${listing.catalogId}`);
    revalidatePath('/catalog');

    return {
      success: true,
      bidId,
    };
  } catch (error) {
    console.error('Error placing bid:', error);
    
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    
    return {
      success: false,
      error: 'An unexpected error occurred while placing your bid',
    };
  }
}

/**
 * Get bid history for a listing
 */
export async function getBidHistory(listingId: string) {
  const { data } = await db.query({
    bids: {
      $: {
        where: { listingId },
        order: { createdAt: 'desc' },
      },
      bidder: {},
    },
  });

  return data?.bids || [];
}

