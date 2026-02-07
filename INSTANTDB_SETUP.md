# InstantDB Setup

This project uses InstantDB for the backend database and authentication.

## Configuration

The InstantDB app ID and token are configured in `.env.local`:

```
NEXT_PUBLIC_INSTANT_APP_ID=89ec7858-7de9-4a83-9698-54cd1f80bcd6
INSTANT_TOKEN=2487c76b-a83b-4754-9fc3-49e05edcca84
```

## Installation

Make sure `@instantdb/react` is installed:

```bash
npm install @instantdb/react
```

## Schema

The database schema is defined in `lib/instant/schema.ts`. This includes:

- `users` - User accounts with KYC status
- `catalogs` - Music/film catalogs
- `listings` - Auction and fixed-price listings
- `bids` - Bids on auction listings
- `positions` - Investor positions in catalogs
- `cashflows` - Royalty cashflows
- `investorCashflows` - Individual investor payouts

## Row-Level Security (RLS)

RLS rules should be configured in the InstantDB dashboard. The conceptual rules are documented in `lib/instant/schema.ts`.

## Usage

### Client Component

```tsx
'use client';
import { db } from '@/lib/instant/client';

// Query data
const { data } = await db.query({
  listings: {
    $: { where: { status: 'ACTIVE' } },
    catalog: {},
  },
});
```

### Server Component / Server Actions

```tsx
import { db } from '@/lib/instant/client';

// Query in server component
const { data } = await db.query({
  catalogs: {},
});

// Transaction
await db.transact([
  async () => {
    await db.tx.listings[listingId].update({ status: 'ACTIVE' });
  },
]);
```

### Authentication

```tsx
import { sendMagicCode, verifyMagicCode, getCurrentUserId } from '@/lib/instant/auth';

// Send magic code
await sendMagicCode('user@example.com');

// Verify and sign in
const result = await verifyMagicCode('user@example.com', '123456');

// Get current user
const userId = await getCurrentUserId();
```

## Next Steps

1. Sync the schema to InstantDB dashboard
2. Configure RLS rules in InstantDB dashboard
3. Test authentication flow
4. Test data queries and mutations

