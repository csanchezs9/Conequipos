import type { MetadataRoute } from "next";
import { categories, products } from "@/data/catalog";

const BASE = "https://conequipos.com.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/equipos", "/nosotros", "/experiencias", "/contacto"].map(
    (r) => ({
      url: `${BASE}${r}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : 0.7,
    })
  );

  const cat = categories.map((c) => ({
    url: `${BASE}/categoria/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const prod = products.map((p) => ({
    url: `${BASE}/equipos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...cat, ...prod];
}
