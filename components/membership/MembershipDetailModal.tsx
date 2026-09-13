"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pill } from "../ui/Pill";
import { MembershipPricingTable } from "./MembershipPricingTable";
import { modalBackdrop, modalPanel, modalPanelReduced } from "@/lib/motion";
import type { MembershipTier } from "@/content/memberships";

/**
 * The expandable detail panel opened from a card's "Explore" CTA — carries
 * the full pricing rules and eligibility that the card itself deliberately
 * leaves out, so the card can stay uncluttered.
 */
export function MembershipDetailModal({
  tier,
  onClose,
}: {
  tier: MembershipTier | null;
  onClose: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!tier) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [tier, onClose]);

  return (
    <AnimatePresence>
      {tier && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/40 p-4 py-10 backdrop-blur-[2px] sm:p-6"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={shouldReduceMotion ? modalPanelReduced : modalBackdrop}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`membership-modal-title-${tier.id}`}
            variants={shouldReduceMotion ? modalPanelReduced : modalPanel}
            className="relative w-full max-w-xl bg-canvas p-8 shadow-[0_40px_80px_-30px_rgba(51,50,44,0.45)] sm:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close membership details"
              className="absolute right-5 top-5 rounded-full border border-hairline p-2 text-ink-soft transition-colors hover:border-brass hover:text-brass"
            >
              <X size={16} />
            </button>

            <div className="pr-10">
              <h3
                id={`membership-modal-title-${tier.id}`}
                className="font-display text-2xl uppercase tracking-wide sm:text-3xl"
              >
                {tier.title}
              </h3>
              <p className="mt-2 font-display text-lg italic text-ink-soft">{tier.shortLine}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {tier.eligiblePills ? (
                tier.eligiblePills.map((pill) => <Pill key={pill}>{pill}</Pill>)
              ) : (
                <Pill>To be confirmed</Pill>
              )}
            </div>

            {tier.supportingCopy && <p className="mt-6 text-ink-soft">{tier.supportingCopy}</p>}

            <div className="mt-8">
              <MembershipPricingTable pricing={tier.pricing} />
            </div>

            <div className="mt-10">
              <p className="mb-4 text-xs uppercase tracking-[0.14em] text-stone">{tier.whyLabel}</p>
              <div className="divide-y divide-hairline">
                {(tier.whyTheyChooseIt ?? ["To be confirmed"]).map((reason) => (
                  <div key={reason} className="flex items-start gap-4 py-4">
                    <span aria-hidden="true" className="mt-1 shrink-0 text-stone">
                      —
                    </span>
                    <p>{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
