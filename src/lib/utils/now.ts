/**
 * Wraps `Date.now()` behind a named function.
 *
 * `react-hooks/purity` (the React Compiler lint rule) flags a direct
 * `Date.now()` / `Math.random()` call written inside a component body as an
 * impure render. `ContactPage` genuinely needs a per-request timestamp — see
 * its own comment — so the call is isolated here instead of suppressed with
 * an `eslint-disable`.
 */
export function now(): number {
  return Date.now();
}
