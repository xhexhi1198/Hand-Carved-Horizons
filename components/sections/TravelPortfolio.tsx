import { Container } from "../ui/Container";
import { SectionReveal } from "../ui/SectionReveal";
import { StaggerGroup } from "../ui/StaggerGroup";
import { StaggerItem } from "../ui/StaggerItem";
import { PlaceholderImage } from "../ui/PlaceholderImage";
import { PORTFOLIO_COPY } from "@/content/home";

/**
 * The wider portfolio of partner travel brands membership unlocks access
 * to — six equal, centred cards, each on a very light wash of that brand's
 * own logo colour. A fixed-height logo area (logos kept uncropped via
 * `fit="contain"`) keeps every card's name/description aligned regardless
 * of how differently-proportioned the six logos are.
 */
export function TravelPortfolio() {
  const copy = PORTFOLIO_COPY;

  return (
    <section className="bg-canvas py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-stone">{copy.eyebrow}</p>
          <h2 className="mt-4 font-display text-display leading-[0.95]">{copy.title}</h2>
          <p className="mt-4 text-ink-soft">{copy.subhead}</p>
        </SectionReveal>

        <StaggerGroup
          className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {copy.brands.map((brand) => (
            <StaggerItem
              key={brand.name}
              className="group flex flex-col items-center rounded-2xl border border-hairline px-8 py-10 text-center shadow-[0_20px_40px_-34px_rgba(51,50,44,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-[0_28px_48px_-30px_rgba(51,50,44,0.4)] sm:px-10"
              style={{ background: brand.gradient }}
            >
              <div className="flex h-16 w-full max-w-[190px] items-center justify-center sm:h-20">
                <PlaceholderImage
                  alt={brand.imageAlt}
                  src={brand.imageSrc}
                  fit="contain"
                  className="h-full w-full"
                  imageClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="190px"
                />
              </div>
              <p className="mt-6 font-display text-2xl">{brand.name}</p>
              <p className="mx-auto mt-3 max-w-[26ch] text-sm text-ink-soft">{brand.description}</p>
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
