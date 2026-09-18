import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

/**
 * next-intl runs in "without i18n routing" mode: the locale is resolved from a
 * cookie inside `src/i18n/request.ts`, never from the URL pathname.
 * There is deliberately no middleware and no `[locale]` route segment.
 */
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    /*
     * 75 is the Next.js default and stays the site-wide norm. 85 exists for the
     * hero portrait only: it is the one image that paints large, above the fold
     * and against a flat navy backdrop, where the banding a lower quality
     * leaves in the gradient is actually visible.
     */
    qualities: [75, 85],
    /*
     * Project covers are currently branded SVG placeholders served from
     * /public, so the optimizer has to be allowed to pass SVG through. Every
     * image is first-party — no remote patterns are configured — and the CSP
     * below sandboxes them and blocks any script inside an SVG.
     *
     * This stays correct once real WebP/AVIF screenshots replace the
     * placeholders; those take the normal optimization path.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  /**
   * Baseline security headers only — deliberately no site-wide `Content-Security-Policy`.
   * Next.js relies on inline bootstrap scripts (the RSC payload, `next-themes`'
   * pre-hydration theme script) that a strict CSP would need a per-request nonce
   * threaded through `next.config.ts`, the root layout and every third-party
   * script to allow safely; getting that wrong silently breaks hydration or the
   * theme switch. The headers below carry no such risk.
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
