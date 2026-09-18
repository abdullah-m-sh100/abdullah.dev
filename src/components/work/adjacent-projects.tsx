import Link from 'next/link';

import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { localize } from '@/i18n/localize';
import { cn } from '@/lib/utils/cn';
import type { Locale, Project } from '@/types/content';

type AdjacentProjectsProps = {
  previous: Project | undefined;
  next: Project | undefined;
  locale: Locale;
  labels: { previous: string; next: string };
};

/**
 * Previous / next project navigation, built from `getAdjacentProjects()`.
 *
 * `getAdjacentProjects` wraps around the full project order, so both sides are
 * only ever `undefined` when there is fewer than one other project to link to
 * — in that case the whole nav is omitted rather than showing a single,
 * lopsided link.
 *
 * The "next" link is aligned to the reading-end side with `text-end` /
 * `items-end` (logical, not `text-right`), so it visually mirrors correctly
 * under RTL instead of just flipping the arrow icon.
 */
export function AdjacentProjects({ previous, next, locale, labels }: AdjacentProjectsProps) {
  if (!previous && !next) return null;

  return (
    <Section spacing="compact" surface="muted" divider>
      <Container>
        <nav aria-label="Adjacent projects">
          <div className="grid gap-4 sm:grid-cols-2">
            {previous ? (
              <Link
                href={`/work/${previous.slug}`}
                className={cn(
                  'group border-border bg-surface flex flex-col rounded-lg border p-6',
                  'transition-[border-color,box-shadow] duration-(--duration-base) ease-out',
                  'hover:border-primary hover:shadow-card',
                  'focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring',
                )}
              >
                <span className="text-subtle-foreground flex items-center gap-2 text-label ltr:uppercase">
                  <Icon name="arrow-left" className="size-3.5 rtl:-scale-x-100" />
                  {labels.previous}
                </span>
                <span className="group-hover:text-primary mt-3 text-h3 transition-colors duration-(--duration-base)">
                  {localize(previous.title, locale)}
                </span>
              </Link>
            ) : null}

            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className={cn(
                  'group border-border bg-surface flex flex-col items-end rounded-lg border p-6 text-end',
                  'transition-[border-color,box-shadow] duration-(--duration-base) ease-out',
                  'hover:border-primary hover:shadow-card',
                  'focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring',
                  !previous && 'sm:col-start-2',
                )}
              >
                <span className="text-subtle-foreground flex items-center gap-2 text-label ltr:uppercase">
                  {labels.next}
                  <Icon name="arrow-right" className="size-3.5 rtl:-scale-x-100" />
                </span>
                <span className="group-hover:text-primary mt-3 text-h3 transition-colors duration-(--duration-base)">
                  {localize(next.title, locale)}
                </span>
              </Link>
            ) : null}
          </div>
        </nav>
      </Container>
    </Section>
  );
}
