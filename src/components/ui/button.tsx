import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button system.
 *
 * `group` is on the base so a nested `<ButtonArrow />` can respond to hover;
 * the arrow's direction handling lives in the `.cta-arrow` rules in globals.css
 * so it travels the reading direction in both LTR and RTL.
 */
const base = [
  'group relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap',
  'transition-[background-color,border-color,color,box-shadow,transform] duration-(--duration-base) ease-out',
  'focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring',
  'disabled:pointer-events-none disabled:opacity-55',
  // A restrained lift, not a scale pop — and only when motion is allowed.
  'motion-safe:active:translate-y-px',
].join(' ');

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-primary text-primary-foreground shadow-subtle',
    'hover:bg-primary-hover hover:shadow-card active:bg-primary-active',
  ),
  // Transparent with a theme-aware border, per the brand CTA rules.
  secondary: cn(
    'border border-border-strong bg-transparent text-foreground',
    'hover:border-primary hover:text-primary hover:bg-primary-subtle',
  ),
  ghost: 'bg-transparent text-muted-foreground hover:bg-surface-muted hover:text-foreground',
  link: 'h-auto! px-0! text-primary hover:text-primary-hover',
};

const sizes: Record<ButtonSize, string> = {
  // 44px minimum tap target on the sizes used for real actions.
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className);
}

/* -------------------------------------------------------------------------- */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner, blocks interaction and announces the busy state. */
  isLoading?: boolean;
  /** Announced while loading — required for an accessible async button. */
  loadingLabel?: string;
};

export function Button({
  variant,
  size,
  className,
  type = 'button',
  isLoading = false,
  loadingLabel,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      aria-busy={isLoading || undefined}
      disabled={disabled ?? isLoading}
      className={buttonClasses(variant, size, className)}
      {...props}
    >
      {isLoading ? (
        <>
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          <span className="sr-only">{loadingLabel}</span>
        </>
      ) : null}
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** External links open in a new tab with safe `rel` attributes. */
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant,
  size,
  className,
  external = false,
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Forward arrow for a call to action. Nudges along the reading direction on
 * hover and mirrors itself in RTL.
 */
export function ButtonArrow() {
  return <Icon name="arrow-right" className="cta-arrow size-4" />;
}
