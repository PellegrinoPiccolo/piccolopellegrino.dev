import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";
import { FaArrowLeft } from "react-icons/fa6";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

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

  const InfoSection = [
    {
      title: "Role",
      value: project.role,
    },
    {
      title: "Platforms",
      value: project.platforms,
    },
    {
      title: "Architecture",
      value: project.architectureSummary,
    },
    {
      title: "Key decisions",
      value: project.decisions?.length ?? 0,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="w-full bg-section">
        <div className="container py-20 flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 flex-2">
              <Link
                href="/projects"
                className="flex items-center gap-2 text-indicator"
              >
                <FaArrowLeft />
                All projects
              </Link>
              <div className="flex flex-row items-center gap-4">
                {project.icon?.asset ? (
                  <Image
                    src={urlFor(project.icon as SanityImageSource)
                      .width(128)
                      .height(128)
                      .url()}
                    alt=""
                    width={64}
                    height={64}
                    className="size-16 rounded-icon object-cover"
                  />
                ) : (
                  <div className="flex size-16 items-center justify-center rounded-icon bg-indigo-bright text-2xl font-bold text-heading">
                    {project.title?.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <h1 className="text-4xl font-bold text-heading">
                    {project.title}
                  </h1>
                  <p className="text-base text-description">
                    {[
                      project.kind,
                      project.releaseDate &&
                        `Released ${new Date(
                          project.releaseDate,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                          timeZone: "UTC",
                        })}`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </div>
              <p className="text-base text-description">{project.excerpt}</p>
              <div className="flex flex-row gap-4 mt-4 flex-wrap">
                {project.stack?.map((stack) => (
                  <span
                    key={stack}
                    className="text-sm text-indicator border border-indicator/40 p-2 rounded-lg font-mono font-medium"
                  >
                    {stack}
                  </span>
                ))}
              </div>
              <div className="flex flex-row gap-4 mt-4 flex-wrap">
                {project.links?.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-line-strong bg-card px-6 py-3 font-bold text-heading transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indicator hover:bg-indigo-deep hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
                  >
                    <FiGithub className="text-xl" />
                    Code
                  </a>
                )}
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg bg-primary px-6 py-3 font-bold text-heading transition-all duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
                  >
                    Visit site
                    <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {project.links?.store && (
                  <a
                    href={project.links.store}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg bg-green-700 px-6 py-3 font-bold text-heading transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indicator"
                  >
                    {project.links.storeLabel ?? "Download"}
                    <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-8 bg-card border border-primary/40 rounded-lg p-8 flex-1">
              {InfoSection.map((info) => (
                <div key={info.title} className="flex flex-col">
                  <span className="font-bold text-description uppercase text-sm">
                    {info.title}
                  </span>
                  <span className="text-base text-heading font-bold">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-page">
        <div className="container py-20"></div>
      </div>
    </div>
  );
};

export default Page;
