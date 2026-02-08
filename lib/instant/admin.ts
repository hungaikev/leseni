import { init } from '@instantdb/admin';

const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID || '';
const ADMIN_TOKEN = process.env.INSTANT_TOKEN || '';

if (!APP_ID || !ADMIN_TOKEN) {
  throw new Error('Instant admin credentials missing');
}

export const adminDb = init({
  appId: APP_ID,
  adminToken: ADMIN_TOKEN,
});
