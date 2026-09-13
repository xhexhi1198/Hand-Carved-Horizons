"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "../ui/Container";
import { Wordmark } from "../ui/Wordmark";
import { Button } from "../ui/Button";
import { NAV_LINKS, SITE_COPY } from "@/content/site";
import { scrollToHashOnClick } from "@/lib/scrollToHash";
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-hairline bg-canvas/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className={`flex items-center gap-3 transition-colors duration-500 ${
            solid ? "text-ink" : "text-canvas"
          }`}
          aria-label={`${SITE_COPY.brandName} — home`}
        >
          <Wordmark variant="mark" />
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
          <Button href="/contact" className="!px-5 !py-3">
            {SITE_COPY.navCta}
          </Button>
        </nav>

        <button
          type="button"
          className={`transition-colors duration-500 md:hidden ${solid ? "text-ink" : "text-canvas"}`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </Container>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
