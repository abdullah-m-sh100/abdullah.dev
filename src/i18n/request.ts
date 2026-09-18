import { getRequestConfig } from 'next-intl/server';

import { loadMessages } from './messages';
import { resolveLocale } from './resolve-locale';

/**
 * next-intl request configuration — "without i18n routing" mode.
 *
 * There is no middleware and no `[locale]` route segment: the locale is
 * resolved from the request (cookie, then `Accept-Language`), so `/about`
 * renders Arabic or English from the very same URL.
 */
export default getRequestConfig(async () => {
  const locale = await resolveLocale();

  return {
    locale,
    messages: await loadMessages(locale),
    // Keeps server and client date formatting deterministic.
    timeZone: 'Africa/Cairo',
    formats: {
      dateTime: {
        short: { day: 'numeric', month: 'short', year: 'numeric' },
        monthYear: { month: 'long', year: 'numeric' },
      },
    },
  };
});
