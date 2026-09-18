import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Adds a restrained hover lift for cards that link somewhere. */
  interactive?: boolean;
  /** `elevated` sits above the page; `muted` recedes into it. */
  tone?: 'default' | 'elevated' | 'muted';
};

/**
 * Exported so a caller that cannot use `Card` itself — an element with its own
 * content-model constraints, e.g. the single `div` a `dl` allows around each
 * `dt`/`dd` pair, where nesting `Card`'s own wrapper would add a second one —
 * can still apply the same tone to its own element. `StatsBand` is the only
 * current user; reach for `Card` first.
 */
export const cardTones = {
  default: 'rounded-lg border bg-surface bg-[image:var(--surface-gradient)] border-border shadow-(--shadow-rest)',
  elevated:
    'rounded-lg border bg-surface-elevated bg-[image:var(--surface-gradient)] border-border shadow-(--shadow-elevated)',
  muted: 'rounded-lg border bg-surface-muted border-border',
} as const;

/**
 * Surface primitive.
 *
 * Hierarchy comes from the border and surface tint rather than shadow alone,
 * which is what keeps cards legible in dark mode. The hover lift is capped at
 * 2px and gated behind `motion-safe`.
 *
 * `default` and `elevated` add a resting shadow and a vertical sheen through
 * `--shadow-rest` / `--surface-gradient`. Both resolve to `none` in dark, so
 * these classes are inert there and dark cards render as they always have —
 * the elevation is a light-theme concern, where a white card on an Off White
 * page has no surface step to separate it. `muted` stays flat by design: it
 * recedes into the page rather than sitting on it.
 */
export function Card({
  children,
  className,
  as: Component = 'div',
  interactive,
  tone = 'default',
}: CardProps) {
  return (
    <Component
      className={cn(
        cardTones[tone],
        interactive && [
          'transition-[border-color,transform,box-shadow] duration-(--duration-base) ease-out',
          'hover:border-border-strong hover:shadow-card',
          'motion-safe:hover:-translate-y-0.5',
        ],
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-6', className)}>{children}</div>;
}
