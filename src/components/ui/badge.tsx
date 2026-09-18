import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'neutral' | 'primary' | 'secondary' | 'outline';
type BadgeSize = 'sm' | 'md';

const variants: Record<BadgeVariant, string> = {
  neutral: 'border-border bg-surface-muted text-muted-foreground',
  primary: 'border-primary/25 bg-primary-subtle text-primary',
  secondary: 'border-secondary/25 bg-secondary-subtle text-secondary',
  outline: 'border-border-strong bg-transparent text-muted-foreground',
};

const sizes: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
};

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /**
   * Leading status dot. Its colour carries no meaning on its own — always pair
   * it with the text label, never use it as the sole signal.
   */
  dot?: boolean;
  className?: string;
};

/** Compact label for technologies, categories, roles and availability. */
export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border font-semibold',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {dot ? (
        <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-current" />
      ) : null}
      {children}
    </span>
  );
}
