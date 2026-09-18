import Image from 'next/image';

import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { TextLink } from '@/components/ui/text-link';
import { localize } from '@/i18n/localize';
import { isCertificateExpired } from '@/lib/content/certificates';
import { formatMonthYear, toDateTimeAttribute } from '@/lib/utils/dates';
import type { Certificate, Locale } from '@/types/content';

type CertificateCardProps = {
  certificate: Certificate;
  locale: Locale;
  labels: {
    issued: string;
    viewCertificate: string;
    opensNewTab: string;
    /** Full-page-only metadata. Home's compact preview omits these. */
    credentialId?: string;
    expires?: string;
    doesNotExpire?: string;
    openPdf?: string;
  };
};

/**
 * Certificate card, shared by the Home preview and the /certificates page.
 *
 * The credential link, PDF link, credential ID and expiry line each render
 * only when their data exists, so a certificate missing any of them never
 * shows a dead action or an empty row. `labels.credentialId` /
 * `.expires` / `.doesNotExpire` / `.openPdf` are optional specifically so
 * Home's compact preview can keep passing its smaller label set unchanged —
 * the extra metadata only appears where the caller opts in.
 *
 * The tile shows a real `certificate.image` via `next/image` when one exists;
 * otherwise it falls back to the tinted brand mark rather than a fake stock
 * preview.
 */
export function CertificateCard({ certificate, locale, labels }: CertificateCardProps) {
  const isExpired = isCertificateExpired(certificate);

  return (
    <Card as="article" interactive className="flex h-full flex-col">
      <div className="border-border bg-surface-muted relative flex h-28 items-center justify-center overflow-hidden rounded-t-lg border-b">
        {certificate.image ? (
          <Image
            src={certificate.image.src}
            alt={localize(certificate.image.alt, locale)}
            width={certificate.image.width}
            height={certificate.image.height}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="size-full object-cover"
          />
        ) : (
          <>
            <div className="grid-surface absolute inset-0 opacity-60" aria-hidden="true" />
            <span className="border-border bg-surface text-secondary relative inline-flex size-12 items-center justify-center rounded-full border">
              <Icon name="award" className="size-6" />
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-h3">{localize(certificate.title, locale)}</h3>

        <p className="text-muted-foreground mt-2 text-sm font-medium">
          {localize(certificate.issuer, locale)}
        </p>

        {certificate.description ? (
          <p className="text-muted-foreground mt-3 flex-1 text-sm">
            {localize(certificate.description, locale)}
          </p>
        ) : (
          <span className="flex-1" />
        )}

        <div className="mt-5 flex flex-col gap-1">
          <p className="text-subtle-foreground text-label ltr:uppercase">
            {labels.issued}{' '}
            <time dateTime={toDateTimeAttribute(certificate.issueDate)}>
              {formatMonthYear(certificate.issueDate, locale)}
            </time>
          </p>

          {labels.doesNotExpire && certificate.doesNotExpire ? (
            <p className="text-subtle-foreground text-label ltr:uppercase">
              {labels.doesNotExpire}
            </p>
          ) : labels.expires && certificate.expiryDate ? (
            <p
              className={isExpired ? 'text-danger text-label ltr:uppercase' : 'text-subtle-foreground text-label ltr:uppercase'}
            >
              {labels.expires}{' '}
              <time dateTime={toDateTimeAttribute(certificate.expiryDate)}>
                {formatMonthYear(certificate.expiryDate, locale)}
              </time>
            </p>
          ) : null}

          {labels.credentialId && certificate.credentialId ? (
            <p className="text-subtle-foreground text-label">
              {labels.credentialId}{' '}
              <span dir="ltr" className="font-mono">
                {certificate.credentialId}
              </span>
            </p>
          ) : null}
        </div>

        {certificate.credentialUrl || (labels.openPdf && certificate.pdf) ? (
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {certificate.credentialUrl ? (
              <TextLink
                href={certificate.credentialUrl}
                external
                externalLabel={labels.opensNewTab}
                className="self-start text-sm"
              >
                {labels.viewCertificate}
              </TextLink>
            ) : null}

            {labels.openPdf && certificate.pdf ? (
              <TextLink
                href={certificate.pdf}
                external
                externalLabel={labels.opensNewTab}
                className="self-start text-sm"
              >
                {labels.openPdf}
              </TextLink>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
