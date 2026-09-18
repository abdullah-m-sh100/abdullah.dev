import { cn } from '@/lib/utils/cn';

type OrbitBackgroundProps = {
  className?: string;
  /** Number of elliptical strokes. Two is the restrained default. */
  rings?: 1 | 2 | 3;
  /** Whether the nodes travel their orbit. Disabled under reduced motion. */
  animated?: boolean;
};

/**
 * The orbit motif: partial elliptical strokes with a travelling node.
 *
 * A Server Component — the movement is a CSS `offset-path` animation, so no
 * JavaScript ships for it. The node is composited as a transform rather than
 * animating geometry attributes.
 *
 * Restraint is the rule: at most one of these per viewport, behind content,
 * never as a section-by-section decoration.
 */
export function OrbitBackground({
  className,
  rings = 2,
  animated = true,
}: OrbitBackgroundProps) {
  return (
    <svg
      viewBox="0 0 600 400"
      data-decoration=""
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      className={cn('overflow-visible', className)}
    >
      <ellipse
        cx="300"
        cy="200"
        rx="270"
        ry="108"
        transform="rotate(-22 300 200)"
        fill="none"
        stroke="var(--orbit-stroke)"
        strokeWidth="1.25"
      />

      {rings >= 2 && (
        <ellipse
          cx="300"
          cy="200"
          rx="190"
          ry="76"
          transform="rotate(-22 300 200)"
          fill="none"
          stroke="var(--orbit-stroke-soft)"
          strokeWidth="1.25"
        />
      )}

      {rings >= 3 && (
        <ellipse
          cx="300"
          cy="200"
          rx="110"
          ry="44"
          transform="rotate(-22 300 200)"
          fill="none"
          stroke="var(--orbit-stroke)"
          strokeWidth="1.25"
          opacity="0.6"
        />
      )}

      {/*
        Nodes live inside the same rotation as their ellipse, so the flat
        `offset-path` in CSS is tilted with the orbit it belongs to.
      */}
      <g transform="rotate(-22 300 200)">
        <circle
          r="4.5"
          fill="var(--accent-teal)"
          transform="translate(570 200)"
          className={cn('orbit-node orbit-node--outer', animated && 'motion-safe:animate-orbit-outer')}
        />
        {rings >= 2 && (
          <circle
            r="3"
            fill="var(--accent-blue)"
            transform="translate(490 200)"
            className={cn(
              'orbit-node orbit-node--inner',
              animated && 'motion-safe:animate-orbit-inner',
            )}
          />
        )}
      </g>
    </svg>
  );
}
