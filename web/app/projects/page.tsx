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

  return <div>Projects Page</div>;
};

export default Page;
