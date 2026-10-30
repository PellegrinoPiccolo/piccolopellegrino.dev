import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(releaseDate desc, order asc) {
    _id,
    title,
    "slug": slug.current,
    kind,
    category,
    isClientWork,
    releaseDate,
    excerpt,
    stack,
    icon,
    cover { ..., asset->{ _id, metadata { lqip } } }
  }
`);

export const FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_id == "featuredProjects"][0].projects[]->[defined(slug.current)] {
    _id,
    title,
    "slug": slug.current,
    kind,
    category,
    isClientWork,
    releaseDate,
    excerpt,
    stack,
    icon,
    cover { ..., asset->{ _id, metadata { lqip } } }
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)].slug.current
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    kind,
    isClientWork,
    releaseDate,
    excerpt,
    stack,
    role,
    platforms,
    architectureSummary,
    links,
    icon,
    gallery[] { ..., asset->{ _id, metadata { lqip, dimensions } } },
    layersBoundary,
    layers[] { _key, name, tech, icon, group, connector, sideBySide, decisions },
    decisions[] { _key, code, title, shortLabel, context, decision, tradeoff, alternatives },
    seoTitle,
    seoDescription,
    ogImage,
    cover,
    "siblings": *[_type == "project" && defined(slug.current)] | order(order asc, releaseDate desc) {
      title,
      "slug": slug.current
    }
  }
`);
