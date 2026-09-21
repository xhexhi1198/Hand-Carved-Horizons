import { CONTACT_INFO } from "@/content/site";

/**
 * The site has no backend/email API wired up yet, so this opens the user's
 * own email client with the application pre-filled (mailto:) rather than
 * faking a successful send. Swap the body of this function for a real call
 * (e.g. POST to a serverless route that sends via Resend/SendGrid) once one
 * exists — every call site already awaits it and only checks `method`, so no
 * other code needs to change.
 */
export async function sendApplicationEmail(
  subject: string,
  body: string
): Promise<{ method: "mailto" }> {
  const href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
  return { method: "mailto" };
}
