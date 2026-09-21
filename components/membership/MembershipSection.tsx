"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { SectionReveal } from "../ui/SectionReveal";
import { MembershipCarousel } from "./MembershipCarousel";
import { MembershipDetailModal } from "./MembershipDetailModal";
import { MembershipCTA } from "./MembershipCTA";
import { FirstCircleAdvantage } from "./FirstCircleAdvantage";
import { ApplicationModal } from "../application/ApplicationModal";
import { MEMBERSHIP_TIERS, MEMBERSHIP_SECTION_COPY, type MembershipTier } from "@/content/memberships";

/**
 * The single membership section rendered on both the home page and
 * /memberships — a layered carousel of the three membership circles, each
 * opening an expandable detail modal with the fuller pricing rules.
 */
export function MembershipSection() {
  const [openTierId, setOpenTierId] = useState<string | null>(null);
  const openTier = MEMBERSHIP_TIERS.find((tier) => tier.id === openTierId) ?? null;

  const [applicationTier, setApplicationTier] = useState<MembershipTier | null>(null);

  function handleApply(tier: MembershipTier) {
    // Close the detail popup and open the application flow in its place,
    // rather than stacking one modal on top of the other.
    setOpenTierId(null);
    setApplicationTier(tier);
  }

  // Force the break after "Circles." so the headline reads as two balanced
  // lines ("Three Circles." / "One Community.") instead of wrapping wherever
  // the container happens to run out of width.
  const [titleLine1, titleLine2] = MEMBERSHIP_SECTION_COPY.title.split(". ");

  return (
    <section id="memberships" className="bg-canvas py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-stone">
            {MEMBERSHIP_SECTION_COPY.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-display leading-[0.95]">
            {titleLine1}.
            <br />
            {titleLine2}
          </h2>
          <p className="mt-4 text-ink-soft">{MEMBERSHIP_SECTION_COPY.subhead}</p>
        </SectionReveal>
      </Container>

      <div className="mt-14 sm:mt-16">
        <MembershipCarousel onExplore={setOpenTierId} />
      </div>

      <Container>
        <FirstCircleAdvantage />
        <MembershipCTA />
      </Container>

      <MembershipDetailModal tier={openTier} onClose={() => setOpenTierId(null)} onApply={handleApply} />
      <ApplicationModal tier={applicationTier} onClose={() => setApplicationTier(null)} />
    </section>
  );
}
