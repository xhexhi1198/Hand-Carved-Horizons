import { Container } from "../ui/Container";
import { SectionReveal } from "../ui/SectionReveal";
import { Button } from "../ui/Button";
import { CONTACT_CTA_COPY } from "@/content/contact";
import { CONTACT_INFO } from "@/content/site";

export function ContactCTA() {
  const copy = CONTACT_CTA_COPY;

  return (
    <section className="bg-ink py-24 text-canvas sm:py-32">
      <Container className="text-center">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.16em] text-canvas/70">{copy.eyebrow}</p>
          <h2 className="mt-4 font-display text-display leading-[0.95]">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-canvas/85">{copy.subhead}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Button
              href={`mailto:${CONTACT_INFO.email}`}
              className="!bg-canvas !text-ink hover:!bg-canvas/90"
            >
              {copy.applyLabel}
            </Button>
            <Button
              href={CONTACT_INFO.phoneHref}
              variant="secondary"
              className="!border-canvas !text-canvas hover:!border-brass hover:!text-brass"
            >
              {CONTACT_INFO.phoneDisplay}
            </Button>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
