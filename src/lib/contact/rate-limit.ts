/**
 * In-memory rate limiter for the contact form.
 *
 * State lives in this module's memory only, scoped to the running Node
 * process. That is a real, enforced limit on a single long-running server.
 * On a serverless/multi-instance deployment (e.g. Vercel's default Next.js
 * hosting), each warm instance keeps its own counters — the effective global
 * limit becomes `MAX_ATTEMPTS × (number of warm instances)`, not
 * `MAX_ATTEMPTS`. That trade-off is accepted deliberately for a personal
 * portfolio rather than adding a paid external store (Upstash Redis, Vercel
 * KV, …); see `docs/contact/README.md` for the honest scope of this
 * protection and how to upgrade it later.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 3;

/** Hard ceiling on tracked keys — bounds memory on a long-lived process. */
const MAX_TRACKED_KEYS = 5000;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function pruneExpired(now: number): void {
  if (buckets.size < MAX_TRACKED_KEYS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/** Returns `true` when `key` is still within its window's attempt budget. */
export function checkRateLimit(key: string, now = Date.now()): boolean {
  pruneExpired(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_ATTEMPTS) return false;

  bucket.count += 1;
  return true;
}
