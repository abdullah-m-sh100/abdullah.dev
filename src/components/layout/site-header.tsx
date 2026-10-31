import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

import { Logo } from '@/components/brand/logo';
import { HeaderShell } from '@/components/navigation/header-shell';
import { LanguageSwitcher } from '@/components/navigation/language-switcher';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { NavLink } from '@/components/navigation/nav-link';
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
        {/*
          Below `lg` the row is a flex line: brand on one side, actions on the
          other. From `lg` it becomes a three-column grid with the middle column
          sized to the nav and the outer two equal, so the nav is centred on the
          page whatever the widths of the brand and the actions — with
          `justify-between` it only sat near the middle and drifted with them.
        */}
        <div className="flex h-(--header-height) items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Link
            href="/"
            className="min-w-0 shrink-0 rounded-md focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring lg:justify-self-start"
          >
            <Logo name={localize(personal.name, locale)} />
            <span className="sr-only">{localize(personal.role, locale)}</span>
          </Link>

          {/*
            The inline bar appears at `lg`, not `md`.

            Six links plus the switchers plus the lockup need about 720px, and a
            768px viewport has 704px of usable width, so at `md` the row was
            over-subscribed. `lg` is the first width where all six labels sit in
            the row with real space around them, in both languages, so the drawer
            covers everything below it.

            The links are a single pill group — a hairline capsule with the
            current page filled in — rather than loose text with a copper
            underline. The fill states the current page without spending copper
            on it, which keeps the header's one warm element for the contact
            button.
          */}
          <nav aria-label={t('navigation.primaryLabel')} className="hidden min-w-0 lg:block">
            <ul className="border-hairline border-border bg-surface/50 flex items-center gap-1 rounded-pill p-1">
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

          <div className="flex items-center gap-2 lg:justify-self-end">
            {/*
              The language switch is in the header at every width. It used to
              hide below `lg` and live only inside the drawer, which put the one
              control a bilingual site's visitors most often need two taps away.
              At 320px the row still has room: ~115px brand, ~64px switch,
              44px menu button.
            */}
            <LanguageSwitcher />
            <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
              {t('common.actions.contactMe')}
              <ButtonArrow />
            </ButtonLink>

            <MobileNav
              items={items}
              socialLinks={socialLinks}
              brand={localize(personal.name, locale)}
              contactLabel={t('common.actions.contactMe')}
              email={personal.email}
            />
          </div>
        </div>
      </Container>
    </HeaderShell>
  );
}
