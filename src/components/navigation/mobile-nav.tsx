'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { SocialIcon } from '@/components/brand/social-icon';
import { LanguageSwitcher } from '@/components/navigation/language-switcher';
import { NavLink } from '@/components/navigation/nav-link';
import { ThemeToggle } from '@/components/navigation/theme-toggle';
import { ButtonArrow, ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconButton, IconLink } from '@/components/ui/icon-button';
import type { AppRoute, SocialPlatform } from '@/types/content';

type MobileNavItem = {
  id: string;
  href: AppRoute;
  label: string;
};

type MobileNavSocialLink = {
  id: string;
  platform: SocialPlatform;
  url: string;
  label: string;
};

type MobileNavProps = {
  items: MobileNavItem[];
  socialLinks: MobileNavSocialLink[];
  contactLabel: string;
  email: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Mobile navigation drawer.
 *
 * Slides in from the reading-end edge, full height, carrying navigation plus
 * the language, theme and contact controls that the compact header hides.
 *
 * The panel stays mounted and is toggled with `data-state`, so it animates
 * closed as well as open; `inert` removes it from the tab order and the
 * accessibility tree while it is shut. Behaviour required by the brief —
 * Escape to close, a focus trap, scroll lock and focus restored to the
 * trigger — is all implemented below.
 *
 * The trigger and panel switch off at `lg`, matching `SiteHeader`'s inline
 * nav — see the comment there for why that moved from `md`.
 */
export function MobileNav({ items, socialLinks, contactLabel, email }: MobileNavProps) {
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasOpened = useRef(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Escape closes; Tab is trapped inside the panel.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  // Scroll lock while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Focus moves into the panel on open and returns to the trigger on close —
  // but never steals focus on the initial render.
  useEffect(() => {
    if (isOpen) {
      hasOpened.current = true;
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    } else if (hasOpened.current) {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  return (
    <>
      <IconButton
        ref={triggerRef}
        label={isOpen ? t('closeMenu') : t('openMenu')}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className="lg:hidden"
      >
        <Icon name={isOpen ? 'x' : 'menu'} />
      </IconButton>

      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="group/drawer fixed inset-0 z-50 lg:hidden data-[state=closed]:pointer-events-none"
        inert={!isOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={close}
          className="bg-overlay absolute inset-0 w-full cursor-default opacity-0 backdrop-blur-[2px] transition-opacity duration-(--duration-slow) ease-out group-data-[state=open]/drawer:opacity-100"
        />

        {/* Panel — enters from the reading-end edge in both directions. */}
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={t('menu')}
          className={[
            'border-border bg-surface absolute inset-y-0 inset-e-0 flex w-full max-w-sm flex-col',
            'border-s shadow-raised',
            // The offset is a variable rather than competing translate
            // utilities, so RTL and the open state can never fight over
            // which variant wins in the generated CSS.
            'translate-x-(--drawer-offset) [--drawer-offset:100%] rtl:[--drawer-offset:-100%]',
            'group-data-[state=open]/drawer:[--drawer-offset:0%]',
            'transition-transform duration-(--duration-slow) ease-out',
          ].join(' ')}
        >
          <div className="border-border bg-surface sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center justify-between gap-4 border-b px-6">
            <span className="text-label text-subtle-foreground ltr:uppercase">{t('menu')}</span>
            <IconButton label={t('closeMenu')} onClick={close}>
              <Icon name="x" />
            </IconButton>
          </div>

          {/*
            Nav and footer scroll together as one region rather than each
            other in their own bounded box — on a short viewport (a resized
            desktop window, a landscape phone) that used to clip the last nav
            link right at the boundary between the two. Scrolling the whole
            body instead just reveals the rest, the same way the page itself
            scrolls.
          */}
          <div className="flex-1 overflow-y-auto">
            <nav aria-label={t('primaryLabel')} className="px-6 py-2">
              <ul className="flex flex-col gap-0.5">
                {items.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      href={item.href}
                      label={item.label}
                      appearance="drawer"
                      currentPageLabel={t('currentPage')}
                      onNavigate={close}
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-border space-y-6 border-t px-6 py-6">
              <ButtonLink href="/contact" size="lg" className="w-full">
                {contactLabel}
                <ButtonArrow />
              </ButtonLink>

              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground text-sm font-semibold">
                  {tCommon('language.label')}
                </span>
                <LanguageSwitcher />
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground text-sm font-semibold">
                  {tCommon('theme.label')}
                </span>
                <ThemeToggle />
              </div>

              {socialLinks.length > 0 ? (
                <ul aria-label={t('socialLabel')} className="flex items-center gap-2">
                  {socialLinks.map((link) => (
                    <li key={link.id}>
                      <IconLink
                        href={link.url}
                        label={link.label}
                        external={link.platform !== 'email'}
                      >
                        <SocialIcon platform={link.platform} />
                      </IconLink>
                    </li>
                  ))}
                </ul>
              ) : null}

              <p className="text-subtle-foreground text-sm break-all">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
