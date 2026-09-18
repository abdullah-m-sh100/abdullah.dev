import { Resend } from 'resend';

export type ContactEmailInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
};

export type SendContactEmailResult =
  | { success: true }
  | { success: false; reason: 'not-configured' | 'provider-error' | 'network-error' };

/**
 * Sends the contact form submission to the site owner's inbox.
 *
 * This is the only file that knows about Resend — the Server Action calling
 * it only sees `sendContactEmail(input)`, so swapping providers later (SMTP,
 * another API) means rewriting this one file.
 *
 * `from` is always the verified sender in `CONTACT_EMAIL_FROM`, never the
 * visitor's address — using a visitor's address as `from` routinely fails
 * SPF/DMARC checks and gets the message spam-filtered or rejected outright.
 * The visitor's address is carried as `replyTo` instead, so replying to the
 * notification email reaches them directly.
 */
export async function sendContactEmail(input: ContactEmailInput): Promise<SendContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    // Checked at send time, not at module load, so the app still builds and
    // renders without production email secrets configured (CLAUDE.md §18).
    console.error(
      '[contact] Email is not configured — set RESEND_API_KEY, CONTACT_EMAIL_TO and CONTACT_EMAIL_FROM.',
    );
    return { success: false, reason: 'not-configured' };
  }

  const resend = new Resend(apiKey);
  const subject = sanitizeHeaderValue(input.subject);
  const senderName = sanitizeHeaderValue(input.name);
  const replyTo = sanitizeHeaderValue(input.email);
  const submittedAt = new Date();

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo,
      subject: `New inquiry from ${senderName}: ${subject}`,
      html: buildHtmlBody(input, submittedAt),
      text: buildPlainTextBody(input, submittedAt),
    });

    if (result.error) {
      // Log only the provider's error name/message, never the API key or the
      // visitor's message content.
      console.error('[contact] Resend returned an error:', result.error.name);
      return { success: false, reason: 'provider-error' };
    }

    return { success: true };
  } catch (error) {
    console.error('[contact] Failed to reach the email provider:', error instanceof Error ? error.message : error);
    return { success: false, reason: 'network-error' };
  }
}

/**
 * Strips control characters (CR/LF and friends) from a value before it is
 * used in an email header. Plain values reaching this point are already Zod-
 * validated, but headers get this defense-in-depth regardless — the cost of
 * checking is trivial and it is the one place header injection could occur.
 */
function sanitizeHeaderValue(value: string): string {
  return value.replaceAll(/[\r\n\t\0]/g, ' ').trim().slice(0, 200);
}

/**
 * Escapes the five HTML-significant characters. Every visitor-supplied value
 * goes through this before it is interpolated into `buildHtmlBody` — without
 * it, a message containing `<img src=x onerror=...>` would execute inside
 * whatever mail client renders the notification.
 */
function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatTimestamp(date: Date, locale: string): string {
  const formatted = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(date);
  return `${formatted} UTC`;
}

/** Plain text fallback for clients that do not render HTML. */
function buildPlainTextBody(input: ContactEmailInput, submittedAt: Date): string {
  return [
    'New portfolio contact',
    '',
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    `Locale: ${input.locale}`,
    `Submitted: ${formatTimestamp(submittedAt, input.locale)}`,
    '',
    'Message:',
    input.message,
  ].join('\n');
}

/*
 * HTML body.
 *
 * Built with nested tables and inline styles rather than the site's own
 * Tailwind classes or a `<style>` block: email clients strip `<style>` tags
 * and ignore most modern CSS unpredictably (Outlook desktop renders with
 * Word's engine, not a browser engine), so a table-based layout with every
 * rule inlined is the one approach that reaches every inbox looking the same.
 * The brand hex values are repeated literally here rather than imported from
 * `tokens.css` for the same reason — this document has no build step and no
 * access to CSS custom properties at render time.
 *
 * `color-scheme`/`supported-color-schemes` opt into the handful of clients
 * (Apple Mail, the newer Outlook clients) that respect them so a dark-mode
 * inbox does not invert this into low-contrast navy-on-navy; every color
 * below is still set explicitly as a safe fallback everywhere else.
 */
