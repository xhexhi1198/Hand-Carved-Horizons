"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NAV_LINKS, SITE_COPY } from "@/content/site";
import { scrollToHashOnClick } from "@/lib/scrollToHash";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { Button } from "../ui/Button";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0.01 : 0.35;

  // Lock the page behind the menu. Plain `overflow:hidden` on body doesn't
  // reliably block touch-scroll on iOS Safari, so pin the body at its
  // current scroll offset instead, and restore that exact offset on close —
  // `overflow` alone would also silently jump the page back to the top.
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const { body } = document;
    // Locking removes the need for a scrollbar, which on a desktop-width
    // browser would otherwise let the page reflow a few pixels wider —
    // compensate so nothing shifts while the menu is open.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousStyle = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.position = previousStyle.position;
      body.style.top = previousStyle.top;
      body.style.left = previousStyle.left;
      body.style.right = previousStyle.right;
      body.style.width = previousStyle.width;
      body.style.paddingRight = previousStyle.paddingRight;
      // The site sets `scroll-behavior: smooth` globally — without
      // `behavior: "instant"` this would animate back into place instead
      // of restoring the position immediately.
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex h-dvh flex-col items-center justify-center gap-8 overflow-y-auto bg-canvas md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
        >
          <nav aria-label="Mobile" className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  scrollToHashOnClick(link.href)(event);
                  onClose();
                }}
                className="font-display text-3xl tracking-wide text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button href={buildWhatsAppHref()} external onClick={onClose}>
            {SITE_COPY.navCta}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
