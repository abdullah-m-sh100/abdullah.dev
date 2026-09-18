import { type Locale, localeTags } from '@/i18n/config';
import type { IsoDate } from '@/types/content';

/**
 * Date formatting shared by projects, certificates and experience.
 *
 * A fixed time zone keeps server and client output identical, which avoids
 * hydration mismatches on dates.
 */
const TIME_ZONE = 'Africa/Cairo';

function format(date: IsoDate, locale: Locale, options: Intl.DateTimeFormatOptions): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '';

  return new Intl.DateTimeFormat(localeTags[locale], {
    timeZone: TIME_ZONE,
    ...options,
  }).format(parsed);
}

/** e.g. "March 2025" / "مارس 2025". */
export function formatMonthYear(date: IsoDate, locale: Locale): string {
  return format(date, locale, { month: 'long', year: 'numeric' });
}

/** e.g. "10 Mar 2025". */
export function formatShortDate(date: IsoDate, locale: Locale): string {
  return format(date, locale, { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Year only — used by compact project cards. */
export function formatYear(date: IsoDate, locale: Locale): string {
  return format(date, locale, { year: 'numeric' });
}

/** Machine-readable value for a `<time dateTime>` attribute. */
export function toDateTimeAttribute(date: IsoDate): string {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? '' : (parsed.toISOString().split('T')[0] ?? '');
}
