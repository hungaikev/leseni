/**
 * InstantDB Client Setup (Mock Implementation)
 * 
 * This is a mock implementation that allows the app to run without InstantDB.
 * Replace this with the actual InstantDB client when the service is available.
 */

import { schema } from './schema';

// Mock database interface
interface MockQueryResult {
  data?: {
    [key: string]: any[];
  };
}

// Mock transaction builder
class MockTransaction {
  private updates: Array<() => Promise<void>> = [];

  constructor(private collection: string) {}

  [id: string]: any;

  update(data: any): Promise<void> {
    return Promise.resolve();
  }
}

// Mock database client
class MockDB {
  private data: Record<string, any[]> = {};

  async query(query: any): Promise<MockQueryResult> {
    // Return empty results for now
    // In production, this would connect to InstantDB
    console.warn('Using mock database - InstantDB not configured');
    return { data: {} };
  }

  get tx() {
    const self = this;
    return new Proxy({} as any, {
      get(target, prop: string) {
        return new Proxy({} as any, {
          get(target2, id: string) {
            return {
              update: async (data: any) => {
                console.log(`Mock update: ${prop}[${id}]`, data);
                return Promise.resolve();
              },
            };
          },
        });
      },
    });
  }

  transact(updates: Array<() => Promise<void>>): Promise<void> {
    console.log('Mock transaction:', updates.length, 'updates');
    return Promise.all(updates.map(u => u())).then(() => {});
  }
}

// Initialize mock client
const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID || '';

if (!APP_ID || APP_ID === 'demo_app_id') {
  console.warn('NEXT_PUBLIC_INSTANT_APP_ID is not set. Using mock database.');
}

// Create mock database instance
const mockDB = new MockDB();

// Export mock database with proper typing
export const db = {
  query: mockDB.query.bind(mockDB),
  tx: mockDB.tx,
  transact: mockDB.transact.bind(mockDB),
  auth: {
    userId: async () => {
      // In real InstantDB, this would get the current user ID from session
      // For now, check localStorage for mock auth
      if (typeof window !== 'undefined') {
        return localStorage.getItem('leseni_user_id');
      }
      return null;
    },
    sendMagicCode: async ({ email }: { email: string }) => {
      // In real InstantDB: await db.auth.sendMagicCode({ email })
      console.log(`[Mock] Sending magic code to ${email}`);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    verifyMagicCode: async ({ email, code }: { email: string; code: string }) => {
      // In real InstantDB: await db.auth.verifyMagicCode({ email, code })
      console.log(`[Mock] Verifying magic code for ${email}`);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For demo: accept any 6-digit code
      if (code.length === 6) {
        const userId = `user_${Date.now()}`;
        if (typeof window !== 'undefined') {
          localStorage.setItem('leseni_user_id', userId);
          localStorage.setItem('leseni_user_email', email);
        }
        return { success: true, userId };
      }
      return { success: false };
    },
    signOut: async () => {
      // In real InstantDB: await db.auth.signOut()
      if (typeof window !== 'undefined') {
        localStorage.removeItem('leseni_user_id');
        localStorage.removeItem('leseni_user_email');
      }
      return { success: true };
    },
  },
} as any;

// Mock schema type
export type Schema = typeof schema;
