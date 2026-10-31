/**
 * Deployment-level configuration.
 *
 * `siteConfig.url` is the origin every canonical URL, Open Graph tag, JSON-LD
 * `url` and sitemap entry is built from, so getting it wrong is not cosmetic —
 * it tells search engines the site lives somewhere it does not.
 *
 * It is resolved in priority order rather than from a single variable, because
 * the single-variable version silently shipped `http://localhost:3000` to
 * production: `NEXT_PUBLIC_SITE_URL` was simply never set on the host, and the
 * fallback had no way to tell "running locally" from "deployed without
 * configuration". Each step below is a source that is only present in the
 * situation it describes:
 *
 *   1. `NEXT_PUBLIC_SITE_URL` — an explicit origin. This is the one to set once
 *      a custom domain exists, and it overrides everything below.
 *   2. The host's production domain. On Vercel this is
 *      `VERCEL_PROJECT_PRODUCTION_URL`, which is the *stable* production
 *      hostname and is the same value on every deployment of the project — so
 *      a preview build still emits production canonicals, which is what you
 *      want, since a preview must never advertise itself as the canonical copy.
 *   3. The current deployment's own hostname (`VERCEL_URL`). Only reached when
 *      the production domain is unavailable; better than localhost.
 *   4. `http://localhost:3000` — no host variables are set, so this really is
 *      a local machine.
 *
 * Both the bare and `NEXT_PUBLIC_`-prefixed spellings are read at each step.
 * The prefixed ones are what survive into a client bundle if this module is
 * ever imported from a Client Component; the bare ones are what exist when the
 * host has not been asked to expose system variables to the browser. Reading
 * both means neither configuration silently falls through to localhost.
 */
const LOCAL_FALLBACK = 'http://localhost:3000';

/** First non-empty value, trimmed. */
function firstSet(...values: (string | undefined)[]): string | undefined {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return undefined;
}

/** Strips a trailing slash and adds a protocol to a bare hostname. */
function normalizeOrigin(value: string): string {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.endsWith('/') ? withProtocol.slice(0, -1) : withProtocol;
}

function resolveSiteUrl(): string {
  const explicit = firstSet(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return normalizeOrigin(explicit);

  const productionDomain = firstSet(
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  );
  if (productionDomain) return normalizeOrigin(productionDomain);

  const deploymentDomain = firstSet(
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  );
  if (deploymentDomain) return normalizeOrigin(deploymentDomain);

  return LOCAL_FALLBACK;
}

export const siteConfig = {
  url: resolveSiteUrl(),
  /** Default social preview image. */
  ogImage: '/brand/og-image.svg',
  twitterHandle: undefined as string | undefined,
} as const;

/** True only on a real local run — useful for guarding noisy dev-only output. */
export const isLocalSiteUrl = siteConfig.url === LOCAL_FALLBACK;

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}
