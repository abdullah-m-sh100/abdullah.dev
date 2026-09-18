'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { Icon } from '@/components/ui/icon';
import { getAlternateLocale, localeNames, localeShortNames } from '@/i18n/config';
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
      onClick={() => startTransition(() => setLocalePreference(target))}
      className={cn(
        'border-border bg-surface-muted text-muted-foreground inline-flex h-10 items-center gap-2 rounded-pill border px-3.5 text-sm font-semibold',
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
