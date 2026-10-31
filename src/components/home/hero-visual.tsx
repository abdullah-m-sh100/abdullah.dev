import Image from 'next/image';
import type { CSSProperties } from 'react';

import type { ImageAsset, Locale } from '@/types/content';
import { localize } from '@/i18n/localize';
import { cn } from '@/lib/utils/cn';

type FlowNode = {
  /** Tier name, e.g. "Interface". */
  tier: string;
  /** Technology at that tier, e.g. "React.js". */
  tech: string;
};

type HeroVisualProps = {
  image: ImageAsset;
  locale: Locale;
  /** Interface, server, data — in that order, top to bottom. */
  nodes: readonly [FlowNode, FlowNode, FlowNode];
  className?: string;
};

/*
 * Geometry, in the SVG's own 760×600 user space. Every HTML layer (portrait,
 * chips, name card) is positioned in percentages of the same box, so the SVG
 * and the HTML scale together at every width. Change a number here and the
 * matching percentage below has to move with it.
 */
const VIEW = { w: 720, h: 600 };
const PORTRAIT = { cx: 200, cy: 300, r: 190 };
/*
 * The nodes sit far enough from the circle that a tier chip, placed on the
 * portrait side of its node, clears the ring — chip height included: the outer
 * nodes sit beyond the top and bottom of the circle, where its width has run
 * out, and the middle node is pushed furthest out because it is level with the
 * widest part.
 */
const NODE_POINTS = [
  { x: 520, y: 80, r: 7 },
  { x: 640, y: 300, r: 11 },
  { x: 520, y: 520, r: 7 },
] as const;
const FLOW_PATH = 'M 520 80 C 640 130, 700 230, 640 300 C 580 370, 640 470, 520 520';

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/** Custom properties on an inline style, which `CSSProperties` does not type. */
const vars = (properties: Record<string, string>) => properties as CSSProperties;

/**
 * The Home hero's visual: the Flow mark, built around Abdullah.
 *
 * The identity's logo is a circle with an S-curve threading three nodes — the
 * interface, the server and the data. This composition is that mark at hero
 * scale: the portrait fills the circle, and the curve runs down beside it
 * through the three tiers, each labelled with the technology Abdullah uses
 * there. It says "full-stack" as a picture before a word of the headline is
 * read, which a photo in a rectangle cannot.
 *
 * Colour follows the logo's own rule on Midnight: the curve and outer nodes in
 * the flow tokens, the middle (server) node in Copper and the largest. A single
 * pulse travels the curve, front-end to data; it is SMIL rather than a CSS
 * `offset-path` because an offset path is measured in CSS pixels and would not
 * scale with the viewBox, and it is hidden under reduced motion by the
 * `.hero-pulse` rule in globals.css.
 *
 * Direction: the SVG is mirrored in RTL, and every HTML layer is placed with
 * logical insets, so in Arabic the portrait sits on the right and the curve on
 * the left with no second layout. The chips sit on the portrait side of their
 * node (`inset-inline-end` measured from the node), which mirrors correctly too.
 *
 * There is deliberately no name card on the portrait. The name is in the
 * header beside it and the role is the headline, so a fourth floating card only
 * repeated them and covered the photo; three labelled tiers are the content.
 *
 * Below `sm` there is no room for a curve with cards hanging off it, so the
 * same content is laid out as a column: the portrait in its ring on one side,
 * the three tiers beside it on a vertical hairline. Both layouts are one set
 * of elements, restyled at `sm`, so nothing is rendered or downloaded twice.
 */
