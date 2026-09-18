import { cn } from '@/lib/utils/cn';

type AnimatedGridProps = {
  className?: string;
  /** How far the grid fades out from its centre. */
  fade?: 'center' | 'top';
};

const fadeMasks = {
  center:
    '[mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,black,transparent_100%)]',
  top: '[mask-image:linear-gradient(to_bottom,black,transparent_85%)]',
} as const;

/**
 * Fine grid background.
 *
 * Two DOM nodes and no JavaScript. The drift animates `transform` on an
 * oversized layer by exactly one cell, so the loop is seamless and stays on the
 * compositor — `background-position` is never animated.
 *
 * Both grid colour and mask are token-driven, so it reads correctly in light
 * and dark without a second implementation.
 */
export function AnimatedGrid({ className, fade = 'center' }: AnimatedGridProps) {
  return (
    <div
      data-decoration=""
      aria-hidden="true"
      className={cn('absolute inset-0 overflow-hidden', fadeMasks[fade], className)}
    >
      <div className="grid-surface absolute -inset-[72px] motion-safe:animate-grid-drift" />
    </div>
  );
}
