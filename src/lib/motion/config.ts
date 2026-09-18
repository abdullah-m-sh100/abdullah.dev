/**
 * Motion configuration.
 *
 * The site animates with CSS, not a runtime animation library: every value
 * below has a matching custom property in `src/styles/tokens.css`, and this
 * module is the typed mirror of it for components that need the numbers in
 * TypeScript (observer thresholds, delay maths).
 *
 * Nothing here should be duplicated inline in a component.
 */

/** Interaction feedback, in milliseconds. Matches CLAUDE.md §24 (180–320ms). */
export const duration = {
  fast: 180,
  base: 240,
  slow: 320,
  /** Decorative scroll reveals run longer than interaction feedback. */
  reveal: 620,
} as const;

export const easing = {
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const;

/** Delay between consecutive items in a staggered group. */
export const staggerStep = 70;

/**
 * Reveal viewport settings.
 *
 * `rootMargin` pulls the trigger line up to 90% of the viewport height, so the
 * transition starts just before the element is properly in view.
 *
 * `threshold` is 0 on purpose. A fractional threshold asks for a percentage of
 * the *element* to be visible, which an element taller than the viewport can
 * satisfy late — and which is easy to skip entirely during a fast scroll or a
 * jump to the end of the page. Crossing the line is the trigger.
 */
export const revealViewport = {
  threshold: 0,
  rootMargin: '0px 0px -10% 0px',
} as const;

/**
 * Stagger is capped so a long list never ends up with a visibly late tail.
 * Index 8 and beyond all share the same delay.
 */
export const maxStaggerIndex = 8;

export function clampStaggerIndex(index: number): number {
  if (!Number.isFinite(index) || index <= 0) return 0;
  return Math.min(Math.trunc(index), maxStaggerIndex);
}
