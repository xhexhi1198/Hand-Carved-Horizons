"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { HeaderLogo } from "./HeaderLogo";
import { NAV_LINKS, SITE_COPY } from "@/content/site";
import { scrollToHashOnClick } from "@/lib/scrollToHash";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { DURATION, EASE_CINEMATIC } from "@/lib/motion";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only the home page starts with a dark hero behind a transparent header —
  // every other route (and the home page once scrolled) gets the solid bar.
  const solid = !isHome || scrolled;
  const shouldReduceMotion = useReducedMotion();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-hairline bg-canvas/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between py-2.5">
        <Link
          href="/"
          className={`flex items-center gap-3 transition-colors duration-500 ${
            solid ? "text-ink" : "text-canvas"
          }`}
          aria-label={`${SITE_COPY.brandName} — home`}
        >
          <HeaderLogo solid={solid} />
          <span className="hidden font-display text-lg tracking-wide sm:inline">
            {SITE_COPY.brandName}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={scrollToHashOnClick(link.href)}
              className={`text-xs uppercase tracking-[0.14em] transition-colors hover:text-brass ${
                solid ? "text-ink-soft" : "text-canvas/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button href={buildWhatsAppHref()} external className="!px-5 !py-3">
            {SITE_COPY.navCta}
          </Button>
        </nav>

        <button
          type="button"
          className={`relative z-50 grid h-6 w-6 place-items-center transition-colors duration-500 md:hidden ${
            solid || mobileOpen ? "text-ink" : "text-canvas"
          }`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                className="absolute inset-0 grid place-items-center"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -45 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, rotate: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 45 }}
                transition={{ duration: DURATION.fast, ease: EASE_CINEMATIC }}
              >
                <X />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                className="absolute inset-0 grid place-items-center"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 45 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, rotate: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -45 }}
                transition={{ duration: DURATION.fast, ease: EASE_CINEMATIC }}
              >
                <Menu />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </Container>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
