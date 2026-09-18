import type { ReactNode } from 'react';

import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils/cn';

/* -------------------------------------------------------------------------- */
/* Eyebrow                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Small label above a heading.
 *
 * The leading rule is an inline-logical element, so it sits on the reading-start
 * side in both directions. Uppercase is applied only for Latin: Arabic has no
 * case, and `--tracking-label` collapses to 0 under `html[lang='ar']`.
 */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'text-secondary flex items-center gap-2.5 text-label ltr:uppercase',
        className,
      )}
    >
      <span aria-hidden="true" className="bg-secondary/50 h-px w-6" />
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Section heading                                                             */
/* -------------------------------------------------------------------------- */

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  /** Id referenced by the parent section's `aria-labelledby`. */
  id?: string;
  /** Heading level — keeps the document outline correct on every page. */
  as?: 'h1' | 'h2' | 'h3';
  align?: 'start' | 'center';
  /** Optional trailing action, e.g. a "View all" link. */
  action?: ReactNode;
  className?: string;
};

const levelClasses = {
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
} as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  as: Heading = 'h2',
  align = 'start',
  action,
  className,
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        isCentered && 'md:flex-col md:items-center',
        className,
      )}
    >
      <Reveal className={cn('max-w-2xl', isCentered && 'text-center')}>
        {eyebrow ? <Eyebrow className={cn(isCentered && 'justify-center')}>{eyebrow}</Eyebrow> : null}

        <Heading id={id} className={cn(levelClasses[Heading], eyebrow && 'mt-4')}>
          {title}
        </Heading>

        {description ? (
          <p className="text-muted-foreground mt-4 text-lead">{description}</p>
        ) : null}
      </Reveal>

      {/* The action enters from the inline-end edge, where it sits — mirrored in RTL. */}
      {action ? (
        <Reveal variant="slide-end" index={1} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
