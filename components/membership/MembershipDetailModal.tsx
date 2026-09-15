"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";
import { MembershipPricingTable } from "./MembershipPricingTable";
import { modalBackdrop, modalPanel, modalPanelReduced } from "@/lib/motion";
import {
  MEMBERSHIP_MODAL_CTA_COPY,
  MEMBERSHIP_PRICING_NOTE,
  type MembershipTier,
} from "@/content/memberships";
import { CONTACT_INFO } from "@/content/site";
import { buildWhatsAppHref } from "@/lib/whatsapp";

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
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/40 p-4 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur-[2px] sm:p-6"
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
            className="relative w-full max-w-xl bg-canvas p-6 shadow-[0_40px_80px_-30px_rgba(51,50,44,0.45)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close membership details"
              className="absolute right-4 top-4 z-10 rounded-full border border-hairline bg-canvas p-2 text-ink-soft transition-colors hover:border-brass hover:text-brass"
            >
              <X size={16} />
            </button>

            {/* Scrolls internally on mobile (height-capped so the panel
                always fits the viewport, keeping the close button pinned
                above it); at sm+ this is inert — content simply flows,
                identical to before, since it never hits the height cap. */}
            <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain sm:max-h-none sm:overflow-visible">
              <div className="pr-10">
                <h3
                  id={`membership-modal-title-${tier.id}`}
                  className="font-display text-2xl uppercase tracking-wide sm:text-3xl"
                >
                  {tier.title}
                </h3>
                <p className="mt-2 font-display text-lg italic text-ink-soft">{tier.shortLine}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {tier.eligiblePills ? (
                  tier.eligiblePills.map((pill) => <Pill key={pill}>{pill}</Pill>)
                ) : (
                  <Pill>To be confirmed</Pill>
                )}
              </div>

              {tier.supportingCopy && <p className="mt-4 text-ink-soft">{tier.supportingCopy}</p>}

              <div className="mt-6">
                <MembershipPricingTable
                  tableLabel={tier.pricingTableLabel}
                  rows={tier.pricingRows}
                  note={MEMBERSHIP_PRICING_NOTE}
                />
              </div>

              <div className="mt-6">
                <p className="mb-3 text-xs uppercase tracking-[0.14em] text-stone">{tier.whyLabel}</p>
                <div className="divide-y divide-hairline">
                  {(tier.whyTheyChooseIt ?? ["To be confirmed"]).map((reason) => (
                    <div key={reason} className="flex items-start gap-4 py-3">
                      <span aria-hidden="true" className="mt-1 shrink-0 text-stone">
                        —
                      </span>
                      <p>{reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-hairline pt-6">
                <Button
                  href={buildWhatsAppHref(
                    MEMBERSHIP_MODAL_CTA_COPY.applyMessageTemplate.replace(
                      "{membership}",
                      tier.whatsappName
                    )
                  )}
                  external
                  icon={<MessageCircle size={16} />}
                >
                  {MEMBERSHIP_MODAL_CTA_COPY.applyLabel}
                </Button>
                <Button
                  href={buildWhatsAppHref()}
                  external
                  variant="secondary"
                  icon={<MessageCircle size={14} />}
                >
                  {CONTACT_INFO.whatsappLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
