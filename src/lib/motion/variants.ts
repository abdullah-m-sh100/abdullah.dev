/**
 * The reveal vocabulary.
 *
 * Each variant maps to a `[data-reveal='…']` rule in `globals.css`. Keeping the
 * list here — rather than as free-form strings in components — means a typo is
 * a type error, and the set of motions stays small and deliberate.
 *
 * `slide-start` / `slide-end` are *logical*: they follow the reading direction,
 * so Arabic slides the opposite way from English without any locale check in
 * component code. Never reach for a hard-coded `x: -20`.
 */
export const revealVariants = [
  'fade',
  'fade-up',
  'fade-down',
  'scale-in',
  'slide-start',
  'slide-end',
] as const;

export type RevealVariant = (typeof revealVariants)[number];

/** Sensible defaults per context, so call sites stay consistent. */
export const revealPresets = {
  /** Page and section headings. */
  heading: 'fade-up',
  /** Body copy following a heading. */
  copy: 'fade-up',
  /** Cards in a grid — paired with an index for stagger. */
  card: 'fade-up',
  /** Side-by-side compositions: media enters from the reading-end side. */
  media: 'slide-end',
  /** Small chips, badges and metadata rows. */
  chip: 'scale-in',
} as const satisfies Record<string, RevealVariant>;
