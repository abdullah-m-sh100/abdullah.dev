'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { Icon } from '@/components/ui/icon';
import {
  LOCALE_SYNC_CHANNEL,
  getAlternateLocale,
  localeNames,
  localeShortNames,
} from '@/i18n/config';
import { setLocalePreference } from '@/i18n/actions';
import { cn } from '@/lib/utils/cn';

type LanguageSwitcherProps = {
  className?: string;
};

/**
 * Two-way language switch.
 *
 * Switching writes a cookie through a Server Action and revalidates the root
 * layout — the URL is untouched, so `/about` stays `/about` in both languages.
 * Other open tabs are then told on a `BroadcastChannel` (see `LocaleSync`), so
 * none of them keeps a layout in the old language.
 */
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const t = useTranslations('common.language');
  const locale = useLocale();
  const target = getAlternateLocale(locale);
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      lang={target}
      disabled={isPending}
      aria-label={t('switchTo', { language: localeNames[target] })}
      title={t('switchTo', { language: localeNames[target] })}
      onClick={() =>
        startTransition(async () => {
          await setLocalePreference(target);
          // The cookie is set once the action returns; only now can other tabs read it.
          if (typeof BroadcastChannel !== 'undefined') {
            const channel = new BroadcastChannel(LOCALE_SYNC_CHANNEL);
            channel.postMessage(target);
            channel.close();
          }
        })
      }
      className={cn(
        'border-border bg-surface-muted text-muted-foreground inline-flex h-11 items-center gap-2 rounded-pill border px-3.5 text-sm font-semibold',
        'transition-[color,border-color,background-color] duration-(--duration-base) ease-out',
        'hover:text-foreground hover:border-border-strong',
        'focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring',
        'disabled:opacity-60',
        className,
      )}
    >
      <Icon name="languages" className="size-4" />
      <span aria-hidden="true">{localeShortNames[target]}</span>
    </button>
  );
}
