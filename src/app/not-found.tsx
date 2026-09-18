import { getTranslations } from 'next-intl/server';

import { AnimatedGrid } from '@/components/effects/animated-grid';
import { OrbitBackground } from '@/components/effects/orbit-background';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

/** Brand-consistent 404 with a clear path back home. */
export default async function NotFound() {
  const t = await getTranslations('pages.notFound');
  const tCommon = await getTranslations('common.actions');

  return (
    <Section spacing="spacious" className="relative isolate overflow-hidden">
      <AnimatedGrid />
      <OrbitBackground className="absolute inset-0 -z-10 size-full opacity-70" rings={2} />
      <Container className="relative text-center">
        <p className="text-gradient-brand text-display">{t('code')}</p>
        <h1 className="mt-6 text-h2">{t('title')}</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-lead">{t('description')}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" size="lg">
            {tCommon('backHome')}
          </ButtonLink>
          <ButtonLink href="/work" size="lg" variant="secondary">
            {tCommon('viewWork')}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
