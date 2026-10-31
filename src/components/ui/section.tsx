import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Vertical rhythm on the 8pt scale. */
  spacing?: 'none' | 'compact' | 'default' | 'spacious';
  surface?: 'transparent' | 'muted' | 'sunken';
  /**
   * `midnight` inverts the whole band to the Midnight palette. Reserved for the
   * few bands the identity puts on a dark ground — see below.
   */
  tone?: 'default' | 'midnight';
  /** Draws a hairline divider above the section. */
  divider?: boolean;
  'aria-labelledby'?: string;
};

const spacingClasses = {
  none: '',
  compact: 'py-12 md:py-16',
  default: 'py-16 md:py-24',
  spacious: 'py-20 md:py-30',
} as const;

const surfaceClasses = {
  transparent: '',
  muted: 'bg-surface-muted',
  sunken: 'bg-surface-sunken',
} as const;

/**
 * Section shell: vertical rhythm, optional surface tint, tone and divider.
 *
 * Intentionally thin. It owns spacing, background and tone only — the inner
 * layout stays free, so sections do not all end up looking identical.
 *
 * ------------------------------------------------------------ Midnight bands
 *
 * `tone="midnight"` applies the `.tone-midnight` scope from `tokens.css`, which
 * restates the semantic colour tokens to the Midnight set. Everything inside
 * then inverts on its own: a `Card`, a `Button`, an `Eyebrow` and a focus ring
 * all keep their own classes and simply resolve to the dark palette, with
 * Copper as the accent instead of Burnt Copper. There is no inverted variant of
 * any component, and nothing needs to know which band it is sitting in.
 *
 * The guide gives Midnight 50% of the palette against Bone's 30%, which this
 * site spends as a handful of whole bands — the hero, the closing CTA, the
 * footer — rather than as a dark mode. Keep it to those: a Midnight band in the
 * middle of a page of them stops reading as emphasis.
 *
 * `surface` is still honoured inside a Midnight band, where `muted` and
 * `sunken` resolve to the dark steps. Leave it `transparent` unless a band
 * genuinely needs a second level inside it — which is also why the ground is
 * painted here with utilities rather than by the `.tone-midnight` class: that
 * class lives in an unlayered file, so a `background-color` on it would
 * outrank every `bg-*` utility and `surface` would stop working.
 */
export function Section({
  children,
  className,
  id,
  spacing = 'default',
  surface = 'transparent',
  tone = 'default',
  divider = false,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={props['aria-labelledby']}
      className={cn(
        spacingClasses[spacing],
        tone === 'midnight' && 'tone-midnight text-foreground',
        // Only when no explicit surface is asked for, so `surface` still wins.
        tone === 'midnight' && surface === 'transparent' && 'bg-background',
        surfaceClasses[surface],
        divider && 'border-border border-t',
        className,
      )}
    >
      {children}
    </section>
  );
}
