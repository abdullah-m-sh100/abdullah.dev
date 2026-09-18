# Content completion checklist

Every item below is real placeholder, unverified, or missing content found by
auditing `src/data/*.ts`, `public/brand/`, `public/images/`, and `.env.example`.
Nothing was invented to fill these in — see the Sprint 7 and Sprint 8 audits.

**How to use this:** work through each section, replace the value directly in
the named file (never in a component — see `docs/launch/launch-checklist.md`
for the rule), then check the box. A box should only be checked once the real
value is in the file, not to make this list look done.

---

## 1. Personal information — `src/data/personal.ts`

- [ ] **Email** — currently `abdalluhsh6@gmail.com`. This looks like a real
      address already, not a placeholder string — confirm this is the address
      you want published as your public contact address (it is used as the
      `mailto:` link, the `Person.email` in JSON-LD, and the contact page).
      EN/AR: n/a (one value). Asset: no.
- [ ] **Name** — `Abdullah` / `عبد الله`. Confirm this is the exact public
      display name and spelling you want (full name vs. first name only).
      EN + AR. Asset: no.
- [ ] **Role / specialization / tagline / headline / intro** — currently
      generic-but-plausible copy ("Front-End Developer", "React.js & Next.js",
      "Ideas into Interfaces."). Confirm wording or provide your own phrasing.
      EN + AR. Asset: no.
- [ ] **Location** — `Palestine — working with clients worldwide` /
      `فلسطين — أعمل مع عملاء حول العالم`. Confirm this is accurate and the level
      of detail you want public (city vs. country only). EN + AR. Asset: no.
- [ ] **Availability status/label** — currently `available` / "Available for
      new projects". Confirm this reflects your real current availability —
      do not leave a stale "available" status once it stops being true.
      EN + AR. Asset: no.
- [ ] **Optional fields not currently set** — `phone`, `resumeUrl`, `avatar`
      exist in the `PersonalInfo` type but are unset. Only add them if you
      want a phone number public, a downloadable résumé, or a profile photo
      on the site. Not required for launch.

## 2. About — `src/data/about.ts`

- [ ] **Summary paragraphs** (3 paragraphs, `/about` long-form bio) — current
      text is plausible placeholder copy, not confirmed as your real
      biography. Review and rewrite in your own voice, or confirm as final.
      EN + AR. Asset: no.
- [ ] **Preview paragraphs** (2 shorter paragraphs, Home page bio preview) —
      same status as above. EN + AR. Asset: no.
- [ ] **Professional values** (4 cards: Clarity first / Performance as a
      feature / Accessible by default / Built to be extended) — confirm these
      are the four values you actually want to lead with, or replace. EN + AR.
      Asset: no.
- [ ] **Workflow steps** (4 steps: Understand / Structure / Build / Measure &
      refine) — confirm this matches your real process. EN + AR. Asset: no.
- [ ] **Audience** (4 lines: "Who I work with") — confirm these four
      audience descriptions are accurate for the clients you actually want.
      EN + AR. Asset: no.

## 3. Stats — `src/data/stats.ts`

File-level TODO: *"Replace with verified numbers before launch."* Every
number below is currently unverified — do not treat any of them as real.

- [ ] **Years of experience** — currently `3+`. Confirm real value.
- [ ] **Completed projects** — currently `12+`. Confirm real value.
- [ ] **Technologies used** — currently `15+`. Confirm real value (or derive
      it by counting `src/data/skills.ts` once that list is final).
- [ ] **Products in production** — currently `6`. Confirm real value.

Labels (EN + AR) for all four are already translated and do not need
retranslation unless the metric itself changes meaning.

## 4. Experience — `src/data/experience.ts`

File-level TODO: *"Replace with the real employment history."* Only one
entry currently exists:

- [ ] **Freelance entry** — role "Front-End Developer", company "Freelance",
      location "Remote", start date `2023-01-01`, current: true. Confirm the
      real start date, and whether "Freelance" is the correct company label
      or whether a client/agency name should appear instead.
