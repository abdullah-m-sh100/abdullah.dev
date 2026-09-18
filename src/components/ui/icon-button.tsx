import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';

import { cn } from '@/lib/utils/cn';

/**
 * Square control for a single icon action.
 *
 * Always 44px so it clears the minimum touch target, and the visible label is
 * carried by `label` — an icon-only control must never ship without one.
 */
const iconButtonBase = cn(
  'inline-flex size-11 items-center justify-center rounded-pill border',
  'border-border bg-surface-muted text-muted-foreground',
  'transition-[color,border-color,background-color] duration-(--duration-base) ease-out',
  'hover:text-primary hover:border-primary hover:bg-primary-subtle',
  'focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring',
);

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
  /** React 19 passes refs as an ordinary prop — no `forwardRef` needed. */
  ref?: Ref<HTMLButtonElement>;
};

export function IconButton({
  label,
  children,
  className,
  type = 'button',
  ref,
  ...props
}: IconButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      className={cn(iconButtonBase, className)}
      {...props}
    >
      {children}
    </button>
  );
}

type IconLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function IconLink({ href, label, children, className, external = false }: IconLinkProps) {
  const classes = cn(iconButtonBase, className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <span className="sr-only">{label}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      <span className="sr-only">{label}</span>
    </Link>
  );
}
