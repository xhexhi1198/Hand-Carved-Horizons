"use client";

import { useEffect, useState } from "react";

/**
 * True below the site's own `sm` breakpoint (640px). Defaults to `false`
 * (desktop) until measured after mount, matching server-rendered output —
 * the same pattern Header.tsx already uses for its scroll state.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}
