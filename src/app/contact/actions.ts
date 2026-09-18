'use server';

import { headers } from 'next/headers';
import { getLocale } from 'next-intl/server';

import { checkRateLimit } from '@/lib/contact/rate-limit';
import { contactFormSchema, toContactFieldErrors, type ContactFieldErrors } from '@/lib/contact/schema';
import { sendContactEmail } from '@/lib/email/send-contact-email';

/** Below this, a submission is treated as automated rather than a fast typist. */
const MIN_SUBMIT_MS = 1500;

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'invalid'; fieldErrors: ContactFieldErrors; values: ContactFormValues }
  | { status: 'rate-limited' }
  | { status: 'error' };

/**
 * Handles a contact form submission end to end: spam gates, validation, rate
 * limiting, then the actual send. Runs entirely server-side — no email
 * provider code or API key ever reaches the client bundle.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values: ContactFormValues = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    subject: String(formData.get('subject') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  // Honeypot: real visitors never see or fill this field. A bot that submits
  // a value here gets a fake success — no email is sent, and the bot gets no
  // signal to distinguish this from a real submission worth adapting to.
  const honeypot = String(formData.get('company') ?? '').trim();
  const renderedAt = Number(formData.get('renderedAt') ?? 0);
  const submittedTooFast = renderedAt > 0 && Date.now() - renderedAt < MIN_SUBMIT_MS;

  if (honeypot.length > 0 || submittedTooFast) {
    return { status: 'success' };
  }

  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    return { status: 'invalid', fieldErrors: toContactFieldErrors(parsed.error, values), values };
  }

  // Rate limiting only applies once a submission is well-formed — a visitor
  // fixing a couple of typos before getting the form right should never burn
  // through the same budget a flood of real sends would. Checked by IP and,
  // separately, by the normalized email address, so neither rotating the
  // apparent IP nor claiming a different email alone is enough to bypass it.
  const headerList = await headers();
  const forwardedFor = headerList.get('x-forwarded-for');
  const clientIp = forwardedFor?.split(',')[0]?.trim() || 'unknown';

  if (!checkRateLimit(`ip:${clientIp}`) || !checkRateLimit(`email:${parsed.data.email.toLowerCase()}`)) {
    return { status: 'rate-limited' };
  }

  const locale = await getLocale();
  const result = await sendContactEmail({ ...parsed.data, locale });

  if (!result.success) {
    return { status: 'error' };
  }

  return { status: 'success' };
}
