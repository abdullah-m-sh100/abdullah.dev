import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import { CertificateCard } from '@/components/certificates/certificate-card';
import { CertificatesHero } from '@/components/certificates/certificates-hero';
import { ContactCta } from '@/components/home/contact-cta';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { getAllCertificates } from '@/lib/content/certificates';
import { buildMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils/cn';
import type { CertificateCategory } from '@/types/content';

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

/** Page order of the groups. A group with no certificates is simply not rendered. */
const GROUP_ORDER: readonly CertificateCategory[] = ['web', 'ai'];

/**
 * Column count that never leaves a card alone on its last row: three across
 * when the count divides by three, four for a group of four (a 2×2 of cards
 * this tall would run past a screen), otherwise the count itself up to three.
 */
function columnsFor(count: number): string {
  if (count === 4) return 'sm:grid-cols-2 lg:grid-cols-4';
  if (count === 2) return 'sm:grid-cols-2';
  return 'sm:grid-cols-2 lg:grid-cols-3';
}

/**
 * /certificates — the full credential list Home only previews three of.
 *
 * The certificates are filed into groups (web development, AI-assisted
 * development) rather than shown as one flat grid: a visitor looking for the
 * React training should not have to scan past the AI courses, and seven cards
 * in a three-column grid left the last one alone. Within a group the order is
 * still `getAllCertificates()`'s — featured first, then `order`, then newest.
 * `CertificateCard` is reused unchanged from Home, with the fuller label set
 * (`credentialId` / `expires` / `doesNotExpire` / `openPdf`) that Home's
 * compact preview intentionally leaves out.
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
    viewFullImage: t('certificates.card.viewFullImage'),
    closeImage: t('certificates.card.closeImage'),
    credentialId: t('certificates.card.credentialId'),
    expires: t('certificates.card.expires'),
    doesNotExpire: t('certificates.card.doesNotExpire'),
    openPdf: t('common.actions.openPdf'),
    skills: t('certificates.card.skills'),
  };

  const groups = GROUP_ORDER.map((category) => ({
    id: category,
    label: t(`certificates.groups.${category}.title`),
    description: t(`certificates.groups.${category}.description`),
    items: certificates.filter((certificate) => certificate.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <CertificatesHero
        countLabel={countLabel}
        groups={groups.map(({ id, label, items }) => ({ id, label, count: items.length }))}
      />

      {groups.length > 0 ? (
        groups.map((group, index) => (
          <Section
            key={group.id}
            id={group.id}
            surface={index % 2 === 1 ? 'muted' : 'transparent'}
            aria-labelledby={`certificates-${group.id}-title`}
          >
            <Container>
              <SectionHeading
                id={`certificates-${group.id}-title`}
                title={group.label}
                description={group.description}
              />

              <ul className={cn('mt-10 grid gap-6', columnsFor(group.items.length))}>
                {group.items.map((certificate, itemIndex) => (
                  <Reveal key={certificate.id} as="li" index={itemIndex % 4}>
                    <CertificateCard certificate={certificate} locale={locale} labels={labels} />
                  </Reveal>
                ))}
              </ul>
            </Container>
          </Section>
        ))
      ) : (
        <Section spacing="compact">
          <Container>
            <EmptyState
              icon="award"
              title={t('common.states.emptyTitle')}
              description={t('common.states.emptyDescription')}
            />
          </Container>
        </Section>
      )}

      <ContactCta />
    </>
  );
}
