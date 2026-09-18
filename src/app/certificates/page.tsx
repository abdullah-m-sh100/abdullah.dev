import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import { CertificateCard } from '@/components/certificates/certificate-card';
import { CertificatesHero } from '@/components/certificates/certificates-hero';
import { ContactCta } from '@/components/home/contact-cta';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { Section } from '@/components/ui/section';
import { getAllCertificates } from '@/lib/content/certificates';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('metadata.certificates');

  return buildMetadata({
    title: t('title'),
    description: t('description'),
    path: '/certificates',
    locale,
  });
}

/**
 * /certificates — the full credential list Home only previews three of.
 *
 * `getAllCertificates()` already sorts featured-first, then by `order`, then
 * newest — that ordering alone is the page's hierarchy signal. With only a
 * handful of certificates and most of them featured, a separate "Featured"
 * section would repeat most of the grid immediately below it, so this page
 * stays a single ordered grid rather than duplicating entries across two
 * sections. `CertificateCard` is reused unchanged from Home, with the fuller
 * label set (`credentialId` / `expires` / `doesNotExpire` / `openPdf`) that
 * Home's compact preview intentionally leaves out.
 */
export default async function CertificatesPage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const certificates = getAllCertificates();

  const countLabel = t('certificates.listing.countLabel', { count: certificates.length });
  const labels = {
    issued: t('home.certificates.issued'),
    viewCertificate: t('common.actions.viewCertificate'),
    opensNewTab: t('common.labels.opensNewTab'),
    credentialId: t('certificates.card.credentialId'),
    expires: t('certificates.card.expires'),
    doesNotExpire: t('certificates.card.doesNotExpire'),
    openPdf: t('common.actions.openPdf'),
  };

  return (
    <>
      <CertificatesHero countLabel={countLabel} />

      <Section spacing="compact" aria-labelledby="certificates-listing-title">
        <Container>
          <h2 id="certificates-listing-title" className="sr-only">
            {t('metadata.certificates.title')}
          </h2>

          {certificates.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((certificate, index) => (
                <Reveal key={certificate.id} as="li" index={index % 3}>
                  <CertificateCard certificate={certificate} locale={locale} labels={labels} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon="award"
              title={t('common.states.emptyTitle')}
              description={t('common.states.emptyDescription')}
            />
          )}
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
