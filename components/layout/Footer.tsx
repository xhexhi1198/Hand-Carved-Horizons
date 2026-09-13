"use client";

import Link from "next/link";
import { Container } from "../ui/Container";
import { Wordmark } from "../ui/Wordmark";
import { NAV_LINKS, SITE_COPY, CONTACT_INFO } from "@/content/site";
import { scrollToHashOnClick } from "@/lib/scrollToHash";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas-alt py-16">
      <Container className="flex flex-col items-center gap-10 text-center">
        <Wordmark variant="full" />

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={scrollToHashOnClick(link.href)}
              className="text-xs uppercase tracking-[0.14em] text-ink-soft hover:text-brass"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm text-stone sm:flex-row sm:gap-6">
          <a href={CONTACT_INFO.phoneHref} className="hover:text-brass">
            {CONTACT_INFO.phoneDisplay}
          </a>
          <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brass">
            {CONTACT_INFO.email}
          </a>
        </div>

        <p className="text-xs text-stone">
          © {new Date().getFullYear()} {SITE_COPY.legalName}. A private travel membership.
        </p>
      </Container>
    </footer>
  );
}
