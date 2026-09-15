"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Container } from "../ui/Container";
import { TextMask } from "../ui/TextMask";
import { Button } from "../ui/Button";
import { HERO_COPY } from "@/content/home";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.55]);

  // Respect reduced-motion preference: hold on a still frame instead of autoplaying.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldReduceMotion) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [shouldReduceMotion]);

  return (
    <section ref={ref} id="hero" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <motion.div className="absolute inset-0 bg-ink" style={{ scale }}>
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <motion.div className="absolute inset-0 bg-ink" style={{ opacity: overlayOpacity }} />

      <Container className="relative z-10 pb-20 pt-40 text-canvas sm:pb-28">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-canvas/80">{HERO_COPY.eyebrow}</p>

        <h1 className="font-display text-hero font-medium leading-[0.95]">
          {HERO_COPY.headlineLines.map((line, i) => (
            <TextMask key={line} delay={0.15 + i * 0.12}>
              {line}
            </TextMask>
          ))}
        </h1>

        <p className="mt-8 max-w-md text-base text-canvas/85 sm:text-lg">{HERO_COPY.subhead}</p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button
            href={buildWhatsAppHref()}
            external
            className="!bg-canvas !text-ink hover:!bg-canvas/90"
          >
            {HERO_COPY.primaryCta}
          </Button>
        </div>
      </Container>

      <motion.div
        className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-canvas/70"
        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[0.65rem] uppercase tracking-[0.16em]">{HERO_COPY.scrollHint}</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}
