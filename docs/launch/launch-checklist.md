# Launch checklist

Final manual tasks before and after deploying to production. This is a task
list, not a content inventory — for exactly what real content/assets are
missing, see `docs/launch/content-checklist.md`.

---

## CONTENT

- [ ] Every box in `docs/launch/content-checklist.md` is checked with real,
      confirmed content (not placeholder, not invented)
- [ ] No file under `src/data/` still has a `TODO` comment that describes
      unresolved content (a `TODO` is fine to remove once — and only once —
      the real value has replaced it)
- [ ] Every `LocalizedText` value has been read in both languages by a fluent
      speaker of each — the automated check only confirms structural
      completeness (a value exists), not translation quality
- [ ] No project or certificate remains in the data that isn't real and
      verifiable

## ASSETS

- [ ] Real cover images for all 3 projects (or however many remain after
      content review) — see content checklist §8
- [ ] Real certificate images for all certificates that remain — see content
      checklist §10
- [ ] Final approved brand assets in `public/brand/` — see content checklist §13
- [ ] `src/components/brand/logo.tsx` redrawn to match final approved artwork
      (only if the artwork changes from the current provisional mark)
- [ ] Favicon (`src/app/icon.svg`) matches final brand mark
- [ ] OG image reviewed/replaced if desired — see content checklist §14

## DOMAIN

- [ ] Production domain purchased/available
- [ ] DNS pointed at the hosting provider
- [ ] `NEXT_PUBLIC_SITE_URL` set to the real production origin (e.g.
      `https://abdullah.dev`) in the hosting provider's environment
      configuration — not committed to the repo
- [ ] HTTPS certificate active (automatic on most managed hosts)
- [ ] No remaining hardcoded `localhost` reference anywhere in production
      output (verified in Sprint 7 — metadata/canonical/OG/sitemap/robots/
      JSON-LD all derive from `NEXT_PUBLIC_SITE_URL`; re-verify once the real
      domain is set, since this was only tested against the localhost
      fallback)

## EMAIL (Resend)

