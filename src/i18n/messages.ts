import type { Locale } from './config';

/**
 * UI message namespaces. Messages are split per feature and merged into one
 * object per locale, so growing the site means adding a file here rather than
 * editing one giant translation blob.
 */
const namespaces = [
  'common',
  'navigation',
  'metadata',
  'pages',
  'home',
  'work',
  'about',
  'services',
  'certificates',
  'contact',
] as const;

export type MessageNamespace = (typeof namespaces)[number];

/**
 * Namespaces the browser actually needs.
 *
 * Only the theme switch, language switch and mobile drawer read messages on the
 * client. `metadata` and `pages` are server-only, so shipping them in the RSC
 * payload would be dead weight on every page — `pickClientMessages` trims them.
 *
 * Adding a translated string to a Client Component means adding its namespace
 * here.
 */
const clientNamespaces = [
  'common',
  'navigation',
  'contact',
] as const satisfies readonly MessageNamespace[];

export function pickClientMessages(
  messages: Record<string, unknown>,
): Record<string, unknown> {
  const picked: Record<string, unknown> = {};
  for (const namespace of clientNamespaces) {
    if (namespace in messages) picked[namespace] = messages[namespace];
  }
  return picked;
}

export async function loadMessages(locale: Locale): Promise<Record<string, unknown>> {
  const modules = await Promise.all(
    namespaces.map(
      (namespace) =>
        import(`../../messages/${locale}/${namespace}.json`) as Promise<{
          default: Record<string, unknown>;
        }>,
    ),
  );

  return modules.reduce<Record<string, unknown>>(
    (messages, module, index) => ({
      ...messages,
      [namespaces[index] as MessageNamespace]: module.default,
    }),
    {},
  );
}
