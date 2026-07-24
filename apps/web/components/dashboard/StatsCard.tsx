'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  valueCents: number;
  delta?: string;
  tone?: 'moss' | 'clay';
}

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

export function StatsCard({ label, valueCents, delta, tone = 'moss' }: StatsCardProps) {
  const animated = useCountUp(valueCents);
  const dollars = (animated / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Card>
      <p className="text-sm text-paper/55">{label}</p>
      <p className="tabular mt-2 text-2xl">{dollars}</p>
      {delta && (
        <p className={cn('mt-1.5 text-xs', tone === 'moss' ? 'text-moss' : 'text-clay')}>{delta}</p>
      )}
    </Card>
  );
}
