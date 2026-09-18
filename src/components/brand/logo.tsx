import { cn } from '@/lib/utils/cn';
import Image from 'next/image';

type LogoMarkProps = {
  className?: string;
};

/**
 * The orbit mark: a geometric "A" inside a Saturn-inspired orbit with an
 * orbital node.
 *
 * The "A" uses `currentColor` so it inherits the theme foreground, while the
 * orbit and node keep the brand blue/teal accents. Never rotate, stretch,
 * recolor or drop the orbital dot.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('size-9', className)}
      aria-hidden="true"
      focusable="false"
    >
      <ellipse
        cx="24"
        cy="24"
        rx="21"
        ry="8.5"
        transform="rotate(-22 24 24)"
        fill="none"
        stroke="var(--accent-blue)"
        strokeWidth="2"
        opacity="0.6"
      />
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 34 24 13l9.5 21" />
        <path d="M18.4 26.5h11.2" />
      </g>
      <circle cx="43.5" cy="16.1" r="2.8" fill="var(--accent-teal)" />
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
 * Full horizontal lockup. Use this wherever the brand name is not already
 * visible nearby; use `LogoMark` on its own only in tight, repeated contexts.
 */
export function Logo({ name, markOnly = false, className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      {/* <LogoMark /> */}
      {/*
        `shrink-0` and an explicit box are load-bearing, not decoration. The
        header is a flex row, and a bare `next/image` is a shrinkable flex item:
        once the row ran out of width — which it did at 768px, before the
        breakpoint below moved the inline nav up to `lg` — the mark was the
        first thing to give, compressing from 30px to 12px and squashing the
        lockup. A fixed box means the row runs out of room somewhere the layout
        can answer for, never inside the logo.
      */}
      <Image
        src="/a-logo.png"
        alt="Abdullah"
        width={30}
        height={30}
        className="size-[30px] shrink-0 object-contain"
      />
      {markOnly ? (
        <span className="sr-only">{name}</span>
      ) : (
        /* Truncates rather than wrapping the header to two lines. */
        <span className="truncate text-lg font-bold tracking-tight">{name}</span>
      )}
    </span>
  );
}
