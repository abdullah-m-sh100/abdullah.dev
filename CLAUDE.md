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
- Support **Light Mode and Dark Mode**.
- Keep the site fast, accessible, responsive, SEO-friendly, maintainable, and scalable.

The primary brand message is:

> **Ideas into Interfaces.**

Supporting messaging may include:

- Building better web experiences.
- Clean code. Modern interfaces. Real impact.
- Fast, accessible, SEO-ready web experiences.

---

## 2. Source of Truth — Visual Identity

The uploaded brand identity PDF is the design source of truth.

Do not invent a conflicting visual language.

### Brand positioning

Abdullah builds modern, high-performance web interfaces for startups, e-commerce brands, and digital products, translating ideas and design systems into accessible, responsive, SEO-ready experiences.

### Brand personality

The interface should feel:

- Clear
- Modern
- Reliable
- Precise
- Progressive
- Calm
- Human
- Professional

Avoid visual noise, gimmicks, excessive animation, or a stereotypical “hacker/coder” aesthetic.

---

## 3. Brand Logo Rules

The logo is a geometric **A** surrounded by a Saturn-inspired orbit.

Meaning:

- `A` represents Abdullah and architecture.
- Orbit represents the web ecosystem, movement, iteration, and connected experiences.
- Orbital dot represents a digital node: users, data, and interaction.

### Logo usage

Use the existing approved logo assets only.

Recommended asset names:

```text
/public/brand/abdullah-logo-primary.svg
/public/brand/abdullah-logo-stacked.svg
/public/brand/abdullah-mark-orbit.svg
/public/brand/abdullah-logo-white.svg
/public/brand/abdullah-logo-mono.svg
```

### Clear space

Maintain generous spacing around the logo.

Minimum guidelines:

- Icon: minimum 24px digital.
- Horizontal lockup: minimum 160px digital.
- Use the full lockup when the brand name is not otherwise visible.

### Never

- Rotate the logo.
- Stretch or squash the logo.
- Recolor it with unrelated colors.
- Remove the orbital dot.
- Add glow/shadow effects to the master logo.
- Place the logo over visually busy low-contrast backgrounds.

---

## 4. Brand Color System

Use the following exact brand colors.

```css
--brand-navy: #0F172A;
--brand-blue: #3B82F6;
--brand-teal: #14B8A6;
--brand-gray: #E5E7EB;
--brand-off-white: #F8FAFC;
```

### Meaning

- `#0F172A` Deep Navy — trust, focus, premium.
- `#3B82F6` Blue — technology, progress.
- `#14B8A6` Teal — creativity, motion.
- `#E5E7EB` Soft Gray — structure, UI surfaces.
- `#F8FAFC` Off White — space, clarity.

### Recommended light-theme visual balance

- 55% Off White
- 25% Deep Navy
- 12% Blue
- 8% Teal

### Color behavior

- Deep Navy is suitable for hero sections, navigation, dark surfaces, and high-emphasis text.
- Off White is the default reading surface in light mode.
- Blue is the primary interaction color.
- Teal is the secondary accent.
- Blue-to-Teal gradients must be subtle and used only for emphasis.
- Avoid using Blue or Teal for small body text on light backgrounds when contrast becomes weak.

---

## 5. Theme System

The website must support:

- Light theme
- Dark theme
- System theme

Use `next-themes` or an equally robust client-safe approach.

The theme switch must:

- Work without visible flicker.
- Persist user preference.
- Respect the system preference when no explicit choice exists.
- Use proper ARIA labels.
- Be keyboard accessible.

### Light theme

Recommended base tokens:

```css
--background: #F8FAFC;
--foreground: #0F172A;
--surface: #FFFFFF;
--surface-muted: #F1F5F9;
--border: #E5E7EB;
--primary: #3B82F6;
--secondary: #14B8A6;
```

### Dark theme

Create a dark palette derived from the brand, not a random black theme.

Suggested baseline:

```css
--background: #07101F;
--foreground: #F8FAFC;
--surface: #0F172A;
--surface-muted: #162033;
--border: #263348;
--primary: #3B82F6;
--secondary: #14B8A6;
```

Dark mode should preserve clear contrast and premium calmness.

---

## 6. Typography

### English / Latin

Primary font:

```text
Inter
```

Recommended weights:

- Headings: 700–800
- Subheadings: 600
- Body: 400–500
- Labels: 600

### Arabic

Primary Arabic font:

```text
Noto Sans Arabic
```

Use `next/font` whenever possible.

### Suggested type scale

- Display: 64–72px desktop
- H1: 48–56px desktop
- H2: 32–40px
- Body: 16–18px
- Caption: 12–14px

Use fluid responsive typography with `clamp()` where practical.

Do not blindly mirror English font sizes for Arabic. Tune line height and spacing for Arabic readability.

