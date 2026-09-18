# Brand assets — PROVISIONAL

These SVGs were reconstructed from the written logo description in `CLAUDE.md`
(geometric "A", Saturn-inspired orbit, orbital node) because no approved source
files were supplied with the repository.

**TODO: replace every file in this folder with the approved brand assets.**

Files currently here:

- `abdullah-mark-orbit.svg` — icon-only mark (min. 24px).
- `abdullah-logo-primary.svg` — horizontal lockup (min. 160px).
- `abdullah-logo-white.svg` — reversed lockup for dark/navy surfaces.
- `og-image.svg` — default social preview (1200×630).

The in-app logo is rendered by `src/components/brand/logo.tsx`, which draws the
same geometry with `currentColor` so it stays theme-aware. Update that component
alongside these files.

Never rotate, stretch, recolor with unrelated colors, remove the orbital dot, or
add glow/shadow to the master logo.
