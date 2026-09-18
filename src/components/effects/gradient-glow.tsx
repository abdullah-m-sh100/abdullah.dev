import { cn } from '@/lib/utils/cn';

type GradientGlowProps = {
  className?: string;
  /** `blue` and `teal` are single-hue; `brand` is the blue → teal blend. */
  tone?: 'blue' | 'teal' | 'brand';
};

const tones = {
  blue: 'bg-[radial-gradient(closest-side,var(--glow-blue),transparent)]',
  teal: 'bg-[radial-gradient(closest-side,var(--glow-teal),transparent)]',
  brand:
    'bg-[radial-gradient(closest-side,var(--glow-blue),transparent),radial-gradient(closest-side,var(--glow-teal),transparent)] bg-[position:30%_35%,75%_70%] bg-[size:70%_70%,60%_60%] bg-no-repeat',
} as const;

/**
 * Soft blue → teal light source used behind hero and CTA compositions.
 *
 * The brand rules cap the gradient at *emphasis only*, so this is intended for
 * roughly one placement per page. It is a plain painted div — no blur filter,
 * which keeps it off the expensive rendering path.
 */
export function GradientGlow({ className, tone = 'brand' }: GradientGlowProps) {
  return (
    <div
      data-decoration=""
      aria-hidden="true"
      className={cn('absolute', tones[tone], className)}
    />
  );
}
