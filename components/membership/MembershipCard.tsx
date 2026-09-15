"use client";

import { motion } from "motion/react";
import { PlaceholderImage } from "../ui/PlaceholderImage";
import { DURATION, EASE_CINEMATIC } from "@/lib/motion";
import type { MembershipTier } from "@/content/memberships";

/**
 * A single membership invitation card — compact photography above, a
 * compact ivory information area below. The name and pricing stay legible
 * even while the card sits behind the active one; the short line, "for"
 * line, benefits and CTA reveal only once it becomes active. All three
 * tiers share this exact structure so every card renders at the same
 * height regardless of which is active — nothing shifts as the carousel turns.
 */
export function MembershipCard({
  tier,
  isActive,
  onExplore,
}: {
  tier: MembershipTier;
  isActive: boolean;
  onExplore: () => void;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-lg border border-hairline bg-canvas-alt transition-shadow duration-500 ${
        isActive
          ? "shadow-[0_24px_48px_-24px_rgba(51,50,44,0.35)]"
          : "shadow-[0_10px_22px_-14px_rgba(51,50,44,0.3)]"
      }`}
    >
      {/* ~40% of the card — photography, not the focal point. */}
      <div className="relative h-[220px] shrink-0 overflow-hidden sm:h-[250px]">
        <PlaceholderImage
          alt={tier.photography.alt}
          src={tier.photography.src}
          className="h-full w-full"
          priority={isActive}
          sizes="(min-width: 640px) 380px, 85vw"
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-ink"
          animate={{ opacity: isActive ? 0 : 0.18 }}
          transition={{ duration: DURATION.carousel, ease: EASE_CINEMATIC }}
        />
      </div>

      {/* ~60% of the card — name + pricing always visible; the rest reveals on activation. */}
      <div className="flex flex-col px-5 py-4 sm:px-7 sm:py-5">
        <h3 className="font-display text-lg leading-tight sm:text-xl">{tier.title}</h3>

        <div className="mt-3 grid grid-cols-2 gap-4 border-y border-hairline py-3">
          <div>
            <p className="font-display text-lg sm:text-xl">{tier.pricingRows[0].contribution}</p>
            <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.12em] text-stone">
              Founding Contribution
            </p>
          </div>
          <div className="border-l border-hairline pl-4">
            <p className="font-display text-lg sm:text-xl">{tier.pricingRows[0].travelCredits}</p>
            <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.12em] text-stone">
              Travel Credits
            </p>
          </div>
        </div>

        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: DURATION.carousel, ease: EASE_CINEMATIC }}
          aria-hidden={!isActive}
          style={{ pointerEvents: isActive ? "auto" : "none" }}
        >
          <p className="mt-3 font-display text-sm italic text-ink-soft sm:text-base">
            {tier.shortLine}
          </p>

          {tier.forLine && <p className="mt-2 text-xs text-ink-soft sm:text-sm">{tier.forLine}</p>}

          <ul className="mt-2 space-y-1.5 text-xs text-ink-soft sm:text-sm">
            {(tier.cardBenefits ?? ["To be confirmed"]).map((benefit) => (
              <li key={benefit} className="flex gap-2">
                <span aria-hidden="true" className="shrink-0 text-stone">
                  —
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onExplore}
            tabIndex={isActive ? 0 : -1}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.68rem] uppercase tracking-[0.14em] text-canvas transition-colors duration-300 hover:bg-ink-soft sm:text-xs"
          >
            {/* Arrow hidden on mobile only — sm+ (tablet/desktop) keeps the
                exact original "Explore X →" label untouched. */}
            {tier.ctaLabel.replace(/\s*→\s*$/, "")}
            <span className="hidden sm:inline"> →</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
