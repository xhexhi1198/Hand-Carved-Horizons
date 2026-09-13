import type { MetadataRoute } from "next";

// PLACEHOLDER — update once the production domain is confirmed.
const BASE_URL = "https://handcarvedhorizons.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/memberships", "/experiences", "/contact"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
