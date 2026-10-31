import type {
  FEATURED_PROJECTS_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
  STACK_QUERY_RESULT,
} from "@/sanity.types";

export type Projects = PROJECTS_QUERY_RESULT;
export type ProjectItem = Projects[number];

export type FeaturedProjects = FEATURED_PROJECTS_QUERY_RESULT;
export type FeaturedProjectItem = NonNullable<FeaturedProjects>[number];

export type Stack = STACK_QUERY_RESULT;
export type StackGroup = NonNullable<Stack>[number];
export type StackProject = NonNullable<StackGroup["projects"]>[number];
