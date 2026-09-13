# Content Checklist — Hand Carved Horizons

This site was built with **real, client-approved content** where it was
provided, and **realistic placeholder content** everywhere else, so the
design could be reviewed in full before final copy and photography are
ready. This checklist tracks exactly what still needs to be replaced.

Nothing below was invented as fact — no real prices, statistics, or
destination names appear anywhere placeholder content is used.

## ✅ Already final (client-approved — no action needed)

- **Our Reason** section (`content/home.ts` → `REASON_COPY`) — the merged, image-led section replacing the former separate "Why We Exist" and "We Curate Relationships" sections
- **Membership pricing & copy** for all three tiers (`content/memberships.ts` → `MEMBERSHIP_TIERS`) — figures shown exactly as approved; fields marked "To be confirmed" are intentional, not missing work on our end. The membership section was redesigned into an interactive 3-card carousel (`components/membership/MembershipCarousel.tsx` + `MembershipCard.tsx`), with the fuller pricing rules and eligibility moved into an "Explore Membership" detail modal (`MembershipDetailModal.tsx`) — no pricing figures changed.
- **Our First Collection of Journeys** section (`content/home.ts` → `LAUNCH_COLLECTION_COPY`, rendered by `components/sections/LaunchCollection.tsx`) — launch date, destination list, and First Circle advantage points, placed right after Ways to Travel.
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
- [ ] Family — "Credits Per Added Member" figure
- [ ] Student — full eligibility list (currently "To be confirmed")
- [ ] Student — "Credits Per Added Member" figure
- [ ] Student — "Why students choose it" list (currently "To be confirmed")

### Benefits (`content/home.ts` → `BENEFITS_COPY`)
- [ ] All 6 benefit titles/descriptions
- [x] ~~Benefit photography~~ — redesigned as a 3x2 grid of image + text cards
  (`components/sections/Benefits.tsx`); real photography supplied by the
  client and wired in at `public/images/benefits/` (concierge, itineraries,
  priority-access, travel-credits, member-events, considered-details).

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

- [x] ~~Our Reason section photo~~ — the client-supplied cliffside/sunset photo
  is wired in at `public/images/reason/cliffside.png`, referenced from
  `content/home.ts` → `REASON_COPY.imageSrc`.

- [x] ~~Membership card photography~~ — real photography supplied by the
  client and wired in: `public/images/membership/family.png` (Family),
  `friends.png` (Friends Circle, mountain-ridge sunrise), `student.png`
  (Student, forest stream). Referenced from `content/memberships.ts` →
  `MEMBERSHIP_TIERS[].photography.src`.

### Logo
The emblem in `components/ui/LogoMark.tsx` is a redrawn approximation of
the reference logo. Swap it for the client's original vector file
(SVG/PNG) when available.

### Partner brand logos (`content/home.ts` → `PORTFOLIO_COPY.brands`)
The reference for the "Benefits Across Our Travel Portfolio" section showed
six colour brand logos, but only as part of a flattened screenshot — no
separate logo files were provided, and pasting that screenshot's crops in
directly would have meant copying each brand's actual mark rather than
using a supplied asset. Each brand is rendered as a plain text wordmark in
the site's own serif for now (`components/sections/TravelPortfolio.tsx`).
- [ ] Real vector logo (SVG/PNG) for each of the 6 partner brands, to
  replace the typographic wordmark once files are supplied.

### Domain
`app/sitemap.ts` and `app/robots.ts` use a placeholder domain
(`handcarvedhorizons.com`) — update once the production domain is confirmed.
