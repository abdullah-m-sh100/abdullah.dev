import Image from 'next/image';

import type { ImageAsset, Locale } from '@/types/content';
import { localize } from '@/i18n/localize';
import { cn } from '@/lib/utils/cn';

type HeroPortraitProps = {
  image: ImageAsset;
  locale: Locale;
  /** Name shown on the caption line, e.g. "Abdullah". */
  name: string;
  /** Role shown beside the name, e.g. "Front-End Developer". */
  role: string;
  className?: string;
};

/**
 * The hero's supporting visual: Abdullah's portrait.
 *
 * The photo already carries the brand language — deep navy backdrop, a single
 * blue-to-teal orbit arc with its nodes — so the frame adds nothing but
 * structure: a hairline gradient rim and the card radius. A second orbit here
 * would be the motif overused.
 *
 * The caption is set on a gradient scrim rather than in a bordered plate. A
 * plate reads as a sticker on top of the photo and, at this crop, covered the
 * folded arms; the scrim only deepens a part of the image that is already dark,
 * so the subject stays whole and the type still clears AA against it.
 *
 * Rendered once for every breakpoint rather than as a mobile/desktop pair, so
 * only one request is made and the preload always matches what is painted.
 * Intrinsic `width`/`height` come from the content model and the frame carries
 * a fixed 5:6 `aspect-ratio`, which reserves the space before the image loads.
 */
export function HeroPortrait({ image, locale, name, role, className }: HeroPortraitProps) {
  return (
    <div className={cn('relative w-52 sm:w-64 lg:w-full', className)}>
      {/*
        Hairline gradient rim — the one place the brand gradient appears in the
        hero visual. A padded wrapper rather than a border-image, so the radius
        stays consistent across browsers.
      */}
      <div className="shadow-raised rounded-xl bg-linear-to-br from-accent-blue/30 to-accent-teal/30 p-px">
        <div className="group bg-surface relative aspect-5/6 overflow-hidden rounded-xl">
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
            sizes="(min-width: 1024px) 30rem, (min-width: 640px) 16rem, 13rem"
            quality={85}
            preload
            className="size-full object-cover object-top transition-transform duration-(--duration-slow) ease-out motion-safe:group-hover:scale-[1.02]"
          />

          {/*
            Scrim and caption are decorative-adjacent: the name and role are
            already available to assistive technology through the site header
            and the page metadata, so this is presentation, not the only route
            to the information.
          */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 hidden h-2/5 bg-linear-to-t from-brand-navy/85 via-brand-navy/40 to-transparent lg:block"
          />

          {/*
            Desktop only. On the compact rendering the header sits directly
            above the portrait and already carries the name, so a caption there
            would repeat it over an image with no room to spare.
          */}
          <div className="absolute inset-x-0 bottom-0 hidden p-5 lg:block">
            <p className="text-base font-semibold text-white">{name}</p>
            <p className="mt-0.5 text-sm text-white/75">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
