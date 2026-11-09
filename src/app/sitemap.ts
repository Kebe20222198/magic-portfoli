import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteUrl.toString().replace(/\/$/, ""), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: new URL("/resume", siteUrl).toString(), lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
