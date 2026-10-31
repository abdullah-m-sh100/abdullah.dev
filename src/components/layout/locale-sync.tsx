'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { LOCALE_COOKIE_NAME, LOCALE_SYNC_CHANNEL } from '@/i18n/config';
import { normalizeLocale } from '@/i18n/detect-locale';

/** The visitor's saved language, read from the same cookie the server reads. */
function readSavedLocale() {
  const entry = document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${LOCALE_COOKIE_NAME}=`));
  return normalizeLocale(entry?.slice(LOCALE_COOKIE_NAME.length + 1));
}

/**
 * Keeps the shared layout in the language the visitor chose.
 *
 * The language lives in a cookie that the server reads on every request, but
 * the root layout — `<html lang dir>`, the header, the footer — is *not*
 * re-fetched when you navigate between pages: Next.js reuses it and fetches
 * only the page that changed. So when the cookie changes anywhere other than
 * this tab's own language switch (the switch in another tab or window of the
 * same browser, for instance), the next navigation brings back a page in the
 * new language inside a layout still in the old one, and the two disagree
 * until something forces a full reload.
 *
 * This compares the language the layout was rendered with against the saved
 * cookie and asks Next.js to re-render the layout when they differ — nothing
 * more. It looks at the three moments the two can drift apart and the user
 * has not yet seen it:
 *
 * - a language switch in another tab (announced on a `BroadcastChannel`, so
 *   the change reaches this tab straight away),
 * - returning to this tab, or restoring it from the back/forward cache,
 * - and every client-side navigation, as the last line of defence.
 *
 * When the two already agree it does nothing, so it never refreshes on its own
 * and never forces a reload on a normal navigation.
 */
export function LocaleSync() {
  const rendered = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  // One refresh per disagreement: `refresh()` is asynchronous, and several
  // events can fire before the new layout arrives.
  const refreshedFor = useRef<string | null>(null);

  useEffect(() => {
    function check() {
      const saved = readSavedLocale();
      if (!saved || saved === rendered) {
        refreshedFor.current = null;
        return;
      }
      if (refreshedFor.current === saved) return;
      refreshedFor.current = saved;
      router.refresh();
    }

    // Also covers the navigation that just committed (this effect re-runs on `pathname`).
    check();

    const channel =
      typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel(LOCALE_SYNC_CHANNEL);
    channel?.addEventListener('message', check);
    window.addEventListener('focus', check);
    window.addEventListener('pageshow', check);
    document.addEventListener('visibilitychange', check);

    return () => {
      channel?.removeEventListener('message', check);
      channel?.close();
      window.removeEventListener('focus', check);
      window.removeEventListener('pageshow', check);
      document.removeEventListener('visibilitychange', check);
    };
  }, [rendered, pathname, router]);

  return null;
}
