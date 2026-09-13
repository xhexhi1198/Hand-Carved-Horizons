import type { MetadataRoute } from "next";

// PLACEHOLDER — update once the production domain is confirmed.
const BASE_URL = "https://handcarvedhorizons.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
