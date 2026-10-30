import type {
  FEATURED_PROJECTS_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
} from "@/sanity.types";

export type Projects = PROJECTS_QUERY_RESULT;
export type ProjectItem = Projects[number];

export type FeaturedProjects = FEATURED_PROJECTS_QUERY_RESULT;
export type FeaturedProjectItem = NonNullable<FeaturedProjects>[number];
