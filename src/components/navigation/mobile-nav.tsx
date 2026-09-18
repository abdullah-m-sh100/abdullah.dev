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

  /*
   * Scroll lock while the drawer is open.
   *
   * Applied to the document element, not `<body>`. Locking the body relies on
   * the browser propagating its `overflow` up to the viewport, which only
   * happens while the root's own overflow is `visible` — a condition anything
   * later added to `html` can quietly invalidate, at which point the page goes
   * on scrolling behind an open drawer with nothing to show that the lock was
   * lost. The root element is the scroll container itself, so hiding its
   * overflow is the direct statement of the same intent.
   *
   * Removing the scrollbar would otherwise widen the viewport and shift the
   * whole page — including the sticky header — sideways at the moment the
   * drawer opens. Its width is measured first and re-applied as padding on the
   * reading-end side, so the layout holds still. This is done here rather than
   * with a permanently reserved `scrollbar-gutter` because the gutter shrinks
   * the containing block a fixed overlay is positioned against, which stops
   * the drawer covering the full viewport; see the note in `globals.css`.
   */
  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingInlineEnd;

    root.style.overflow = 'hidden';
    if (scrollbarWidth > 0) root.style.paddingInlineEnd = `${scrollbarWidth}px`;

    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingInlineEnd = previousPadding;
    };
  }, [isOpen]);

  /*
   * Focus moves into the panel on open and returns to the trigger on close —
   * but never steals focus on the initial render.
   *
   * Both calls pass `preventScroll`. Focusing an element normally scrolls it
   * into view, and a programmatic scroll is not blocked by the lock above —
   * `overflow: hidden` only stops the user's own scrolling. Without it,
   * opening the drawer while partway down a page dragged the document back up
   * by several hundred pixels, so closing the drawer returned the reader
   * somewhere they had never been. The panel is fixed and already on screen,
   * so there is nothing to scroll to in the first place.
   */
  useEffect(() => {
    if (isOpen) {
      hasOpened.current = true;
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true });
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

      {/*
        `overflow-hidden` is what keeps the parked panel from widening the
        page. The panel sits at `translate-x: ±100%` while closed, and a
        transform still counts toward scrollable overflow — so an off-screen
        drawer added its own full width (384px, or the viewport's width on a
        small phone) of horizontal scroll to every page on the site, in both
        directions. Clipping it here confines that to the one element that
        causes it, which is the opposite of hiding it globally on `<body>`:
        the page keeps its real overflow behaviour, and anything that genuinely
        overflows later still shows up instead of being silently swallowed.
      */}
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="group/drawer fixed inset-0 z-50 overflow-hidden lg:hidden data-[state=closed]:pointer-events-none"
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
