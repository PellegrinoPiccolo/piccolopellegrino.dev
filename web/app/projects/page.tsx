import { cache } from "react";
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { PROJECTS_QUERY } from "@/sanity/queries";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectsList from "@/components/projects/ProjectsList";
import JsonLd from "@/components/ui/JsonLd";
import {
  absoluteUrl,
  defaultOgImage,
  personId,
  siteName,
  websiteId,
} from "@/lib/site";

const getProjects = cache(() => client.fetch(PROJECTS_QUERY));

const description =
  "Projects by Pellegrino Piccolo: web apps, mobile apps, tools and websites.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    siteName,
    locale: "en_US",
    title: `Projects — ${siteName}`,
    description,
    url: "/projects",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects — ${siteName}`,
    description,
    images: [defaultOgImage],
  },
};

// ProjectItem = {
//   _id: string;
//   title: string | null;
//   slug: string | null;
//   kind: "Desktop app" | "Mobile app" | "Tool" | "Web app" | "Website" | null;
//   category: "app" | "desktop" | "web" | null;
//   isClientWork: boolean | null;
//   releaseDate: string | null;
//   excerpt: string | null;
//   stack: string[] | null;
//   icon: SanityImage | null;
//   cover: (SanityImage & {
//     alt?: string;
//     asset: {
//       _id: string;
//       metadata: { lqip: string | null; dimensions: SanityImageDimensions | null } | null;
//     } | null;
//   }) | null;
// }
const Page = async () => {
  const projects = await getProjects();
  const length = projects.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl("/projects"),
        url: absoluteUrl("/projects"),
        name: `Projects — ${siteName}`,
        description,
        isPartOf: { "@id": websiteId },
        author: { "@id": personId },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: length,
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(`/projects/${project.slug}`),
            name: project.title,
          })),
        },
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
        ],
      },
    ],
  };

  return (
    <div className="w-full bg-page">
      <JsonLd data={jsonLd} />
      <div className="container pt-15 pb-20 md:py-20 flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 text-indicator">
          <FaArrowLeft />
          Home
        </Link>
        <p className="font-mono text-sm lg:text-base text-primary font-medium">
          /* everything I've shipped */
        </p>
        <div className="flex flex-row items-end gap-4">
          <h1
            id="projects-heading"
            className="text-3xl md:text-5xl font-bold text-heading"
          >
            All projects
          </h1>
          <p className="text-base text-description font-mono font-medium">
            {length} projects
          </p>
        </div>
        <p className="text-base text-description font-medium">
          Apps, websites and tools — personal products and client work.
        </p>
        <div className="mt-8">
          <ProjectsList
            items={projects.map((project) => ({
              id: project._id,
              category: project.category,
              year: project.releaseDate?.slice(0, 4) ?? null,
              card: <ProjectCard project={project} />,
            }))}
          />
        </div>
        <div className="bg-section flex flex-col md:flex-row justify-between items-center p-8 rounded-3xl border border-primary/40 mt-8 gap-8 md:gap-0">
          <div className="flex flex-col items-center md:items-start gap-2 md:gap-4">
            <p className="text-center md:text-left text-sm md:text-base text-primary font-mono">
              /* next one could be yours */
            </p>
            <p className="text-center md:text-left text-2xl md:text-4xl font-bold text-heading">
              Have a project in mind?
            </p>
          </div>
          <Link
            href="/#contact"
            className="text-base text-heading font-bold bg-indicator rounded-full px-6 py-3 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_10px_30px_-12px_var(--color-indicator)]"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
