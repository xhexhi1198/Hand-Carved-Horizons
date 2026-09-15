import { Calendar, ConciergeBell, Plane, Tag, Users } from "lucide-react";
import { SectionReveal } from "../ui/SectionReveal";
import { StaggerGroup } from "../ui/StaggerGroup";
import { StaggerItem } from "../ui/StaggerItem";
import { FIRST_CIRCLE_ADVANTAGE_COPY } from "@/content/memberships";

// One icon per point, in the same order as FIRST_CIRCLE_ADVANTAGE_COPY.points.
const ADVANTAGE_ICONS = [Plane, Users, Calendar, Tag, ConciergeBell];

/**
 * A dark, editorial panel closing out the membership cards — the one place
 * on the site that inverts the palette (ivory copy and brass accents on the
 * site's own ink tone) to read as a standing member privilege, not a promo
 * banner.
 */
export function FirstCircleAdvantage() {
  return (
    <SectionReveal delay={0.1} className="mt-14 sm:mt-16">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
        {/* Faint topographic watermark, top-right — an on-brand flourish that
            stays well beneath the copy in contrast. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 text-brass/[0.12] sm:h-64 sm:w-64"
        >
          <circle cx="140" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="140" cy="60" r="65" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="140" cy="60" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        <div className="relative flex items-center gap-3">
          <span className="h-px w-6 bg-brass/60" aria-hidden="true" />
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-brass sm:text-xs">
            {FIRST_CIRCLE_ADVANTAGE_COPY.label}
          </p>
        </div>

        <StaggerGroup
          className="relative mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-brass/20"
          stagger={0.06}
        >
          {FIRST_CIRCLE_ADVANTAGE_COPY.points.map((point, index) => {
            const Icon = ADVANTAGE_ICONS[index];
            return (
              <StaggerItem
                key={point}
                className="flex items-start gap-3 lg:px-6 lg:first:pl-0 lg:last:pr-0"
              >
                <Icon size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" />
                <p className="text-sm leading-snug text-canvas/90">{point}</p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </SectionReveal>
  );
}
