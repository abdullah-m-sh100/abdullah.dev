import { getLocale, getTranslations } from 'next-intl/server';

import { CertificateCard } from '@/components/certificates/certificate-card';
import { Reveal } from '@/components/motion/reveal';
import { ButtonArrow, ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { getLatestCertificates } from '@/lib/content/certificates';

/**
 * Certificates preview: the three most relevant credentials.
 *
 * Kept visually quiet — small cards after the heavier work sections — so the
 * page's emphasis stays on the projects.
 */
export async function CertificatesPreview() {
  const locale = await getLocale();
  const t = await getTranslations();
  const certificates = getLatestCertificates(3);

  const labels = {
    issued: t('home.certificates.issued'),
    viewCertificate: t('common.actions.viewCertificate'),
    opensNewTab: t('common.labels.opensNewTab'),
    viewFullImage: t('certificates.card.viewFullImage'),
    closeImage: t('certificates.card.closeImage'),
    skills: t('certificates.card.skills'),
  };

  return (
    <Section aria-labelledby="home-certificates">
      <Container>
        <SectionHeading
          id="home-certificates"
          eyebrow={t('home.certificates.eyebrow')}
          title={t('home.certificates.title')}
          description={t('home.certificates.description')}
          action={
            <ButtonLink href="/certificates" variant="secondary" size="sm">
              {t('home.certificates.action')}
              <ButtonArrow />
            </ButtonLink>
          }
        />

        {certificates.length > 0 ? (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate, index) => (
              <Reveal key={certificate.id} as="li" index={index}>
                <CertificateCard certificate={certificate} locale={locale} labels={labels} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <EmptyState
            className="mt-12"
            icon="award"
            title={t('common.states.emptyTitle')}
            description={t('common.states.emptyDescription')}
          />
        )}
      </Container>
    </Section>
  );
}
