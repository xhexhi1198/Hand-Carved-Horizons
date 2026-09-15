import { MessageCircle, Phone } from "lucide-react";
import { Button } from "../ui/Button";
import { CONTACT_INFO } from "@/content/site";
import { MEMBERSHIP_CTA_COPY } from "@/content/memberships";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export function MembershipCTA() {
  return (
    <div className="mt-20 border-t border-hairline pt-16 text-center">
      <h3 className="font-display text-2xl sm:text-3xl">{MEMBERSHIP_CTA_COPY.title}</h3>
      <p className="mx-auto mt-4 max-w-lg text-ink-soft">{MEMBERSHIP_CTA_COPY.body}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        <Button href={buildWhatsAppHref()} external icon={<MessageCircle size={16} />}>
          {CONTACT_INFO.whatsappLabel}
        </Button>
        <Button href={CONTACT_INFO.phoneHref} variant="secondary" icon={<Phone size={14} />}>
          {CONTACT_INFO.membershipTeamLabel}
        </Button>
      </div>
    </div>
  );
}
