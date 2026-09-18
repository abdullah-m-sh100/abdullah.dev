'use client';

import { useState } from 'react';
import Image from 'next/image';

import type { ImageAsset, Locale } from '@/types/content';
import { localize } from '@/i18n/localize';
import { cn } from '@/lib/utils/cn';

/**
 * `next/image` throws synchronously for a `src` that isn't a site-relative
 * path or an absolute URL — a typo (e.g. a bare filename, or the string
 * `"undefined"`) would crash the page before `onError` ever gets a chance to
 * run. Checked up front so a malformed value falls back like any other bad
 * image instead of crashing.
 */
function isDisplayableSrc(value: string | undefined): value is string {
  return typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//.test(value));
}

type ProjectCoverProps = {
  /** Dimensions, alt text and the fallback `src` used when no override applies. */
  image: ImageAsset;
  /** A project's optional custom screenshot path — `Project['image']`. */
  overrideSrc?: string;
  locale: Locale;
  /** Responsive `sizes` hint — required for the optimizer to pick a width. */
  sizes: string;
  className?: string;
  /** Only pass for an above-the-fold cover. Nothing on Home qualifies. */
  priority?: boolean;
};

/**
 * Project cover image.
 *
 * Intrinsic `width`/`height` come from the content model and the wrapper
 * carries a fixed 16:10 `aspect-ratio`, so the space is reserved before the
 * image loads and the card never shifts.
 *
 * Renders `overrideSrc` (a project's custom screenshot) when set, and falls
 * back to `image.src` (the shared placeholder) both when it is unset and, if
 * it fails to load in the browser, after `onError` records it as broken.
 *
 * The zoom on hover is on the image only, inside an `overflow-hidden` wrapper,
 * and is gated behind `motion-safe`.
 */
export function ProjectCover({
  image,
  overrideSrc,
  locale,
  sizes,
  className,
  priority = false,
}: ProjectCoverProps) {
  // Tracks a src that failed to load, so it renders once and is then skipped
  // in favor of the placeholder — derived at render time rather than in an
  // effect, so it also re-resolves automatically if `overrideSrc` changes.
  const [brokenSrc, setBrokenSrc] = useState<string | null>(null);
  const candidate = isDisplayableSrc(overrideSrc) ? overrideSrc : image.src;
  const src = candidate === brokenSrc ? image.src : candidate;

  return (
    <div
      className={cn(
        'border-border bg-surface-muted relative aspect-16/10 overflow-hidden rounded-lg border',
        className,
      )}
    >
      <Image
        src={src}
        alt={localize(image.alt, locale)}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        onError={() => setBrokenSrc(candidate)}
        className="size-full object-cover transition-transform duration-(--duration-slow) ease-out motion-safe:group-hover:scale-[1.03]"
      />
    </div>
  );
}
