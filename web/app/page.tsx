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
import Stack from "@/components/home/Stack";
import JsonLd from "@/components/ui/JsonLd";
import {
  absoluteUrl,
  personId,
  siteDescription,
  siteName,
  siteUrl,
  socialLinks,
  websiteId,
} from "@/lib/site";

const getProjects = cache(() => client.fetch(PROJECTS_QUERY));
const getFeaturedProjects = cache(() => client.fetch(FEATURED_PROJECTS_QUERY));
const getStack = cache(() => client.fetch(STACK_QUERY));

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const projects = await getProjects();
  const featuredProjects = await getFeaturedProjects();
  const stack = await getStack();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteName,
        url: siteUrl,
        image: absoluteUrl("/about.jpg"),
        jobTitle: "Full-stack & Mobile Developer",
        description: siteDescription,
        knowsAbout: [
          "React Native",
          "Next.js",
          "Electron",
          "TypeScript",
          "Mobile app development",
          "Web development",
          "Cloud computing",
        ],
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
      <Hero recentProjects={projects.slice(0, 3)} />
      <Projects featuredProjects={featuredProjects} />
      <About />
      <Stack stack={stack} />
      <Contact />
    </div>
  );
}
