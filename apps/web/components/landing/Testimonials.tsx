'use client';

import { motion } from 'framer-motion';

const quotes = [
  {
    quote:
      'We closed our books three days faster the first month. The ledger just already matched what we had.',
    name: 'Dara Okafor',
    role: 'Finance Lead, Fielding Co.',
  },
  {
    quote:
      'Approvals used to live in Slack threads. Now they live in the account, with a record.',
    name: 'Marcus Lindqvist',
    role: 'COO, Halvor Studio',
  },
  {
    quote: 'Our accountant asked what changed. We told her: nothing to reconcile anymore.',
    name: 'Priya Nair',
    role: 'Founder, Loomwork',
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-line px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-lg border border-line p-7"
            >
              <blockquote className="font-display text-lg italic leading-snug text-paper/90">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="text-paper/85">{q.name}</span>
                <span className="text-paper/45"> — {q.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
