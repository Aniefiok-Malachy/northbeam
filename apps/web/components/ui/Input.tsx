import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div>
        <label htmlFor={inputId} className="mb-1.5 block text-sm text-paper/70">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full rounded-md border border-line bg-ink-raised/50 px-3.5 py-2.5 text-sm placeholder:text-paper/30',
            error && 'border-clay/60',
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-clay">{error}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';
