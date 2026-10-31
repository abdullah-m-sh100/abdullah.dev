import { CertificateImageTrigger } from "@/components/certificates/certificate-image-trigger";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { TextLink } from "@/components/ui/text-link";
import { TechnologyList } from "@/components/work/technology-list";
import { localize } from "@/i18n/localize";
import { isCertificateExpired } from "@/lib/content/certificates";
import { formatMonthYear, toDateTimeAttribute } from "@/lib/utils/dates";
import type { Certificate, Locale } from "@/types/content";

type CertificateCardProps = {
  certificate: Certificate;
  locale: Locale;
  labels: {
    issued: string;
    viewCertificate: string;
    opensNewTab: string;
    /** Always required — the image lightbox trigger renders on Home and the full page alike. */
    viewFullImage: string;
    closeImage: string;
    /** Full-page-only metadata. Home's compact preview omits these. */
    credentialId?: string;
    expires?: string;
    doesNotExpire?: string;
    openPdf?: string;
    skills?: string;
  };
};

/**
 * Certificate card, shared by the Home preview and the /certificates page.
 *
 * Top to bottom: the certificate itself (a `CertificateImageTrigger`, which
 * shows the whole document and opens it full-size on click), the title and
 * issuer, a short description, a few skill tags, and a footer rule carrying the
 * dates on the start side and the actions on the end side.
 *
 * The footer is pinned to the bottom of the card (`mt-auto`), so in a row of
 * cards the dates and links line up even when the descriptions or the tag rows
 * run to different lengths — the earlier version let them float at whatever
 * height the content above happened to end.
 *
 * The credential link, PDF link, credential ID, expiry, issued date and
 * skills list each render only when their data exists, so a certificate
 * missing any of them never shows a dead action or an empty row.
 * `labels.credentialId` / `.expires` / `.doesNotExpire` / `.openPdf` /
 * `.skills` are optional specifically so Home's compact preview can keep
 * passing its smaller label set unchanged — the extra metadata only appears
 * where the caller opts in. `certificate.issueDate` is itself optional (some
 * real certificates don't print one), so the "Issued" row is conditional too.
 *
 * When there is no `certificate.image` it falls back to the tinted brand mark
 * rather than a fake stock preview.
 */
export function CertificateCard({
  certificate,
  locale,
  labels,
}: CertificateCardProps) {
  const isExpired = isCertificateExpired(certificate);
  const hasActions = Boolean(
    certificate.credentialUrl || (labels.openPdf && certificate.pdf),
  );
  const hasFooter = Boolean(
    certificate.issueDate ||
    (labels.doesNotExpire && certificate.doesNotExpire) ||
    (labels.expires && certificate.expiryDate) ||
    (labels.credentialId && certificate.credentialId) ||
    hasActions,
  );

  return (
    <Card
      as="article"
      interactive
      className="flex h-full flex-col overflow-hidden"
    >
      {certificate.image ? (
        <CertificateImageTrigger
          image={certificate.image}
          alt={localize(certificate.image.alt, locale)}
          title={localize(certificate.title, locale)}
          issuer={localize(certificate.issuer, locale)}
          viewLabel={labels.viewFullImage}
          closeLabel={labels.closeImage}
        />
      ) : (
        <div className="border-border bg-surface-muted relative flex aspect-4/3 items-center justify-center overflow-hidden border-b">
          <div
            className="grid-surface absolute inset-0 opacity-60"
            aria-hidden="true"
          />
          <span className="border-border bg-surface text-secondary relative inline-flex size-12 items-center justify-center rounded-full border">
            <Icon name="award" className="size-6" />
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl leading-snug font-semibold">
          {localize(certificate.title, locale)}
        </h3>

        <p className="text-secondary mt-2 text-sm font-semibold">
          {localize(certificate.issuer, locale)}
        </p>

        {certificate.description ? (
          <p className="text-muted-foreground mt-3 text-sm">
            {localize(certificate.description, locale)}
          </p>
        ) : null}

        {certificate.skills && certificate.skills.length > 0 ? (
          <TechnologyList
            technologies={certificate.skills}
            label={labels.skills ?? ""}
            max={3}
            className="mt-4"
          />
        ) : null}

        {/* Pinned to the bottom so dates and actions align across a row of cards. Omitted when empty, so no bare rule is drawn. */}
        {hasFooter ? (
          <div className="mt-auto pt-5">
            <div className="border-border flex flex-wrap items-end justify-between gap-x-4 gap-y-3 border-t pt-4">
              <div className="flex flex-col gap-1">
                {certificate.issueDate ? (
                  <p className="text-subtle-foreground text-label ltr:uppercase">
                    {labels.issued}{" "}
                    <time dateTime={toDateTimeAttribute(certificate.issueDate)}>
                      {formatMonthYear(certificate.issueDate, locale)}
                    </time>
                  </p>
                ) : null}

                {labels.doesNotExpire && certificate.doesNotExpire ? (
                  <p className="text-subtle-foreground text-label ltr:uppercase">
                    {labels.doesNotExpire}
                  </p>
                ) : labels.expires && certificate.expiryDate ? (
                  <p
                    className={
                      isExpired
                        ? "text-danger text-label ltr:uppercase"
                        : "text-subtle-foreground text-label ltr:uppercase"
                    }
                  >
                    {labels.expires}{" "}
                    <time
                      dateTime={toDateTimeAttribute(certificate.expiryDate)}
                    >
                      {formatMonthYear(certificate.expiryDate, locale)}
                    </time>
                  </p>
                ) : null}

                {labels.credentialId && certificate.credentialId ? (
                  <p className="text-subtle-foreground text-label">
                    {labels.credentialId}{" "}
                    <span dir="ltr" className="font-mono">
                      {certificate.credentialId}
                    </span>
                  </p>
                ) : null}
              </div>

              {hasActions ? (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  {certificate.credentialUrl ? (
                    <TextLink
                      href={certificate.credentialUrl}
                      external
                      externalLabel={labels.opensNewTab}
                      className="text-sm"
                    >
                      {labels.viewCertificate}
                    </TextLink>
                  ) : null}

                  {labels.openPdf && certificate.pdf ? (
                    <TextLink
                      href={certificate.pdf}
                      external
                      externalLabel={labels.opensNewTab}
                      className="text-sm"
                    >
                      {labels.openPdf}
                    </TextLink>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
