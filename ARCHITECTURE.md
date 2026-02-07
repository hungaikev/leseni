# Royalty Marketplace - Architecture Blueprint

## Project Structure

```
leseni/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── (marketing)/              # Marketing route group
│   │   ├── page.tsx              # Landing page
│   │   └── layout.tsx
│   ├── (app)/                    # Main app routes (protected)
│   │   ├── layout.tsx            # App shell with nav
│   │   ├── catalog/
│   │   │   ├── page.tsx          # Listings browse
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Catalog detail + listing
│   │   ├── sell/
│   │   │   └── page.tsx          # Creator listing flow
│   │   ├── portfolio/
│   │   │   └── page.tsx          # Investor positions
│   │   └── admin/
│   │       └── page.tsx          # Admin dashboard
│   ├── api/                      # API routes (if needed)
│   └── layout.tsx                # Root layout
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── catalog/
│   │   ├── CatalogCard.tsx
│   │   ├── CatalogFilters.tsx
│   │   ├── EarningsChart.tsx
│   │   └── AuctionWidget.tsx
│   ├── listing/
│   │   ├── ListingForm.tsx
│   │   └── CashflowEntry.tsx
│   └── portfolio/
│       └── PositionCard.tsx
├── lib/
│   ├── instant/                  # InstantDB setup
│   │   ├── client.ts
│   │   ├── schema.ts             # Collection definitions
│   │   └── auth.ts
│   ├── types/                    # TypeScript types
│   │   ├── domain.ts
│   │   └── api.ts
│   ├── actions/                  # Server actions
│   │   ├── catalog.ts
│   │   ├── listing.ts
│   │   ├── bid.ts
│   │   └── cashflow.ts
│   ├── utils/
│   │   ├── validation.ts         # Zod schemas
│   │   └── format.ts
│   └── hooks/                    # React hooks
│       └── use-realtime.ts
├── public/
│   └── assets/
├── types/
│   └── instant.ts                # InstantDB generated types
└── package.json
```

## Tech Stack Summary

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Database**: InstantDB (serverless, real-time)
- **Validation**: Zod
- **Charts**: Recharts or Chart.js

