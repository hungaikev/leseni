# Implementation Notes & Assumptions

## InstantDB Assumptions

1. **Authentication**: InstantDB provides built-in auth. We assume:
   - Email/password authentication is available
   - Session management is handled by InstantDB
   - User ID is accessible in server components via `db.auth.userId()` or similar
   - RLS rules can be configured via InstantDB dashboard

2. **Real-time Updates**: InstantDB provides real-time subscriptions. For the auction widget:
   - Use `db.useQuery()` hook in client components for real-time bid updates
   - Server components can use regular `db.query()` for initial data

3. **Transactions**: InstantDB supports transactions via `db.transact()` for atomic operations (e.g., placing bid + updating listing)

4. **Schema Definition**: The schema is defined in TypeScript and synced with InstantDB dashboard/API

## Next Steps for Full Implementation

### 1. Setup & Configuration

```bash
# Initialize Next.js project
npx create-next-app@latest leseni --typescript --tailwind --app

# Install dependencies
npm install @instantdb/react zod recharts
npm install -D @types/node

# Setup shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input select dialog tabs table card alert badge toast
```

### 2. Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_INSTANT_APP_ID=your_app_id_here
```

### 3. Authentication Integration

Create `lib/instant/auth.ts`:
```typescript
import { db } from './client';

export async function getCurrentUser() {
  const userId = await db.auth.userId();
  if (!userId) return null;
  
  const { data } = await db.query({
    users: { $: { where: { id: userId } } },
  });
  
  return data?.users?.[0] || null;
}
```

### 4. Missing Components to Implement

- `components/catalog/CatalogCard.tsx` - Card component for listing grid
- `components/catalog/CatalogFilters.tsx` - Filter sidebar
- `components/catalog/EarningsChart.tsx` - Chart component using Recharts
- `components/layout/AppShell.tsx` - Main app layout with navigation
- `components/layout/Header.tsx` - Top navigation bar
- `components/layout/Sidebar.tsx` - Side navigation (role-based)

### 5. Additional Server Actions Needed

- `lib/actions/catalog.ts`: `createCatalog`, `updateCatalog`
- `lib/actions/listing.ts`: `createListing`, `submitListingForApproval`, `approveListing`, `buyNow`
- `lib/actions/cashflow.ts`: `createCatalogCashflow`, `distributeCashflowToInvestors`

### 6. Real-time Updates

For the auction widget, use InstantDB's real-time hooks:

```typescript
'use client';
import { db } from '@/lib/instant/client';

export function RealtimeAuctionWidget({ listingId }: { listingId: string }) {
  const { data, isLoading } = db.useQuery({
    listings: {
      $: { where: { id: listingId } },
      bids: { $: { order: { createdAt: 'desc' } } },
    },
  });
  
  // Component renders with live updates
}
```

### 7. KYC Flow

- Create a simple KYC form component
- Store KYC status in user profile
- Add middleware or route protection to check KYC status
- Block actions if KYC !== 'APPROVED'

### 8. Admin Dashboard

- List pending listings: Query `listings` where `status = 'PENDING_APPROVAL'`
- Approve/reject actions: Update listing status
- Cashflow upload: Form to create cashflow entries
- Distribution: Server action to calculate and create investorCashflows

### 9. Payment Integration (Future)

Currently mocked. For production:
- Integrate Stripe or similar
- Create payment intents for bids/purchases
- Handle webhooks for payment confirmation
- Update positions only after payment confirmation

### 10. Testing Considerations

- Unit tests for validation schemas
- Integration tests for server actions
- E2E tests for critical flows (bid, purchase, listing creation)

## Production Considerations

1. **Error Handling**: Add comprehensive error boundaries
2. **Loading States**: Add skeleton loaders for better UX
3. **Optimistic Updates**: For bidding, show optimistic UI updates
4. **Rate Limiting**: Add rate limiting to prevent bid spam
5. **Caching**: Use Next.js caching strategies for catalog listings
6. **SEO**: Add metadata for catalog pages
7. **Analytics**: Track key events (bids, purchases, views)

