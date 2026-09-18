import type { Metadata } from 'next';

import { type Locale, getDirection, locales } from '@/i18n/config';
import { absoluteUrl, siteConfig } from '@/lib/site-config';

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Path without a locale segment, e.g. `/about`. */
  path: string;
  locale: Locale;
  image?: string;
  type?: 'website' | 'article';
};

/**
 * Builds localized page metadata.
 *
 * Because the locale is not in the URL, a path has exactly one canonical URL
 * that serves both languages. `og:locale` reflects the language actually
 * rendered for this request, and the alternate locale is advertised via
 * `og:locale:alternate` rather than `hreflang` — there is no separate URL to
 * point `hreflang` at.
 *
 * `openGraph.title` and `twitter.title` are deliberately left unset. Next.js
 * then falls back to the page title *after* the root layout's template has run,
 * so a shared link reads "About — React & Next.js Front-End Developer |
 * Abdullah". Setting either one here overrides that fallback with the bare
 * segment title and silently drops the brand from every social card.
 */
export function buildMetadata({
  title,
  description,
  path,
  locale,
  image,
  type = 'website',
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? siteConfig.ogImage;
  const ogLocales: Record<Locale, string> = { en: 'en_US', ar: 'ar_EG' };

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      description,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => ogLocales[item]),
      images: [{ url: absoluteUrl(ogImage), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      description,
      images: [absoluteUrl(ogImage)],
    },
    other: {
      'content-language': locale,
      'content-direction': getDirection(locale),
    },
  };
}