---

## 7. Visual Language

The website must feel like a polished product UI.

Use:

- Partial orbit curves.
- Fine grid lines.
- Soft gradients.
- Clean cards.
- Subtle code-inspired micro-details.
- Strong alignment.
- Generous whitespace.
- Rounded line icons.
- Calm natural-light imagery when photography is used.

### Orbit motif

Use partial elliptical strokes as:

- Section dividers.
- Background decoration.
- Motion cues.
- Hover details.

Never overuse the motif.

### Grid

Use an **8pt spacing system**.

Spacing values should mostly follow:

```text
8, 16, 24, 32, 40, 48, 64, 80, 96, 120
```

### Icons

Use a consistent rounded line icon family such as Lucide.

Recommended stroke width:

```text
1.5–2px
```

### Avoid

- Neon cyberpunk aesthetics.
- Heavy 3D scenes.
- Excessive code symbols.
- Overuse of glassmorphism.
- Excessive blur.
- Too many gradients.
- Visual clutter.
- Flashy or distracting animations.

---

## 8. UI Design Tokens

Use reusable CSS/theme tokens.

Recommended defaults:

```text
Primary card radius: 14–20px
General radius token: 18px
Grid unit: 8px
Transition duration: 180–320ms
Default motion target: 240ms
Focus ring: always visible for keyboard users
```

### CTAs

Primary CTA:

- Blue fill.
- White text.
- Clear hover and focus state.

Secondary CTA:

- Transparent background.
- Navy or theme-aware border.
- High contrast.

### Cards

Light theme:

- White or Off White.
- Subtle Soft Gray border.

Dark theme:

- Deep Navy derived surface.
- Slightly lighter border.

Cards should not rely on shadows alone to create hierarchy.

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
next-themes
Lucide React
Zod
React Hook Form
Resend or a robust server-side email provider
```

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
- Theme switcher.
- Optional contact CTA.

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
- Optional compact code-inspired card.
- Orbit artwork / partial ellipse.

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
      orbit-decoration.tsx
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
      theme-switcher.tsx
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
- Orbit line motion.
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
- Theme switching persistence.
- Project data sorting.

Recommended tools:

- Vitest
- React Testing Library
- Playwright for important flows

Suggested Playwright flows:

1. Open Home.
2. Change language to Arabic.
3. Confirm RTL.
4. Change theme.
5. Navigate to Work.
6. Open a project.
7. Navigate to Contact.
8. Submit invalid data.
9. Submit valid data in mocked/test environment.

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

- Brand mark / compact logo.
- Main navigation.
- Language switcher.
- Theme switcher.
- Contact CTA on desktop when space allows.

### B. Hero

- Role eyebrow.
- Main headline.
- Supporting text.
- Primary and secondary CTA.
- Visual orbit element.
- Optional code card.

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
- Light theme works.
- Dark theme works.
- Theme preference persists.
- Language preference persists.

### Visual

- Brand colors are used consistently.
- Typography follows Inter + Noto Sans Arabic.
- Logo rules are respected.
- Orbit motif is present but restrained.
- The site feels like a polished product interface.
- No neon/cyberpunk aesthetic.
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
3. Configure theme.
4. Configure i18n.
5. Create reusable layout primitives.
6. Create Header/Footer.

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

Then verify both languages, both themes, mobile and desktop layouts, and the contact form.

---

## 48. Rules for Future Changes

When implementing future features:

1. Preserve the visual identity.
2. Preserve bilingual support.
3. Preserve RTL/LTR support.
4. Preserve dark/light support.
5. Reuse design tokens.
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
Role: Front-End Developer
Specialization: React.js & Next.js
Core message: Ideas into Interfaces.

Colors:
Navy     #0F172A
Blue     #3B82F6
Teal     #14B8A6
Gray     #E5E7EB
OffWhite #F8FAFC

English font: Inter
Arabic font: Noto Sans Arabic

Visual traits:
Clear
Modern
Reliable
Precise
Progressive
Calm
Product-focused

Motifs:
Orbit curves
Fine grid
Soft blue→teal gradient
Rounded cards
Clean line icons
Intentional whitespace

Avoid:
Neon cyberpunk
Heavy 3D
Visual clutter
Excessive code symbols
Over-animation
```

---

## 50. Final Product Direction

The final result should look and feel like a premium personal product website for a modern Front-End Developer — not like a prebuilt portfolio template.

The strongest visual cues should be:

- Deep Navy + Off White contrast.
- Blue and Teal accents.
- Geometric spacing.
- Orbit-inspired details.
- Strong typography.
- Refined cards.
- Smooth restrained transitions.
- Excellent bilingual presentation.

The experience should communicate:

> **Clear engineering. Modern interfaces. Real impact.**


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