- [ ] **Summary + 2 achievement bullets** — confirm these reflect real,
      specific work rather than generic phrasing. EN + AR.
- [ ] **Additional roles** — if you have prior employment (full-time,
      part-time, or contract work) not currently listed, add each as a new
      `Experience` entry. Do not invent dates or employers — provide them and
      they'll be added in this same structure.
- [ ] **Technologies list** per entry — confirm `['React', 'Next.js',
      'TypeScript', 'Tailwind CSS']` matches what was actually used.

## 5. Skills — `src/data/skills.ts`

File-level TODO: *"Confirm the final skill list."* No proficiency
percentages exist anywhere (correctly avoided) — only the categorical
`level: 'core' | 'strong' | 'working'`, which this checklist covers instead.

- [ ] **Core front-end** — React, Next.js, TypeScript, JavaScript, HTML, CSS.
      Confirm list and that `highlighted: true` items (React, Next.js,
      TypeScript, JavaScript) are the ones you want in the Home technology
      strip.
- [ ] **Styling & UI** — Tailwind CSS, Responsive Design, Design Systems,
      Accessibility (WCAG). Confirm list and levels.
- [ ] **Data & integration** — REST APIs, Laravel Integration, Data Fetching
      & Caching, Forms & Validation. Confirm — "Laravel Integration" in
      particular should only stay if it reflects real, current experience.
- [ ] **Workflow & quality** — Git, Performance Optimization, Technical SEO,
      Testing. Confirm — "Testing" is marked `working` level; confirm that's
      accurate.
- [ ] Confirm no skill is listed that you cannot speak to in an interview or
      back up with a project in `/work`.

Technology names are correctly never translated (see `Skill.name` — English
only by design); no Arabic action needed for skill names themselves, only for
category titles/descriptions, which are already translated.

## 6. Services — `src/data/services.ts`

File-level TODO: *"Review wording before launch."* All 8 services have full
EN + AR title/summary/description/highlights already written. None are
empty, but none have been confirmed as final by you:

- [ ] Next.js Development — confirm wording, `featured: true`, `order: 1`.
- [ ] React Application Development — confirm wording, `featured: true`, `order: 2`.
- [ ] Responsive UI Implementation — confirm wording, `featured: true`, `order: 3`.
- [ ] API Integration — confirm wording, `featured: false`, `order: 4`.
- [ ] Performance Optimization — confirm wording, `featured: true`, `order: 5`.
- [ ] Accessibility Improvements — confirm wording, `featured: false`, `order: 6`.
- [ ] SEO-Focused Front-End — confirm wording, `featured: false`, `order: 7`.
- [ ] UI Refactoring & Modernization — confirm wording, `featured: false`, `order: 8`.

For each: confirm the `icon` (Lucide name) still fits, and whether the
`featured` set (currently 4 of 8) is the set you want on `/services`'
"Core services" group and the Home preview.

## 7. Projects — `src/data/projects.ts`

**Highest priority content area.** File-level TODO: *"Replace with real case
studies, screenshots and links."* All 3 projects below are structurally
complete but entirely placeholder in substance — titles, technologies and
narrative are plausible-sounding stand-ins, not real work.

### Project 1 — `commerce-storefront` (id: `project-commerce`)
- [ ] English title / Arabic title — currently "Commerce Storefront" / "واجهة متجر إلكتروني"
- [ ] English summary / Arabic summary
- [ ] English description / Arabic description
- [ ] Category (EN + AR) — currently "E-commerce"
- [ ] Technologies — currently `Next.js, TypeScript, Tailwind CSS, REST APIs`
- [ ] Date — currently `2025-06-01`
- [ ] Featured flag — currently `true`
- [ ] Cover image (see §8 — currently the shared placeholder SVG)
- [ ] Gallery screenshots (none currently set — optional but recommended)
- [ ] Live URL (none currently set)
- [ ] GitHub URL (none currently set)
- [ ] Challenge / Solution (EN + AR) — currently generic narrative
- [ ] Responsibilities (EN + AR, 3 bullets)
- [ ] Technical decisions (EN + AR, 2 bullets)
- [ ] Features (EN + AR, 3 named features)
- [ ] **Results — marked `TODO: Replace with verified, measured results`.
      Currently vague claims ("Faster first load on mobile"). Do not publish
      without either real numbers or rephrasing to remove implied metrics.**

