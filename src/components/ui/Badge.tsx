import { cn_local } from './Card';

import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'danger';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'glass-sage',
    secondary: 'glass-sky',
    danger: 'glass-rose',
  };

  return (
    <span
      className={cn_local(
        'inline-flex items-center rounded-[8px] border border-white/40 px-2.5 py-0.5 text-xs font-bold tracking-wide shadow-sm',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
