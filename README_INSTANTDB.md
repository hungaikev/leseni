# InstantDB Integration Setup

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env.local` file** in the root directory:
   ```env
   NEXT_PUBLIC_INSTANT_APP_ID=89ec7858-7de9-4a83-9698-54cd1f80bcd6
   INSTANT_TOKEN=2487c76b-a83b-4754-9fc3-49e05edcca84
   ```

3. **Sync Schema to InstantDB:**
   - Go to your InstantDB dashboard
   - Navigate to the schema section
   - Sync the schema defined in `lib/instant/schema.ts`
   - Or use the InstantDB CLI if available

4. **Configure Row-Level Security (RLS):**
   - In the InstantDB dashboard, set up RLS rules
   - See `lib/instant/schema.ts` for conceptual RLS rules documentation

## Files Updated

- ✅ `lib/instant/client.ts` - Real InstantDB client initialization
- ✅ `lib/instant/auth.ts` - Authentication helpers using real InstantDB auth
- ✅ `lib/instant/schema.ts` - Database schema definitions
- ✅ `package.json` - Added `@instantdb/react` dependency

## App Credentials

- **App ID:** `89ec7858-7de9-4a83-9698-54cd1f80bcd6`
- **Token:** `2487c76b-a83b-4754-9fc3-49e05edcca84` (for server-side operations if needed)

## Next Steps

1. Run `npm install` to install `@instantdb/react`
2. Create `.env.local` with the credentials above
3. Sync your schema in the InstantDB dashboard
4. Configure RLS rules
5. Test the authentication flow
6. Test data queries and mutations

## Usage Examples

### Client Component
```tsx
'use client';
import { db } from '@/lib/instant/client';

const { data } = await db.query({
  listings: {
    $: { where: { status: 'ACTIVE' } },
    catalog: {},
  },
});
```

### Server Action
```tsx
import { db } from '@/lib/instant/client';

await db.transact([
  async () => {
    await db.tx.listings[listingId].update({ status: 'ACTIVE' });
  },
]);
```

### Authentication
```tsx
import { sendMagicCode, verifyMagicCode } from '@/lib/instant/auth';

await sendMagicCode('user@example.com');
const result = await verifyMagicCode('user@example.com', '123456');
```

