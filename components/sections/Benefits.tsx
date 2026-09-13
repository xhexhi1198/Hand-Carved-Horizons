import { Container } from "../ui/Container";
import { SectionReveal } from "../ui/SectionReveal";
import { StaggerGroup } from "../ui/StaggerGroup";
import { StaggerItem } from "../ui/StaggerItem";
import { PlaceholderImage } from "../ui/PlaceholderImage";
import { BENEFITS_COPY } from "@/content/home";

/** A 3x2 (2x3 tablet, 1-col mobile) grid of horizontal image + text cards. */
export function Benefits() {
  const copy = BENEFITS_COPY;

  return (
    <section className="bg-canvas py-24 sm:py-32">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-stone">{copy.eyebrow}</p>
          <h2 className="mt-4 font-display text-display leading-[0.95]">{copy.title}</h2>
          <p className="mt-4 text-ink-soft">{copy.subhead}</p>
        </SectionReveal>

        <StaggerGroup
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {copy.items.map((item) => (
            <StaggerItem
              key={item.title}
              className="group flex items-center gap-5 rounded-lg border border-hairline bg-canvas-alt p-5 transition-all duration-300 hover:border-brass hover:shadow-[0_16px_32px_-20px_rgba(51,50,44,0.35)] sm:gap-6 sm:p-6"
            >
              <PlaceholderImage
                alt={item.imageAlt}
                src={item.imageSrc}
                className="h-28 w-20 shrink-0 rounded-md sm:h-32 sm:w-24"
                imageClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="120px"
              />
              <div>
                <h3 className="font-display text-lg transition-colors duration-300 group-hover:text-brass sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
