import Hero from "@/components/home/Hero";
import { client } from "@/sanity/client";
import { FEATURED_PROJECTS_QUERY, PROJECTS_QUERY } from "@/sanity/queries";
import type { Metadata } from "next";
import { cache } from "react";

const getProjects = cache(() => client.fetch(PROJECTS_QUERY));
const getFeaturedProjects = cache(() => client.fetch(FEATURED_PROJECTS_QUERY));

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const projects = await getProjects();
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="w-full bg-page">
      <div className="container">
        <Hero recentProjects={projects.slice(0, 3)} />
      </div>
    </div>
  );
}
