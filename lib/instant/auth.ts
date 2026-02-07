/**
 * InstantDB Authentication Helpers
 * 
 * Wrapper functions for InstantDB's magic code authentication.
 */

import { db } from './client';

/**
 * Send a magic code to the user's email
 */
export async function sendMagicCode(email: string) {
  try {
    await db.auth.sendMagicCode({ email });
    return { success: true };
  } catch (error) {
    console.error('Error sending magic code:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send magic code' };
  }
}

/**
 * Verify a magic code and sign in the user
 */
export async function verifyMagicCode(email: string, code: string) {
  try {
    const result = await db.auth.verifyMagicCode({ email, code });
    return { success: true, userId: result.userId };
  } catch (error) {
    console.error('Error verifying magic code:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Invalid magic code' };
  }
}

/**
 * Get the current user ID from the session
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    return await db.auth.userId();
  } catch (error) {
    console.error('Error getting current user ID:', error);
    return null;
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    await db.auth.signOut();
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to sign out' };
  }
}
