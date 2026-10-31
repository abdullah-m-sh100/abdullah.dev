import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { elMessiri, fraunces, spaceMono, tajawal } from '@/app/fonts';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { SkipLink } from '@/components/layout/skip-link';
import { getDirection } from '@/i18n/config';
import { pickClientMessages } from '@/i18n/messages';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildSiteJsonLd, serializeJsonLd } from '@/lib/seo/structured-data';
import { siteConfig } from '@/lib/site-config';

import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('metadata');

  return {
    ...buildMetadata({
      title: t('site.title'),
      description: t('site.description'),
      path: '/',
      locale,
    }),
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('site.title'),
      template: t('site.titleTemplate'),
    },
    robots: { index: true, follow: true },
  };
}

/*
 * One theme, so one `theme-color`: Midnight, which is what the browser chrome
 * sits against. The header is a Midnight band at the top of every page, so
 * matching it is what makes the chrome continue the page rather than cap it.
 * There is deliberately no `prefers-color-scheme` pair — the site does not
 * change with the system setting.
 */
export const viewport: Viewport = {
  themeColor: '#0f1b2d',
};

/**
 * Root layout.
 *
 * The locale is resolved server-side from a cookie, so `lang` and `dir` are
 * correct in the first HTML response — there is no client-side direction flip
 * and no locale segment in the URL.
 *
 * No theme provider and no `suppressHydrationWarning`: the site has a single
 * theme, so nothing writes a class onto <html> before React hydrates and
 * there is no mismatch to suppress. Keeping the attribute would silence real
 * hydration bugs anywhere in the tree below it.
 */
export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const direction = getDirection(locale);
  // Only the namespaces Client Components read are sent to the browser.
  const clientMessages = pickClientMessages(await getMessages());

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${fraunces.variable} ${elMessiri.variable} ${tajawal.variable} ${spaceMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        {/* Person + WebSite entity graph — one script, reused on every page. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildSiteJsonLd(locale)) }}
        />
        <NextIntlClientProvider messages={clientMessages}>
          <SkipLink />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
