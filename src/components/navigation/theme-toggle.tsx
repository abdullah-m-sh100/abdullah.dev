'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { type KeyboardEvent, useRef } from 'react';

import { Icon } from '@/components/ui/icon';
import { useIsMounted } from '@/hooks/use-is-mounted';
import type { IconName } from '@/lib/icons';
import { cn } from '@/lib/utils/cn';

const options = [
  { value: 'light', icon: 'sun' },
  { value: 'dark', icon: 'moon' },
  { value: 'system', icon: 'monitor' },
] as const satisfies readonly { value: string; icon: IconName }[];

/**
 * Light / Dark / System switch.
 *
 * Implemented as a real radio group: a roving tab index puts one stop in the
 * tab order and arrow keys move between options, which is the expected
 * keyboard behaviour for this pattern. Arrow direction follows the writing
 * direction, so Left advances in Arabic and Right advances in English.
 *
 * The selected state is applied only after mount — the resolved theme does not
 * exist during SSR, and this is what keeps the markup hydration-safe.
 */
export function ThemeToggle() {
  const t = useTranslations('common.theme');
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const groupRef = useRef<HTMLDivElement>(null);

  // Gated on `mounted` for the same reason as `aria-checked`: the resolved
  // theme does not exist during SSR, so deriving the roving tab stop from it
  // before mount would produce a hydration mismatch on `tabIndex`.
  const selectedIndex = mounted
    ? Math.max(
        options.findIndex((option) => option.value === theme),
        0,
      )
    : 0;

  function focusOption(index: number) {
    const buttons = groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    const target = buttons?.[(index + options.length) % options.length];
    target?.focus();
    target?.click();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const isRtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const forward = isRtl ? 'ArrowLeft' : 'ArrowRight';
    const backward = isRtl ? 'ArrowRight' : 'ArrowLeft';

    if (event.key === forward || event.key === 'ArrowDown') {
      event.preventDefault();
      focusOption(index + 1);
    } else if (event.key === backward || event.key === 'ArrowUp') {
      event.preventDefault();
      focusOption(index - 1);
    }
  }

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label={t('label')}
      className="border-border bg-surface-muted inline-flex items-center gap-0.5 rounded-pill border p-1"
    >
      {options.map((option, index) => {
        const isSelected = mounted && theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={t(option.value)}
            title={t(option.value)}
            tabIndex={index === selectedIndex ? 0 : -1}
            onClick={() => setTheme(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              'inline-flex size-8 items-center justify-center rounded-full',
              'transition-[background-color,color,box-shadow] duration-(--duration-base) ease-out',
              'focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring',
              isSelected
                ? 'bg-surface text-primary shadow-subtle'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon name={option.icon} className="size-4" />
          </button>
        );
      })}
    </div>
  );
}