function buildHtmlBody(input: ContactEmailInput, submittedAt: Date): string {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const subject = escapeHtml(input.subject);
  const message = escapeHtml(input.message);
  const timestamp = escapeHtml(formatTimestamp(submittedAt, input.locale));
  const localeLabel = escapeHtml(input.locale === 'ar' ? 'Arabic (ar)' : 'English (en)');
  const mailtoHref = `mailto:${encodeURIComponent(input.email)}?subject=${encodeURIComponent(`Re: ${input.subject}`)}`;

  const navy = '#0f172a';
  const blue = '#3b82f6';
  const teal = '#14b8a6';
  const offWhite = '#f8fafc';
  const surfaceMuted = '#f1f5f9';
  const border = '#e5e7eb';
  const mutedText = '#475569';

  const field = (label: string, value: string) => `
    <tr>
      <td style="padding:0 0 16px 0;">
        <p style="margin:0 0 4px 0;font:600 12px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:0.06em;text-transform:uppercase;color:${teal};">${label}</p>
        <p style="margin:0;font:400 15px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${navy};">${value}</p>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="${input.locale === 'ar' ? 'ar' : 'en'}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>New portfolio contact</title>
</head>
<body style="margin:0;padding:0;background-color:${offWhite};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${offWhite};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${border};">

          <!-- Header -->
          <tr>
            <td style="background-color:${navy};padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font:800 18px/1.3 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#ffffff;">
                    Abdullah <span style="color:${teal};">&middot;</span> Portfolio
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="height:4px;line-height:4px;font-size:0;background-color:${blue};">&nbsp;</td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:28px 32px 4px 32px;">
              <p style="margin:0 0 6px 0;font:600 12px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:0.08em;text-transform:uppercase;color:${blue};">New contact form submission</p>
              <h1 style="margin:0;font:700 22px/1.3 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${navy};">${subject}</h1>
            </td>
          </tr>

          <!-- Sender card -->
          <tr>
            <td style="padding:20px 32px 4px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${surfaceMuted};border-radius:12px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${field('From', name)}
                      ${field('Email', `<a href="mailto:${encodeURIComponent(input.email)}" style="color:${blue};text-decoration:none;">${email}</a>`)}
                      ${field('Submitted', timestamp)}
                      <tr>
                        <td style="padding:0;">
                          <p style="margin:0 0 4px 0;font:600 12px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:0.06em;text-transform:uppercase;color:${teal};">Site language</p>
                          <p style="margin:0;font:400 15px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${navy};">${localeLabel}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message. Accent border is a fixed physical \`border-left\`, not the
               site's usual logical \`margin-inline\`/\`border-inline-start\`:
               email client CSS support for logical properties is too
               inconsistent to trust, and unlike the site itself, nothing here
               mirrors for an Arabic-reading recipient — Abdullah's own mail
               client renders in whatever direction it always does. -->
          <tr>
            <td style="padding:20px 32px 8px 32px;">
              <p style="margin:0 0 8px 0;font:600 12px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:0.06em;text-transform:uppercase;color:${mutedText};">Message</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid ${blue};background-color:${surfaceMuted};border-radius:0 12px 12px 0;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;white-space:pre-wrap;font:400 15px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${navy};">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 32px 8px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:10px;background-color:${blue};">
                    <a href="${mailtoHref}" style="display:inline-block;padding:12px 22px;font:600 14px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#ffffff;text-decoration:none;border-radius:10px;">Reply to ${name}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px 28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${border};">
                <tr>
                  <td style="padding:16px 0 0 0;font:400 12px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${mutedText};">
                    Sent automatically from the contact form at your portfolio site. Replying to this email replies directly to ${name}.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
