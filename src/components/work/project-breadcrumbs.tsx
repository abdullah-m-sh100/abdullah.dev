import Link from 'next/link';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils/cn';

type Crumb = {
  label: string;
  href?: string;
};

type ProjectBreadcrumbsProps = {
  items: readonly Crumb[];
  className?: string;
};

/**
 * Breadcrumb trail for the case-study page (CLAUDE.md §41, item 1).
 *
 * A plain `<ol>` rather than a flex row of links: list semantics let a screen
 * reader announce position ("2 of 3"), and `aria-current="page"` marks the
 * final, unlinked crumb. The separator is a static mirrored chevron — not the
 * `.cta-arrow` used on real actions, since nothing here nudges on hover.
 */
export function ProjectBreadcrumbs({ items, className }: ProjectBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="text-muted-foreground flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {index > 0 ? (
                <Icon
                  name="chevron-right"
                  className="text-subtle-foreground size-3.5 shrink-0 rtl:-scale-x-100"
                />
              ) : null}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground font-medium transition-colors duration-(--duration-base) ease-out"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="text-foreground font-medium">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
