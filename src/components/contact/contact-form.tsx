'use client';

import { useTranslations } from 'next-intl';
import { type ReactNode, useActionState, useEffect, useRef } from 'react';

import { submitContactForm, type ContactFormState } from '@/app/contact/actions';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactLimits } from '@/lib/contact/limits';
import type { ContactFieldError } from '@/lib/contact/schema';
import { cn } from '@/lib/utils/cn';

type ContactFormProps = {
  /** Captured server-side in the page component — see its own comment for why. */
  renderedAt: number;
};

/**
 * Defined here rather than exported from `actions.ts`: a `'use server'` file
 * may only export async functions, so this plain object has to live on the
 * client side of the boundary.
 */
const initialContactFormState: ContactFormState = { status: 'idle' };

/**
 * The only Client Component this page needs.
 *
 * `submitContactForm` is a Server Action: importing it here does not ship its
 * implementation (Zod, the Resend SDK, the rate limiter) to the browser —
 * Next.js replaces it with a small RPC reference, the same mechanism already
 * used by `LanguageSwitcher` → `setLocalePreference`. `useActionState` gives
 * pending/result state without hand-rolled `fetch` + `useState` wiring, and
 * the form still works with JavaScript disabled since it is a real
 * `<form action>` under the hood.
 */
export function ContactForm({ renderedAt }: ContactFormProps) {
  const t = useTranslations('contact.form');
  const [state, formAction, isPending] = useActionState(submitContactForm, initialContactFormState);
  const formRef = useRef<HTMLFormElement>(null);

  const fieldErrors = state.status === 'invalid' ? state.fieldErrors : {};
  const values = state.status === 'invalid' ? state.values : undefined;

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset();
  }, [state.status]);

  function errorMessage(error: ContactFieldError | undefined): string | undefined {
    if (!error) return undefined;
    switch (error.code) {
      case 'tooShort':
        return t('errors.tooShort', { min: error.min });
      case 'tooLong':
        return t('errors.tooLong', { max: error.max });
      case 'invalidEmail':
        return t('errors.invalidEmail');
      default:
        return t('errors.required');
    }
  }

  return (
    <div>
      <h2 id="contact-form-title" className="text-h3">
        {t('title')}
      </h2>

      {state.status === 'success' ? (
        <p
          role="status"
          aria-live="polite"
          className="border-secondary/25 bg-secondary-subtle text-secondary mt-6 flex items-start gap-3 rounded-lg border p-4 text-sm"
        >
          <Icon name="check" className="mt-0.5 size-4 shrink-0" />
          <span>
            <strong className="font-semibold">{t('success.title')}</strong>{' '}
            {t('success.description')}
          </span>
        </p>
      ) : null}

      {state.status === 'error' ? (
        <p role="alert" className="border-danger/30 bg-danger/10 text-danger mt-6 rounded-lg border p-4 text-sm">
          {t('error')}
        </p>
      ) : null}

      {state.status === 'rate-limited' ? (
        <p role="alert" className="border-danger/30 bg-danger/10 text-danger mt-6 rounded-lg border p-4 text-sm">
          {t('rateLimited')}
        </p>
      ) : null}

      <form ref={formRef} action={formAction} noValidate className="mt-6 flex flex-col gap-5">
        {/*
         * Honeypot. `aria-hidden` removes it from assistive tech entirely and
         * `tabIndex={-1}` keeps it out of the tab order, so hiding it this way
         * never conflicts with the usual aria-hidden-on-focusable pitfall. A
         * real visitor never sees or reaches this field; a form-filling bot
         * usually fills every input it finds.
         */}
        <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="renderedAt" value={renderedAt} />

        <Field
          id="name"
          label={t('fields.name')}
          error={errorMessage(fieldErrors.name)}
        >
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={contactLimits.name.max}
            defaultValue={values?.name}
            hasError={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          />
        </Field>

        <Field
          id="email"
          label={t('fields.email')}
          error={errorMessage(fieldErrors.email)}
        >
          <Input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            required
            maxLength={contactLimits.email.max}
            defaultValue={values?.email}
            hasError={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          />
        </Field>

        <Field
          id="subject"
          label={t('fields.subject')}
          error={errorMessage(fieldErrors.subject)}
        >
          <Input
            id="subject"
            name="subject"
            type="text"
            autoComplete="off"
            required
            maxLength={contactLimits.subject.max}
            defaultValue={values?.subject}
            hasError={Boolean(fieldErrors.subject)}
            aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
          />
        </Field>

        <Field
          id="message"
          label={t('fields.message')}
          error={errorMessage(fieldErrors.message)}
        >
          <Textarea
            id="message"
            name="message"
            required
            maxLength={contactLimits.message.max}
            defaultValue={values?.message}
            hasError={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          />
        </Field>

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending || undefined}
          className={cn(
            'group relative mt-2 inline-flex h-12 items-center justify-center gap-2 self-start rounded-lg px-6 text-base font-semibold whitespace-nowrap',
            'bg-primary text-primary-foreground shadow-subtle',
            'transition-[background-color,box-shadow,transform] duration-(--duration-base) ease-out',
            'hover:bg-primary-hover hover:shadow-card active:bg-primary-active',
            'focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring',
            'disabled:pointer-events-none disabled:opacity-60',
          )}
        >
          {isPending ? (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
          ) : null}
          {isPending ? t('submitting') : t('submit')}
        </button>
      </form>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

/** Label + control + associated error, wired with `aria-describedby` once per field. */
function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="text-danger mt-1.5 text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