- [ ] Create/verify Resend account
- [ ] Verify sending domain in Resend
- [ ] Create a production API key
- [ ] Configure `RESEND_API_KEY` in the hosting provider's environment
- [ ] Configure `CONTACT_EMAIL_TO`
- [ ] Configure `CONTACT_EMAIL_FROM` (verified sender on the verified domain
      — never the visitor's own address)
- [ ] Test one real submission end to end on the deployed site
- [ ] Verify the email actually arrives at `CONTACT_EMAIL_TO`
- [ ] Verify `Reply-To` on the received email is the visitor's submitted
      address, not `CONTACT_EMAIL_FROM`
- [ ] Verify the test email did not land in spam (check spam folder
      explicitly)
- [ ] Submit one test message with the site in Arabic
- [ ] Submit one test message with the site in English
- [ ] Confirm real delivery has NOT been claimed anywhere until all of the
      above are actually done with live credentials (Sprint 6/7 explicitly
      did not fake this)

## SEO

- [ ] `NEXT_PUBLIC_SITE_URL` set (see DOMAIN) — this alone fixes canonical
      URLs, Open Graph, sitemap and JSON-LD simultaneously
- [ ] `/sitemap.xml` reachable on the real domain and lists real URLs (no
      `localhost`, no locale-prefixed paths)
- [ ] `/robots.txt` reachable and points at the real sitemap URL
- [ ] Spot-check `generateMetadata` output (title/description/canonical/OG)
      on the deployed site for each page, in both languages
- [ ] Submit the sitemap to Google Search Console (and Bing Webmaster Tools,
      optional) after deployment

## SECURITY

- [ ] No secrets committed to the repository (`.env.example` contains only
      empty placeholders — confirmed in Sprint 7/8; re-confirm before every
      commit that touches env-related files)
- [ ] `RESEND_API_KEY` only ever set as a server-side environment variable,
      never `NEXT_PUBLIC_*`
- [ ] If self-hosting behind your own reverse proxy (not Vercel), confirm it
      overwrites `X-Forwarded-For` rather than passing through a
      client-supplied value — otherwise the contact form's per-IP rate limit
      is trivially bypassable (see `docs/contact/README.md`)
- [ ] Security headers present on the deployed site (`X-Content-Type-Options`,
      `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` — added in
      Sprint 7; verify they survive whatever hosting platform is used, since
      some platforms strip or override `next.config.ts` headers)

## ACCESSIBILITY

- [ ] Re-run a manual keyboard pass on the deployed site (tab through header,
      mobile drawer, contact form, footer) — automated checks in Sprint 7
      covered structure, not a live human pass
- [ ] Verify screen-reader announcement of contact form success/error states
      on the real deployment (was verified locally in Sprint 6, worth one
      re-check post-deploy)
- [ ] Confirm no regressions after real content (esp. longer real Arabic
      project descriptions) is dropped in — long real copy can reveal
      wrapping/contrast issues placeholder copy didn't

## PERFORMANCE

- [ ] Re-run Lighthouse against the real production URL (Sprint 7's numbers
      were measured against a local `next start`, not a deployed CDN/edge —
      real-world numbers should be re-measured, not assumed to carry over)
- [ ] Confirm real project/certificate images (once added) are reasonably
      sized — a large unoptimized screenshot can undo the current perfect
      CLS score if it's dropped in without `next/image`'s width/height

## QA

- [ ] Full regression pass after all real content is in: `/`, `/about`,
      `/services`, `/work`, every `/work/[slug]`, `/certificates`, `/contact`
- [ ] Each of the above in English and Arabic
- [ ] Each of the above in light and dark theme
- [ ] Each of the above at mobile (~390px) and desktop width
- [ ] Contact form full state machine (empty submit, invalid email, valid
      submission, pending, success) with real copy in the messages
- [ ] `npm run lint`, `npm run typecheck`, `npm run build` all pass with the
      final content in place

## DEPLOYMENT

- [ ] Production build succeeds on the hosting provider (not just locally)
- [ ] All required environment variables configured on the host (see
      DOMAIN + EMAIL sections above)
- [ ] Preview/staging deployment checked before promoting to the real domain,
      if the hosting provider supports it

## POST-DEPLOYMENT

Test the **real deployed URL** (not localhost) for all of the following:

- [ ] Home, About, Services, Work, every Work detail page, Certificates,
      Contact all load with a `200`
- [ ] Each of the above renders correctly in English and Arabic
- [ ] Each of the above renders correctly in light and dark theme
- [ ] Each of the above renders correctly on mobile and desktop
- [ ] `https://<domain>/sitemap.xml` — correct URLs, no localhost, no
      locale-prefixed paths
- [ ] `https://<domain>/robots.txt` — correct sitemap reference
- [ ] Canonical URLs on each page point at the real domain
- [ ] Open Graph preview renders correctly when the URL is shared (test with
      a real link-unfurling tool, e.g. sharing in Slack/Twitter/Discord)
- [ ] JSON-LD (`Person`/`WebSite` on every page, `BreadcrumbList` on case
      studies) validates with Google's Rich Results Test on the live URL
- [ ] An invalid `/work/<random-slug>` returns a real `404` page
- [ ] `/en`, `/ar`, `/en/about`, etc. still correctly 404 (locale must never
      appear in the URL)
- [ ] One real contact-form submission delivers an email (see EMAIL section)

---

## Priority

**P0 — must complete before launch**
- Real content for Projects and Certificates, or remove any that stay
  placeholder (publishing fabricated case studies/credentials is explicitly
  against CLAUDE.md)
- Real social profile URLs, or remove the links entirely
- `NEXT_PUBLIC_SITE_URL` set to the real domain
- Resend fully configured and one real send verified, including `Reply-To`
- Full QA pass (light/dark, EN/AR, mobile/desktop) against the real deployed
  URL
- No secrets committed; env vars configured on the host

**P1 — strongly recommended**
- Final approved brand/logo assets (current provisional mark is presentable
  but not your approved identity)
- Real project screenshots/gallery images (current shared placeholder is
  honest and clean, but real work sells better than an abstract diagram)
- Verified `stats.ts` numbers
- Re-run Lighthouse against the real production URL
- Submit sitemap to Search Console

**P2 — can safely happen after launch**
- Certificate PDFs / credential URLs for certificates that are otherwise real
- `abdullah-logo-stacked.svg` / `abdullah-logo-mono.svg` (named in CLAUDE.md,
  not currently used by any component)
- Apple touch icon / web manifest
- Résumé download, phone number, or avatar photo (all optional fields already
  supported by the existing `PersonalInfo` type)
- OG image redesign, if the current provisional one is acceptable short-term
