import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { SITEMAP_QUERY } from "@/sanity/queries";
import { localizePath, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

type Entry = Omit<MetadataRoute.Sitemap[number], "url" | "alternates"> & {
  path: string;
};

const localize = ({ path, ...entry }: Entry): MetadataRoute.Sitemap => {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(localizePath(locale, path))]),
  );

  return locales.map((locale) => ({
    ...entry,
    url: absoluteUrl(localizePath(locale, path)),
    alternates: { languages },
  }));
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await client.fetch(SITEMAP_QUERY);
  const lastProjectUpdate = projects
    .map((project) => project._updatedAt)
    .sort()
    .at(-1);

  const entries: Entry[] = [
    {
      path: "/",
      lastModified: lastProjectUpdate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      path: "/projects",
      lastModified: lastProjectUpdate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/privacy",
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...projects
      .filter((project) => project.slug)
      .map((project) => ({
        path: `/projects/${project.slug}`,
        lastModified: project._updatedAt,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
  ];

  return entries.flatMap(localize);
}
