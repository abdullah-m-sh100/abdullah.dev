import Image from 'next/image';

import { Icon } from '@/components/ui/icon';
import type { ImageAsset, Locale } from '@/types/content';
import { localize } from '@/i18n/localize';
import { cn } from '@/lib/utils/cn';

type HeroPortraitProps = {
  image: ImageAsset;
  locale: Locale;
  /** Name shown on the identity card, e.g. "Abdullah". */
  name: string;
  /** Role shown beneath the name, e.g. "Full-Stack Developer | MERN Stack". */
  role: string;
  /** Shown on the second, smaller card on desktop, e.g. "Palestine". */
  location: string;
  /**
   * Preload only where the portrait is certain to paint on first load. A
   * rendering that is hidden on small screens must pass `false`, or the browser
   * fetches an image it never shows.
   */
  preload?: boolean;
  /** Overrides the default `sizes` hint when the frame is narrower than the Home hero's. */
  sizes?: string;
  className?: string;
};

/**
 * The hero's supporting visual: Abdullah's portrait.
 *
 * The frame adds structure and nothing else: a hairline copper rim and the card
 * radius. The hero band already carries the flow line behind the composition,
 * and a second instance of the motif here would be the one thing the guide
 * explicitly warns against.
 *
 * Name and role sit on a small solid card that overlaps the frame's corner
 * instead of being printed over the photo. A card is a UI element and the photo
 * stays whole behind it; the earlier scrim-and-caption approach darkened part of
 * the image to make type legible. The card uses the band's own `surface` token,
 * so it is correct on Midnight with no inverted variant, and it clears AA by
 * construction because text sits on a flat fill rather than on a photograph.
 *
 * The cards overhang the frame only from `lg`, where the 48px column gap can
 * absorb them. Below that they sit inside the frame, so the compact rendering
 * can never push the page wider than the viewport.
 *
 * Rendered once for every breakpoint rather than as a mobile/desktop pair, so
 * only one request is made and the preload always matches what is painted.
 * Intrinsic `width`/`height` come from the content model and the frame carries
 * a fixed 4:5 `aspect-ratio` (the file's own ratio, so nothing is cropped), which
 * reserves the space before the image loads.
 */
export function HeroPortrait({
  image,
  locale,
  name,
  role,
  location,
  preload = true,
  sizes = '(min-width: 1024px) 30rem, (min-width: 640px) 16rem, 13rem',
  className,
}: HeroPortraitProps) {
  return (
    <div className={cn('relative w-52 sm:w-64 lg:w-full', className)}>
      {/*
        Hairline gradient rim — the one place the brand gradient appears in the
        hero visual. A padded wrapper rather than a border-image, so the radius
        stays consistent across browsers.
      */}
      <div className="shadow-raised rounded-xl bg-linear-to-br from-accent/45 to-accent-soft/30 p-px">
        <div className="group bg-surface relative aspect-4/5 overflow-hidden rounded-xl">
          {/*
            `sizes` is measured, not estimated: the frame paints at 206px on a
            phone, 254px from `sm`, and 477px once the 7/5 split kicks in. A
            hint above the real box makes the browser pick a candidate it then
            has to upscale on a 2x screen, which is what softens a hero image —
            the earlier 34rem hint had a 640w file stretched across 953 device
            pixels here. Keep these in step with the widths on the wrapper.
          */}
          <Image
            src={image.src}
            alt={localize(image.alt, locale)}
            width={image.width}
            height={image.height}
            sizes={sizes}
            quality={85}
            preload={preload}
            className="size-full object-cover object-top transition-transform duration-(--duration-slow) ease-out motion-safe:group-hover:scale-[1.02]"
          />
        </div>
      </div>

      {/*
        Identity card. Decorative-adjacent: the name and role are already
        available to assistive technology through the site header and the page
        metadata, so this is presentation, not the only route to the information.
      */}
      <div
        className={cn(
          'border-hairline border-border bg-surface shadow-raised absolute rounded-lg px-4 py-3',
          'bottom-3 inset-s-3 max-w-[calc(100%-1.5rem)]',
          'lg:-bottom-6 lg:-inset-s-8 lg:max-w-none lg:px-5 lg:py-4',
        )}
      >
        <p className="text-foreground text-sm font-semibold lg:text-base">{name}</p>
        <p className="text-muted-foreground mt-0.5 hidden text-sm sm:block">{role}</p>
      </div>

      <div
        className={cn(
          'border-hairline border-border bg-surface shadow-raised absolute hidden items-center gap-2.5 rounded-pill py-2 ps-2.5 pe-4',
          'lg:-top-4 lg:-inset-e-5 lg:flex',
        )}
      >
        {/* Sage chip, like every decorative icon chip on the site. */}
        <span className="text-secondary bg-secondary-subtle inline-flex size-7 items-center justify-center rounded-full">
          <Icon name="map-pin" className="size-3.5" />
        </span>
        <span className="text-foreground text-sm font-medium">{location}</span>
      </div>
    </div>
  );
}
