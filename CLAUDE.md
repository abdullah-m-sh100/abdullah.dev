# CLAUDE.md

## 1. Project Overview

Build a production-ready bilingual personal portfolio website for **Abdullah — Front-End Developer (React.js & Next.js)** using **Next.js**.

The website must closely follow the provided visual identity guidelines and should feel like a polished digital product interface rather than a generic developer portfolio.

Core site goals:

- Present Abdullah professionally as a Front-End Developer.
- Explain who he is, what he offers, what he has built, and what he has achieved.
- Make projects, services, and certificates easy to scan and explore.
- Provide a reliable contact form that sends submissions to Abdullah's email.
- Support **Arabic and English**.
- Support **RTL and LTR** automatically.
- Present **one theme only** — there is deliberately no light/dark switch. See §5.
- Keep the site fast, accessible, responsive, SEO-friendly, maintainable, and scalable.

The primary brand message is:

> **Ideas into Interfaces.**

Supporting messaging may include:

- Building better web experiences.
- Clean code. Modern interfaces. Real impact.
- Fast, accessible, SEO-ready web experiences.

---

## 2. Source of Truth — Visual Identity

**`brand-guidelines-flow.md` in the repository root is the design source of truth.**
It supersedes the earlier "orbit / blue + teal" identity that previous versions
of this file described; where anything below disagrees with it, that file wins.

Do not invent a conflicting visual language.

The identity is called **Flow**. Its central idea is a single path carrying data
from the interface to the server to the database, and that path is the logo, the
background motif, and the reason the palette is warm rather than technical.

### Brand positioning

Abdullah builds modern, high-performance web interfaces for startups, e-commerce brands, and digital products, translating ideas and design systems into accessible, responsive, SEO-ready experiences.

### Brand personality

The interface should feel, in the guide's own words — عصري · دافئ · واضح · موثوق · أنيق:

- Modern
- Warm
- Clear
- Reliable
- Elegant

The reference point is a well-set magazine, not a dashboard. Avoid visual noise,
gimmicks, excessive animation, or a stereotypical “hacker/coder” aesthetic.

---

## 3. Brand Logo Rules

The logo is a thin **circle** enclosing an **S-curve that threads three nodes**.

Meaning — the three nodes are the three tiers of the stack:

- Top node — the interface (Next.js).
- Middle node — the server (Node.js / Express). Copper, and the largest.
- Bottom node — the data (MongoDB).
- The curve is the flow of data between them.

### Logo usage

```text
/public/brand/flow-logo-primary.svg    horizontal lockup, Bone ground
/public/brand/flow-logo-reversed.svg   horizontal lockup, Midnight ground
/public/brand/flow-logo-mono.svg       single colour: print, stamps, Copper ground
/public/brand/flow-mark.svg            icon only, with the circle
/public/brand/flow-mark-bare.svg       icon only, no circle — required below 32px
```

In the app, `src/components/brand/logo.tsx` draws the same geometry from design
tokens, so it inverts by ground automatically. Prefer it over an `<img>`.

### Colour by ground

- On Midnight: curve and middle node Copper `#E08A57`, outer nodes Bone.
- On Bone: curve and middle node Burnt Copper `#9A4A24`, outer nodes Midnight.
- On Copper: every element Midnight.

### Clear space

At least a quarter of the mark's width on every side.

Minimum sizes:

- Icon: 24px digital. **Below 32px use the bare mark, without the circle.**
- Horizontal lockup: 160px digital.
- Use the full lockup when the brand name is not otherwise visible.

### Never

- Rotate the logo.
- Stretch or squash the logo.
- Change the curvature of the line.
- Drop or resize a node.
- Recolor it outside the three ground rules above.
- Add glow/shadow effects to the master logo.
- Place it over a busy image without a solid colour layer beneath it.

---

## 4. Brand Color System

Use these exact values. They are defined once, in `src/styles/tokens.css`.

```css
--brand-midnight:     #0F1B2D;  /* 50% */
--brand-bone:         #F3EEE6;  /* 30% */
--brand-copper:       #E08A57;  /* 12% */
--brand-burnt-copper: #9A4A24;  /*  4% */
--brand-sage:         #9DB5A5;  /*  4% */
```

Neutrals:

```css
--brand-mist:  #A9B6C6;  /* secondary text on Midnight */
--brand-slate: #4A5A6E;  /* secondary text on Bone */
```

### Meaning

- `#0F1B2D` Midnight — the base, and the text colour on light grounds.
- `#F3EEE6` Bone — the page, and the text colour on dark grounds.
- `#E08A57` Copper — the signature accent **on dark grounds**: the mark, buttons.
- `#9A4A24` Burnt Copper — the same role **on light grounds**.
- `#9DB5A5` Sage — status and quiet details.

### The copper rule

> النحاسي هو النغمة الدافئة الوحيدة. استخدمه على عنصر بؤري واحد في كل شاشة.

