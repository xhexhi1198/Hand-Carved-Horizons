import type { MouseEvent } from "react";

/**
 * Click handler factory for an in-page anchor like "/#philosophy" or
 * "#philosophy".
 *
 * Needed because clicking back to a hash the URL already has — e.g. the
 * user clicked "Philosophy" once (URL becomes "/#philosophy"), scrolled
 * away manually, then clicks "Philosophy" again — doesn't trigger Next.js's
 * or the browser's own hash-scroll, since the URL doesn't actually change
 * the second time. This scrolls directly instead, whenever the target
 * section exists on the current page. If it doesn't (we're on a different
 * page), this is a no-op and the link's normal navigation proceeds —
 * Next.js already scrolls to the hash correctly once that page mounts.
 */
export function scrollToHashOnClick(href: string) {
  return (event: MouseEvent) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const id = href.slice(hashIndex + 1);
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

    const normalizedHref = href.startsWith("/") || href.startsWith("#") ? href : `/${href}`;
    window.history.replaceState(null, "", normalizedHref);
  };
}
