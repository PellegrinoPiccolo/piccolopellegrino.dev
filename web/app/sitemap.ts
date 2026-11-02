import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { SITEMAP_QUERY } from "@/sanity/queries";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await client.fetch(SITEMAP_QUERY);
  const lastProjectUpdate = projects
    .map((project) => project._updatedAt)
    .sort()
    .at(-1);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: lastProjectUpdate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: lastProjectUpdate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/privacy"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...projects
      .filter((project) => project.slug)
      .map((project) => ({
        url: absoluteUrl(`/projects/${project.slug}`),
        lastModified: project._updatedAt,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
  ];
}
