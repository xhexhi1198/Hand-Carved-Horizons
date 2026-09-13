import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { PlaneDivider } from "@/components/ui/PlaneDivider";
import { Button } from "@/components/ui/Button";
import { CONTACT_PAGE_COPY } from "@/content/contact";
import { CONTACT_INFO } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact — Hand Carved Horizons",
  description: "Get in touch with Hand Carved Horizons to apply for membership or ask a question.",
};

export default function ContactPage() {
  const copy = CONTACT_PAGE_COPY;

  return (
    <div className="pb-24 pt-32 sm:pb-32">
      <Container className="max-w-2xl text-center">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.16em] text-stone">{copy.eyebrow}</p>
          <h1 className="mt-4 font-display text-display leading-[0.95]">{copy.title}</h1>
          <p className="mt-4 text-ink-soft">{copy.subhead}</p>
        </SectionReveal>

        <PlaneDivider className="my-14" />

        <SectionReveal className="flex flex-col items-center gap-6">
          <Button href={CONTACT_INFO.whatsappHref} external icon={<MessageCircle size={16} />}>
            {CONTACT_INFO.whatsappLabel}
          </Button>
          <a
            href={CONTACT_INFO.phoneHref}
            className="flex items-center gap-2 text-lg text-ink-soft transition-colors hover:text-brass"
          >
            <Phone size={16} /> {CONTACT_INFO.phoneDisplay}
          </a>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex items-center gap-2 text-lg text-ink-soft transition-colors hover:text-brass"
          >
            <Mail size={16} /> {CONTACT_INFO.email}
          </a>
        </SectionReveal>
      </Container>
    </div>
  );
}
