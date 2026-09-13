import { Cormorant_Garamond, Jost } from "next/font/google";

/**
 * Display serif — headlines, italic taglines and pull-quotes.
 * Closest free match to the client's reference brand system.
 */
export const displaySerif = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/**
 * Sans — labels, pills, body copy, buttons, navigation.
 */
export const sans = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
