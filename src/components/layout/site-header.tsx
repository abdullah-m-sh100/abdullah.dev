import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

import { Logo } from '@/components/brand/logo';
import { HeaderShell } from '@/components/navigation/header-shell';
import { LanguageSwitcher } from '@/components/navigation/language-switcher';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { NavLink } from '@/components/navigation/nav-link';
import { ThemeToggle } from '@/components/navigation/theme-toggle';
import { ButtonArrow, ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { portfolioData } from '@/data/portfolio-data';
import { localize } from '@/i18n/localize';
import { getSocialLinks } from '@/lib/content/profile';

/**
 * Global header.
 *
 * A Server Component: navigation labels, the brand name and the social links
 * are localized on the server, and only four small islands ship JavaScript —
 * the scroll-aware shell, the active link, the two switchers and the drawer.
 */
export async function SiteHeader() {
  const locale = await getLocale();
  const t = await getTranslations();
  const { personal, navigation } = portfolioData;

  const items = navigation.map((item) => ({
    id: item.id,
    href: item.href,
    label: localize(item.label, locale),
  }));

  const socialLinks = getSocialLinks().map((link) => ({
    id: link.id,
    platform: link.platform,
    url: link.url,
    label: localize(link.label, locale),
  }));

  return (
    <HeaderShell>
      <Container>
        <div className="flex h-(--header-height) items-center justify-between gap-3 lg:gap-6">
          <Link
            href="/"
            className="min-w-0 shrink-0 rounded-md focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring"
          >
            <Logo name={localize(personal.name, locale)} />
            <span className="sr-only">{localize(personal.role, locale)}</span>
          </Link>

          {/*
            The inline bar appears at `lg`, not `md`.

            Six links plus the two switchers plus the lockup need about 720px of
            a 768px viewport's 704px of usable width in English, so at `md` the
            row was already over-subscribed: the flex items compressed, the
            brand mark collapsed to 12px, and the gaps fell to the 8px minimum.
            Arabic fit only because its labels are shorter — the same bar was
            one long translation away from doing the same thing. `lg` is the
            first width where all six labels sit in the row with real space
            around them (~180px spare), in both languages, so the drawer covers
            everything below it.
          */}
          <nav aria-label={t('navigation.primaryLabel')} className="hidden min-w-0 lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {items.map((item) => (
                <li key={item.id}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    currentPageLabel={t('navigation.currentPage')}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/*
              Both switchers appear at `lg` — the same breakpoint where the
              inline nav takes over and the drawer's trigger disappears.
              Showing them any earlier would duplicate the drawer's own
              language/theme rows while the hamburger is still visible.
            */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <ButtonLink href="/contact" size="sm" className="hidden xl:inline-flex">
              {t('common.actions.contactMe')}
              <ButtonArrow />
            </ButtonLink>

            <MobileNav
              items={items}
              socialLinks={socialLinks}
              contactLabel={t('common.actions.contactMe')}
              email={personal.email}
            />
          </div>
        </div>
      </Container>
    </HeaderShell>
  );
}
