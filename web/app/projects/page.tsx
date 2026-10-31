import { cache } from "react";
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { PROJECTS_QUERY } from "@/sanity/queries";

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
    siteName: "Pellegrino Piccolo",
    locale: "en_US",
    title: "Projects",
    description,
    url: "/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects",
    description,
  },
};

const Page = async () => {
  const projects = await getProjects();

  return <div>Projects Page</div>;
};

export default Page;
