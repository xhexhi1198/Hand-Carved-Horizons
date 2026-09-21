# Content Checklist — Hand Carved Horizons

This site was built with **real, client-approved content** where it was
provided, and **realistic placeholder content** everywhere else, so the
design could be reviewed in full before final copy and photography are
ready. This checklist tracks exactly what still needs to be replaced.

Nothing below was invented as fact — no real prices, statistics, or
destination names appear anywhere placeholder content is used.

## ✅ Already final (client-approved — no action needed)

- **Our Reason** section (`content/home.ts` → `REASON_COPY`) — the merged, image-led section replacing the former separate "Why We Exist" and "We Curate Relationships" sections
- **Membership pricing & copy** for all three tiers (`content/memberships.ts` → `MEMBERSHIP_TIERS`) — figures shown exactly as approved; fields marked "To be confirmed" are intentional, not missing work on our end. The membership section was redesigned into an interactive 3-card carousel (`components/membership/MembershipCarousel.tsx` + `MembershipCard.tsx`), with the fuller pricing rules and eligibility moved into an "Explore Membership" detail modal (`MembershipDetailModal.tsx`). Pricing was later replaced end-to-end with the client's official membership-options table: each tier now carries a `pricingRows` table (`MembershipPricingTable.tsx`) instead of a single founding-contribution/travel-credits pair — Student and Friends Circle show a base tier, an additional-member rate, and a maximum group size; Family now offers three plans (Essential/Preferred/Signature) instead of one price point. A shared redemption note (`MEMBERSHIP_PRICING_NOTE`) appears under every tier's table.
- **First Circle Advantage panel** (`content/memberships.ts` → `FIRST_CIRCLE_ADVANTAGE_COPY`, rendered by `components/membership/FirstCircleAdvantage.tsx`) — the dark, brass-accented panel directly below the membership cards. Previously lived at the end of "Our First Collection of Journeys"; moved here per client request, not duplicated.
- **Our First Collection of Journeys** section (`content/home.ts` → `LAUNCH_COLLECTION_COPY`, rendered by `components/sections/LaunchCollection.tsx`) — launch date and destination list, placed right after Ways to Travel. The "First Circle Advantage" line was removed from this section by client request.
- **Benefits Across Our Travel Portfolio** section (`content/home.ts` → `PORTFOLIO_COPY`, rendered by `components/sections/TravelPortfolio.tsx`) — the six partner-brand names, descriptions, and privileges strip. See below re: logo files.

## ⏳ Placeholder — needs real content before launch

### Site-wide (`content/site.ts`)
- [x] ~~Concierge phone number (display + `tel:` link)~~ — `+91 70747 12345`
- [x] ~~Concierge email address~~ — `members@handcarvedhorizons.com`
- [x] ~~WhatsApp number (`wa.me` link)~~ — same as the concierge phone, `+91 70747 12345`

### Hero (`content/home.ts` → `HERO_COPY`)
- [ ] Eyebrow label
- [ ] Headline (3 lines)
- [ ] Subheadline
- [x] ~~Hero photography~~ — using a licensed stock video for now (`public/video/hero.mp4`, sourced from Pexels). Swap for the client's own footage/photography when ready by replacing that file (or editing `components/sections/Hero.tsx` to point elsewhere).

### Membership section (`content/memberships.ts`)
- [x] ~~Family — "Credits Per Added Member" figure~~ — superseded: Family is now a flat 3-plan structure (Essential/Preferred/Signature), so a per-added-member rate no longer applies.
- [ ] Student — full eligibility list (currently "To be confirmed")
- [x] ~~Student — "Credits Per Added Member" figure~~ — now given as the "Additional Student" row (₹50,000 contribution / ₹60,000 travel credits).
- [ ] Student — "Why students choose it" list (currently "To be confirmed")

### Benefits (`content/home.ts` → `BENEFITS_COPY`)
- [ ] All 6 benefit titles/descriptions
- [x] ~~Benefit imagery~~ — redesigned as a 3x2 grid of image + text cards
  (`components/sections/Benefits.tsx`); each card now shows a client-supplied
  line illustration (not photography), wired in at
  `public/images/benefits/illustrations/` (concierge, itineraries,
  priority-access, travel-credits, member-events, considered-details),
  rendered uncropped via `PlaceholderImage`'s `fit="contain"`. The earlier
  photographic set at `public/images/benefits/` is no longer referenced and
  was left on disk in case it's needed again.

