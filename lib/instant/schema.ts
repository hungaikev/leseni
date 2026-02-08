/**
 * InstantDB Schema Definitions
 * 
 * This file defines the collection schemas for InstantDB.
 * InstantDB uses a schema-first approach with TypeScript types.
 */

export const schema = {
  users: {
    email: { type: 'string' },
    name: { type: 'string' },
    roles: { type: 'string[]' }, // ['CREATOR', 'INVESTOR', 'ADMIN']
    kycStatus: { type: 'string' }, // 'PENDING' | 'APPROVED' | 'REJECTED'
    payoutAccountId: { type: 'string', optional: true },
    notificationPreferences: {
      type: 'json', // { email: boolean, push: boolean }
    },
    createdAt: { type: 'number' }, // timestamp
    updatedAt: { type: 'number' },
  },
  catalogs: {
    ownerId: { type: 'ref', ref: 'users.id' },
    type: { type: 'string' }, // 'MUSIC' | 'FILM' | etc.
    title: { type: 'string' },
    description: { type: 'string' },
    artworkUrl: { type: 'string', optional: true },
    previewUrl: { type: 'string', optional: true },
    rightsType: { type: 'string' },
    termType: { type: 'string' }, // 'TERM' | 'PERPETUAL'
    termEndDate: { type: 'number', optional: true }, // timestamp
    status: { type: 'string' },
    trailing12MonthsEarnings: { type: 'number' },
    avgAnnualEarnings: { type: 'number' },
    currency: { type: 'string' },
    createdAt: { type: 'number' },
    updatedAt: { type: 'number' },
  },
  listings: {
    catalogId: { type: 'ref', ref: 'catalogs.id' },
    sellerId: { type: 'ref', ref: 'users.id' },
    mode: { type: 'string' }, // 'AUCTION' | 'FIXED_PRICE'
    status: { type: 'string' },
    startTime: { type: 'number' },
    endTime: { type: 'number', optional: true },
    reservePrice: { type: 'number' },
    buyNowPrice: { type: 'number', optional: true },
    minBidIncrement: { type: 'number' },
    currency: { type: 'string' },
    currentHighestBid: { type: 'number', optional: true },
    currentHighestBidderId: { type: 'ref', ref: 'users.id', optional: true },
    createdAt: { type: 'number' },
    updatedAt: { type: 'number' },
  },
  bids: {
    listingId: { type: 'ref', ref: 'listings.id' },
    bidderId: { type: 'ref', ref: 'users.id' },
    amount: { type: 'number' },
    isMaxProxyBid: { type: 'boolean' },
    maxProxyAmount: { type: 'number', optional: true },
    createdAt: { type: 'number' },
  },
  positions: {
    investorId: { type: 'ref', ref: 'users.id' },
    catalogId: { type: 'ref', ref: 'catalogs.id' },
    sharePercentage: { type: 'number' },
    acquisitionPrice: { type: 'number' },
    acquiredAt: { type: 'number' },
    termType: { type: 'string' },
    termEndDate: { type: 'number', optional: true },
    createdAt: { type: 'number' },
  },
  cashflows: {
    catalogId: { type: 'ref', ref: 'catalogs.id' },
    periodStart: { type: 'number' },
    periodEnd: { type: 'number' },
    grossRoyaltyAmount: { type: 'number' },
    platformFeeAmount: { type: 'number' },
    platformFeePercentage: { type: 'number' },
    netDistributableAmount: { type: 'number' },
    currency: { type: 'string' },
    createdAt: { type: 'number' },
  },
  investorCashflows: {
    positionId: { type: 'ref', ref: 'positions.id' },
    catalogId: { type: 'ref', ref: 'catalogs.id' },
    investorId: { type: 'ref', ref: 'users.id' },
    periodStart: { type: 'number' },
    periodEnd: { type: 'number' },
    payoutAmount: { type: 'number' },
    currency: { type: 'string' },
    payoutStatus: { type: 'string' },
    payoutDate: { type: 'number', optional: true },
    createdAt: { type: 'number' },
  },
  links: {},
};

/**
 * Row-Level Security (RLS) Rules
 * 
 * Note: InstantDB RLS is configured via the InstantDB dashboard or API.
 * These are conceptual rules that should be implemented:
 * 
 * Users:
 * - Users can read their own profile
 * - Users can update their own profile (except roles, which only admins can change)
 * - Admins can read all users
 * 
 * Catalogs:
 * - Users can read catalogs with status LISTED, LIVE, or CLOSED
 * - Owners can read/write their own catalogs
 * - Admins can read/write all catalogs
 * 
 * Listings:
 * - Users can read listings with status ACTIVE or ENDED
 * - Sellers can read/write their own listings
 * - Admins can read/write all listings
 * 
 * Bids:
 * - Users can read bids for listings they can see
 * - Users can create bids for their own account
 * - Users can read their own bids
 * 
 * Positions:
 * - Users can read their own positions
 * - System can create positions (via server actions)
 * 
 * Cashflows:
 * - Users can read cashflows for catalogs they have positions in
 * - Admins can create/read all cashflows
 * 
 * InvestorCashflows:
 * - Users can read their own investorCashflows
 * - System can create investorCashflows (via server actions)
 */
