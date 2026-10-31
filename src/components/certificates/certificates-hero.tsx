import { getTranslations } from 'next-intl/server';

import { AnimatedGrid } from '@/components/effects/animated-grid';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/section-heading';

type CertificatesHeroProps = {
  countLabel: string;
  /** One entry per group on the page, in page order. */
  groups: readonly { id: string; label: string; count: number }[];
};

/**
 * /certificates introduction — the same restrained hero pattern used by
 * `WorkHero`, `AboutHero` and `ServicesHero`: one decorative layer, no CTA
 * pair, so the credentials below carry the page's substance.
 *
 * The one addition is a row of jump links, one per group, each carrying its
 * count. With the page split into two groups it is the quickest way to the
 * second one, and it tells a visitor what the page contains before they scroll.
 */
export async function CertificatesHero({ countLabel, groups }: CertificatesHeroProps) {
  const t = await getTranslations('certificates.hero');

  return (
    <Section
      tone="midnight"
      spacing="compact"
      className="relative isolate overflow-hidden"
      aria-labelledby="certificates-hero-title"
    >
      <AnimatedGrid fade="top" className="opacity-60" />

      <Container className="relative">
        <Reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 id="certificates-hero-title" className="mt-4 text-h1">
            {t('title')}
          </h1>
        </Reveal>

        <Reveal index={1}>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lead">{t('description')}</p>
        </Reveal>

        <Reveal index={2}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <p className="text-subtle-foreground text-label me-2 ltr:uppercase">{countLabel}</p>

            {groups.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="border-hairline border-border-control text-foreground hover:border-primary hover:bg-primary-subtle inline-flex min-h-11 items-center gap-2.5 rounded-pill px-4 text-sm font-semibold transition-colors duration-(--duration-base)"
              >
                {group.label}
                <span className="bg-surface-muted text-muted-foreground inline-flex min-w-6 items-center justify-center rounded-full px-1.5 text-xs tabular-nums">
                  {group.count}
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