### Experience Types (`content/experiences.ts` → `EXPERIENCE_TYPES_COPY`)
- [ ] All 5 experience type titles/descriptions
- [x] ~~Experience photography (one per card)~~ — client-supplied photos wired in
  at `public/images/experiences/` (one per card, matched by subject to its title).

### Contact (`content/contact.ts`)
- [ ] General CTA copy (`CONTACT_CTA_COPY`)
- [ ] Contact page copy (`CONTACT_PAGE_COPY`)

### Imagery — every page
Every image on the site goes through `components/ui/PlaceholderImage.tsx`.
To swap in real photography, pass a `src` prop where the component is used —
no layout changes are needed. Search the codebase for `<PlaceholderImage`
to find every location.

- [x] ~~Our Reason section photo~~ — the client-supplied harbor-bay photo is
  wired in at `public/images/reason/harbor-bay.png`, referenced from
  `content/home.ts` → `REASON_COPY.imageSrc`. (The earlier cliffside photo at
  `public/images/reason/cliffside.png` is no longer referenced and was left
  on disk.)

- [x] ~~Membership card photography~~ — real photography supplied by the
  client and wired in: `public/images/membership/family.png` (Family,
  poolside forest resort), `friends.png` (Friends Circle, kayaking among
  limestone karst islands), `student.png`
  (Student, forest stream). Referenced from `content/memberships.ts` →
  `MEMBERSHIP_TIERS[].photography.src`.

### Logo
- [x] ~~Emblem~~ — replaced the redrawn SVG approximation with the client's
  actual logo file, wired in at `public/images/brand/logo.png` (used by
  `components/ui/LogoMark.tsx`, which the footer lockup renders through) and
  as the browser tab icon (`app/icon.png`).

- [x] ~~Header emblem — light/dark variants~~ — the client later supplied
  separate white and dark transparent PNGs specifically for the header
  (`public/images/brand/logo-white.png`, `logo-dark.png`). The header now
  renders both directly over the hero with no backing patch, crossfading
  between them via `components/layout/HeaderLogo.tsx` as the bar switches
  from transparent (white logo) to its solid scrolled state (dark logo).
  The footer still uses the original fixed-tone `logo.png` via
  `LogoMark.tsx`, unaffected by this change.

- [x] ~~Partner brand logos~~ — the client supplied the six individual
  transparent logo files; wired in at `public/images/portfolio/` and
  referenced from `content/home.ts` → `PORTFOLIO_COPY.brands[].imageSrc`.
  The section was redesigned into a 6-card grid, one per brand, each on a
  very light wash of that brand's own logo colour
  (`components/sections/TravelPortfolio.tsx`).

### Membership application flow (`content/application.ts`)
Clicking "Apply for Membership" inside a membership detail modal now opens a
multi-step application form (`components/application/`) instead of going
straight to WhatsApp — Your Details → Members → Review, submitted via
"Send via WhatsApp" or "Send via Email". The membership-specific field sets,
per-tier additional-member pricing, and step copy are all data-driven from
this file.

- [ ] `MEMBERSHIP_TERMS_COPY` — **draft placeholder terms, not legal-approved
  copy.** Generic membership-application boilerplate (eligibility review,
  contribution/credits, adding members, cancellations) written so the "View
  Membership Terms & Conditions" panel in the review step has real content to
  show, not a Lorem-ipsum stand-in. Replace with the client's actual approved
  terms before launch.
- [ ] Email submission has no backend/API — "Send via Email" opens the
  applicant's own email client via a `mailto:` link
  (`lib/applicationEmail.ts` → `sendApplicationEmail`), pre-filled with the
  same structured summary sent over WhatsApp. That function is the one place
  to swap in a real email/API integration later; every call site already
  awaits it.

### Domain
`app/sitemap.ts` and `app/robots.ts` use a placeholder domain
(`handcarvedhorizons.com`) — update once the production domain is confirmed.
