"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { MembershipCard } from "./MembershipCard";
import { MEMBERSHIP_TIERS } from "@/content/memberships";
import { DURATION, EASE_CINEMATIC } from "@/lib/motion";
import { useIsMobile } from "@/lib/useIsMobile";

const COUNT = MEMBERSHIP_TIERS.length;

/**
 * Layered membership carousel — one card centred and in front, the other
 * two overlapping behind it on either side (no tilt: straight, vertical
 * cards throughout). Click, use the arrows, use the indicators, or swipe
 * to move between them. Card width is responsive (percentage-based); on
 * mobile the active card is narrower and the side offset is reduced (via
 * useIsMobile) so both side cards stay clearly visible and tappable beside
 * it — desktop/tablet keep their original width and offset untouched.
 */
export function MembershipCarousel({ onExplore }: { onExplore: (tierId: string) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const go = (dir: 1 | -1) => setActiveIndex((current) => (current + dir + COUNT) % COUNT);

  return (
    <div className="w-full">
      <div className="w-full overflow-x-hidden py-4">
        <div className="relative mx-auto grid w-[72%] max-w-[300px] sm:w-[85%] sm:max-w-[400px] lg:max-w-[440px]">
          {MEMBERSHIP_TIERS.map((tier, index) => {
            // Shortest signed distance around the 3-item circle: -1, 0, or 1.
            let distance = index - activeIndex;
            if (distance > COUNT / 2) distance -= COUNT;
            if (distance < -COUNT / 2) distance += COUNT;

            const isActive = distance === 0;

            return (
              <motion.div
                key={tier.id}
                className="relative col-start-1 row-start-1"
                style={{ zIndex: isActive ? 3 : 1 }}
                animate={{
                  x: shouldReduceMotion ? 0 : `${distance * (isMobile ? 44 : 68)}%`,
                  scale: isActive ? 1 : 0.94,
                  opacity: distance === 0 ? 1 : 0.87,
                }}
                transition={{ duration: DURATION.carousel, ease: EASE_CINEMATIC }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_event, info) => {
                  const threshold = 60;
                  if (info.offset.x < -threshold || info.velocity.x < -500) go(1);
                  else if (info.offset.x > threshold || info.velocity.x > 500) go(-1);
                }}
                onClick={() => !isActive && setActiveIndex(index)}
                role={isActive ? undefined : "button"}
                aria-label={isActive ? undefined : `Show ${tier.title}`}
                tabIndex={isActive ? -1 : 0}
                onKeyDown={(event) => {
                  if (isActive) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex(index);
                  }
                }}
              >
                <MembershipCard tier={tier} isActive={isActive} onExplore={() => onExplore(tier.id)} />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous membership"
          className="rounded-full border border-hairline p-2 text-ink-soft transition-colors hover:border-brass hover:text-brass"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Membership circles">
          {MEMBERSHIP_TIERS.map((tier, index) => (
            <button
              key={tier.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={tier.title}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-6 bg-ink" : "w-1.5 bg-hairline hover:bg-stone"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next membership"
          className="rounded-full border border-hairline p-2 text-ink-soft transition-colors hover:border-brass hover:text-brass"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
