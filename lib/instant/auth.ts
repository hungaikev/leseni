/**
 * InstantDB Authentication Helpers
 * 
 * Magic code authentication flow:
 * 1. User enters email
 * 2. System sends magic code to email
 * 3. User enters code
 * 4. User is authenticated
 */

import { db } from './client';

/**
 * Send magic code to email for sign in/sign up
 */
export async function sendMagicCode(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Use InstantDB's magic code method
    const result = await db.auth.sendMagicCode({ email });
    return { success: result.success || true };
  } catch (error) {
    console.error('Error sending magic code:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send magic code',
    };
  }
}

/**
 * Verify magic code and sign in
 */
export async function verifyMagicCode(
  email: string,
  code: string
): Promise<{ success: boolean; userId?: string; error?: string }> {
  try {
    // Use InstantDB's verify magic code method
    const result = await db.auth.verifyMagicCode({ email, code });
    if (result.success && result.userId) {
      return { success: true, userId: result.userId };
    }
    return {
      success: false,
      error: 'Invalid magic code',
    };
  } catch (error) {
    console.error('Error verifying magic code:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid magic code',
    };
  }
}

/**
 * Get current authenticated user ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    // In real InstantDB: return await db.auth.userId()
    return await db.auth.userId();
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
  try {
    await db.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

