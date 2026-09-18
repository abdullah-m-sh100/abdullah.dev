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
 * is enough. Active state is signalled three ways — colour, weight and the
 * underline — so it never depends on colour alone.
 *
 * The underline animates with `transform: scaleX`, which is symmetric and so
 * behaves identically in LTR and RTL.
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
        'group/nav relative inline-flex items-center rounded-md transition-colors duration-(--duration-base) ease-out',
        // The bar tightens between `md` and `lg`, where the inline nav has to
        // share a narrow row with the logo and both switchers.
        appearance === 'bar' ? 'px-2 py-2 text-sm lg:px-3' : 'w-full px-2 py-3 text-lg',
        isActive
          ? 'text-foreground font-semibold'
          : 'text-muted-foreground hover:text-foreground font-medium',
        className,
      )}
    >
      {label}

      <span
        aria-hidden="true"
        className={cn(
          'bg-primary absolute bottom-0.5 h-0.5 rounded-full',
          appearance === 'bar' ? 'inset-x-2 lg:inset-x-3' : 'inset-x-2',
          'origin-center transition-transform duration-(--duration-base) ease-out',
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-40',
        )}
      />

      {isActive ? <span className="sr-only"> ({currentPageLabel})</span> : null}
    </Link>
  );
}
