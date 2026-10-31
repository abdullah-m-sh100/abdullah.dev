# Brand assets — Flow identity

These SVGs implement the mark described in `brand-guidelines-flow.md`: a thin
circle enclosing an S-curve that threads three nodes — the interface (top), the
server (middle, copper and largest), and the data (bottom).

They were drawn from that written specification; no vector source files were
supplied with the repository, so treat them as faithful reconstructions rather
than as the designer's masters, and replace them if masters arrive.

## Files

| File | Use |
|---|---|
| `flow-logo-primary.svg` | Horizontal lockup on Bone. Min. 160px wide. |
| `flow-logo-reversed.svg` | Horizontal lockup on Midnight. |
| `flow-logo-mono.svg` | Single-colour lockup — simple print, stamps, and the Copper ground, where the guide puts every element in Midnight. |
| `flow-mark.svg` | Icon-only mark with the circle. Min. 24px. |
| `flow-mark-bare.svg` | Icon-only mark without the circle — required below 32px, and the right file for avatars and app icons. |
| `og-image.svg` | Default social preview, 1200×630, on Midnight. |

## Colour by ground

Straight from the guide, and the reason there are three lockup files:

- **On Midnight** — line and middle node Copper `#E08A57`, outer nodes Bone.
- **On Bone** — line and middle node Burnt Copper `#9A4A24`, outer nodes Midnight.
- **On Copper** — every element Midnight.

## In the app

`src/components/brand/logo.tsx` draws the same geometry from design tokens, so
it inverts by ground on its own: `--accent` resolves to Burnt Copper on Bone and
to Copper inside a `.tone-midnight` band, and the outer nodes ride
`currentColor`. Update that component alongside these files.

`src/app/icon.svg` is the favicon and carries the bare mark on a Midnight
rounded square, since a favicon paints well below the 32px threshold.

## A note on the wordmark

The lockups set the name in Fraunces. A webfont does not load inside an SVG
used as an `<img>` or a favicon, so these files fall back to a local serif
wherever Fraunces is not installed. That only affects the static assets — the
in-app lockup renders real Fraunces through `next/font`. If pixel-exact
wordmarks matter for a given placement, convert the text to outlines.

## Never

Rotate the mark, stretch or squash it, change the curve, drop or resize a node,
recolour it outside the three ground rules above, or place it on a busy image
without a solid colour layer beneath it. Keep clear space of at least a quarter
of the mark's width on every side.
