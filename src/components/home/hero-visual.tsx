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
 * Below `sm` the tier chips are hidden: at phone width they would cover the
 * curve. The nodes still carry the motif, and the stack is named in text right
 * under the hero.
 */
export function HeroVisual({ image, locale, nodes, className }: HeroVisualProps) {
  return (
    <div className={cn('relative mx-auto aspect-[720/600] w-full max-w-xl lg:max-w-none', className)}>
      {/* Portrait, clipped to the mark's circle. */}
      <div
        className="group bg-surface absolute aspect-square overflow-hidden rounded-full"
        style={{
          insetInlineStart: pct(PORTRAIT.cx - PORTRAIT.r, VIEW.w),
          top: pct(PORTRAIT.cy - PORTRAIT.r, VIEW.h),
          width: pct(PORTRAIT.r * 2, VIEW.w),
        }}
      >
        <Image
          src={image.src}
          alt={localize(image.alt, locale)}
          fill
          sizes="(min-width: 1024px) 20rem, 56vw"
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
        className="absolute inset-0 size-full overflow-visible rtl:-scale-x-100"
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

      {/* Tier chips, each on the portrait side of its node. */}
      {NODE_POINTS.map((point, index) => {
        const node = nodes[index];
        if (!node) return null;
        const style: CSSProperties = {
          insetInlineEnd: pct(VIEW.w - point.x, VIEW.w),
          top: pct(point.y, VIEW.h),
        };

        return (
          <div
            key={node.tier}
            style={style}
            className="border-hairline border-border bg-surface shadow-raised absolute me-5 hidden -translate-y-1/2 rounded-lg px-3.5 py-2 sm:block"
          >
            <p className="text-subtle-foreground text-label whitespace-nowrap ltr:uppercase">
              {String(index + 1).padStart(2, '0')} · {node.tier}
            </p>
            <p dir="ltr" className="text-foreground mt-0.5 text-sm font-semibold whitespace-nowrap rtl:text-end">
              {node.tech}
            </p>
          </div>
        );
      })}
    </div>
  );
}
