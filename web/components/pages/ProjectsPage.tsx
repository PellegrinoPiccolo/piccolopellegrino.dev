import { cache } from "react";
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { PROJECTS_QUERY } from "@/sanity/queries";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import type { SiteContent } from "@/content/types";
import { format, localizePath, type Locale } from "@/lib/i18n";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectsList from "@/components/projects/ProjectsList";
import JsonLd from "@/components/ui/JsonLd";
import {
  absoluteUrl,
  defaultOgImage,
  localeAlternates,
  personId,
  siteName,
  websiteId,
} from "@/lib/site";

const getProjects = cache((lang: Locale) =>
  client.fetch(PROJECTS_QUERY, { lang }),
);

export const projectsMetadata = (content: SiteContent): Metadata => {
  const { projectsPage, locale, ogLocale } = content;
  const url = localizePath(locale, "/projects");
  const title = `${projectsPage.title} — ${siteName}`;

  return {
    title: projectsPage.title,
    description: projectsPage.description,
    alternates: localeAlternates(locale, "/projects"),
    openGraph: {
      type: "website",
      siteName,
      locale: ogLocale,
      title,
      description: projectsPage.description,
      url,
      images: [{ ...defaultOgImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: projectsPage.description,
      images: [{ ...defaultOgImage, alt: title }],
    },
  };
};

type ProjectsPageProps = {
  content: SiteContent;
};

export async function ProjectsPage({ content }: ProjectsPageProps) {
  const { projectsPage: t, nav, locale } = content;
  const projects = await getProjects(locale);
  const length = projects.length;
  const pageUrl = absoluteUrl(localizePath(locale, "/projects"));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        url: pageUrl,
        name: `${t.title} — ${siteName}`,
        description: t.description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        author: { "@id": personId },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: length,
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(localizePath(locale, `/projects/${project.slug}`)),
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
            name: nav.home,
            item: absoluteUrl(localizePath(locale)),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full bg-page">
      <JsonLd data={jsonLd} />
      <div className="container pt-15 pb-20 md:py-20 flex flex-col gap-4">
        <Link
          href={localizePath(locale)}
          className="flex items-center gap-2 text-indicator"
        >
          <FaArrowLeft />
          {nav.home}
        </Link>
        <p className="font-mono text-sm lg:text-base text-primary font-medium">
          {t.eyebrow}
        </p>
        <div className="flex flex-row items-end gap-4">
          <h1
            id="projects-heading"
            className="text-3xl md:text-5xl font-bold text-heading"
          >
            {t.heading}
          </h1>
          <p className="text-base text-description font-mono font-medium">
            {format(length === 1 ? t.count.one : t.count.other, {
              count: length,
            })}
          </p>
        </div>
        <p className="text-base text-description font-medium">
          {t.intro}
        </p>
        <div className="mt-8">
          <ProjectsList
            content={content.projectsList}
            items={projects.map((project) => ({
              id: project._id,
              category: project.category,
              isClientWork: project.isClientWork === true,
              year: project.releaseDate?.slice(0, 4) ?? null,
              card: <ProjectCard project={project} content={content} />,
            }))}
          />
        </div>
        <div className="bg-section flex flex-col md:flex-row justify-between items-center p-8 rounded-3xl border border-primary/40 mt-8 gap-8 md:gap-0">
          <div className="flex flex-col items-center md:items-start gap-2 md:gap-4">
            <p className="text-center md:text-left text-sm md:text-base text-primary font-mono">
              {t.ctaEyebrow}
            </p>
            <p className="text-center md:text-left text-2xl md:text-4xl font-bold text-heading">
              {t.ctaTitle}
            </p>
          </div>
          <Link
            href={`${localizePath(locale)}#contact`}
            className="text-base text-heading font-bold bg-indicator rounded-full px-6 py-3 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_10px_30px_-12px_var(--color-indicator)]"
          >
            {t.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
