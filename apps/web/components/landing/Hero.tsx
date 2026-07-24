'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const tape = [
  { label: 'Stripe payout', amount: '+2,140.00', tone: 'moss' },
  { label: 'AWS · us-east-1', amount: '−412.18', tone: 'clay' },
  { label: 'Payroll · 14 people', amount: '−18,220.00', tone: 'clay' },
  { label: 'Wire in · Acme Co', amount: '+9,500.00', tone: 'moss' },
  { label: 'Adobe Creative Cloud', amount: '−79.99', tone: 'clay' },
  { label: 'Interest earned', amount: '+112.40', tone: 'moss' },
  { label: 'Wire out · Contractor', amount: '−3,000.00', tone: 'clay' },
  { label: 'Card refund', amount: '+58.00', tone: 'moss' },
];

const toneClass: Record<string, string> = {
  moss: 'text-moss',
  clay: 'text-clay',
};

function Tape() {
  const row = [...tape, ...tape];
  return (
    <div className="relative mt-14 overflow-hidden rounded-md border border-line bg-ink-raised/40">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />
      <motion.div
        className="flex gap-8 whitespace-nowrap py-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
      >
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-2 text-sm">
            <span className="text-paper/50">{t.label}</span>
            <span className={cn('tabular', toneClass[t.tone])}>{t.amount}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-28 md:pt-36">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-sm uppercase tracking-[0.18em] text-brass"
        >
          Business banking, kept honest
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-3xl font-display text-5xl leading-[1.08] tracking-tight md:text-6xl"
        >
          Every dollar, <span className="italic text-brass">accounted for</span> — the moment it moves.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-xl text-lg text-paper/70"
        >
          Northbeam gives growing businesses one running ledger for accounts, transfers,
          and spend — reconciled in real time, not at month end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link href="/register">
            <Button>
              Open an account <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline">Talk to sales</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tape />
          <p className="mt-3 text-xs text-paper/40">
            Illustrative activity — a live feed on a Northbeam account.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
