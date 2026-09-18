import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

import { Logo } from '@/components/brand/logo';
import { SocialIcon } from '@/components/brand/social-icon';
import { OrbitBackground } from '@/components/effects/orbit-background';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/section-heading';
import { IconLink } from '@/components/ui/icon-button';
import { TextLink } from '@/components/ui/text-link';
import { portfolioData } from '@/data/portfolio-data';
import { localize } from '@/i18n/localize';
import { getSocialLinks } from '@/lib/content/profile';

/**
 * Global footer.
 *
 * Carries the brand statement, navigation, contact shortcut and social links —
 * all from centralized content. A single large orbit sits behind it at low
 * opacity, closing the page with the brand motif rather than an empty bar.
 */
export async function SiteFooter() {
  const locale = await getLocale();
  const t = await getTranslations();
  const { personal, navigation, contact } = portfolioData;
  const socialLinks = getSocialLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface-muted relative mt-auto overflow-hidden border-t">
      {/* Static: the footer is rarely in view, so it need not hold an animation. */}
      <OrbitBackground
        rings={2}
        animated={false}
        className="absolute -top-40 -inset-e-40 h-128 w-176 opacity-60 rtl:-scale-x-100"
      />

      <Container className="relative">
        <div className="grid gap-12 py-16 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] md:py-20">
          <div className="max-w-sm">
            <Logo name={localize(personal.name, locale)} />

            <p className="text-foreground mt-5 text-lg font-semibold">
              {localize(personal.tagline, locale)}
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              {localize(personal.intro, locale)}
            </p>

            {socialLinks.length > 0 ? (
              <ul aria-label={t('navigation.socialLabel')} className="mt-6 flex items-center gap-2">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <IconLink
                      href={link.url}
                      label={localize(link.label, locale)}
                      external={link.platform !== 'email'}
                    >
                      <SocialIcon platform={link.platform} />
                    </IconLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label={t('navigation.footerLabel')}>
            <Eyebrow>{t('navigation.primaryLabel')}</Eyebrow>
            <ul className="mt-5 flex flex-col gap-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm font-semibold transition-colors duration-(--duration-base) ease-out"
                  >
                    {localize(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <Eyebrow>{t('metadata.contact.title')}</Eyebrow>
            <div className="mt-5 flex flex-col items-start gap-3">
              <TextLink href={`mailto:${personal.email}`} tone="foreground">
                {personal.email}
              </TextLink>
              <p className="text-muted-foreground text-sm">
                {localize(contact.location, locale)}
              </p>
              <p className="text-subtle-foreground text-sm">
                {localize(contact.responseTime, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="border-border flex flex-col items-center gap-4 border-t py-8 sm:flex-row sm:justify-between">
          <p className="text-subtle-foreground text-sm">
            © {year} {localize(personal.name, locale)}. {t('pages.footer.rights')}
          </p>
          <p className="text-subtle-foreground text-sm">{t('pages.footer.builtWith')}</p>
        </div>
      </Container>
    </footer>
  );
}
