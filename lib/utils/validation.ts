/**
 * Zod Validation Schemas
 */

import { z } from 'zod';

export const createCatalogSchema = z.object({
  type: z.enum(['MUSIC', 'FILM', 'BOOK', 'OTHER']),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  artworkUrl: z.string().url().optional().or(z.literal('')),
  previewUrl: z.string().url().optional().or(z.literal('')),
  rightsType: z.enum(['MASTER', 'PUBLISHING', 'SYNC', 'PERFORMANCE', 'MECHANICAL']),
  termType: z.enum(['TERM', 'PERPETUAL']),
  termEndDate: z.date().optional(),
  currency: z.string().length(3, 'Currency must be 3 characters (e.g., USD)'),
});

export const createListingSchema = z.object({
  catalogId: z.string().min(1),
  mode: z.enum(['AUCTION', 'FIXED_PRICE']),
  startTime: z.date(),
  endTime: z.date().optional(),
  reservePrice: z.number().positive('Reserve price must be positive'),
  buyNowPrice: z.number().positive().optional(),
  minBidIncrement: z.number().positive('Min bid increment must be positive'),
  currency: z.string().length(3),
}).refine(
  (data) => {
    if (data.mode === 'AUCTION' && !data.endTime) {
      return false;
    }
    return true;
  },
  { message: 'Auction listings must have an end time' }
).refine(
  (data) => {
    if (data.mode === 'FIXED_PRICE' && !data.buyNowPrice) {
      return false;
    }
    return true;
  },
  { message: 'Fixed price listings must have a buy now price' }
);

export const placeBidSchema = z.object({
  listingId: z.string().min(1),
  amount: z.number().positive('Bid amount must be positive'),
});

export const createCashflowSchema = z.object({
  catalogId: z.string().min(1),
  periodStart: z.date(),
  periodEnd: z.date(),
  grossRoyaltyAmount: z.number().nonnegative(),
  platformFeePercentage: z.number().min(0).max(100),
  currency: z.string().length(3),
}).refine(
  (data) => data.periodEnd > data.periodStart,
  { message: 'Period end must be after period start' }
);

export type CreateCatalogInput = z.infer<typeof createCatalogSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type PlaceBidInput = z.infer<typeof placeBidSchema>;
export type CreateCashflowInput = z.infer<typeof createCashflowSchema>;

