import { cn } from '@/lib/utils/cn';

type LogoMarkProps = {
  className?: string;
  /**
   * Drops the enclosing circle. The guide requires this below 32px, where the
   * ring closes up against the line and the three nodes stop being readable.
   */
  bare?: boolean;
};

/**
 * The Flow mark: a thin circle enclosing an S-curve that threads three nodes.
 *
 * The nodes are the three tiers of the stack, top to bottom — the interface
 * (Next.js), the server (Node.js / Express), the data (MongoDB) — and the
 * middle one is both copper and the largest, which is the guide's rule and the
 * reason the mark reads as a path with a centre rather than as an ornament.
 *
 * Colour comes from tokens, so the mark inverts correctly by ground without a
 * second asset: on Bone the line and middle node are Burnt Copper with
 * Midnight outer nodes, and inside a `.tone-midnight` band the same tokens
 * resolve to Copper with Bone outer nodes. Both are exactly what the guide
 * specifies for those grounds.
 *
 * Never rotate it, stretch it, change the curve, or drop a node.
 */
export function LogoMark({ className, bare = false }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('size-9', className)}
      aria-hidden="true"
      focusable="false"
    >
      {bare ? null : (
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          opacity="0.45"
        />
      )}

      {/* The flowing path, passing through all three node centres. */}
      <path
        d="M 17.5 13 C 25 15, 28 19.5, 24 24 C 20 28.5, 23 33, 30.5 35"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Interface. */}
      <circle cx="17.5" cy="13" r="2.2" fill="currentColor" />
      {/* Server — copper, and the largest. */}
      <circle cx="24" cy="24" r="3.2" fill="var(--accent)" />
      {/* Data. */}
      <circle cx="30.5" cy="35" r="2.2" fill="currentColor" />
    </svg>
  );
}

type LogoProps = {
  /** Wordmark label, already localized. */
  name: string;
  /** Hide the wordmark and render the mark alone. */
  markOnly?: boolean;
  className?: string;
};

/**
 * Full horizontal lockup — the mark plus the name, which is the version the
 * guide assigns to the site and its headers.
 *
 * Use `LogoMark` on its own only in tight, repeated contexts where the brand
 * name is already visible nearby.
 */
export function Logo({ name, markOnly = false, className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      {/*
        `shrink-0` and a fixed box are load-bearing, not decoration. The header
        is a flex row, and a bare mark is a shrinkable flex item: once the row
        ran out of width — which it did at 768px, before the breakpoint in
        `SiteHeader` moved the inline nav up to `lg` — the mark was the first
        thing to give, compressing from 30px to 12px and squashing the lockup. A
        fixed box means the row runs out of room somewhere the layout can answer
        for, never inside the logo.

        The mark also sits under the guide's 32px threshold at this size, so it
        renders `bare` — without the enclosing circle — as the guide requires.
      */}
      <LogoMark bare className="size-[30px] shrink-0" />

      {markOnly ? (
        <span className="sr-only">{name}</span>
      ) : (
        /* Truncates rather than wrapping the header to two lines. */
        <span className="font-brand-display truncate text-lg font-semibold tracking-(--tracking-heading)">
          {name}
        </span>
      )}
    </span>
  );
}
