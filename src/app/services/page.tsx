import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import { ContactCta } from '@/components/home/contact-cta';
import { ServicesHero } from '@/components/services/services-hero';
import { ServicesList } from '@/components/services/services-list';
import { getFeaturedServices, getSupportingServices } from '@/lib/content/profile';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('metadata.services');

  return buildMetadata({
    title: t('title'),
    description: t('description'),
    path: '/services',
    locale,
  });
}

/**
 * /services — the full catalogue Home only previews four cards of.
 *
 * `ContactCta` is reused unchanged from Home, the same way `/work` and
 * `/about` reuse it for their own closing CTA.
 */
export default function ServicesPage() {
  const featured = getFeaturedServices();
  const supporting = getSupportingServices();

  return (
    <>
      <ServicesHero />
      <ServicesList featured={featured} supporting={supporting} />
      <ContactCta />
    </>
  );
}
