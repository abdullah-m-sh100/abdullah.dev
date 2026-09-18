import type { LocalizedText } from '@/types/content';
import { type Locale, defaultLocale } from './config';

/**
 * Resolves a bilingual content value for the active locale.
 *
 * Content lives in `src/data` as `{ en, ar }` pairs; UI chrome strings live in
 * `messages/` and are read through `next-intl`. This helper is the single
 * bridge between localized *content* and the rendered UI.
 */
export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale] || text[defaultLocale];
}

/** Resolves a list of bilingual values, dropping empty entries. */
export function localizeList(items: readonly LocalizedText[], locale: Locale): string[] {
  return items.map((item) => localize(item, locale)).filter(Boolean);
}

/**
 * Returns a bound localizer, handy when a component resolves many values:
 *
 * ```ts
 * const t = createLocalizer(locale);
 * t(project.title);
 * ```
 */
export function createLocalizer(locale: Locale) {
  return (text: LocalizedText): string => localize(text, locale);
}