Copper is the only warm tone in the system. Use it on **one focal element per
screen** — everything else stays Midnight, Bone or Sage. In practice:

- The primary CTA is copper. Decorative icon chips are **Sage**, not copper.
- `--primary` resolves to Burnt Copper on Bone and Copper on Midnight, so a
  single `Button` is correct on either ground with no variant.
- The Home hero is the one documented exception: its emphasised headline phrase
  and its primary CTA are both copper, read as a single focal cluster. The
  reasoning is written at that call site.

### Color behavior

- Midnight carries whole dark **bands** — the header, every page hero, the
  closing CTA, the footer — plus body text on Bone.
- Bone is the page surface everywhere else.
- Never use brand Copper `#E08A57` as text or a fill on a light ground: it
  reaches only ~2.3:1 there. That is what Burnt Copper exists for.
- Never use Sage `#9DB5A5` as text on a light ground either; `--secondary`
  already darkens it to `#3F6B52` for that case.
- There are no blue-to-teal gradients, and no blue or teal in the palette.

### Contrast

Every pairing is measured, and the figures are recorded at the top of
`tokens.css`. Text clears WCAG 2.2 AA (4.5:1) on all four surfaces of its
ground; control boundaries clear 1.4.11 non-text contrast (3:1), which is why
`--border-control` exists alongside `--border` and `--border-strong`.

The guide's own stated ratios are rounded slightly optimistically — trust the
measured values in `tokens.css` over the ones in the guide.

---

## 5. Theme System

**There is one theme. Do not add a light/dark switch.**

The site is Bone-on-Midnight by composition, not by preference: the guide gives
Bone the page ("الخلفية الفاتحة، الصفحات، البطاقات") and Midnight the base and
the text on light ("الأساس، النص على الفاتح"). So Midnight arrives as whole
inverted bands rather than as a second theme, and the balance the guide asks for
comes out of the layout instead of a toggle.

Concretely, that means:

- No `next-themes`, no theme provider, no `prefers-color-scheme` branch, no
  `.dark` class, no `dark:` variants, and no `suppressHydrationWarning` on
  `<html>` — nothing writes to the document before hydration any more.
- One `themeColor` in the root layout: Midnight, matching the header band.
- No theme strings in `messages/`.

### The Bone ground — the default

```css
--background: #F3EEE6;
--foreground: #0F1B2D;
--surface: #FAF7F2;
--surface-muted: #EAE2D6;
--surface-sunken: #E7DECF;
--border: #DDD2C1;
--border-control: #98856B;   /* inputs, secondary buttons: needs 3:1 */
--muted-foreground: #4A5A6E; /* Slate */
--primary: #9A4A24;          /* Burnt Copper */
--secondary: #3F6B52;        /* Sage, darkened for text */
```

### Midnight bands

Apply with `<Section tone="midnight">`, or the `.tone-midnight` class plus
`bg-background text-foreground` on an element that is its own landmark (the
header and footer do this).

```css
--background: #0F1B2D;
--foreground: #F3EEE6;
--surface: #16243A;
--surface-muted: #1C2C44;
--border: #2A3A52;
--border-control: #5F7490;
--muted-foreground: #A9B6C6; /* Mist */
--primary: #E08A57;          /* Copper */
--secondary: #9DB5A5;        /* Sage, at its brand value */
```

The scope **restates the same semantic token names** rather than adding parallel
ones. That is the whole design: every component inside a band keeps its own
classes and simply resolves to the dark set. Never build an inverted variant of
a component, and never hard-code a brand hex in a component to "fix" a band.

Two rules when editing `tokens.css`:

1. Anything added to the `:root` block must be answered in `.tone-midnight`.
2. `.tone-midnight` declares **custom properties only**. `tokens.css` is
   imported unlayered, so a real declaration there (a `background-color`, say)
   would outrank every Tailwind utility on the same element.

Which bands are Midnight: the header, every page hero, the Home closing CTA,
and the footer. Keep it to those — a Midnight band surrounded by Midnight bands
stops reading as emphasis.

---

## 6. Typography

Four faces, each with one job. All four are free from Google Fonts and loaded
through `next/font` in `src/app/fonts.ts`.

| Role | Face | Weights |
|---|---|---|
| Latin headings | **Fraunces** | 600, tracking -0.02em |
| Arabic headings | **El Messiri** | 600 / 700 |
| Body, both scripts | **Tajawal** | 400 / 500 / 700 |
| Code, technical lists, small labels | **Space Mono** | 400 / 700 |

Notes that matter when editing:

- Tajawal sets the body in **both** languages. That is deliberate — it keeps a
  bilingual paragraph from changing texture mid-sentence.
- Fraunces and El Messiri are variable; Tajawal and Space Mono are static and
  need an explicit `weight` array.
- Heading faces swap on `html[lang='ar']` in the base layer of `globals.css`.
  For display type on something that is *not* a heading element, use the
  `font-brand-display` utility, which handles the same swap. A plain
  `font-display` utility cannot: cascade layers outrank specificity, so an
  `html[lang='ar']` override in another layer would lose.
