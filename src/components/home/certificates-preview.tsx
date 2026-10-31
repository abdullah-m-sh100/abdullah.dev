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
          <Reveal>
            {/*
              A swipeable row on a phone, a grid from `sm`. Three full-height
              cards stacked made this section ~1000px of scrolling; as a row the
              next card peeks in from the edge, which is what signals a swipe.
              `-mx-6 px-6` lets the row run to the screen edge while its first
              card still lines up with the page gutter, and `scroll-px-6` keeps
              that alignment when a card snaps into place. The reveal wraps the
              whole list rather than each card: a card still off-screen to the
              side would otherwise stay invisible until it was scrolled to.
            */}
            <ul className="-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:mt-12 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
              {certificates.map((certificate) => (
                <li key={certificate.id} className="w-[84%] shrink-0 snap-start sm:w-auto sm:shrink">
                  <CertificateCard certificate={certificate} locale={locale} labels={labels} />
                </li>
              ))}
            </ul>
          </Reveal>
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
