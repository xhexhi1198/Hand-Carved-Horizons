"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Mail, MessageCircle, X } from "lucide-react";
import type { MembershipTier } from "@/content/memberships";
import { APPLICANT_REQUIRED_KEYS, APPLICATION_COPY } from "@/content/application";
import { modalBackdrop, modalPanel, modalPanelReduced } from "@/lib/motion";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { buildApplicationEmailSubject, buildApplicationText, selectedPricingRow } from "@/lib/applicationMessage";
import { sendApplicationEmail } from "@/lib/applicationEmail";
import { ApplicationStepIndicator } from "./ApplicationStepIndicator";
import { StepYourDetails } from "./StepYourDetails";
import { StepMembers } from "./StepMembers";
import { StepReview } from "./StepReview";
import { TermsPanel } from "./TermsPanel";
import type { ApplicationState, FieldValues, MemberEntry } from "./types";

const STEP_COUNT = 3;

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * The multi-step "Apply for Membership" flow, opened from
 * MembershipDetailModal's Apply CTA in place of the direct WhatsApp link.
 * One tier per mount (MembershipSection remounts this fresh each time it
 * opens), so all form state naturally resets between applications.
 */
export function ApplicationModal({
  tier,
  onClose,
}: {
  tier: MembershipTier | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {tier && <ApplicationModalPanel key={tier.id} tier={tier} onClose={onClose} />}
    </AnimatePresence>
  );
}

