import { Container } from "../ui/Container";
import { SectionReveal } from "../ui/SectionReveal";
import { StaggerGroup } from "../ui/StaggerGroup";
import { StaggerItem } from "../ui/StaggerItem";
import { PlaceholderImage } from "../ui/PlaceholderImage";
import { EXPERIENCE_TYPES_COPY } from "@/content/experiences";

export function ExperienceTypes() {
  const copy = EXPERIENCE_TYPES_COPY;

  return (
    <section className="bg-canvas py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-stone">{copy.eyebrow}</p>
          <h2 className="mt-4 font-display text-display leading-[0.95]">{copy.title}</h2>
          <p className="mt-4 text-ink-soft">{copy.subhead}</p>
        </SectionReveal>

        <StaggerGroup
          className="snap-row mt-16 flex gap-6 overflow-x-auto pb-2"
          stagger={0.1}
        >
          {copy.items.map((item) => (
            <StaggerItem
              key={item.title}
              className="group w-[72%] shrink-0 sm:w-[42%] lg:w-[300px]"
            >
              <div className="overflow-hidden">
                <PlaceholderImage
                  alt={item.imageAlt}
                  src={item.imageSrc}
                  aspectRatio="4 / 5"
                  className="transition-transform duration-700 ease-out group-hover:scale-105 group-focus-within:scale-105"
                />
              </div>
              <div className="pt-4">
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
