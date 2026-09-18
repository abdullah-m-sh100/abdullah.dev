'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * Theme provider.
 *
 * `next-themes` writes the `dark` class onto <html> from an inline script that
 * runs before paint, so there is no flash and no hydration mismatch. The
 * preference is persisted in `localStorage`; with no explicit choice the system
 * preference wins.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="abdullah-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
