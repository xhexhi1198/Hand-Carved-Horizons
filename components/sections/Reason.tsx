"use client";

import { useRef } from "react";
import { Camera, HeartHandshake, UsersRound } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container } from "../ui/Container";
import { SectionReveal } from "../ui/SectionReveal";
import { PlaceholderImage } from "../ui/PlaceholderImage";
import { REASON_COPY } from "@/content/home";

// One thin line icon per closing idea, in the same order as REASON_COPY.closingIdeas.
const CLOSING_IDEA_ICONS = [UsersRound, Camera, HeartHandshake];

/**
 * One merged, image-led emotional section — replaces the former
 * "Why We Exist" list section and "We Curate Relationships" philosophy
 * section. Sequence: distance → togetherness → memory. Minimal copy. At the
 * `lg` breakpoint the image sits in the same grid row as the text column and
 * is stretched (no fixed aspect ratio) to match that column's height exactly,
 * so the two sit as a balanced pair — below `lg` the columns stack, so the
 * image falls back to a fixed aspect ratio instead.
 */
export function Reason() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [50, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1.1, 1]);

  return (
    <section id="philosophy" className="overflow-hidden bg-canvas py-28 sm:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionReveal>
              <p className="text-xs uppercase tracking-[0.2em] text-stone">{REASON_COPY.eyebrow}</p>
              <h2 className="mt-6 font-display text-display leading-[0.95]">
                {REASON_COPY.headlineLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mt-8 max-w-sm text-ink-soft">{REASON_COPY.supportingCopy}</p>
            </SectionReveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {/* No `h-full` below `lg`: the grid is single-column there, so
                there's no stretched row height to inherit — the image falls
                back to `aspectRatio` instead. At `lg`+, the grid row height
                is set by the text column, and `lg:h-full` (down the whole
                chain, ending in `lg:aspect-auto` to drop the fixed ratio)
                stretches the image to match it exactly. */}
            <SectionReveal delay={0.1} className="lg:h-full">
              <div ref={imageWrapRef} className="overflow-hidden rounded-lg lg:h-full">
                <motion.div style={{ y: imageY, scale: imageScale }} className="lg:h-full">
                  <PlaceholderImage
                    alt={REASON_COPY.imageAlt}
                    src={REASON_COPY.imageSrc}
                    className="aspect-[4/5] w-full lg:aspect-auto lg:h-full"
                    objectPosition="25% 45%"
                  />
                </motion.div>
              </div>
            </SectionReveal>
          </div>
        </div>

        {/* One compact, icon-led editorial strip: the closing statement,
            then the three ideas it rests on. No cards, no numbers — the
            icons carry the visual weight, kept tight to feel like one
            composition rather than three spaced-out blocks. */}
        <div className="mt-10 border-t border-hairline pt-8 sm:mt-12 sm:pt-10">
          <SectionReveal className="text-center">
            <p className="mx-auto max-w-lg font-display text-2xl italic leading-snug sm:text-3xl">
              &ldquo;{REASON_COPY.statement}&rdquo;
            </p>
          </SectionReveal>

          <div className="mt-8 grid grid-cols-1 divide-y divide-hairline sm:mt-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {REASON_COPY.closingIdeas.map((idea, index) => {
              const Icon = CLOSING_IDEA_ICONS[index];
              return (
                <SectionReveal
                  key={idea.title}
                  delay={0.15 + index * 0.1}
                  className="flex flex-col items-center gap-3 py-6 text-center sm:px-6 sm:py-0"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/50">
                    <Icon size={22} strokeWidth={1.5} className="text-ink-soft" aria-hidden="true" />
                  </span>
                  <p className="text-xs uppercase tracking-[0.16em] text-ink">{idea.title}</p>
                  <p className="font-display italic text-ink-soft">{idea.description}</p>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
