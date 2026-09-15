import { CONTACT_INFO } from "@/content/site";

/**
 * The single place every "Apply for Membership" / "WhatsApp Us" CTA builds
 * its link — always the company WhatsApp number (content/site.ts →
 * CONTACT_INFO.whatsappHref), with a URL-encoded pre-filled message. Defaults
 * to the site-wide generic message; pass a tier-specific one for a
 * membership card/detail-modal CTA.
 */
export function buildWhatsAppHref(message: string = CONTACT_INFO.whatsappDefaultMessage) {
  return `${CONTACT_INFO.whatsappHref}?text=${encodeURIComponent(message)}`;
}