### Project 2 — `analytics-dashboard` (id: `project-dashboard`)
- [ ] English/Arabic title, summary, description
- [ ] Category — currently "Web Application"
- [ ] Technologies — currently `React, TypeScript, Tailwind CSS, REST APIs`
- [ ] Date — currently `2025-02-15`
- [ ] Featured flag — currently `true`
- [ ] Cover image (currently shared placeholder SVG)
- [ ] Gallery screenshots (none set)
- [ ] Live URL / GitHub URL (none set)
- [ ] Challenge / Solution / Responsibilities / Technical decisions / Features (EN + AR) — all present but unconfirmed
- [ ] Results — not marked TODO in-file but still unverified generic claims; confirm or replace

### Project 3 — `bilingual-marketing-site` (id: `project-marketing`)
- [ ] English/Arabic title, summary, description
- [ ] Category — currently "Marketing Website"
- [ ] Technologies — currently `Next.js, TypeScript, Tailwind CSS`
- [ ] Date — currently `2024-11-20`
- [ ] Featured flag — currently `false`
- [ ] Cover image (currently shared placeholder SVG)
- [ ] Gallery screenshots (none set)
- [ ] Live URL / GitHub URL (none set)
- [ ] Challenge / Solution / Responsibilities / Technical decisions / Features (EN + AR) — all present but unconfirmed
- [ ] Results — unverified generic claims; confirm or replace

### Beyond the current 3
- [ ] If you have more real projects to show, add them as new entries in
      `src/data/projects.ts` following the same `Project` shape — no new
      dataset or component is needed.
- [ ] If any of the 3 above is not a real project, remove the object entirely
      rather than publishing it with fabricated details.

## 8. Project image assets

Current state: every project uses one shared branded placeholder SVG
(`public/images/projects/placeholder-cover.svg`, 1600×1000, marked
`TODO: replace with real project screenshots`). No per-project images or
galleries exist yet.

**Recommended structure once real images exist** (not created yet — see
launch checklist; do not add empty folders or fake files):

```
public/images/projects/
  commerce-storefront/
    cover.webp
    screenshot-01.webp
    screenshot-02.webp
    screenshot-03.webp
  analytics-dashboard/
    cover.webp
    ...
  bilingual-marketing-site/
    cover.webp
    ...
```

- [ ] Real cover image — `commerce-storefront`
- [ ] Real cover image — `analytics-dashboard`
- [ ] Real cover image — `bilingual-marketing-site`
- [ ] Optional gallery screenshots for any project (2–4 each recommended)
- [ ] Update each project's `coverImage`/`gallery` in `src/data/projects.ts`
      to point at the new files and set the real `width`/`height` (the
      `ImageAsset` type requires both, so `next/image` never shifts layout)

**Asset guidelines** (matches the existing `ProjectCover` component, which
already renders at a fixed `aspect-16/10` box — no code change needed if you
follow this):

