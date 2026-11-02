import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectArchitecture from "@/components/projects/ProjectArchitecture";
import ProjectDecisions from "@/components/projects/ProjectDecisions";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import JsonLd from "@/components/ui/JsonLd";
import {
  absoluteUrl,
  defaultOgImage,
  personId,
  siteName,
  websiteId,
} from "@/lib/site";

const ogImageUrl = (image: SanityImageSource) =>
  urlFor(image).width(1200).height(630).fit("crop").url();

const getProject = cache((slug: string) =>
  client.fetch(PROJECT_QUERY, { slug }),
);

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await client.fetch(PROJECT_SLUGS_QUERY);

  return slugs
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

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
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      type: "article",
      siteName,
      locale: "en_US",
      title,
      description,
      url: `/projects/${slug}`,
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

// ProjectDetail = {
//   _id: string;
//   title: string | null;
//   slug: string | null;
//   kind: "Desktop app" | "Mobile app" | "Tool" | "Web app" | "Website" | null;
//   isClientWork: boolean | null;
//   releaseDate: string | null;
//   excerpt: string | null;
//   stack: string[] | null;
//   role: string | null;
//   platforms: string | null;
//   architectureSummary: string | null;
//   links: { repo?: string; live?: string; store?: string; storeLabel?: string } | null;
//   icon: SanityImage | null;
//   gallery: (SanityImage & {
//     _key: string;
//     alt?: string;
//     caption?: string;
//     asset: {
//       _id: string;
//       metadata: { lqip: string | null; dimensions: SanityImageDimensions | null } | null;
//     } | null;
//   })[] | null;
//   layersBoundary: string | null;
//   layers: {
//     _key: string;
//     name: string | null;
//     tech: string | null;
//     icon: "bell" | "cloud-off" | "cloud" | "code" | "database" | "globe" | "lock" | "phone" | "server" | null;
//     group: "absent" | "core" | null;
//     connector: string | null;
//     sideBySide: boolean | null;
//     decisions: string[] | null;
//   }[] | null;
//   decisions: {
//     _key: string;
//     code: string | null;
//     title: string | null;
//     shortLabel: string | null;
//     context: string | null;
//     decision: string | null;
//     tradeoff: string | null;
//     alternatives: string[] | null;
//   }[] | null;
//   seoTitle: string | null;
//   seoDescription: string | null;
//   ogImage: SanityImage | null;
//   cover: (SanityImage & { alt?: string }) | null;
//   siblings: { title: string | null; slug: string | null }[];
// }

const Page = async ({ params }: PageProps<"/projects/[slug]">) => {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const url = absoluteUrl(`/projects/${slug}`);
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
        sameAs: [project.links?.live, project.links?.repo].filter(Boolean),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: absoluteUrl("/projects"),
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
          <ProjectHero project={project} />
        </div>
      </div>
      <div className="w-full bg-page">
        <div className="container py-20 flex flex-col gap-20">
          <ProjectGallery project={project} />
          <ProjectArchitecture project={project} />
          <ProjectDecisions project={project} />
          <ProjectNavigation project={project} />
        </div>
      </div>
    </div>
  );
};

export default Page;
