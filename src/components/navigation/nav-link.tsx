'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { AppRoute } from '@/types/content';
import { cn } from '@/lib/utils/cn';

type NavLinkProps = {
  href: AppRoute;
  label: string;
  /** Localized "Current page" text, announced for the active link. */
  currentPageLabel: string;
  /** `drawer` is the larger, full-width treatment used by mobile navigation. */
  appearance?: 'bar' | 'drawer';
  className?: string;
  onNavigate?: () => void;
};

/**
 * Navigation link with an active indicator.
 *
 * The pathname never contains a locale, so comparing it to the route directly
 * is enough. The current page is filled (a capsule in the bar, a full-width row
 * in the drawer) and set in a heavier weight, and `aria-current` plus a
 * screen-reader suffix announce it — so it never depends on colour alone. The
 * drawer row also carries a small Sage dot.
 */
export function NavLink({
  href,
  label,
  currentPageLabel,
  appearance = 'bar',
  className,
  onNavigate,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group/nav relative inline-flex items-center transition-colors duration-(--duration-base) ease-out',
        appearance === 'bar'
          ? 'rounded-pill px-3.5 py-2 text-sm'
          : 'min-h-12 w-full justify-between rounded-lg px-4 py-3 text-lg',
        isActive
          ? 'bg-surface-muted text-foreground font-semibold'
          : 'text-muted-foreground hover:bg-surface-muted/60 hover:text-foreground font-medium',
        className,
      )}
    >
      {label}

      {appearance === 'drawer' && isActive ? (
        <span aria-hidden="true" className="bg-secondary size-2 rounded-full" />
      ) : null}

      {isActive ? <span className="sr-only"> ({currentPageLabel})</span> : null}
    </Link>
  );
}
