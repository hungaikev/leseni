# Setup Instructions

## Quick Start

### 1. Install Dependencies

Run this command in your terminal:

```bash
cd /Users/macbook/code/Automation/leseni
npm install
```

If you encounter permission errors, try:
```bash
sudo npm install
```

Or use yarn:
```bash
yarn install
```

### 2. Install Additional Dependencies

The project needs these packages (they should install with npm install, but if not):

```bash
npm install @radix-ui/react-label @radix-ui/react-slot class-variance-authority clsx tailwind-merge tailwindcss-animate
```

### 3. Create Environment File

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_INSTANT_APP_ID=your_app_id_here
```

**Note**: You'll need to:
1. Sign up at [InstantDB](https://instantdb.com)
2. Create a new app
3. Copy the app ID to `.env.local`

For now, you can use a placeholder like `demo_app_id` to run the app (database queries will fail gracefully).

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## What's Included

✅ Next.js 14 with App Router
✅ TypeScript configuration
✅ Tailwind CSS setup
✅ shadcn/ui components (Button, Card, Input, Badge, Alert, Label)
✅ Project structure with domain models
✅ Example pages (landing, catalog browse, catalog detail)
✅ Server actions for bidding, listings, cashflows
✅ Validation schemas with Zod

## Known Limitations

- **InstantDB**: Database queries will fail without a valid app ID. The app will show empty states gracefully.
- **Authentication**: User auth needs to be integrated with InstantDB auth system
- **Missing Pages**: `/sell`, `/portfolio`, `/admin` pages need to be created
- **Real-time**: Real-time bid updates need InstantDB subscriptions configured

## Next Steps

1. Set up InstantDB account and configure schema
2. Implement authentication flow
3. Create remaining pages (`/sell`, `/portfolio`, `/admin`)
4. Add real-time subscriptions for live updates
5. Integrate payment processing (currently mocked)

## Troubleshooting

### npm install fails
- Try `sudo npm install` or use `yarn`
- Check Node.js version (should be 18+)

### TypeScript errors
- Run `npm install` to ensure all types are installed
- Check that `tsconfig.json` paths are correct

### Build errors
- Make sure all dependencies are installed
- Check that `.env.local` exists (even with placeholder)

### InstantDB errors
- The app is designed to fail gracefully without InstantDB
- You'll see empty states instead of crashes
- Configure InstantDB to enable full functionality

