"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Container } from "../ui/Container";
import { TextMask } from "../ui/TextMask";
import { Button } from "../ui/Button";
import { HERO_COPY } from "@/content/home";
import { scrollToHashOnClick } from "@/lib/scrollToHash";

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
    // Some in-app browsers (e.g. WhatsApp's) don't reliably honor the
    // `muted` JSX attribute before playback starts, so autoplay gets
    // blocked and the browser falls back to its own "tap to play" affordance
    // — a big play icon over the video. Setting the DOM property directly
    // is the standard fix.
    video.muted = true;
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
          className="h-full w-full object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          tabIndex={-1}
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

        <div className="mt-10 flex flex-nowrap items-center gap-2 sm:gap-4">
          {/* Slightly tighter tracking + padding on mobile only, so both
              CTAs stay on one row without wrapping — text size is untouched. */}
          <Button
            href="/#memberships"
            onClick={scrollToHashOnClick("/#memberships")}
            className="!bg-canvas !px-3 !py-3 !tracking-[0.08em] !text-ink hover:!bg-canvas/90 sm:!px-7 sm:!py-4 sm:!tracking-[0.14em]"
          >
            {HERO_COPY.primaryCta}
          </Button>
          <Button
            href="/#philosophy"
            onClick={scrollToHashOnClick("/#philosophy")}
            className="border border-canvas/70 !bg-transparent !px-2.5 !py-3 !tracking-[0.08em] !text-canvas hover:!border-canvas hover:!bg-canvas/10 sm:!px-7 sm:!py-4 sm:!tracking-[0.14em]"
          >
            {HERO_COPY.secondaryCta}
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
