import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SiteContent } from "@/content/types";
import { localizePath, type Locale } from "@/lib/i18n";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectVideos from "@/components/projects/ProjectVideos";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectArchitecture from "@/components/projects/ProjectArchitecture";
import ProjectDecisions from "@/components/projects/ProjectDecisions";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import JsonLd from "@/components/ui/JsonLd";
import {
  absoluteUrl,
  defaultOgImage,
  localeAlternates,
  personId,
  siteName,
  websiteId,
} from "@/lib/site";

const ogImageUrl = (image: SanityImageSource) =>
  urlFor(image).width(1200).height(630).fit("crop").url();

const getProject = cache((slug: string, lang: Locale) =>
  client.fetch(PROJECT_QUERY, { slug, lang }),
);

export async function projectStaticParams() {
  const slugs = await client.fetch(PROJECT_SLUGS_QUERY);

  return slugs
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function projectMetadata(
  { locale, ogLocale }: SiteContent,
  slug: string,
): Promise<Metadata> {
  const project = await getProject(slug, locale);

  if (!project) return {};

  const title = project.seoTitle ?? project.title ?? slug;
  const description = project.seoDescription ?? project.excerpt ?? undefined;
  const image = project.ogImage?.asset ? project.ogImage : project.cover;
  const images = image?.asset
    ? [
        {
          url: ogImageUrl(image as SanityImageSource),
          width: 1200,
          height: 630,
          alt: project.title ?? title,
        },
      ]
    : [defaultOgImage];

  return {
    title,
    description,
    alternates: localeAlternates(locale, `/projects/${slug}`),
    openGraph: {
      type: "article",
      siteName,
      locale: ogLocale,
      title,
      description,
      url: localizePath(locale, `/projects/${slug}`),
      images,
      authors: [siteName],
      publishedTime: project.releaseDate ?? undefined,
      modifiedTime: project._updatedAt,
      tags: project.stack ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}


type ProjectPageProps = {
  content: SiteContent;
  slug: string;
};

export async function ProjectPage({ content, slug }: ProjectPageProps) {
  const { locale, nav, projectsPage } = content;
  const project = await getProject(slug, locale);

  if (!project) notFound();

  const hasVideos = Boolean(project.videos?.some((video) => video.url));
  let section = 0;
  const numbered = <T extends { eyebrow: string }>(block: T): T => ({
    ...block,
    eyebrow: `${String(++section).padStart(2, "0")} — ${block.eyebrow}`,
  });

  const url = absoluteUrl(localizePath(locale, `/projects/${slug}`));
  const image = project.ogImage?.asset ? project.ogImage : project.cover;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        url,
        name: project.title,
        headline: project.seoTitle ?? project.title,
        description: project.seoDescription ?? project.excerpt,
        image: image?.asset
          ? ogImageUrl(image as SanityImageSource)
          : undefined,
        genre: project.kind,
        keywords: project.stack?.join(", "),
        datePublished: project.releaseDate,
        dateModified: project._updatedAt,
        author: { "@id": personId },
        creator: { "@id": personId },
        isPartOf: { "@id": websiteId },
        inLanguage: locale,
        sameAs: [project.links?.live, project.links?.repo].filter(Boolean),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: nav.home,
            item: absoluteUrl(localizePath(locale)),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: projectsPage.title,
            item: absoluteUrl(localizePath(locale, "/projects")),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title ?? slug,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <JsonLd data={jsonLd} />
      <div className="w-full bg-section">
        <div className="container pt-15 pb-20 md:py-20 flex flex-col gap-4">
          <ProjectHero content={content} project={project} />
        </div>
      </div>
      <div className="w-full bg-page">
        <div className="container py-20 flex flex-col gap-20">
          {hasVideos && (
            <ProjectVideos content={numbered(content.videos)} project={project} />
          )}
          <ProjectGallery content={numbered(content.gallery)} project={project} />
          <ProjectArchitecture
            content={numbered(content.architecture)}
            project={project}
          />
          <ProjectDecisions
            content={numbered(content.decisions)}
            project={project}
          />
          <ProjectNavigation
            content={{
              ...content,
              projectNavigation: numbered(content.projectNavigation),
            }}
            project={project}
          />
        </div>
      </div>
    </div>
  );
}
