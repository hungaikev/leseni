# Royalty Marketplace - Implementation Blueprint

A Next.js-based marketplace for buying and selling royalty streams (starting with music catalogs), built with InstantDB, Tailwind CSS, and shadcn/ui.

## 📁 Project Structure

See `ARCHITECTURE.md` for the complete file structure.

## 🏗️ Core Architecture

### Domain Models

All domain types are defined in `lib/types/domain.ts`:

- **User**: Roles (CREATOR, INVESTOR, ADMIN), KYC status, preferences
- **Catalog**: Royalty asset metadata, earnings metrics, status
- **Listing**: Auction or fixed-price listing configuration
- **Bid**: Bid history for auctions
- **Position**: Investor ownership stake in a catalog
- **Cashflow**: Period-based royalty payments
- **InvestorCashflow**: Individual investor payouts

### Database Schema

InstantDB collections are defined in `lib/instant/schema.ts`:

- Collections: `users`, `catalogs`, `listings`, `bids`, `positions`, `cashflows`, `investorCashflows`
- Relationships via `ref` types
- Timestamps stored as numbers (milliseconds)

### Key Routes

- `/` - Landing page
- `/catalog` - Browse active listings (server component)
- `/catalog/[id]` - Catalog detail + listing widget (hybrid)
- `/sell` - Creator listing flow (multi-step form)
- `/portfolio` - Investor positions and cashflows
- `/admin` - Admin dashboard for approvals

## 🔑 Key Implementation Details

### Server Actions

All mutations use Next.js Server Actions with Zod validation:

- **`placeBid`** (`lib/actions/bid.ts`): Validates KYC, listing status, bid amount
- **`createListing`** (`lib/actions/listing.ts`): Creates listing, submits for approval
- **`approveListing`** (`lib/actions/listing.ts`): Admin-only approval
- **`buyNow`** (`lib/actions/listing.ts`): Fixed-price purchase flow
- **`createCatalogCashflow`** (`lib/actions/cashflow.ts`): Admin creates cashflow
- **`distributeCashflowToInvestors`** (`lib/actions/cashflow.ts`): Proportional distribution

### Real-time Updates

InstantDB provides real-time subscriptions. Use `db.useQuery()` in client components:

```typescript
const { data } = db.useQuery({
  listings: { $: { where: { id: listingId } }, bids: {} },
});
```

### Authentication

InstantDB handles auth. Access user ID in server components:

```typescript
const userId = await db.auth.userId();
```

### Validation

All inputs validated with Zod schemas in `lib/utils/validation.ts`:

- `createCatalogSchema`
- `createListingSchema`
- `placeBidSchema`
- `createCashflowSchema`

## 🚀 Getting Started

### 1. Initialize Project

```bash
npx create-next-app@latest leseni --typescript --tailwind --app
cd leseni
```

### 2. Install Dependencies

```bash
npm install @instantdb/react zod recharts
npm install -D @types/node
```

### 3. Setup shadcn/ui

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input select dialog tabs table card alert badge toast label
```

### 4. Configure InstantDB

1. Create account at [InstantDB](https://instantdb.com)
2. Create new app
3. Copy app ID to `.env.local`:

```
NEXT_PUBLIC_INSTANT_APP_ID=your_app_id_here
```

4. Sync schema from `lib/instant/schema.ts` via InstantDB dashboard

### 5. Setup Row-Level Security

Configure RLS rules in InstantDB dashboard (see `lib/instant/schema.ts` for conceptual rules).

## 📝 Example Code Highlights

### Server Component (Catalog List)

```12:45:app/(app)/catalog/page.tsx
export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  
  // Build query filters
  const where: Record<string, any> = {
    status: 'ACTIVE',
  };

  // Query active listings with their catalogs
  const { data } = await db.query({
    listings: {
      $: {
        where,
        order: getSortOrder(params.sort),
      },
      catalog: {},
    },
  });
  // ... rest of component
}
```

### Client Component (Auction Widget)

```12:45:components/catalog/AuctionWidget.tsx
export function AuctionWidget({ listing, catalog, bids }: AuctionWidgetProps) {
  const [bidAmount, setBidAmount] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handlePlaceBid = async () => {
    startTransition(async () => {
      const result = await placeBid(
        { listingId: listing.id, amount },
        userId
      );
      // ... handle result
    });
  };
  // ... rest of component
}
```

### Server Action (Place Bid)

```25:95:lib/actions/bid.ts
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

    // Check KYC status
    if (currentUser.kycStatus !== 'APPROVED') {
      return {
        success: false,
        error: 'You must complete KYC verification before placing bids',
      };
    }

    // Validate listing, bid amount, timing, etc.
    // ... validation logic

    // Create bid transactionally
    await db.transact([
      db.tx.bids[bidId].update({ ... }),
      db.tx.listings[listingId].update({ ... }),
    ]);

    return { success: true, bidId };
  } catch (error) {
    // ... error handling
  }
}
```

## 🔐 Security Considerations

1. **Row-Level Security**: Configure in InstantDB dashboard
2. **Server Actions**: All mutations validate user permissions
3. **KYC Checks**: Enforced before bidding/purchasing
4. **Input Validation**: Zod schemas for all user inputs
5. **Admin Actions**: Role checks in all admin functions

## 📊 Data Flow Examples

### Auction Flow

1. Creator creates catalog → `createCatalog`
2. Creator creates listing → `createListing` (status: DRAFT)
3. Creator submits → `submitListingForApproval` (status: PENDING_APPROVAL)
4. Admin approves → `approveListing` (status: ACTIVE)
5. Investor bids → `placeBid` (updates listing.currentHighestBid)
6. Auction ends → Admin or scheduled job calls `finalizeAuction`
7. Position created for winner

### Cashflow Distribution

1. Admin creates cashflow → `createCatalogCashflow`
2. System calculates net amount (gross - platform fee)
3. System distributes → `distributeCashflowToInvestors`
4. Creates `investorCashflows` proportionally by share percentage
5. Admin marks as paid → `markCashflowAsPaid`

## 🎨 UI Components

Built with shadcn/ui:
- Forms: Input, Select, Label
- Feedback: Alert, Toast, Badge
- Layout: Card, Dialog, Tabs
- Data: Table
- Charts: Recharts for earnings visualization

## 🔄 Next Steps

See `IMPLEMENTATION_NOTES.md` for:
- Missing components to implement
- Authentication integration details
- Real-time update patterns
- Payment integration (currently mocked)
- Testing strategies

## 📚 Key Assumptions

1. **InstantDB Auth**: Provides email/password auth with session management
2. **Real-time**: `db.useQuery()` provides live subscriptions
3. **Transactions**: `db.transact()` ensures atomicity
4. **RLS**: Configured via InstantDB dashboard
5. **Payment**: Currently mocked; integrate Stripe/payment provider for production

## 🐛 Known Limitations (v1)

- No proxy bidding (simple highest bid wins)
- Payment processing mocked
- KYC is a simple enum (no external integration)
- No automated auction finalization (manual admin action)
- CSV upload for cashflows not implemented (manual entry)

## 📖 Documentation

- `ARCHITECTURE.md` - File structure and organization
- `IMPLEMENTATION_NOTES.md` - Detailed implementation guide
- `lib/types/domain.ts` - TypeScript type definitions
- `lib/instant/schema.ts` - Database schema