export function HeroVisual({ image, locale, nodes, className }: HeroVisualProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-sm items-center gap-6',
        'sm:block sm:aspect-[720/600] sm:max-w-xl lg:max-w-none',
        className,
      )}
    >
      {/*
        Portrait, clipped to the mark's circle. Below `sm` it is an ordinary
        flex item with a ring; from `sm` it is placed on the SVG's grid by the
        three custom properties — one element serves both layouts, so the image
        is requested once.
      */}
      <div
        className={cn(
          // `m-1.5` keeps the ring (2px + 4px offset) inside the page gutter.
          'group bg-surface relative m-1.5 aspect-square w-[46%] shrink-0 overflow-hidden rounded-full sm:m-0',
          'ring-accent/35 ring-offset-background ring-2 ring-offset-4',
          'sm:absolute sm:inset-s-(--px) sm:top-(--py) sm:w-(--pw) sm:ring-0 sm:ring-offset-0',
        )}
        style={vars({
          '--px': pct(PORTRAIT.cx - PORTRAIT.r, VIEW.w),
          '--py': pct(PORTRAIT.cy - PORTRAIT.r, VIEW.h),
          '--pw': pct(PORTRAIT.r * 2, VIEW.w),
        })}
      >
        <Image
          src={image.src}
          alt={localize(image.alt, locale)}
          fill
          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 56vw, 46vw"
          quality={85}
          preload
          className="object-cover object-top transition-transform duration-(--duration-slow) ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </div>

      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        aria-hidden="true"
        focusable="false"
        data-decoration=""
        className="absolute inset-0 hidden size-full overflow-visible sm:block rtl:-scale-x-100"
      >
        {/* The mark's circle, and a quieter dashed orbit outside it. */}
        <circle
          cx={PORTRAIT.cx}
          cy={PORTRAIT.cy}
          r={PORTRAIT.r + 12}
          fill="none"
          stroke="var(--flow-stroke)"
          strokeWidth="1.5"
        />
        <circle
          cx={PORTRAIT.cx}
          cy={PORTRAIT.cy}
          r={PORTRAIT.r + 40}
          fill="none"
          stroke="var(--flow-stroke-soft)"
          strokeWidth="1"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />

        <path
          id="hero-flow-path"
          d={FLOW_PATH}
          fill="none"
          stroke="var(--flow-stroke)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {NODE_POINTS.map((point, index) =>
          index === 1 ? (
            <g key={index}>
              {/* Server — copper and the largest, per the logo rule. */}
              <circle cx={point.x} cy={point.y} r={point.r + 9} fill="var(--flow-node)" opacity="0.18" />
              <circle cx={point.x} cy={point.y} r={point.r} fill="var(--flow-node)" />
            </g>
          ) : (
            <circle key={index} cx={point.x} cy={point.y} r={point.r} fill="var(--flow-node-outer)" />
          ),
        )}

        {/* One packet making the trip: interface → server → data. */}
        <circle r="4.5" fill="var(--flow-node)" className="hero-pulse" opacity="0">
          <animateMotion dur="7s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1">
            <mpath href="#hero-flow-path" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.08;0.88;1"
            dur="7s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/*
        The three tiers. Below `sm` they are a short vertical list beside the
        portrait, joined by a hairline with a dot per tier (copper and larger for
        the server, as in the mark). From `sm` the wrapper is `display: contents`
        and each tier becomes a card on its own node of the curve.
      */}
      <div
        className={cn(
          'relative flex min-w-0 flex-1 flex-col gap-6 ps-5',
          'before:bg-border-strong before:absolute before:inset-s-[3px] before:inset-y-2 before:w-px',
          'sm:contents sm:before:hidden',
        )}
      >
        {NODE_POINTS.map((point, index) => {
          const node = nodes[index];
          if (!node) return null;
          const isServer = index === 1;

          return (
            <div
              key={node.tier}
              style={vars({
                '--cx': pct(VIEW.w - point.x, VIEW.w),
                '--cy': pct(point.y, VIEW.h),
              })}
              className={cn(
                'relative',
                'sm:border-hairline sm:border-border sm:bg-surface sm:shadow-raised sm:absolute sm:inset-e-(--cx) sm:top-(--cy) sm:me-5 sm:-translate-y-1/2 sm:rounded-lg sm:px-3.5 sm:py-2',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'absolute rounded-full sm:hidden',
                  isServer ? 'bg-(--flow-node) -start-[22px] top-0.5 size-3' : 'bg-(--flow-node-outer) -start-5 top-1 size-2',
                )}
              />
              <p className="text-subtle-foreground text-label ltr:uppercase sm:whitespace-nowrap">
                {/* The ordinal is dropped on a phone, where the column is too narrow to keep "01 · INTERFACE" on one line. */}
                <span className="hidden sm:inline">{String(index + 1).padStart(2, '0')} · </span>
                {node.tier}
              </p>
              <p dir="ltr" className="text-foreground mt-0.5 text-sm font-semibold sm:whitespace-nowrap rtl:text-end">
                {node.tech}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
