import type { MetadataRoute } from "next";
import { ARTICLES } from "@/content/research";

const BASE = "https://regenerativecomputer.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/compute", "/supply", "/markets", "/research", "/about"];

  return [
    ...pages.map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...ARTICLES.map((article) => ({
      url: `${BASE}/research/${article.slug}`,
      lastModified: article.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
