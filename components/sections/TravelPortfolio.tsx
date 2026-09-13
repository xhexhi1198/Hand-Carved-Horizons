import { Container } from "../ui/Container";
import { SectionReveal } from "../ui/SectionReveal";
import { StaggerGroup } from "../ui/StaggerGroup";
import { StaggerItem } from "../ui/StaggerItem";
import { PORTFOLIO_COPY } from "@/content/home";

/**
 * The wider portfolio of partner travel brands membership unlocks access
 * to — presented as one editorial index in the site's own type system
 * (a typographic wordmark per brand) rather than a wall of external logos,
 * so it reads as part of Hand Carved Horizons rather than a page of ads.
 */
export function TravelPortfolio() {
  const copy = PORTFOLIO_COPY;

  return (
    <section className="bg-canvas py-24 sm:py-32">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-stone">{copy.eyebrow}</p>
          <h2 className="mt-4 font-display text-display leading-[0.95]">{copy.title}</h2>
          <p className="mt-4 text-ink-soft">{copy.subhead}</p>
        </SectionReveal>

        <StaggerGroup
          className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 sm:mt-20 lg:grid-cols-3"
          stagger={0.08}
        >
          {copy.brands.map((brand) => (
            <StaggerItem key={brand.name} className="border-t border-hairline pt-6">
              <p className="font-display text-2xl">{brand.name}</p>
              <p className="mt-3 text-sm text-ink-soft">{brand.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <SectionReveal delay={0.1} className="mt-16 border-t border-hairline pt-8 text-center sm:mt-20">
          <p className="text-xs uppercase tracking-[0.16em] text-stone">{copy.privilegesLabel}</p>
          <p className="mt-3 text-ink-soft">{copy.privileges.join(" · ")}</p>
        </SectionReveal>
      </Container>
    </section>
  );
}
