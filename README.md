# Abdullah — Portfolio

Bilingual (Arabic / English) personal portfolio for a Front-End Developer, built
with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

`CLAUDE.md` is the project's source of truth for brand, content and quality
rules. This file only covers how the code is put together.

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (flat config)
npm run typecheck  # tsc --noEmit
```

## Architecture

### Language is never in the URL

`/about` serves Arabic or English from the same pathname. There is no
`app/[locale]` segment and no i18n middleware.

Per request, `src/i18n/resolve-locale.ts` resolves the locale in this order:

1. the `NEXT_LOCALE` cookie (the visitor's saved preference),
2. the `Accept-Language` header on a first visit,
3. `defaultLocale` (`en`).

`src/i18n/request.ts` hands that to `next-intl`, and the root layout sets
`<html lang dir>` from it — so direction is correct in the first byte of HTML.
Switching language calls the `setLocalePreference` Server Action, which writes
the cookie and revalidates the root layout. The URL never changes.

**Trade-off:** because the locale comes from a cookie, pages are server-rendered
per request rather than statically prerendered. All data is imported locally, so
there is no I/O on the request path.

### Content

All portfolio content lives in `src/data/` and is composed into a single typed
`portfolioData` object in `src/data/portfolio-data.ts`. Every page reads from it
through the selectors in `src/lib/content/` — there is no second dataset for the
Home page, and no sorting or filtering inside JSX.

Bilingual values use `LocalizedText = { en, ar }` and are resolved with
`localize(value, locale)` from `src/i18n/localize.ts`. UI chrome strings (buttons,
labels, states) live in `messages/{en,ar}/*.json` and are read with `next-intl`.

### Design tokens

`src/styles/tokens.css` defines brand tokens (`--brand-*`) and semantic tokens
(`--background`, `--primary`, …). `src/app/globals.css` maps the semantic tokens
into Tailwind's theme, so components use `bg-surface` / `text-muted-foreground`
rather than raw hex values. Dark mode redefines only the semantic layer.

### Components

Server Components by default. Only four client islands ship JavaScript:
`nav-link`, `language-switcher`, `theme-toggle`, `mobile-nav` (plus the theme
provider and the route error boundary).

## Environment

Copy `.env.example` to `.env.local`. `NEXT_PUBLIC_SITE_URL` must be set to the
production origin before launch — canonical URLs and Open Graph tags depend on it.

## Known placeholders

Content in `src/data/` and the logo files in `public/brand/` are marked with
`TODO` and must be replaced with real content and the approved brand assets.
