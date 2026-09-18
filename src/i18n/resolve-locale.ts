import 'server-only';

import { cookies, headers } from 'next/headers';

import { type Locale, LOCALE_COOKIE_NAME } from './config';
import { detectLocaleFromHeader, normalizeLocale } from './detect-locale';

/**
 * Server-side locale resolution, in priority order:
 *
 * 1. The visitor's saved preference (cookie).
 * 2. The browser `Accept-Language` header on a first visit.
 * 3. The default locale.
 *
 * This runs once per request inside `request.ts`; application code should read
 * the result through `getLocale()` from `next-intl/server` instead of calling
 * this directly, so there is exactly one resolution per request.
 */
export async function resolveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const saved = normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
  if (saved) return saved;

  const headerStore = await headers();
  return detectLocaleFromHeader(headerStore.get('accept-language'));
}
