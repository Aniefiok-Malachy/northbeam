'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function Cta() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/register${email ? `?email=${encodeURIComponent(email)}` : ''}`);
  }

  return (
    <section className="relative overflow-hidden border-t border-line px-6 py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(201,164,92,0.10),_transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-display text-4xl leading-tight md:text-5xl">
          Open the account your books deserve.
        </h2>
        <p className="mt-4 text-paper/65">No minimum balance. No monthly fee on Starter.</p>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-md border border-line bg-ink-raised/50 px-4 py-2.5 text-sm placeholder:text-paper/35"
          />
          <Button type="submit" className="shrink-0">
            Get started
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
