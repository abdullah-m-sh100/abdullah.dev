import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { ServiceCard } from '@/components/services/service-card';
import { ButtonArrow, ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { getFeaturedServices } from '@/lib/content/profile';

/**
 * Services preview.
 *
 * The first featured service takes a wide card with its full description and
 * highlights; the rest follow as supporting cards. That asymmetry gives the
 * section a focal point instead of four equal boxes, and it degrades cleanly
 * to a single column on mobile.
 */
export async function ServicesPreview() {
  const locale = await getLocale();
  const t = await getTranslations();
  const services = getFeaturedServices(4);
  const [lead, ...supporting] = services;

  return (
    <Section aria-labelledby="home-services">
      <Container>
        <SectionHeading
          id="home-services"
          eyebrow={t('home.services.eyebrow')}
          title={t('home.services.title')}
          description={t('home.services.description')}
          action={
            <ButtonLink href="/services" variant="secondary" size="sm">
              {t('home.services.action')}
              <ButtonArrow />
            </ButtonLink>
          }
        />

        {lead ? (
          <div className="mt-12 flex flex-col gap-6">
            <Reveal>
              <ServiceCard service={lead} locale={locale} size="feature" />
            </Reveal>

            {supporting.length > 0 ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {supporting.map((service, index) => (
                  <Reveal key={service.id} as="li" index={index}>
                    <ServiceCard service={service} locale={locale} />
                  </Reveal>
                ))}
              </ul>
            ) : null}
          </div>
        ) : (
          <EmptyState
            className="mt-12"
            icon="layers"
            title={t('common.states.emptyTitle')}
            description={t('common.states.emptyDescription')}
          />
        )}
      </Container>
    </Section>
  );
}