| Property | Recommendation |
|---|---|
| Aspect ratio | 16:10 (matches every existing card/hero treatment) |
| Resolution | 1600×1000 minimum (matches the current placeholder's intrinsic size) |
| Format | WebP or AVIF; PNG only if the screenshot needs transparency |
| Naming | `cover.webp`, `screenshot-01.webp`, `screenshot-02.webp`, … (zero-padded, in display order) |

## 9. Certificates — `src/data/certificates.ts`

File-level TODO: *"Replace with real certificates, issuers, dates and
credential URLs. Do not publish unverified credentials."* All 3 issuers are
literally the string "Placeholder Issuer" / "جهة إصدار مؤقتة".

### Certificate 1 — `front-end-development-professional`
- [ ] Real issuer name (EN + AR) — currently "Placeholder Issuer"
- [ ] Confirm title "Front-End Development Professional" is the real program name
- [ ] Confirm issue date `2025-03-10`
- [ ] Confirm `doesNotExpire: true`, or provide a real expiry date
- [ ] Credential ID (not currently set)
- [ ] Credential URL (not currently set — do not publish a "View certificate" link with nothing to link to)
- [ ] Certificate image (not currently set)
- [ ] PDF (optional, not currently set)

### Certificate 2 — `advanced-react`
- [ ] Real issuer name (EN + AR)
- [ ] Confirm title, issue date `2024-12-05`, expiry
- [ ] Credential ID / URL / image / PDF — none currently set

### Certificate 3 — `web-accessibility`
- [ ] Real issuer name (EN + AR)
- [ ] Confirm title, issue date `2024-07-18`, expiry
- [ ] Credential ID / URL / image / PDF — none currently set

### Beyond the current 3
- [ ] Remove any of the 3 above that is not a real, verifiable credential —
      CLAUDE.md explicitly forbids publishing unverified credentials.
- [ ] Add any additional real certificates the same way.

## 10. Certificate image/document assets

No certificate images or PDFs exist yet — cards currently fall back to the
tinted brand-mark placeholder built into `CertificateCard` (this fallback is
intentional design, not a bug — it only disappears once you add a real
`image`).

**Recommended structure** (create only once real files exist):

```
public/images/certificates/
  front-end-development-professional.webp
  advanced-react.webp
  web-accessibility.webp

public/documents/certificates/        (only if you want an in-app PDF view)
  front-end-development-professional.pdf
```

| Property | Recommendation |
|---|---|
| Dimensions | Square or near-square, ≥ 600×600 (the card renders it in a fixed `h-28` band, `object-cover`) |
| Format | WebP preferred; PNG acceptable for scanned certificates |
| Naming | Match the certificate's `slug` exactly, so the data-to-file mapping stays obvious |

- [ ] Certificate image — `front-end-development-professional`
- [ ] Certificate image — `advanced-react`
- [ ] Certificate image — `web-accessibility`

## 11. Social links — `src/data/social-links.ts`

File-level TODO: *"Replace placeholder profile URLs with the real ones."*
Current URLs are bare domains, not profile links — they resolve, but go
nowhere specific to you. **Do not guess usernames; these must come from you.**

- [ ] **GitHub profile URL** — currently `https://github.com/`. Needed:
      `https://github.com/<your-real-username>`.
- [ ] **LinkedIn profile URL** — currently `https://www.linkedin.com/`.
      Needed: `https://www.linkedin.com/in/<your-real-handle>/`.
- [ ] **X (Twitter) profile** — not currently listed. Add only if you want it
      public; requires a new `SocialLink` entry with `platform: 'x'`.
- [ ] **Upwork profile** — not currently listed. Add only if relevant;
      requires a new `SocialLink` entry with `platform: 'upwork'`.
- [ ] Confirm the `handle` field on each entry (currently `@abdullah` /
      `Abdullah`) matches your real handle — it is used as visible display
      text, not just metadata.
- [ ] Email social entry already correctly derives from `personal.email` — no
      separate action needed once §1's email is confirmed.

## 12. Contact information — `src/data/site.ts`

- [ ] **Response time claim** — "Usually replies within one business day" /
      "أرد عادةً خلال يوم عمل واحد". Confirm this is realistic before
      publishing it as a commitment.
- [ ] **Availability line** — "Open to freelance projects and long-term
      collaborations" / matching Arabic. Confirm accuracy.
- [ ] `contact.email` and `contact.location` already derive from
      `personal.ts` — resolved once §1 is confirmed, no separate edit needed.

## 13. Brand & favicon assets — `public/brand/`, `src/app/icon.svg`

`public/brand/README.md` already flags itself: *"These SVGs were
reconstructed from the written logo description in CLAUDE.md... because no
approved source files were supplied."* They are legible, on-brand, and safe
to ship temporarily — but they are not your approved final logo.

- [ ] Provide final approved **`abdullah-logo-primary.svg`** (horizontal
      lockup, min. 160px) — replaces the reconstructed version
- [ ] Provide final approved **`abdullah-logo-white.svg`** (reversed, for
      dark/navy surfaces)
- [ ] Provide final approved **`abdullah-mark-orbit.svg`** (icon-only mark,
      min. 24px)
- [ ] Provide **`abdullah-logo-stacked.svg`** — named in CLAUDE.md §3 but not
      currently present at all
- [ ] Provide **`abdullah-logo-mono.svg`** — named in CLAUDE.md §3 but not
      currently present at all
- [ ] **Important:** the header/footer logo you actually see on the site is
      not read from these files — it is hand-drawn inline SVG in
      `src/components/brand/logo.tsx` (`LogoMark`). The 3 files above are
      currently unreferenced by any component. Replacing the files alone
      changes nothing visible; if you want the site to render your final
      approved artwork, `logo.tsx`'s inline paths need to be redrawn to match
      it (a small, contained change — not a rewrite of the component's
      structure or the rest of the site).
- [ ] **Favicon** — `src/app/icon.svg` is a separate hand-drawn 48×48 SVG in
      the same provisional style. Replace it once final artwork exists, or
      leave it (it already matches the header mark's design, so it is
      internally consistent even before the swap).
- [ ] Apple touch icon / web manifest are not currently implemented — optional,
      not a launch blocker for a personal portfolio (P2, see launch checklist).

## 14. Open Graph / social preview image — `public/brand/og-image.svg`, `src/lib/site-config.ts`

- [ ] `siteConfig.ogImage` currently points at a real, finished 1200×630
      branded SVG (dark navy background, orbit motif, tagline) — this is
      **presentable, not a blank placeholder**, but it is still provisional
      brand artwork per `public/brand/README.md`. Decide whether to keep it
      or commission a final version once real brand assets exist.
- [ ] If replaced, keep the same **1200×630** dimensions and the same file
      path (or update `siteConfig.ogImage` in `src/lib/site-config.ts` — one
      line, already centralized).

## 15. Environment variables — `.env.example`

No real secrets exist in the repository (confirmed — `.env.example` contains
only empty values and comments). Values to set in your actual deployment
environment (never committed):

- [ ] `NEXT_PUBLIC_SITE_URL` — must be the real production domain; currently
      falls back to `http://localhost:3000` in every environment that doesn't
      set it. Metadata, canonical URLs, Open Graph, the sitemap, robots.txt
      and JSON-LD all derive from this one value (see §20 of the Sprint 7
      report) — setting it once fixes all of them.
- [ ] `RESEND_API_KEY` — from your Resend account (see the Resend checklist
      in `docs/launch/launch-checklist.md`)
- [ ] `CONTACT_EMAIL_TO` — the inbox that should receive submissions
- [ ] `CONTACT_EMAIL_FROM` — a sender verified with Resend on a domain you
      control (never the visitor's own address — see `docs/contact/README.md`)

---

## Asset quality guidelines (summary)

| Asset | Aspect ratio | Resolution | Format |
|---|---|---|---|
| Project cover | 16:10 | 1600×1000 min | WebP/AVIF |
| Project gallery screenshot | native/whatever the UI is | ≥ 1280px wide | WebP/AVIF |
| Certificate image | square-ish | ≥ 600×600 | WebP (PNG OK for scans) |
| OG / social share image | 1200×630 exactly | 1200×630 | SVG (current) or PNG/WebP |
| Favicon (`src/app/icon.svg`) | 1:1 | any (SVG scales) | SVG |
| Logo lockups (`public/brand/`) | per CLAUDE.md §3 clear-space rules | vector | SVG |

These match what the current components already expect — none of them
require a code change to accept better assets, only real files in the same
place with the same aspect ratio.
