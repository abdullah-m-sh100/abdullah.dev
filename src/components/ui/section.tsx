import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Vertical rhythm on the 8pt scale. */
  spacing?: 'none' | 'compact' | 'default' | 'spacious';
  surface?: 'transparent' | 'muted' | 'sunken';
  /** Draws a hairline divider above the section. */
  divider?: boolean;
  'aria-labelledby'?: string;
};

const spacingClasses = {
  none: '',
  compact: 'py-12 md:py-16',
  default: 'py-16 md:py-24',
  spacious: 'py-20 md:py-30',
} as const;

const surfaceClasses = {
  transparent: '',
  muted: 'bg-surface-muted',
  sunken: 'bg-surface-sunken',
} as const;

/**
 * Section shell: vertical rhythm, optional surface tint and divider.
 *
 * Intentionally thin. It owns spacing and background only — the inner layout
 * stays free, so sections do not all end up looking identical.
 */
export function Section({
  children,
  className,
  id,
  spacing = 'default',
  surface = 'transparent',
  divider = false,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={props['aria-labelledby']}
      className={cn(
        spacingClasses[spacing],
        surfaceClasses[surface],
        divider && 'border-border border-t',
        className,
      )}
    >
      {children}
    </section>
  );
}
