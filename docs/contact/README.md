# Contact form

## How sending works

`ContactForm` (`src/components/contact/contact-form.tsx`) is the only Client
Component in the feature. It submits via a Server Action,
`submitContactForm` in `src/app/contact/actions.ts`, which:

1. Rejects silently-successful spam (honeypot filled, or submitted faster
   than 1.5s after the page rendered).
2. Validates with Zod (`src/lib/contact/schema.ts`) — field length limits are
   defined once in `src/lib/contact/limits.ts` and reused by both the schema
   and the client form's `maxLength` hints.
3. Rate-limits by client IP, then by the submitted email address
   (`src/lib/contact/rate-limit.ts`) — checked only once a submission is
   well-formed, so a visitor fixing a couple of typos never burns through the
   same budget a flood of real sends would.
4. Sends the email via `sendContactEmail` (`src/lib/email/send-contact-email.ts`),
   the only file that imports the `resend` package.

Validation error messages are returned as machine-readable **codes**
(`required` / `tooShort` / `tooLong` / `invalidEmail`), never English text —
the client resolves them to the visitor's language via
`messages/*/contact.json`'s `contact.form.errors.*` keys.

## Required environment variables

Set these in production (see `.env.example`):

```env
CONTACT_EMAIL_TO=you@example.com
CONTACT_EMAIL_FROM=Portfolio <noreply@yourdomain.com>
RESEND_API_KEY=re_xxxxxxxx
```

- `CONTACT_EMAIL_FROM` must be a sender verified with Resend on a domain you
  control. It is never the visitor's address — using their address as `from`
  routinely fails SPF/DMARC and gets the message rejected or spam-filtered.
- The visitor's submitted email is used as `replyTo` instead, so replying to
  the notification reaches them directly.
- These are checked at **send time**, not at module load, so `npm run build`
  and local `npm run dev` both work with no email configuration at all — the
  page renders and the form submits; only the final send returns a generic
  "something went wrong" error until the variables are set.

## Security controls

- **Honeypot**: a hidden `company` field. `aria-hidden` + `tabIndex={-1}`
  keep it out of both the accessibility tree and the tab order — a screen
  reader user never encounters it, and a value in it triggers a fake success
  response with no email sent.
- **Timing check**: the page passes a server-computed `renderedAt` timestamp
  into the form; a submission arriving less than 1.5s later is treated the
  same as the honeypot case. This is a secondary signal only, never the sole
  gate.
- **Rate limiting**: see the limitation note below.
- **Header injection**: the email subject and the visitor's address (used as
  `replyTo`) are stripped of CR/LF/control characters before being handed to
  the email provider, in addition to already being Zod-validated.
- **No HTML email**: the message is sent as plain text, so there is no HTML
  to escape and no injection surface in the email body.
- **No secrets in the client bundle**: `schema.ts` and `send-contact-email.ts`
  are only ever imported from server files (the Server Action and each
  other); the client form imports `limits.ts` (plain numbers, zero
  dependencies) and the `schema.ts` **types** only, which Next.js/TypeScript
  erase at compile time.

## Rate-limit scope — read before relying on this

`checkRateLimit` keeps its counters in a plain in-memory `Map`. That is a
real, enforced limit **only within a single long-running Node process**. If
this app is deployed to a platform that runs multiple server instances or
serverless workers (Vercel's default Next.js hosting does), each instance
keeps its own counters — the effective global limit becomes
`3 attempts × (number of warm instances)`, not a hard `3`.

This trade-off is intentional for a personal portfolio's contact form rather
than adding a paid external store (Upstash Redis, Vercel KV, a database).
If abuse becomes a real problem, replace `rate-limit.ts`'s `Map` with a call
to a durable store — `checkRateLimit(key)`'s signature does not need to
change for callers.

**The IP key trusts `x-forwarded-for` as-is.** On Vercel (and most managed
hosts), the platform's edge sets this header itself and strips any
client-supplied value, so it is trustworthy there. Self-hosting this app
directly (no reverse proxy in front) means a visitor can set that header to
anything, making the `ip:` bucket trivial to bypass — the `email:` bucket
still applies in that case, since it comes from validated form data, not a
header. If you self-host behind your own reverse proxy, make sure it
overwrites `X-Forwarded-For` rather than appending to a client-supplied one.

## Testing locally without email credentials

Leave `RESEND_API_KEY` / `CONTACT_EMAIL_TO` / `CONTACT_EMAIL_FROM` unset. The
page renders and the form runs its full validation, honeypot, timing and
rate-limit logic; the final `sendContactEmail` call returns
`{ success: false, reason: 'not-configured' }` and the visitor sees the
generic localized error message. Server logs print a single line naming
which variables are missing — never a stack trace or provider payload.

To test a real send, set the three variables (in `.env.local`, not
`.env.example`) to a real Resend API key and a sender verified on your
Resend account, then submit the form and confirm the message arrives with
`Reply-To` set to the address you submitted.
