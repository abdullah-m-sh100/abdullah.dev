import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { inter, notoSansArabic } from '@/app/fonts';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { SkipLink } from '@/components/layout/skip-link';
import { ThemeProvider } from '@/components/providers/theme-provider';
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#07101f' },
  ],
};

/**
 * Root layout.
 *
 * The locale is resolved server-side from a cookie, so `lang` and `dir` are
 * correct in the first HTML response — there is no client-side direction flip
 * and no locale segment in the URL.
 *
 * `suppressHydrationWarning` is required on <html> because `next-themes`
 * writes the theme class before React hydrates.
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
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansArabic.variable}`}
    >
      <body className="flex min-h-dvh flex-col overflow-x-hidden">
        {/* Person + WebSite entity graph — one script, reused on every page. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildSiteJsonLd(locale)) }}
        />
        <ThemeProvider>
          <NextIntlClientProvider messages={clientMessages}>
            <SkipLink />
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
