import { El_Messiri, Fraunces, Space_Mono, Tajawal } from 'next/font/google';

/**
 * The Flow type system, loaded through `next/font` — which self-hosts every
 * face and emits no render-blocking stylesheet request.
 *
 * Four roles, exactly as the guide assigns them:
 *
 *   Fraunces    Latin headings
 *   El Messiri  Arabic headings
 *   Tajawal     body text, both scripts
 *   Space Mono  code, technical lists, small labels
 *
 * Fraunces and El Messiri are variable, so `weight` is omitted and the whole
 * range ships in one file. Tajawal and Space Mono are static — Google's API
 * rejects range syntax for both — so their weights are listed explicitly, and
 * only the ones the design actually uses, since each is a separate download.
 */

/** Latin headings — 600, per the guide. */
export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

/** Arabic headings — 600/700. Not preloaded: only used when the locale is `ar`. */
export const elMessiri = El_Messiri({
  subsets: ['arabic', 'latin'],
  variable: '--font-el-messiri',
  display: 'swap',
  preload: false,
});

/**
 * Body text in both scripts, so this is the one face on the critical path for
 * every page in either language — hence the Arabic subset ships eagerly here
 * while El Messiri's does not.
 */
export const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
  display: 'swap',
});

/** Code, technical lists and small labels. Latin-only by nature. */
export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});
