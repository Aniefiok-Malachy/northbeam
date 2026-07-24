import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-line bg-ink-raised/60 p-6 shadow-[0_1px_0_0_rgba(245,246,240,0.06)_inset]',
        className,
      )}
      {...props}
    />
  );
}
