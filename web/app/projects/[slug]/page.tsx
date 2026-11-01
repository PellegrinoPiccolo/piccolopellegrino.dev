import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";

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
          url: urlFor(image as SanityImageSource)
            .width(1200)
            .height(630)
            .fit("crop")
            .url(),
          width: 1200,
          height: 630,
          alt: project.title ?? title,
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      type: "article",
      siteName: "Pellegrino Piccolo",
      locale: "en_US",
      title,
      description,
      url: `/projects/${slug}`,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images?.map((img) => img.url),
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

  return <div>Project Details Page</div>;
};

export default Page;
