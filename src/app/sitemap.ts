import type { MetadataRoute } from "next";
import { ARTICLES } from "@/content/research";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/compute", "/supply", "/markets", "/research", "/about"];

  return [
    ...pages.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...ARTICLES.map((article) => ({
      url: `${SITE_URL}/research/${article.slug}`,
      lastModified: article.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
