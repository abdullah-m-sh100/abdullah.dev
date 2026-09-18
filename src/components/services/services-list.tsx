import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { ServiceCard } from '@/components/services/service-card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Service } from '@/types/content';

type ServicesListProps = {
  featured: Service[];
  supporting: Service[];
};

/**
 * The full service catalogue, split into two editorial groups instead of one
 * equal eight-card grid: featured services keep `ServiceCard`'s wide
 * `feature` layout (full description, highlights), supporting services use
 * the compact default. Both reuse the same component Sprint 2 built for the
 * Home preview — no second card component.
 */
export async function ServicesList({ featured, supporting }: ServicesListProps) {
  const locale = await getLocale();
  const t = await getTranslations('services.listing');

  return (
    <>
      <Section aria-labelledby="services-core-title">
        <Container>
          <SectionHeading
            id="services-core-title"
            eyebrow={t('coreEyebrow')}
            title={t('coreTitle')}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featured.map((service, index) => (
              <Reveal key={service.id} index={index}>
                <ServiceCard service={service} locale={locale} size="feature" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {supporting.length > 0 ? (
        <Section surface="muted" aria-labelledby="services-supporting-title">
          <Container>
            <SectionHeading
              id="services-supporting-title"
              eyebrow={t('supportingEyebrow')}
              title={t('supportingTitle')}
              description={t('supportingDescription')}
            />

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {supporting.map((service, index) => (
                <Reveal key={service.id} as="li" index={index}>
                  <ServiceCard service={service} locale={locale} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
