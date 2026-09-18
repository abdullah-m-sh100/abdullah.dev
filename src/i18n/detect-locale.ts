import { type Locale, defaultLocale, isLocale, locales } from './config';

type AcceptedLanguage = {
  tag: string;
  quality: number;
};

function parseAcceptLanguage(header: string): AcceptedLanguage[] {
  return header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      if (!tag) return null;

      const qParam = params.find((param) => param.trim().startsWith('q='));
      const quality = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;

      return {
        tag: tag.trim().toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .filter((value): value is AcceptedLanguage => value !== null && value.quality > 0)
    .sort((a, b) => b.quality - a.quality);
}

/**
 * Picks the best supported locale from an `Accept-Language` header.
 *
 * Deliberately dependency-free: matching two locales by their primary
 * subtag does not justify pulling in a full locale-matching library.
 */
export function detectLocaleFromHeader(header: string | null | undefined): Locale {
  if (!header) return defaultLocale;

  for (const { tag } of parseAcceptLanguage(header)) {
    if (isLocale(tag)) return tag;

    const primarySubtag = tag.split('-')[0];
    if (primarySubtag && isLocale(primarySubtag)) return primarySubtag;
  }

  return defaultLocale;
}

/** Narrows an untrusted cookie value to a supported locale. */
export function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) return null;
  const normalized = value.toLowerCase();
  return locales.find((locale) => locale === normalized) ?? null;
}
