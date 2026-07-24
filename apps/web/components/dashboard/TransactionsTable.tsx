'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

function formatAmount(cents: number, type: 'CREDIT' | 'DEBIT') {
  const sign = type === 'CREDIT' ? '+' : '−';
  return `${sign}${(Math.abs(cents) / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`;
}

export function TransactionsTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    retry: false,
  });

  return (
    <Card className="p-0">
      <div className="border-b border-line px-6 py-4">
        <h3 className="font-display text-lg">Recent transactions</h3>
      </div>

      {isLoading && (
        <div className="space-y-3 p-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded-md bg-white/5" />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-6 text-sm text-paper/55">
          Couldn't load transactions. Check that the API is running and reachable.
        </div>
      )}

      {!isLoading && !isError && data?.length === 0 && (
        <div className="p-6 text-sm text-paper/55">
          No transactions yet. Once money moves through this account, it'll show up here.
        </div>
      )}

      {!isLoading && !isError && data && data.length > 0 && (
        <table className="w-full text-sm">
          <tbody className="divide-y divide-line">
            {data.map((tx) => (
              <tr key={tx.id}>
                <td className="px-6 py-3.5 text-paper/80">{tx.description}</td>
                <td className="px-6 py-3.5 text-paper/45">{tx.status}</td>
                <td
                  className={cn(
                    'tabular px-6 py-3.5 text-right',
                    tx.type === 'CREDIT' ? 'text-moss' : 'text-clay',
                  )}
                >
                  {formatAmount(tx.amountCents, tx.type)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}
