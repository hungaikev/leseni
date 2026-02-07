# Troubleshooting 404 Errors in Next.js

## Common Causes

The 404 errors you're seeing are typically caused by:
1. Stale build cache in `.next` directory
2. Dev server needs restart
3. Missing favicon.ico file

## Solutions

### Solution 1: Clear Cache and Restart (Recommended)

```bash
# Stop the dev server (Ctrl+C)

# Remove the .next build cache
rm -rf .next

# Restart the dev server
npm run dev
```

### Solution 2: Hard Refresh Browser

1. Clear browser cache
2. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
3. Or open in incognito/private mode

### Solution 3: Check for Missing Files

The favicon.ico error can be resolved by:
- Adding a favicon.ico to the `app/` directory
- Or ignoring the error (it's non-critical)

### Solution 4: Full Clean Restart

```bash
# Stop dev server
# Remove all caches
rm -rf .next
rm -rf node_modules/.cache

# Reinstall dependencies (if needed)
npm install

# Restart dev server
npm run dev
```

## Why This Happens

Next.js generates static assets during development. Sometimes:
- The build cache gets out of sync
- Hot reload doesn't catch all changes
- Browser caches old asset references

## Prevention

- Always restart the dev server after major configuration changes
- Clear `.next` directory if you see persistent 404s
- Use `npm run build` to test production builds

