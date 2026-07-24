'use client';

import { motion } from 'framer-motion';
import { Landmark, ArrowLeftRight, LineChart, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Landmark,
    title: 'Multiple accounts, one balance sheet',
    body: 'Open accounts per team, project, or currency. Everything rolls up to a single view — no spreadsheet stitching.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Transfers that post in seconds',
    body: 'Domestic wires and ACH clear same-day. Every transfer carries a memo your bookkeeper can actually use.',
  },
  {
    icon: LineChart,
    title: 'Reporting that matches your books',
    body: 'Cash flow, burn, and runway computed from the same ledger your accountant reconciles against — always in sync.',
  },
  {
    icon: ShieldCheck,
    title: 'Controls built for teams',
    body: 'Role-based approvals, spend limits, and an audit log for every action — set once, enforced automatically.',
  },
];

export function Features() {
  return (
    <section className="border-t border-line px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-lg font-display text-3xl leading-tight md:text-4xl"
        >
          The banking layer, built like infrastructure.
        </motion.h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group rounded-lg border border-line p-7 transition-colors duration-200 hover:border-brass/40"
            >
              <f.icon className="h-6 w-6 text-brass" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-xl">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-paper/65">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
