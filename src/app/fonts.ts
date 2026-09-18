import { Inter, Noto_Sans_Arabic } from 'next/font/google';

/**
 * Fonts are loaded through `next/font`, which self-hosts them and emits no
 * render-blocking stylesheet request.
 *
 * Both are variable fonts, so the whole 400–800 range ships in a single file
 * rather than one file per weight.
 */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-sans-arabic',
  display: 'swap',
  // Preloading is skipped because the Arabic face is only used when the
  // rendered locale is `ar`; `display: swap` covers the first Arabic paint.
  preload: false,
});
