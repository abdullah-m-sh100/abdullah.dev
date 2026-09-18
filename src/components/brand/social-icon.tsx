import type { SocialPlatform } from '@/types/content';
import { cn } from '@/lib/utils/cn';

/**
 * Brand marks for social profiles.
 *
 * `lucide-react` v1 removed third-party brand icons, so these are inline paths.
 * They use `currentColor` and inherit the theme like every other icon.
 */
const paths: Record<Exclude<SocialPlatform, 'email'>, string> = {
  github:
    'M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.81c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z',
  linkedin:
    'M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 21v-6.86c0-3.67-1.96-5.38-4.58-5.38-2.11 0-3.05 1.16-3.58 1.98V8.5H8.9V21h3.38v-6.98c0-1.84.35-3.62 2.63-3.62 2.25 0 2.28 2.1 2.28 3.74V21h3.25Z',
  upwork:
    'M18.2 7.5c-2.2 0-3.86 1.43-4.53 3.73-1.04-1.56-1.83-3.44-2.29-5.03H8.5v6.06c0 1.2-.98 2.18-2.18 2.18a2.18 2.18 0 0 1-2.18-2.18V6.2H1.25v6.06a5.07 5.07 0 0 0 10.14.14c.56.98 1.18 1.95 1.93 2.78l-1.63 7.67h2.94l1.18-5.57c1.03.66 2.21 1.07 3.6 1.07 2.93 0 5.34-2.4 5.34-5.44 0-3.05-2.41-5.41-5.34-5.41Zm0 8.03a3.94 3.94 0 0 1-2.7-1.12l.25-1.03v-.02c.18-1.04.77-2.79 2.45-2.79 1.26 0 2.29 1.03 2.29 2.48a2.5 2.5 0 0 1-2.29 2.48Z',
  x: 'M17.53 3h3.06l-6.68 7.63L21.75 21h-6.15l-4.82-6.3L5.27 21H2.2l7.14-8.16L2.25 3h6.3l4.36 5.76L17.53 3Zm-1.07 16.17h1.7L7.62 4.73H5.8l10.66 14.44Z',
};

type SocialIconProps = {
  platform: SocialPlatform;
  className?: string;
};

export function SocialIcon({ platform, className }: SocialIconProps) {
  if (platform === 'email') {
    // Email is a UI concept, not a brand — it uses the Lucide registry icon.
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn('size-5', className)}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-9.4 6.3a2 2 0 0 1-2.2 0L2 7" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('size-5', className)}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[platform]} />
    </svg>
  );
}
