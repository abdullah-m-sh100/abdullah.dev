import { cn } from '@/lib/utils/cn';

type FlowBackgroundProps = {
  className?: string;
  /** A soft echo line behind the main one. Two is the restrained default. */
  lines?: 1 | 2;
  /** Whether a pulse travels the line. Hidden under reduced motion. */
  animated?: boolean;
};

/**
 * The flow motif: one S-curve threading three nodes.
 *
 * This is the identity's central idea — "مسار واحد يحمل البيانات من الواجهة إلى
 * الخادم إلى قاعدة البيانات" — so the geometry is not decoration that happens
 * to curve. The three nodes are the three tiers, in order along the reading of
 * the curve:
 *
 *   top     the interface (Next.js)
 *   middle  the server (Node.js / Express) — copper, and the largest
 *   bottom  the data (MongoDB)
 *
 * The middle node is the only copper element, which is also the guide's colour
 * rule: one warm focal point. On a Bone ground the line and middle node are
 * Burnt Copper and the outer nodes Midnight; inside a `.tone-midnight` band the
 * same tokens resolve to Copper and Bone. That inversion is exactly what the
 * guide specifies for the mark on each ground, and it costs no second variant.
 *
 * A Server Component: the pulse is a CSS `offset-path` animation, so nothing
 * ships for it and the travel composites as a transform rather than animating
 * geometry attributes.
 *
 * Restraint is the rule: at most one of these per viewport, behind content,
 * never as a section-by-section decoration.
 */
export function FlowBackground({ className, lines = 2, animated = true }: FlowBackgroundProps) {
  return (
    <svg
      viewBox="0 0 600 400"
      data-decoration=""
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      className={cn('overflow-visible', className)}
    >
      {/*
        The echo sits behind and slightly off the main line, which is what gives
        the motif depth without a second full-strength curve competing with it.
      */}
      {lines >= 2 && (
        <path
          d="M 168 44 C 272 70, 312 128, 266 202 C 222 274, 266 326, 352 362"
          fill="none"
          stroke="var(--flow-stroke-soft)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      )}

      {/*
        Keep this `d` in step with the `offset-path` on `.flow-pulse` in
        globals.css. An `offset-path` cannot reference another element's
        geometry, so the string is necessarily stated in both places and the
        pulse silently leaves the line if only one is edited.
      */}
      <path
        d="M 210 60 C 300 80, 340 130, 300 200 C 260 270, 300 320, 390 340"
        fill="none"
        stroke="var(--flow-stroke)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Interface. */}
      <circle cx="210" cy="60" r="5" fill="var(--flow-node-outer)" opacity="0.55" />
      {/* Server — copper, and the largest, per the guide. */}
      <circle cx="300" cy="200" r="8" fill="var(--flow-node)" />
      {/* Data. */}
      <circle cx="390" cy="340" r="5" fill="var(--flow-node-outer)" opacity="0.55" />

      {/*
        The travelling pulse. `transform` parks it on the first node for
        browsers without motion-path support, and the `@supports` block in
        globals.css clears that so the two placements never stack.
      */}
      {animated && (
        <circle
          r="3.5"
          fill="var(--flow-node)"
          transform="translate(210 60)"
          className="flow-pulse motion-safe:animate-flow-travel"
        />
      )}
    </svg>
  );
}