- Space Mono has no Arabic glyphs, so `.text-label` falls back to the body face
  under `html[lang='ar']`.

### Type scale

- Display: 36→72px fluid
- H1: 30→56px
- H2: 24→40px
- Body: 17px (the guide's band is 16–18px; Tajawal runs small on its em)
- Labels: 12px, uppercase, +0.14em, Space Mono
- Nothing below 11px, ever

All steps are fluid `clamp()` in the `@theme` block, and their tracking and
leading point at the rhythm tokens, so Arabic re-tunes automatically — there is
no second Arabic type scale.

Arabic takes **zero letter-spacing** at every step. Tracking a connected script
breaks the joins. Arabic body leading is 1.8, inside the guide's 1.6–1.8 band.

---

## 7. Visual Language

The website should read like a well-set magazine that happens to be a product UI.

Use:

- The flow line — one S-curve threading three nodes.
- Fine grid lines.
- Clean cards with 1.5px hairlines.
- Generous whitespace and strong alignment.
- Rounded line icons.
- Calm natural-light imagery when photography is used.

### Flow motif

`src/components/effects/flow-background.tsx`. Use it for background decoration,
section framing and motion cues.

- **At most one per viewport**, behind content. Never section-by-section.
- The travelling pulse is reserved for the Home hero and the closing CTA; pass
  `animated={false}` anywhere else.
- Its `d` attribute is duplicated by the `offset-path` on `.flow-pulse` in
  `globals.css`, because an `offset-path` cannot reference another element's
  geometry. **Change both together** or the pulse silently leaves the line.

### Shape

Per the guide:

- Cards and panels: 14–28px radii. The tokens sit inside that band —
  `sm` 12, `md` 16, `lg` 20, `xl` 28.
- Buttons: fully rounded (`rounded-pill`), minimum height 44px. Every `Button`
  size clears that, so there is no size that is not a legal touch target.
- **1.5px hairlines instead of heavy shadows** — the `border-hairline` utility.
  Shadow tokens are deliberately faint: they pin an element to the page, they
  are never what separates it from it.
- Site maximum width 1280px.

### Grid

Use an **8pt spacing system**:

```text
8, 16, 24, 32, 40, 48, 64, 80, 96, 120
```

### Icons

Lucide, via the explicit registry in `src/lib/icons.ts` — only icons listed
there are bundled. Stroke width 1.5–2px.

### Avoid

- Blue, teal, or any hue outside the five brand colours.
- Gradients as emphasis. The only gradients left are the near-subliminal page
  wash and the two soft glow layers.
- Neon/cyberpunk aesthetics, heavy 3D, excessive code symbols.
- Glassmorphism and heavy blur.
- Visual clutter, flashy or distracting animation.

---

## 8. UI Design Tokens

All tokens live in `src/styles/tokens.css` and are exposed to Tailwind through
the `@theme inline` block in `src/app/globals.css`. `inline` is required: it
keeps the variables live so they re-resolve inside a Midnight band. Resolving
them at build time would freeze every component to the Bone palette.

Components consume **semantic** tokens (`bg-surface`, `text-muted-foreground`,
`border-border`). Raw `--brand-*` values belong in `tokens.css` and in
decorative layers and scrims only.

```text
Card/panel radius: 14–28px (--radius-md 16, --radius-lg 20, --radius-xl 28)
Button radius: full (--radius-pill)
Hairline: 1.5px (--hairline)
Grid unit: 8px
Transition duration: 180–320ms
Default motion target: 240ms
Focus ring: always visible, 2px, --ring (Burnt Copper / Copper by ground)
```

### CTAs

Primary CTA:

- `--primary` fill: Burnt Copper on Bone, Copper on Midnight.
- `--primary-foreground` label: white on Bone, Midnight on Copper.
- One per screen — it is usually the screen's single copper element.

Secondary CTA:

- Transparent, 1.5px `--border-control` border, `--foreground` label.
- `--border-control` and not `--border-strong`, because here the border *is* the
  affordance and so owes 3:1 against its surface.

### Cards

- `--surface` or `--surface-elevated`, with a 1.5px `--border` hairline.
- Hierarchy comes from the hairline and the surface step, never from shadow
  alone. There is no surface gradient: Bone already gives a card a real step to
  sit on.
- `muted` stays flat by design — it recedes into the page rather than sitting
  on it.

---

## 9. Tech Stack

Use the current stable production version of Next.js with the App Router.

Required baseline:

```text
Next.js
React
TypeScript
App Router
Tailwind CSS
next-intl
Lucide React
Zod
Resend or a robust server-side email provider
```

`next-themes` was removed with the theme switch — do not reintroduce it. The
contact form is uncontrolled and reads `FormData` on submit, so React Hook Form
is not a dependency either.

Use package versions compatible with the selected Next.js release.

### Preferred architecture principles

- Server Components by default.
- Client Components only where browser interactivity is needed.
- Server Actions or Route Handlers for the contact form.
- Feature-oriented structure where useful.
- Strong TypeScript typing.
- No `any` unless there is a documented technical reason.
- No unnecessary global state library.

---

## 10. Routing Strategy

Use **Next.js App Router**.

The locale must **not** appear in the public URL.

Desired URLs:

```text
/
/about
/services
/work
/work/[slug]
/certificates
/contact
```

Do not use:

```text
/en/about
/ar/about
```

Locale preference should be stored using cookie/local preference and resolved server-side when possible.

The document direction must update automatically:

```html
<html lang="ar" dir="rtl">
<html lang="en" dir="ltr">
```

---

## 11. Main Pages

### 11.1 Home `/`

The Home page is the main overview page.

It must contain curated sections from all major site pages and should emphasize the newest or most relevant content.

Recommended order:

1. Header / Navigation
2. Hero
3. Short About preview
4. Services preview
5. Featured / Latest Work
6. Latest Certificates
7. Skills / Technology strip
8. Contact CTA
9. Footer

### Home page content behavior

- Show only selected highlights.
- Prefer latest or featured data.
- Each section must have a clear link to its full page.
- Home must not duplicate the full content of internal pages.

---

## 12. About Page `/about`

Purpose: explain who Abdullah is, his positioning, experience, working style, and core skills.

Recommended sections:

- About hero.
- Professional summary.
- Experience metrics.
- Skills and technologies.
- Professional values.
- Development workflow.
- Who Abdullah works with.
- CTA to view work or contact.

Possible metrics:

- Years of experience.
- Number of completed projects.
- Number of technologies used.
- Number of production products.

Do not display fabricated numbers. Store metrics in content files so they are easy to update.

---

## 13. Services Page `/services`

Display service cards with bilingual content.

Suggested service categories:

- Front-End Development.
- Next.js Development.
- React Application Development.
- Responsive UI Implementation.
- API Integration.
- Performance Optimization.
- Accessibility Improvements.
- SEO-focused Front-End Development.
- UI Refactoring / Modernization.

Each service should contain:

```ts
type Service = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  icon: string;
  highlights: LocalizedText[];
  featured: boolean;
  order: number;
};
```

---

## 14. Work / Portfolio Page `/work`

Purpose: showcase professional projects and case studies.

Each project should support:

- Cover image.
- Project title.
- Short summary.
- Category.
- Technologies.
- Year / date.
- Client or project type when appropriate.
- Live URL when available.
- GitHub URL when public.
- Featured flag.
- Screenshots.
- Challenge.
- Solution.
- Responsibilities.
- Result / impact.
- Bilingual content.

Project detail route:

```text
/work/[slug]
```

Suggested model:

```ts
type Project = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  technologies: string[];
  coverImage: string;
  gallery?: string[];
  date: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  challenge?: LocalizedText;
  solution?: LocalizedText;
  responsibilities?: LocalizedText[];
  results?: LocalizedText[];
};
```

Home should show the latest and/or featured projects only.

---

## 15. Certificates Page `/certificates`

Purpose: display professional certificates, courses, programs, and credentials.

Each certificate should support:

- Title.
- Issuer.
- Issue date.
- Optional expiry date.
- Credential ID.
- Credential URL.
- Certificate image.
- Optional downloadable PDF.
- Description.
- Featured state.
- Sort order.
- Bilingual text.

Suggested model:

```ts
type Certificate = {
  id: string;
  slug: string;
  title: LocalizedText;
  issuer: LocalizedText;
  description?: LocalizedText;
  issueDate: string;
  expiryDate?: string;
  doesNotExpire?: boolean;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  pdf?: string;
  featured: boolean;
  order: number;
};
```

Home should show the newest certificates and optionally featured certificates.

---

## 16. Contact Page `/contact`

The site must include a real working contact form.

Required fields:

```text
Name
Email
Subject
Message
```

Optional fields:

```text
Company
Phone
Project type
Budget range
```

Do not require optional fields.

### Contact form UX

- Fully bilingual.
- RTL/LTR aware.
- Inline validation.
- Clear field labels.
- Accessible error messages.
- Loading state.
- Success state.
- Failure state.
- Disable repeated submission while request is in progress.

### Validation

Use `zod` on the server and client.

Server validation is mandatory even when client validation exists.

Suggested rules:

- Name: 2–100 characters.
- Email: valid email.
- Subject: 3–150 characters.
- Message: 10–5000 characters.

---

## 17. Contact Email Integration

Contact submissions must be sent server-side.

Preferred implementation:

```text
Resend
```

Alternative:

```text
Nodemailer + SMTP
```

Never expose email credentials in the browser.

### Environment variables

Example:

```env
CONTACT_EMAIL_TO=your-email@example.com
CONTACT_EMAIL_FROM=Portfolio <noreply@yourdomain.com>
RESEND_API_KEY=
```

If SMTP is used:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
CONTACT_EMAIL_TO=
```

### Email message content

The email sent to Abdullah should include:

- Sender name.
- Sender email.
- Subject.
- Message.
- Optional company.
- Optional phone.
- Optional project type.
- Optional budget.
- Submission timestamp.
- Locale used when submitting.

Set `replyTo` to the visitor email when supported.

### Spam protection

Implement at least:

- Honeypot field.
- Server validation.
- Submission cooldown or rate limiting.

Optional production enhancements:

- Cloudflare Turnstile.
- Request fingerprint rate limiting.

Do not add CAPTCHAs that significantly harm UX unless abuse becomes a real problem.

---

## 18. Internationalization

Use `next-intl` or an equivalent robust solution.

Supported languages:

```text
en
ar
```

Default language may be English unless a previous user preference exists.

### Content organization

Suggested:

```text
messages/
  en.json
  ar.json
```

or split by feature:

```text
messages/
  en/
    common.json
    home.json
    about.json
    services.json
    work.json
    certificates.json
    contact.json
  ar/
    common.json
    home.json
    about.json
    services.json
    work.json
    certificates.json
    contact.json
```

Feature-split messages are preferred once content grows.

### RTL requirements

Arabic must correctly support:

- Direction.
- Text alignment.
- Icon direction where semantic direction matters.
- Breadcrumb arrows.
- Navigation layout.
- Form alignment.
- Carousel controls.
- Spacing using logical CSS properties.

Prefer logical properties:

```css
margin-inline
padding-inline
inset-inline-start
inset-inline-end
border-inline-start
```

Avoid hardcoding `left` and `right` unless unavoidable.

---

## 19. Navigation

Desktop navigation should contain:

```text
Home
About
Services
Work
Certificates
Contact
```

Header controls:

- Language switcher.
- Optional contact CTA.

There is no theme switcher. The header is a Midnight band and is solid at every
scroll position — it inverts its own text to Bone, so a transparent header would
put Bone type onto the Bone page on any route whose hero it is not covering.
Scrolling adds a hairline and a shadow, not a background.

Mobile:

- Accessible drawer/menu.
- Focus trap.
- Escape to close.
- Scroll lock while open.
- Clear active page indicator.

---

## 20. Hero Section

The hero should strongly express the identity.

Recommended structure:

- Small role/availability eyebrow.
- Large headline.
- Supporting paragraph.
- Primary CTA: View my work.
- Secondary CTA: Contact me.
- The portrait.
- The flow line, behind the composition at low opacity.

Every page hero is a Midnight band, the Home one included — see §5.

Messaging direction:

```text
Crafting modern web experiences.
Ideas into Interfaces.
React.js & Next.js interfaces built for speed, accessibility and clear business outcomes.
```

Do not make the hero look like a template.

---

## 21. Content Strategy

Keep all editable portfolio content separated from UI components.

Recommended initial approach:

```text
src/content/
  profile.ts
  services.ts
  projects.ts
  certificates.ts
  skills.ts
  social-links.ts
```

This project does not require a CMS unless explicitly requested later.

Content files should be strongly typed.

Suggested shared localized type:

```ts
export type LocalizedText = {
  en: string;
  ar: string;
};
```

Do not hardcode page content inside components when the content logically belongs to data/content files.

---

## 22. Suggested Project Structure

```text
src/
  app/
    (site)/
      page.tsx
      about/
        page.tsx
      services/
        page.tsx
      work/
        page.tsx
        [slug]/
          page.tsx
      certificates/
        page.tsx
      contact/
        page.tsx
    api/
      contact/
        route.ts
    layout.tsx
    globals.css

  components/
    brand/
      logo.tsx
      flow-decoration.tsx
    common/
      container.tsx
      section-heading.tsx
      button.tsx
      card.tsx
      badge.tsx
      empty-state.tsx
    navigation/
      header.tsx
      desktop-nav.tsx
      mobile-nav.tsx
      language-switcher.tsx
    home/
      hero.tsx
      about-preview.tsx
      services-preview.tsx
      work-preview.tsx
      certificates-preview.tsx
      contact-cta.tsx
    about/
    services/
    work/
    certificates/
    contact/
      contact-form.tsx

  content/
    profile.ts
    services.ts
    projects.ts
    certificates.ts
    skills.ts
    social-links.ts

  i18n/
    config.ts
    request.ts
    navigation.ts

  lib/
    email/
      send-contact-email.ts
    validation/
      contact.ts
    seo/
      metadata.ts
    utils/
      cn.ts
      dates.ts

  styles/
    tokens.css

  types/
    content.ts
    contact.ts

messages/
  en/
  ar/

public/
  brand/
  images/
    projects/
    certificates/
```

Adapt the structure if the repository already has a clean existing convention. Do not reorganize working code without a strong reason.

---

## 23. Component Design Rules

Create reusable primitives before duplicating styles.

Examples:

- `Container`
- `Section`
- `SectionHeading`
- `Button`
- `Card`
- `Badge`
- `IconButton`
- `EmptyState`

Feature components should compose primitives rather than recreate them.

Do not create giant components with mixed responsibilities.

Suggested maximum guideline:

- Prefer components under ~200 lines.
- Extract subcomponents when logic or visual sections become independently meaningful.

---

## 24. Animation & Motion

Motion should feel restrained and refined.

Recommended durations:

```text
180–320ms
```

Primary motion duration:

```text
240ms
```

Use:

- Fade/translate reveals.
- Soft card hover movement.
- The flow pulse — one packet travelling the line, Home hero and closing CTA only.
- Underline/link transitions.
- Subtle image scale on hover.

Do not use:

- Large springy motion everywhere.
- Long page-blocking intros.
- Excessive parallax.
- Constant looping animations.

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

## 25. Responsive Design

Design mobile-first.

Recommended breakpoints may follow Tailwind defaults unless the design needs otherwise.

The website must be verified at minimum for:

```text
360px
390px
430px
768px
1024px
1280px
1440px+
```

Requirements:

- No horizontal overflow.
- No clipped Arabic text.
- Cards stack cleanly.
- Hero remains readable.
- Navigation is usable with touch.
- Tap targets are at least ~44px where practical.

---

## 26. Accessibility

Target WCAG 2.2 AA quality.

Mandatory:

- Semantic HTML.
- Correct heading hierarchy.
- Keyboard navigation.
- Visible focus states.
- Accessible dialogs/menus.
- Proper form labels.
- Meaningful alt text.
- Skip-to-content link.
- Adequate contrast.
- `aria-live` for async form states when needed.
- Reduced motion support.

Do not use color as the only communication mechanism.

---

## 27. SEO

Every public page must have localized SEO metadata.

Use Next.js Metadata API.

Required per page:

- Localized title.
- Localized description.
- Canonical URL.
- Open Graph metadata.
- Twitter metadata.

Create dynamic metadata for project detail pages.

Include:

- `robots.txt`
- `sitemap.xml`
- favicon/app icons
- social preview image

Recommended structured data:

- `Person`
- `WebSite`
- `BreadcrumbList`
- `CreativeWork` / `SoftwareSourceCode` when appropriate for projects

Do not add fake reviews, ratings, clients, or unverifiable structured data.

---

## 28. Performance

Target excellent Core Web Vitals.

Use:

- `next/image`.
- Correct image sizes.
- Modern image formats.
- Lazy loading below the fold.
- Server Components where possible.
- Font optimization with `next/font`.
- Minimal client JavaScript.
- Code splitting.
- Avoid unnecessary animation libraries.

Do not add large dependencies for trivial effects.

Target Lighthouse quality:

```text
Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 95+
```

Treat these as targets, not fabricated guarantees.

---

## 29. Image Handling

Use optimized assets.

Recommended formats:

- SVG for logos and line illustrations.
- WebP/AVIF for project screenshots and photos.
- PNG only when transparency or source requirements make it appropriate.

Every project image should define width/height or use a controlled aspect ratio to prevent layout shift.

Suggested project cover aspect ratios:

```text
16:10
4:3
```

Keep one consistent system per context.

---

## 30. Email & Security Rules

Never expose:

- API secrets.
- SMTP credentials.
- Personal infrastructure credentials.

All contact email logic must execute server-side.

Add:

- Input length limits.
- Sanitization where appropriate.
- Rate limiting / cooldown.
- Generic user-facing error messages for server failures.
- Server-side logs without exposing sensitive content unnecessarily.

Do not accept arbitrary HTML from contact submissions.

---

## 31. Environment File

Provide `.env.example`.

Example:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_EMAIL_TO=
CONTACT_EMAIL_FROM=
RESEND_API_KEY=
```

Do not commit real secrets.

---

## 32. Error & Empty States

Every dynamic section must have a graceful empty state.

Examples:

- No projects.
- No certificates.
- Failed contact submission.

Create:

- `not-found.tsx`
- route-level `error.tsx` where useful
- loading states only when meaningful

404 page should follow the brand identity and provide a clear path home.

---

## 33. Data Sorting Rules

### Home projects

Priority:

1. Featured projects.
2. Newest date.

Show approximately 3–6 depending on layout.

### Home certificates

Priority:

1. Featured certificates.
2. Latest issue date.

Show approximately 3–4.

### Services

Sort by explicit `order` field.

Do not depend on array position when a stable sort field exists.

---

## 34. Footer

The footer is the last Midnight band on the page, which is what lets it close
the document rather than trail off: the page opens dark at the header and hero,
reads on Bone, and lands dark again here.

Footer should include:

- Compact logo/brand mark.
- Short positioning line.
- Navigation links.
- Social links.
- Email/contact shortcut.
- Copyright.
- Language switcher if useful.

Suggested tone:

```text
Ideas into Interfaces.
Building better web experiences.
```

---

## 35. Social Links

Store all social links centrally.

Possible links:

- GitHub
- LinkedIn
- Upwork
- X / Twitter
- Email

Do not render empty links.

Add appropriate `rel="noopener noreferrer"` for external links.

---

## 36. Testing

At minimum, test critical logic.

Priority tests:

- Contact validation schema.
- Contact API/server action.
- Language switching.
- Project data sorting.

Recommended tools:

- Vitest
- React Testing Library
- Playwright for important flows

Suggested Playwright flows:

1. Open Home.
2. Change language to Arabic.
3. Confirm RTL.
4. Navigate to Work.
5. Open a project.
6. Navigate to Contact.
7. Submit invalid data.
8. Submit valid data in mocked/test environment.

---

## 37. Code Quality

Use:

- ESLint.
- Prettier if configured.
- TypeScript strict mode.
- Consistent import ordering if the project already uses a convention.

Before finishing any meaningful implementation task, run:

```bash
npm run lint
npm run build
```

Also run tests if configured.

Do not claim completion while the production build fails.

---

## 38. Content Tone

The brand voice must be:

- Clear.
- Useful.
- Confident.
- Human.

Rules:

- Explain outcomes before implementation details.
- Use proof and measurable facts where available.
- Avoid exaggerated claims.
- Avoid unnecessary technical jargon for non-technical visitors.
- Use precise front-end terminology when it adds clarity.

English and Arabic should read naturally, not like literal machine translations.

---

## 39. Arabic Copy Quality

Arabic content should use professional Modern Standard Arabic with a natural tone.

Avoid awkward literal translation.

For example:

English:

```text
I build fast, accessible, and scalable web interfaces with React and Next.js.
```

Natural Arabic direction:

```text
أبني واجهات ويب سريعة، سهلة الوصول، وقابلة للتوسع باستخدام React وNext.js.
```

Do not translate technical framework names.

---

## 40. Home Page Detailed Composition

### A. Header

A Midnight band, solid at every scroll position.

- Brand mark / compact logo.
- Main navigation.
- Language switcher.
- Contact CTA on desktop when space allows.

### B. Hero

A Midnight band, continuous with the header above it.

- Availability eyebrow.
- Main headline, with its emphasised phrase in copper.
- Supporting text.
- Primary and secondary CTA.
- The portrait.
- The flow line, behind the composition at low opacity.

### C. About Preview

- 2–3 short paragraphs maximum.
- Key metrics.
- Link to About.

### D. Services Preview

- Show 3–4 key services.
- Use simple icon cards.
- Link to Services.

### E. Work Preview

- Show featured/latest projects.
- Large visual cards.
- Include technologies/tags.
- Link to full Work page.

### F. Certificates Preview

- Show newest/featured certificates.
- Include issuer and date.
- Link to Certificates.

### G. Technology Strip

Potential items:

```text
React
Next.js
TypeScript
JavaScript
Tailwind CSS
REST APIs
Git
Laravel Integration
```

Only display technologies that are true for Abdullah.

### H. Contact CTA

- Strong final invitation.
- Email shortcut.
- Link to contact form.

### I. Footer

Compact and calm.

---

## 41. Project Detail Page Composition

Recommended order:

1. Breadcrumbs.
2. Project title and summary.
3. Metadata and technologies.
4. Main cover image.
5. Project overview.
6. Challenge.
7. Solution.
8. Responsibilities.
9. Results / impact.
10. Gallery.
11. Live/GitHub links when available.
12. Next project.
13. Contact CTA.

Use dynamic metadata based on project content.

---

## 42. Certificate Card Behavior

Each certificate card may show:

- Logo or certificate preview.
- Title.
- Issuer.
- Date.
- Credential badge.
- View certificate action.

If a credential URL exists, open it safely in a new tab.

If a PDF exists, offer a clear `View certificate` or `Open PDF` action.

Do not force a download when a browser view is more useful.

---

## 43. Search / Filtering

Not required for the first version.

However, structure project and certificate data so filtering can be added later without major refactoring.

Potential future filters:

- Project category.
- Technology.
- Year.
- Certificate issuer.

Do not add unnecessary complexity in v1.

---

## 44. Analytics

Optional, not mandatory.

If analytics are added, prefer privacy-conscious options such as:

- Vercel Analytics.
- Plausible.

Do not add invasive tracking by default.

---

## 45. Deployment Readiness

The project should be deployable to a standard Next.js hosting environment.

Before deployment ensure:

- Environment variables are documented.
- Contact email works from production domain.
- Metadata uses the real production URL.
- Sitemap uses production URL.
- Open Graph image exists.
- No localhost links remain.
- Build passes.
- No TypeScript errors.
- No missing translations.

---

## 46. Acceptance Criteria

The website is considered complete only when all of the following are satisfied:

### Functional

- Home page exists.
- About page exists.
- Services page exists.
- Work page exists.
- Project detail pages work.
- Certificates page exists.
- Contact page exists.
- Contact form sends email successfully.
- Arabic works.
- English works.
- RTL works.
- LTR works.
- Language preference persists.
- There is exactly one theme, and no theme control anywhere in the UI.

### Visual

- Brand colors are used consistently, and nothing outside the five appears.
- Copper lands on one focal element per screen.
- Typography follows Fraunces + El Messiri + Tajawal + Space Mono.
- Logo rules are respected, including the bare mark below 32px.
- The flow motif is present but restrained — at most one per viewport.
- Midnight bands and Bone pages alternate as described in §5.
- The site feels like a polished product interface.
- No neon/cyberpunk aesthetic, and no blue or teal.
- Layout is responsive.

### Quality

- Accessibility baseline is strong.
- Production build succeeds.
- Lint passes.
- No console errors.
- No broken links.
- No missing images.
- No untranslated visible interface strings.
- No secrets committed.

---

## 47. Implementation Workflow for Claude Code

When asked to implement this website, follow this order unless the existing repository requires another safe sequence.

### Phase 1 — Audit

1. Inspect the existing repository.
2. Read `package.json`.
3. Inspect current routing.
4. Inspect existing styling.
5. Inspect existing i18n.
6. Inspect existing theme support.
7. Reuse good existing architecture instead of replacing it blindly.

### Phase 2 — Foundation

1. Define brand design tokens.
2. Configure fonts.
3. Configure i18n.
4. Create reusable layout primitives.
5. Create Header/Footer.

### Phase 3 — Content Layer

1. Add typed content models.
2. Add profile content.
3. Add service content.
4. Add projects.
5. Add certificates.
6. Add social links.

### Phase 4 — Pages

Implement in this order:

1. Home.
2. About.
3. Services.
4. Work listing.
5. Work detail.
6. Certificates.
7. Contact.

### Phase 5 — Contact Email

1. Add validation schema.
2. Add server-side send handler.
3. Add email provider integration.
4. Add rate limiting/honeypot.
5. Add success/error UX.

### Phase 6 — SEO & Accessibility

1. Metadata.
2. Sitemap.
3. Robots.
4. Structured data.
5. Keyboard/focus audit.
6. Contrast audit.
7. Reduced-motion audit.

### Phase 7 — Final QA

Run:

```bash
npm run lint
npm run build
```

Then verify both languages, mobile and desktop layouts, and the contact form.

---

## 48. Rules for Future Changes

When implementing future features:

1. Preserve the visual identity.
2. Preserve bilingual support.
3. Preserve RTL/LTR support.
4. Preserve the single-theme rule — do not reintroduce a light/dark switch.
5. Reuse design tokens; never hard-code a brand hex in a component.
6. Do not duplicate content unnecessarily.
7. Keep editable content separate from components.
8. Prefer Server Components.
9. Do not expose secrets.
10. Do not sacrifice accessibility for visual effects.
11. Do not introduce a new design language without explicit approval.
12. Run lint/build before declaring completion.

---

## 49. Brand Summary for Quick Reference

```text
Brand: Abdullah
Identity: Flow
Role: Front-End Developer
Specialization: React.js & Next.js
Core message: Ideas into Interfaces.

Colors:
Midnight      #0F1B2D   50%  base, text on light, dark bands
Bone          #F3EEE6   30%  the page, text on dark
Copper        #E08A57   12%  accent on dark grounds
Burnt Copper  #9A4A24    4%  accent on light grounds
Sage          #9DB5A5    4%  status and quiet details
Mist          #A9B6C6        secondary text on Midnight
Slate         #4A5A6E        secondary text on Bone

Fonts:
Latin headings   Fraunces 600, -0.02em
Arabic headings  El Messiri 600/700
Body (both)      Tajawal 400/500/700
Code and labels  Space Mono 400/700

Theme:
One theme. Bone pages, Midnight bands. No light/dark switch.

Visual traits:
Modern
Warm
Clear
Reliable
Elegant

Motifs:
One flow line: S-curve threading three nodes
Fine grid
1.5px hairlines instead of heavy shadows
Pill buttons, 44px minimum
14-28px panel radii

Avoid:
Blue and teal
Copper on more than one focal element per screen
Neon cyberpunk
Heavy 3D
Visual clutter
Over-animation
```

---

## 50. Final Product Direction

The final result should look and feel like a premium personal product website for a modern Front-End Developer — not like a prebuilt portfolio template.

The strongest visual cues should be:

- Midnight + Bone contrast, alternating as whole bands.
- A single copper focal point per screen, with Sage for the quiet details.
- Fraunces and El Messiri headings against Tajawal text.
- Geometric spacing.
- Flow-line details.
- 1.5px hairlines and pill buttons.
- Smooth restrained transitions.
- Excellent bilingual presentation.

The experience should communicate:

> **Clear engineering. Modern interfaces. Real impact.**


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
