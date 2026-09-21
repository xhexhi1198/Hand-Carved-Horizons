"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { modalBackdrop, modalPanel, modalPanelReduced } from "@/lib/motion";
import { MEMBERSHIP_TERMS_COPY } from "@/content/application";

/** Opened from the review step's "Membership Terms & Conditions" link — layers above the application modal without leaving it. */
export function TermsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-[2px] sm:p-6"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={shouldReduceMotion ? modalPanelReduced : modalBackdrop}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-panel-title"
            variants={shouldReduceMotion ? modalPanelReduced : modalPanel}
            className="relative max-h-[calc(100dvh-4rem)] w-full max-w-lg overflow-y-auto bg-canvas p-6 shadow-[0_40px_80px_-30px_rgba(51,50,44,0.45)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close terms"
              className="absolute right-4 top-4 rounded-full border border-hairline bg-canvas p-2 text-ink-soft transition-colors hover:border-brass hover:text-brass"
            >
              <X size={16} />
            </button>

            <h3 id="terms-panel-title" className="pr-10 font-display text-xl uppercase tracking-wide">
              {MEMBERSHIP_TERMS_COPY.title}
            </h3>
            <p className="mt-2 text-xs italic text-stone">{MEMBERSHIP_TERMS_COPY.note}</p>

            <div className="mt-6 space-y-5">
              {MEMBERSHIP_TERMS_COPY.sections.map((section) => (
                <div key={section.heading}>
                  <p className="text-xs uppercase tracking-[0.12em] text-stone">{section.heading}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{section.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
