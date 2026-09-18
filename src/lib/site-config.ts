/**
 * Deployment-level configuration.
 *
 * `NEXT_PUBLIC_SITE_URL` must be set to the production origin before launch so
 * canonical URLs, Open Graph tags and the sitemap stop pointing at localhost.
 */
const fallbackUrl = 'http://localhost:3000';

function normalizeUrl(value: string | undefined): string {
  const url = value?.trim() || fallbackUrl;
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export const siteConfig = {
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL),
  /** Default social preview image. TODO: add the real asset before launch. */
  ogImage: '/brand/og-image.svg',
  twitterHandle: undefined as string | undefined,
} as const;

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}
