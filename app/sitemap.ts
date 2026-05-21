import type { MetadataRoute } from "next";
import { BASE_URL, LAST_UPDATED, SITE_ROUTES } from "@/lib/geo";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: LAST_UPDATED,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/services") ? 0.9 : 0.7,
  }));
}
