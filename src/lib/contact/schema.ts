import { z } from 'zod';

import { contactLimits } from './limits';

export const contactFormSchema = z.object({
  name: z.string().trim().min(contactLimits.name.min).max(contactLimits.name.max),
  email: z.string().trim().max(contactLimits.email.max).email(),
  subject: z.string().trim().min(contactLimits.subject.min).max(contactLimits.subject.max),
  message: z.string().trim().min(contactLimits.message.min).max(contactLimits.message.max),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * A field error as a machine-readable code, never as English text — the
 * client component resolves the code to a localized message via
 * `useTranslations`, the same way every other piece of UI copy on this site
 * is localized. See `contact.form.errors` in `messages/{locale}/contact.json`.
 */
export type ContactFieldError =
  | { code: 'required' }
  | { code: 'tooShort'; min: number }
  | { code: 'tooLong'; max: number }
  | { code: 'invalidEmail' };

export type ContactFieldErrors = Partial<Record<keyof ContactFormInput, ContactFieldError>>;

/**
 * Converts a Zod error into one code per field (the first issue wins, which
 * is always the most fundamental problem given the chain order above).
 *
 * An empty trimmed input is reported as `required` rather than `tooShort` /
 * `invalidEmail` — "this field is required" reads better than "must be at
 * least 2 characters" for a field the visitor simply left blank. Emptiness is
 * checked against the raw submitted `values` rather than `issue.input`: Zod
 * does not reliably surface the original string on every issue shape, but the
 * values passed in here are exactly what the visitor submitted.
 */
export function toContactFieldErrors(
  error: z.ZodError<ContactFormInput>,
  values: Record<keyof ContactFormInput, string>,
): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field !== 'string' || field in fieldErrors) continue;
    const key = field as keyof ContactFormInput;

    const isEmpty = (values[key] ?? '').trim().length === 0;

    if (issue.code === 'too_small') {
      fieldErrors[key] = isEmpty ? { code: 'required' } : { code: 'tooShort', min: Number(issue.minimum) };
    } else if (issue.code === 'too_big') {
      fieldErrors[key] = { code: 'tooLong', max: Number(issue.maximum) };
    } else if (issue.code === 'invalid_format') {
      fieldErrors[key] = isEmpty ? { code: 'required' } : { code: 'invalidEmail' };
    } else {
      fieldErrors[key] = { code: 'required' };
    }
  }

  return fieldErrors;
}
