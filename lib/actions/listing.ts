/**
 * Server Actions for Listings
 */

'use server';

import { db } from '@/lib/instant/client';
import { createListingSchema, type CreateListingInput } from '@/lib/utils/validation';
import { revalidatePath } from 'next/cache';

interface CreateListingResult {
  success: boolean;
  error?: string;
  listingId?: string;
}

/**
 * Create a new listing
 */
export async function createListing(
  input: CreateListingInput,
  userId: string
): Promise<CreateListingResult> {
  try {
    const validated = createListingSchema.parse(input);

    // Verify user owns the catalog
    const { data: catalogs } = await db.query({
      catalogs: {
        $: { where: { id: validated.catalogId, ownerId: userId } },
      },
    });

    if (!catalogs || catalogs.length === 0) {
      return {
        success: false,
        error: 'Catalog not found or you do not have permission',
      };
    }

    const catalog = catalogs[0];

    // Verify catalog is in a valid state
    if (catalog.status !== 'LISTED' && catalog.status !== 'DRAFT') {
      return {
        success: false,
        error: 'Catalog must be in DRAFT or LISTED status to create a listing',
      };
    }

    // Create listing
    const listingId = `listing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = Date.now();

    await db.transact([
      async () => {
        await db.tx.listings[listingId].update({
          catalogId: validated.catalogId,
          sellerId: userId,
          mode: validated.mode,
          status: 'DRAFT',
          startTime: validated.startTime.getTime(),
          endTime: validated.endTime?.getTime(),
          reservePrice: validated.reservePrice,
          buyNowPrice: validated.buyNowPrice,
          minBidIncrement: validated.minBidIncrement,
          currency: validated.currency,
          createdAt: now,
          updatedAt: now,
        });
      },
    ]);

    revalidatePath('/sell');
    revalidatePath(`/catalog/${validated.catalogId}`);

    return {
      success: true,
      listingId,
    };
  } catch (error) {
    console.error('Error creating listing:', error);
    
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Submit listing for admin approval
 */
export async function submitListingForApproval(
  listingId: string,
  userId: string
): Promise<CreateListingResult> {
  try {
    // Verify ownership
    const { data: listings } = await db.query({
      listings: {
        $: { where: { id: listingId, sellerId: userId } },
      },
    });

    if (!listings || listings.length === 0) {
      return {
        success: false,
        error: 'Listing not found or you do not have permission',
      };
    }

    const listing = listings[0];

    if (listing.status !== 'DRAFT') {
      return {
        success: false,
        error: 'Only draft listings can be submitted for approval',
      };
    }

    // Update status
    await db.tx.listings[listingId].update({
      status: 'PENDING_APPROVAL',
      updatedAt: Date.now(),
    });

    revalidatePath('/sell');
    revalidatePath('/admin');

    return { success: true, listingId };
  } catch (error) {
    console.error('Error submitting listing:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Approve a listing (admin only)
 */
export async function approveListing(
  listingId: string,
  adminUserId: string
): Promise<CreateListingResult> {
  try {
    // Verify admin role
    const { data: users } = await db.query({
      users: {
        $: { where: { id: adminUserId } },
      },
    });

    if (!users || users.length === 0 || !users[0].roles?.includes('ADMIN')) {
      return {
        success: false,
        error: 'Admin access required',
      };
    }

    // Get listing
    const { data: listings } = await db.query({
      listings: {
        $: { where: { id: listingId, status: 'PENDING_APPROVAL' } },
      },
    });

    if (!listings || listings.length === 0) {
      return {
        success: false,
        error: 'Listing not found or not pending approval',
      };
    }

    const listing = listings[0];
    const now = Date.now();
    const startTime = listing.startTime || now;

    // Update listing to ACTIVE
    await db.transact([
      async () => {
        await db.tx.listings[listingId].update({
          status: 'ACTIVE',
          startTime: startTime,
          updatedAt: now,
        });
      },
      async () => {
        await db.tx.catalogs[listing.catalogId].update({
          status: 'LIVE',
          updatedAt: now,
        });
      },
    ]);

    revalidatePath('/admin');
    revalidatePath('/catalog');
    revalidatePath(`/catalog/${listing.catalogId}`);

    return { success: true, listingId };
  } catch (error) {
    console.error('Error approving listing:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Buy now for fixed-price listings
 */
export async function buyNow(
  listingId: string,
  userId: string
): Promise<CreateListingResult> {
  try {
    // Get user and verify KYC
    const { data: users } = await db.query({
      users: {
        $: { where: { id: userId } },
      },
    });

    if (!users || users.length === 0) {
      return { success: false, error: 'User not found' };
    }

    if (users[0].kycStatus !== 'APPROVED') {
      return {
        success: false,
        error: 'KYC verification required',
      };
    }

    // Get listing
    const { data: listings } = await db.query({
      listings: {
        $: { where: { id: listingId } },
        catalog: {},
      },
    });

    if (!listings || listings.length === 0) {
      return { success: false, error: 'Listing not found' };
    }

    const listing = listings[0];

    // Validate listing
    if (listing.status !== 'ACTIVE') {
      return { success: false, error: 'Listing is not active' };
    }

    if (listing.mode !== 'FIXED_PRICE') {
      return { success: false, error: 'This listing is not a fixed-price listing' };
    }

    if (!listing.buyNowPrice) {
      return { success: false, error: 'Buy now price not set' };
    }

    if (listing.sellerId === userId) {
      return { success: false, error: 'You cannot buy your own listing' };
    }

    // TODO: Process payment (mocked for now)
    // In production, integrate with payment provider

    const now = Date.now();
    const catalog = listing.catalog;

    // Create position (100% share for now, could be partial)
    const positionId = `position_${now}_${Math.random().toString(36).substr(2, 9)}`;

    await db.transact([
      // Create position
      async () => {
        await db.tx.positions[positionId].update({
          investorId: userId,
          catalogId: listing.catalogId,
          sharePercentage: 100, // Full ownership for fixed-price
          acquisitionPrice: listing.buyNowPrice,
          acquiredAt: now,
          termType: catalog.termType,
          termEndDate: catalog.termEndDate,
          createdAt: now,
        });
      },
      // Mark listing as ended
      async () => {
        await db.tx.listings[listingId].update({
          status: 'ENDED',
          updatedAt: now,
        });
      },
      // Update catalog status
      async () => {
        await db.tx.catalogs[listing.catalogId].update({
          status: 'CLOSED',
          updatedAt: now,
        });
      },
    ]);

    revalidatePath(`/catalog/${listing.catalogId}`);
    revalidatePath('/portfolio');

    return { success: true, listingId };
  } catch (error) {
    console.error('Error processing buy now:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

