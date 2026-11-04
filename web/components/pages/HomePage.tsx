import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import { client } from "@/sanity/client";
import {
  FEATURED_PROJECTS_QUERY,
  PROJECTS_QUERY,
  STACK_QUERY,
} from "@/sanity/queries";
import type { Metadata } from "next";
import { cache } from "react";
import type { SiteContent } from "@/content/types";
import { getResumeUrl } from "@/sanity/resume";
import Stack from "@/components/home/Stack";
import JsonLd from "@/components/ui/JsonLd";
import { localizePath, type Locale } from "@/lib/i18n";
import {
  absoluteUrl,
  localeAlternates,
  personId,
  siteName,
  siteUrl,
  socialLinks,
  websiteId,
} from "@/lib/site";

const getProjects = cache((lang: Locale) =>
  client.fetch(PROJECTS_QUERY, { lang }),
);
const getFeaturedProjects = cache((lang: Locale) =>
  client.fetch(FEATURED_PROJECTS_QUERY, { lang }),
);
const getStack = cache((lang: Locale) => client.fetch(STACK_QUERY, { lang }));

type HomePageProps = {
  content: SiteContent;
};

export const homeMetadata = ({ locale }: SiteContent): Metadata => ({
  alternates: localeAlternates(locale),
});

export async function HomePage({ content }: HomePageProps) {
  const { meta, locale } = content;
  const projects = await getProjects(locale);
  const featuredProjects = await getFeaturedProjects(locale);
  const stack = await getStack(locale);
  const resumeUrl = await getResumeUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl(localizePath(locale)),
        name: siteName,
        description: meta.description,
        inLanguage: locale,
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteName,
        url: siteUrl,
        jobTitle: meta.jobTitle,
        description: meta.description,
        knowsAbout: [
          "React Native",
          "Next.js",
          "Electron",
          "TypeScript",
          "Mobile app development",
          "Web development",
          "Cloud computing",
        ],
        homeLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Montesarchio",
            addressRegion: "BN",
            addressCountry: "IT",
          },
        },
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: "University of Salerno",
        },
        sameAs: [socialLinks.github, socialLinks.linkedin],
      },
    ],
  };

  return (
    <div className="w-full bg-page">
      <JsonLd data={jsonLd} />
      <Hero content={content} recentProjects={projects.slice(0, 3)} />
      <Projects content={content} featuredProjects={featuredProjects} />
      <About content={content.about} resumeUrl={resumeUrl} />
      <Stack content={content} stack={stack} />
      <Contact content={content} />
    </div>
  );
}
