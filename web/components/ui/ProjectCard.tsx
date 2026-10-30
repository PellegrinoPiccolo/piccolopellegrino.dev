import React from "react";
import type { FeaturedProjectItem } from "@/constants/type";

/**
 * project: FeaturedProjectItem
 *
 * - _id: string
 * - title: string | null
 * - slug: string | null
 * - kind: "Mobile app" | "Web app" | "Website" | "Desktop app" | "Tool" | null
 * - category: "app" | "web" | "desktop" | null
 * - isClientWork: boolean | null
 * - releaseDate: string | null (YYYY-MM-DD)
 * - excerpt: string | null
 * - stack: string[] | null
 * - icon: image | null
 * - cover: { asset: { _id, metadata: { lqip, dimensions } }, alt?, hotspot?, crop? } | null
 */

type ProjectCardProps = {
  project: FeaturedProjectItem;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return <div>{project.title}</div>;
};

export default ProjectCard;
