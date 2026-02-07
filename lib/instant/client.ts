/**
 * InstantDB Client Setup
 * 
 * Real InstantDB integration with the provided app ID and token.
 */

import { init } from '@instantdb/react';
import { schema } from './schema';

const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID || '89ec7858-7de9-4a83-9698-54cd1f80bcd6';

if (!APP_ID) {
  throw new Error('NEXT_PUBLIC_INSTANT_APP_ID is required. Please set it in your .env.local file');
}

// Initialize InstantDB client
export const db = init({
  appId: APP_ID,
  schema,
});

export type { Schema } from '@instantdb/react';
