import { cn } from '@/lib/utils/cn';

type GradientGlowProps = {
  className?: string;
  /** `copper` and `sage` are single-hue; `warm` layers the two. */
  tone?: 'copper' | 'sage' | 'warm';
};

const tones = {
  copper: 'bg-[radial-gradient(closest-side,var(--glow-copper),transparent)]',
  sage: 'bg-[radial-gradient(closest-side,var(--glow-sage),transparent)]',
  warm:
    'bg-[radial-gradient(closest-side,var(--glow-copper),transparent),radial-gradient(closest-side,var(--glow-sage),transparent)] bg-[position:30%_35%,75%_70%] bg-[size:70%_70%,60%_60%] bg-no-repeat',
} as const;

/**
 * Soft warm light source used behind hero and CTA compositions.
 *
 * Copper is the identity's only warm tone and the guide limits it to one focal
 * element per screen, so this is intended for roughly one placement per page
 * and is kept low enough in alpha to read as light rather than as a second
 * copper object. Sage is the quiet counterweight.
 *
 * A plain painted div — no blur filter, which keeps it off the expensive
 * rendering path, and also keeps it from becoming a containing block for any
 * fixed-position element inside the same stacking context.
 */
export function GradientGlow({ className, tone = 'warm' }: GradientGlowProps) {
  return (
    <div data-decoration="" aria-hidden="true" className={cn('absolute', tones[tone], className)} />
  );
}