function ApplicationModalPanel({ tier, onClose }: { tier: MembershipTier; onClose: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [step, setStep] = useState(0);
  const [familyPlanId, setFamilyPlanId] = useState<string | null>(null);
  const [applicant, setApplicant] = useState<FieldValues>({});
  const [members, setMembers] = useState<MemberEntry[]>([]);
  const [touchedApplicant, setTouchedApplicant] = useState<Record<string, boolean>>({});
  const [touchedMembers, setTouchedMembers] = useState<Record<string, Record<string, boolean>>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsPanel, setShowTermsPanel] = useState(false);
  const [confirmingClose, setConfirmingClose] = useState(false);

  const state: ApplicationState = { familyPlanId, applicant, members };

  const hasData =
    Object.values(applicant).some((value) => value.trim() !== "") ||
    members.length > 0 ||
    familyPlanId !== null;

  function requestClose() {
    if (hasData) {
      setConfirmingClose(true);
    } else {
      onClose();
    }
  }

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (showTermsPanel) {
        setShowTermsPanel(false);
        return;
      }
      requestClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTermsPanel, hasData]);

  const requiredApplicantKeys = APPLICANT_REQUIRED_KEYS[tier.id];
  const step0Valid =
    (tier.id !== "family" || !!familyPlanId) &&
    requiredApplicantKeys.every((key) => (applicant[key] ?? "").trim() !== "");
  const step1Valid = members.every((member) => (member.values.name ?? "").trim() !== "");

  function goNext() {
    setStep((current) => Math.min(current + 1, STEP_COUNT - 1));
  }
  function goBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function setApplicantField(key: string, value: string) {
    setApplicant((prev) => ({ ...prev, [key]: value }));
  }
  function touchApplicantField(key: string) {
    setTouchedApplicant((prev) => ({ ...prev, [key]: true }));
  }

  function addMember() {
    setMembers((prev) => [...prev, { id: makeId(), values: {} }]);
  }
  function removeMember(id: string) {
    setMembers((prev) => prev.filter((member) => member.id !== id));
    setTouchedMembers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }
  function setMemberField(id: string, key: string, value: string) {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, values: { ...member.values, [key]: value } } : member
      )
    );
  }
  function touchMemberField(id: string, key: string) {
    setTouchedMembers((prev) => ({ ...prev, [id]: { ...(prev[id] ?? {}), [key]: true } }));
  }

  function handleWhatsAppSubmit() {
    const message = buildApplicationText(tier, state);
    window.open(buildWhatsAppHref(message), "_blank", "noopener,noreferrer");
  }
  async function handleEmailSubmit() {
    const subject = buildApplicationEmailSubject(tier, state);
    const body = buildApplicationText(tier, state);
    await sendApplicationEmail(subject, body);
  }

  const pricing = selectedPricingRow(tier, state);
  const showPricingHeader = tier.id !== "family" || !!familyPlanId;
  const membershipTitle =
    tier.id === "family" && familyPlanId ? `${tier.title} — ${familyPlanId}` : tier.title;

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/50 backdrop-blur-[2px] sm:p-6"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={shouldReduceMotion ? modalPanelReduced : modalBackdrop}
        onClick={requestClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="application-modal-title"
          variants={shouldReduceMotion ? modalPanelReduced : modalPanel}
          className="relative flex h-[100dvh] w-full flex-col bg-canvas shadow-[0_40px_80px_-30px_rgba(51,50,44,0.45)] sm:h-auto sm:max-h-[calc(100dvh-4rem)] sm:max-w-[900px]"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={requestClose}
            aria-label="Close application"
            className="absolute right-4 top-4 z-10 rounded-full border border-hairline bg-canvas p-2 text-ink-soft transition-colors hover:border-brass hover:text-brass sm:right-6 sm:top-6"
          >
            <X size={16} />
          </button>

          {confirmingClose ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-16 text-center">
              <p className="max-w-xs font-display text-lg text-ink">
                {APPLICATION_COPY.closeConfirm.message}
              </p>
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setConfirmingClose(false)}
                  className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.14em] text-canvas transition-colors duration-300 hover:bg-ink-soft"
                >
                  {APPLICATION_COPY.closeConfirm.keepEditing}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="border-b border-ink-soft pb-1 text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors duration-300 hover:border-brass hover:text-brass"
                >
                  {APPLICATION_COPY.closeConfirm.discard}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="shrink-0 border-b border-hairline px-6 pt-6 sm:px-10 sm:pt-8">
                <p className="pr-10 text-center text-xs uppercase tracking-[0.16em] text-stone">
                  {APPLICATION_COPY.eyebrow}
                </p>
                <h2
                  id="application-modal-title"
                  className="mt-2 text-center font-display text-2xl sm:text-3xl"
                >
                  {membershipTitle}
                </h2>
                {showPricingHeader && (
                  <p className="mt-1 text-center text-sm text-ink-soft">
                    {pricing.contribution} Contribution · {pricing.travelCredits} Travel Credits
                  </p>
                )}

                <div className="mt-6 pb-6 sm:pb-8">
                  <ApplicationStepIndicator current={step} labels={APPLICATION_COPY.steps} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-10 sm:py-8">
                {step === 0 && (
                  <StepYourDetails
                    tier={tier}
                    familyPlanId={familyPlanId}
                    onSelectFamilyPlan={setFamilyPlanId}
                    applicant={applicant}
                    touched={touchedApplicant}
                    onChange={setApplicantField}
                    onBlur={touchApplicantField}
                  />
                )}
                {step === 1 && (
                  <StepMembers
                    tier={tier}
                    members={members}
                    touched={touchedMembers}
                    onAdd={addMember}
                    onRemove={removeMember}
                    onChange={setMemberField}
                    onBlur={touchMemberField}
                  />
                )}
                {step === 2 && (
                  <StepReview
                    tier={tier}
                    state={state}
                    onEditStep={setStep}
                    termsAccepted={termsAccepted}
                    onToggleTerms={setTermsAccepted}
                    onOpenTermsPanel={() => setShowTermsPanel(true)}
                  />
                )}
              </div>

              <div className="shrink-0 border-t border-hairline px-6 py-4 sm:px-10 sm:py-6">
                <div className="flex items-center justify-between gap-4">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className="text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors duration-300 hover:text-brass"
                    >
                      {APPLICATION_COPY.nav.back}
                    </button>
                  ) : (
                    <span aria-hidden="true" />
                  )}

                  {step < STEP_COUNT - 1 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={step === 0 ? !step0Valid : !step1Valid}
                      className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-xs uppercase tracking-[0.14em] text-canvas transition-colors duration-300 hover:bg-ink-soft disabled:cursor-not-allowed disabled:bg-stone/40 sm:px-8 sm:py-4"
                    >
                      {APPLICATION_COPY.nav.next}
                    </button>
                  ) : (
                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        disabled={!termsAccepted}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-xs uppercase tracking-[0.14em] text-canvas transition-colors duration-300 hover:bg-ink-soft disabled:cursor-not-allowed disabled:bg-stone/40 sm:px-8 sm:py-4"
                      >
                        <MessageCircle size={16} aria-hidden="true" />
                        {APPLICATION_COPY.submit.whatsappLabel}
                      </button>
                      <button
                        type="button"
                        onClick={handleEmailSubmit}
                        disabled={!termsAccepted}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-ink px-7 py-3.5 text-xs uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-brass hover:text-brass disabled:cursor-not-allowed disabled:border-hairline disabled:text-stone/60 sm:px-8 sm:py-4"
                      >
                        <Mail size={16} aria-hidden="true" />
                        {APPLICATION_COPY.submit.emailLabel}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>

      <TermsPanel open={showTermsPanel} onClose={() => setShowTermsPanel(false)} />
    </>
  );
}
