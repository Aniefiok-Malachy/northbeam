'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    monthly: 0,
    yearly: 0,
    blurb: 'For founders getting the first account open.',
    perks: ['1 business account', 'Unlimited ACH transfers', '2 team seats', 'Email support'],
  },
  {
    name: 'Growth',
    monthly: 60,
    yearly: 50,
    blurb: 'For teams that need controls and reporting.',
    perks: [
      'Unlimited accounts',
      'Same-day wires',
      '10 team seats',
      'Role-based approvals',
      'Priority support',
    ],
    featured: true,
  },
  {
    name: 'Scale',
    monthly: 180,
    yearly: 150,
    blurb: 'For finance teams running multi-entity books.',
    perks: [
      'Everything in Growth',
      'Unlimited seats',
      'Audit log export',
      'Dedicated account manager',
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section className="border-t border-line px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl md:text-4xl">Pricing that scales with your ledger.</h2>

          <div className="flex items-center gap-3 rounded-md border border-line p-1">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                'rounded px-3 py-1.5 text-sm transition-colors',
                !yearly ? 'bg-white/10 text-paper' : 'text-paper/50',
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                'rounded px-3 py-1.5 text-sm transition-colors',
                yearly ? 'bg-white/10 text-paper' : 'text-paper/50',
              )}
            >
              Yearly <span className="text-brass">· save 17%</span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(plan.featured && 'border-brass/50 bg-ink-raised')}
            >
              {plan.featured && (
                <span className="mb-4 inline-block rounded-full bg-brass/15 px-2.5 py-1 text-xs text-brass">
                  Most teams choose this
                </span>
              )}
              <h3 className="font-display text-xl">{plan.name}</h3>
              <p className="mt-1.5 text-sm text-paper/60">{plan.blurb}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <motion.span
                  key={yearly ? 'y' : 'm'}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="tabular font-display text-4xl"
                >
                  ${yearly ? plan.yearly : plan.monthly}
                </motion.span>
                <span className="text-sm text-paper/50">/mo</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm text-paper/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-moss" strokeWidth={2} />
                    {perk}
                  </li>
                ))}
              </ul>

              <Link href="/register">
                <Button
                  variant={plan.featured ? 'primary' : 'outline'}
                  className="mt-8 w-full"
                >
                  Get started
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
