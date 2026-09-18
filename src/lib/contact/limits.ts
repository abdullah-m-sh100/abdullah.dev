/**
 * Field length limits — the exact values CLAUDE.md §16 specifies.
 *
 * Kept in its own zod-free module so the client-side `ContactForm` can import
 * these plain numbers (for `maxLength` hints) without pulling Zod itself into
 * the client bundle — `schema.ts` imports this file too, so there is still
 * only one source of truth.
 */
export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 5000 },
} as const;
