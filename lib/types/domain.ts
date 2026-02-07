/**
 * Domain Types for Royalty Marketplace
 */

export type UserRole = 'CREATOR' | 'INVESTOR' | 'ADMIN';

export type KYCStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type CatalogType = 'MUSIC' | 'FILM' | 'BOOK' | 'OTHER';

export type RightsType = 'MASTER' | 'PUBLISHING' | 'SYNC' | 'PERFORMANCE' | 'MECHANICAL';

export type TermType = 'TERM' | 'PERPETUAL';

export type CatalogStatus = 'DRAFT' | 'UNDER_REVIEW' | 'LISTED' | 'LIVE' | 'CLOSED';

export type ListingMode = 'AUCTION' | 'FIXED_PRICE';

export type ListingStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'ACTIVE' | 'ENDED' | 'CANCELLED';

export type PayoutStatus = 'PENDING' | 'SENT' | 'FAILED';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  kycStatus: KYCStatus;
  payoutAccountId?: string;
  notificationPreferences: {
    email: boolean;
    push: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Catalog {
  id: string;
  ownerId: string;
  type: CatalogType;
  title: string;
  description: string;
  artworkUrl?: string;
  previewUrl?: string;
  rightsType: RightsType;
  termType: TermType;
  termEndDate?: Date;
  status: CatalogStatus;
  // Metrics (calculated or stored)
  trailing12MonthsEarnings: number;
  avgAnnualEarnings: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Listing {
  id: string;
  catalogId: string;
  sellerId: string;
  mode: ListingMode;
  status: ListingStatus;
  startTime: Date;
  endTime?: Date;
  reservePrice: number;
  buyNowPrice?: number;
  minBidIncrement: number;
  currency: string;
  currentHighestBid?: number;
  currentHighestBidderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bid {
  id: string;
  listingId: string;
  bidderId: string;
  amount: number;
  isMaxProxyBid: boolean;
  maxProxyAmount?: number;
  createdAt: Date;
}

export interface Position {
  id: string;
  investorId: string;
  catalogId: string;
  sharePercentage: number;
  acquisitionPrice: number;
  acquiredAt: Date;
  termType: TermType;
  termEndDate?: Date;
  createdAt: Date;
}

export interface Cashflow {
  id: string;
  catalogId: string;
  periodStart: Date;
  periodEnd: Date;
  grossRoyaltyAmount: number;
  platformFeeAmount: number;
  platformFeePercentage: number;
  netDistributableAmount: number;
  currency: string;
  createdAt: Date;
}

export interface InvestorCashflow {
  id: string;
  positionId: string;
  catalogId: string;
  investorId: string;
  periodStart: Date;
  periodEnd: Date;
  payoutAmount: number;
  currency: string;
  payoutStatus: PayoutStatus;
  payoutDate?: Date;
  createdAt: Date;
}

// Aggregated types for UI
export interface CatalogWithListing extends Catalog {
  listing?: Listing;
  highestBid?: Bid;
  bidCount: number;
}

export interface PositionWithCatalog extends Position {
  catalog: Catalog;
  totalReceived: number;
  impliedYield: number;
}

export interface ListingWithCatalog extends Listing {
  catalog: Catalog;
  bids: Bid[];
  bidCount: number;
}

