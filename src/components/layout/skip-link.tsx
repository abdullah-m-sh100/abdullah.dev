import { getTranslations } from 'next-intl/server';

/** Keyboard skip-to-content link, visible only when focused. */
export async function SkipLink() {
  const t = await getTranslations('common.actions');

  return (
    <a
      href="#main-content"
      className="bg-primary text-primary-foreground shadow-raised sr-only rounded-md px-4 py-2 text-sm font-semibold focus:not-sr-only focus:absolute focus:inset-s-4 focus:top-4 focus:z-50"
    >
      {t('skipToContent')}
    </a>
  );
}
