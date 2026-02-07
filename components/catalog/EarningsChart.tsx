/**
 * Earnings Chart Component
 * 
 * Simple line/bar chart showing historical cashflow data.
 * Uses Recharts for visualization.
 */

'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils/format';

interface Cashflow {
  periodStart: number;
  periodEnd: number;
  grossRoyaltyAmount: number;
  netDistributableAmount: number;
  currency: string;
}

interface EarningsChartProps {
  cashflows: Cashflow[];
  currency: string;
}

export function EarningsChart({ cashflows, currency }: EarningsChartProps) {
  // Transform data for chart
  const chartData = cashflows
    .map((cf) => ({
      period: new Date(cf.periodStart).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
      gross: cf.grossRoyaltyAmount,
      net: cf.netDistributableAmount,
    }))
    .reverse(); // Show oldest to newest

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        No earnings data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis
          tickFormatter={(value) =>
            formatCurrency(value, currency).replace(currency, '').trim()
          }
        />
        <Tooltip
          formatter={(value: number) => formatCurrency(value, currency)}
        />
        <Line
          type="monotone"
          dataKey="gross"
          stroke="#8884d8"
          strokeWidth={2}
          name="Gross Royalties"
        />
        <Line
          type="monotone"
          dataKey="net"
          stroke="#82ca9d"
          strokeWidth={2}
          name="Net Distributable"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

