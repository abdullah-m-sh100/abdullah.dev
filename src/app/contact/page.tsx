import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import { ContactDetails } from '@/components/contact/contact-details';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactHero } from '@/components/contact/contact-hero';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/seo/metadata';
import { now } from '@/lib/utils/now';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('metadata.contact');

  return buildMetadata({
    title: t('title'),
    description: t('description'),
    path: '/contact',
    locale,
  });
}

/**
 * /contact — a Server Component page with exactly one Client Component
 * island (`ContactForm`); everything else, including the hero and the
 * contact-details panel, renders on the server.
 *
 * `renderedAt` is computed here, server-side, once per request, and passed
 * down as a plain number prop rather than read via `Date.now()` inside the
 * client form itself — that keeps it identical between the server-rendered
 * HTML and the client hydration pass, avoiding the hydration mismatch a
 * client-side timestamp would cause. The Server Action compares it against
 * the time it receives the submission as a secondary, non-authoritative
 * signal that a submission was scripted rather than typed.
 */
export default function ContactPage() {
  const renderedAt = now();

  return (
    <>
      <ContactHero />

      <Section spacing="compact" aria-labelledby="contact-form-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <ContactForm renderedAt={renderedAt} />
            </div>

            <div className="lg:col-span-5">
              <ContactDetails />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
