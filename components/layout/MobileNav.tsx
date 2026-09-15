"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NAV_LINKS, SITE_COPY } from "@/content/site";
import { scrollToHashOnClick } from "@/lib/scrollToHash";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { Button } from "../ui/Button";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0.01 : 0.35;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-canvas md:hidden"
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
