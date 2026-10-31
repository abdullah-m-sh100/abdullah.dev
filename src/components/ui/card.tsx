import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type CardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
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
  default: 'rounded-lg border-hairline bg-surface border-border shadow-(--shadow-rest)',
  elevated: 'rounded-lg border-hairline bg-surface-elevated border-border shadow-(--shadow-elevated)',
  muted: 'rounded-lg border-hairline bg-surface-muted border-border',
} as const;

/**
 * Surface primitive.
 *
 * A 1.5px hairline and a surface step carry the hierarchy — the guide replaces
 * heavy shadows with exactly that ("حدود رفيعة 1.5 بكسل بدل الظلال الثقيلة"), so
 * `--shadow-rest` is a whisper that pins the card to the page rather than what
 * separates it from it. The hover lift is capped at 2px and gated behind
 * `motion-safe`.
 *
 * There is no surface gradient any more: Bone gives a card a real step to sit
 * on, so the vertical sheen the old off-white page needed has nothing left to
 * do. `muted` stays flat by design — it recedes into the page rather than
 * sitting on it.
 *
 * Inside a `.tone-midnight` band every one of these tokens resolves to the
 * Midnight set, and `--shadow-rest` resolves to nothing, so the same three
 * tones work on a dark ground with no inverted variant.
 */
export function Card({
  children,
  className,
  id,
  as: Component = 'div',
  interactive,
  tone = 'default',
}: CardProps) {
  return (
    <Component
      id={id}
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
