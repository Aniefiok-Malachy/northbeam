'use client';

import { useQuery } from '@tanstack/react-query';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { TransactionsTable } from '@/components/dashboard/TransactionsTable';
import { fetchAccount, fetchTransactions } from '@/lib/api';

function isThisMonth(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

export default function DashboardPage() {
  const { data: account } = useQuery({ queryKey: ['account'], queryFn: fetchAccount, retry: false });
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    retry: false,
  });

  const spendMtdCents =
    transactions
      ?.filter((t) => t.type === 'DEBIT' && t.status !== 'FAILED' && isThisMonth(t.createdAt))
      .reduce((sum, t) => sum + t.amountCents, 0) ?? 0;

  const pendingCents =
    transactions?.filter((t) => t.status === 'PENDING').reduce((sum, t) => sum + t.amountCents, 0) ?? 0;

  return (
    <div>
      <h1 className="font-display text-2xl">Overview</h1>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <StatsCard label="Total balance" valueCents={account?.balanceCents ?? 0} tone="moss" />
        <StatsCard label="Spend, month to date" valueCents={spendMtdCents} tone="clay" />
        <StatsCard label="Pending transfers" valueCents={pendingCents} />
      </div>

      <div className="mt-8">
        <TransactionsTable />
      </div>
    </div>
  );
}
