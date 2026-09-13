import { Container } from "../ui/Container";
import { SectionReveal } from "../ui/SectionReveal";
import { StaggerGroup } from "../ui/StaggerGroup";
import { StaggerItem } from "../ui/StaggerItem";
import { LAUNCH_COLLECTION_COPY } from "@/content/home";

/**
 * The launch-date announcement: an editorial destination index (names only,
 * no photography/cards — the site's imagery budget is spent elsewhere) plus
 * a concise, scannable First Circle advantage line.
 */
export function LaunchCollection() {
  const copy = LAUNCH_COLLECTION_COPY;

  return (
    <section className="bg-canvas py-24 sm:py-32">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-stone">{copy.eyebrow}</p>
          <h2 className="mt-4 font-display text-display leading-[0.95]">{copy.title}</h2>
          <p className="mt-4 text-ink-soft">{copy.subhead}</p>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-16 border-t border-hairline pt-14 sm:mt-20">
          {/* Dividers are a border on each item itself (not a separate flex
              child), so they're always bonded to the word before them and
              can never end up stranded alone at the start of a wrapped row —
              the last item that fits stays on its row, border and all, and
              the next row simply starts clean with a word. */}
          <StaggerGroup className="flex flex-wrap justify-center gap-y-6" stagger={0.03}>
            {copy.destinations.map((destination, index) => (
              <StaggerItem
                key={destination}
                className={`px-5 sm:px-7 ${
                  index < copy.destinations.length - 1 ? "border-r border-brass/35" : ""
                }`}
              >
                <span className="cursor-default font-display text-xl font-medium uppercase tracking-[0.04em] text-ink transition-colors duration-300 hover:text-brass sm:text-2xl">
                  {destination}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </SectionReveal>

        <SectionReveal delay={0.15} className="mt-14 border border-hairline bg-sage/20 px-6 py-8 sm:mt-16 sm:px-10 sm:py-10">
          <p className="text-xs uppercase tracking-[0.16em] text-stone">{copy.advantageLabel}</p>
          <p className="mt-4 text-ink-soft">{copy.advantagePoints.join(" · ")}</p>
        </SectionReveal>
      </Container>
    </section>
  );
}
