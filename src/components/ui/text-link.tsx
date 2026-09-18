import Link from 'next/link';
import type { ReactNode } from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils/cn';

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Opens in a new tab with safe `rel`, and appends an external-link icon. */
  external?: boolean;
  /** Accessible suffix announcing that the link opens a new tab. */
  externalLabel?: string;
  tone?: 'primary' | 'foreground';
};

const tones = {
  primary: 'text-primary hover:text-primary-hover',
  foreground: 'text-foreground hover:text-primary',
} as const;

/**
 * Inline text link.
 *
 * Underline is drawn on hover/focus rather than removed, and it grows from the
 * reading-start edge — `--link-underline-origin` flips in RTL. The link stays
 * distinguishable by more than colour because the underline is always revealed
 * on keyboard focus too.
 */
export function TextLink({
  href,
  children,
  className,
  external = false,
  externalLabel,
  tone = 'primary',
}: TextLinkProps) {
  const classes = cn(
    'link-underline inline-flex items-center gap-1 font-semibold',
    'transition-colors duration-(--duration-base) ease-out rtl:[--link-underline-origin:100%]',
    tones[tone],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <Icon name="external-link" className="size-3.5" />
        {externalLabel ? <span className="sr-only">{externalLabel}</span> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
