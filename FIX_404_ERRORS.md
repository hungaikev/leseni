# Fix 404 Errors - Quick Guide

## Immediate Fix

Run these commands in your terminal:

```bash
# Navigate to project directory
cd /Users/macbook/code/Automation/leseni

# Stop the dev server (if running) - Press Ctrl+C

# Clear Next.js build cache
rm -rf .next

# Restart the dev server
npm run dev
```

## What These Errors Mean

- `layout.css:404` - Next.js is looking for a CSS file that hasn't been generated yet
- `pages-internals.js:404` - Internal Next.js file not found (cache issue)
- `layout.js:404` - Route layout file not found (cache issue)
- `favicon.ico:404` - Missing favicon (non-critical, but annoying)

## Why This Happens

These errors occur when:
1. The `.next` build cache is stale or corrupted
2. The dev server was interrupted mid-build
3. Files were changed while the server was running

## Prevention

- Always let the dev server finish starting before refreshing
- Clear `.next` directory after major changes
- Restart dev server after configuration changes

## If Errors Persist

1. **Hard refresh browser**: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. **Clear browser cache** completely
3. **Try incognito/private mode** to rule out browser cache
4. **Full clean restart**:
   ```bash
   rm -rf .next
   rm -rf node_modules/.cache
   npm run dev
   ```

The errors should resolve after clearing the `.next` cache and restarting the dev server.

