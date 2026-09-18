/**
 * Locale configuration.
 *
 * The locale is NEVER part of the URL. It is resolved per request from a
 * cookie (falling back to the `Accept-Language` header, then the default),
 * which keeps every route bilingual under a single clean pathname.
 */

export const locales = ['en', 'ar'] as const;

export type Locale = (typeof locales)[number];

export type Direction = 'ltr' | 'rtl';

export const defaultLocale: Locale = 'en';

/** Cookie that stores the visitor's explicit language preference. */
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

/** One year, in seconds. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const directions: Record<Locale, Direction> = {
  en: 'ltr',
  ar: 'rtl',
};

/** Language name written in its own language, for the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
};

/** Short label used in compact UI (e.g. the header toggle). */
export const localeShortNames: Record<Locale, string> = {
  en: 'EN',
  ar: 'ع',
};

/** BCP 47 tag used for date/number formatting. */
export const localeTags: Record<Locale, string> = {
  en: 'en-US',
  ar: 'ar-EG',
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function getDirection(locale: Locale): Direction {
  return directions[locale];
}

export function isRtl(locale: Locale): boolean {
  return directions[locale] === 'rtl';
}

/** The other supported locale — used by the two-way language switcher. */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ar' : 'en';
}
