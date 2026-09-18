'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

/**
 * Route-level error boundary. Must be a Client Component per the App Router.
 *
 * Its copy lives in the `common` namespace rather than `pages` so the browser
 * never has to receive the server-only message namespaces just to render an
 * error. The visitor-facing message stays generic; details go to the log.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section spacing="spacious">
      <Container className="text-center">
        <h1 className="text-h2">{t('states.errorTitle')}</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-lead">
          {t('states.errorDescription')}
        </p>
        <Button size="lg" className="mt-10" onClick={reset}>
          {t('actions.retry')}
        </Button>
      </Container>
    </Section>
  );
}
