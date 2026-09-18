'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { type Locale, LOCALE_COOKIE_MAX_AGE, LOCALE_COOKIE_NAME } from './config';
import { normalizeLocale } from './detect-locale';

/**
 * Persists the visitor's language preference.
 *
 * The URL never changes — only the cookie does. Revalidating the root layout
 * re-renders the whole tree in the new language, including `<html lang/dir>`.
 */
export async function setLocalePreference(value: string): Promise<void> {
  const locale: Locale | null = normalizeLocale(value);
  if (!locale) return;

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE_NAME, locale, {
    maxAge: LOCALE_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
  });

  revalidatePath('/', 'layout');
}
