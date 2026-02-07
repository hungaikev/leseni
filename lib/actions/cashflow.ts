/**
 * Server Actions for Cashflows
 */

'use server';

import { db } from '@/lib/instant/client';
import { createCashflowSchema, type CreateCashflowInput } from '@/lib/utils/validation';
import { revalidatePath } from 'next/cache';

interface CreateCashflowResult {
  success: boolean;
  error?: string;
  cashflowId?: string;
}

/**
 * Create a cashflow for a catalog (admin only)
 */
export async function createCatalogCashflow(
  input: CreateCashflowInput,
  adminUserId: string
): Promise<CreateCashflowResult> {
  try {
    // Verify admin
    const { data: users } = await db.query({
      users: {
        $: { where: { id: adminUserId } },
      },
    });

    if (!users || users.length === 0 || !users[0].roles?.includes('ADMIN')) {
      return { success: false, error: 'Admin access required' };
    }

    const validated = createCashflowSchema.parse(input);

    // Calculate platform fee and net amount
    const platformFeeAmount =
      (validated.grossRoyaltyAmount * validated.platformFeePercentage) / 100;
    const netDistributableAmount = validated.grossRoyaltyAmount - platformFeeAmount;

    const cashflowId = `cashflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await db.tx.cashflows[cashflowId].update({
      catalogId: validated.catalogId,
      periodStart: validated.periodStart.getTime(),
      periodEnd: validated.periodEnd.getTime(),
      grossRoyaltyAmount: validated.grossRoyaltyAmount,
      platformFeeAmount,
      platformFeePercentage: validated.platformFeePercentage,
      netDistributableAmount,
      currency: validated.currency,
      createdAt: Date.now(),
    });

    // Automatically distribute to investors
    await distributeCashflowToInvestors(cashflowId, validated.catalogId);

    revalidatePath('/admin');
    revalidatePath(`/catalog/${validated.catalogId}`);
    revalidatePath('/portfolio');

    return { success: true, cashflowId };
  } catch (error) {
    console.error('Error creating cashflow:', error);
    
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Distribute cashflow to all investors with positions in the catalog
 */
export async function distributeCashflowToInvestors(
  cashflowId: string,
  catalogId: string
): Promise<void> {
  try {
    // Get cashflow
    const { data: cashflows } = await db.query({
      cashflows: {
        $: { where: { id: cashflowId } },
      },
    });

    if (!cashflows || cashflows.length === 0) {
      throw new Error('Cashflow not found');
    }

    const cashflow = cashflows[0];

    // Get all positions for this catalog
    const { data: positions } = await db.query({
      positions: {
        $: { where: { catalogId } },
      },
    });

    if (!positions || positions.length === 0) {
      // No positions to distribute to
      return;
    }

    // Calculate total share percentage (should be <= 100%)
    const totalShares = positions.reduce(
      (sum, pos) => sum + pos.sharePercentage,
      0
    );

    if (totalShares === 0) {
      return;
    }

    // Create investor cashflows proportionally
    const transactions = positions.map((position) => {
      const investorCashflowId = `icf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Calculate proportional payout
      const payoutAmount =
        (cashflow.netDistributableAmount * position.sharePercentage) / totalShares;

      return async () => {
        await db.tx.investorCashflows[investorCashflowId].update({
          positionId: position.id,
          catalogId,
          investorId: position.investorId,
          periodStart: cashflow.periodStart,
          periodEnd: cashflow.periodEnd,
          payoutAmount,
          currency: cashflow.currency,
          payoutStatus: 'PENDING', // Will be updated when payment is processed
          createdAt: Date.now(),
        });
      };
    });

    await db.transact(transactions);
  } catch (error) {
    console.error('Error distributing cashflow:', error);
    throw error;
  }
}

/**
 * Mark investor cashflow as paid
 */
export async function markCashflowAsPaid(
  investorCashflowId: string,
  adminUserId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Verify admin
    const { data: users } = await db.query({
      users: {
        $: { where: { id: adminUserId } },
      },
    });

    if (!users || users.length === 0 || !users[0].roles?.includes('ADMIN')) {
      return { success: false, error: 'Admin access required' };
    }

    await db.tx.investorCashflows[investorCashflowId].update({
      payoutStatus: 'SENT',
      payoutDate: Date.now(),
    });

    revalidatePath('/admin');
    revalidatePath('/portfolio');

    return { success: true };
  } catch (error) {
    console.error('Error marking cashflow as paid:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

