import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current) && hidden != true] | order(releaseDate desc, order asc) {
    _id,
    title,
    "slug": slug.current,
    kind,
    category,
    isClientWork,
    releaseDate,
    "excerpt": coalesce(excerpt[language == $lang][0].value, excerpt[language == "en"][0].value, excerpt[language == "it"][0].value),
    stack,
    links { repo, live, store, "storeLabel": coalesce(storeLabel[language == $lang][0].value, storeLabel[language == "en"][0].value, storeLabel[language == "it"][0].value) },
    icon,
    cover { ..., "alt": coalesce(alt[language == $lang][0].value, alt[language == "en"][0].value, alt[language == "it"][0].value), asset->{ _id, metadata { lqip, dimensions } } }
  }
`);

export const FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_id == "featuredProjects"][0].projects[defined(@->slug.current) && @->hidden != true]-> {
    _id,
    title,
    "slug": slug.current,
    kind,
    category,
    isClientWork,
    releaseDate,
    "excerpt": coalesce(excerpt[language == $lang][0].value, excerpt[language == "en"][0].value, excerpt[language == "it"][0].value),
    stack,
    links { repo, live, store, "storeLabel": coalesce(storeLabel[language == $lang][0].value, storeLabel[language == "en"][0].value, storeLabel[language == "it"][0].value) },
    icon,
    cover { ..., "alt": coalesce(alt[language == $lang][0].value, alt[language == "en"][0].value, alt[language == "it"][0].value), asset->{ _id, metadata { lqip, dimensions } } }
  }
`);

export const STACK_QUERY = defineQuery(`
  *[_id == "stack"][0].groups[] {
    _key,
    "title": coalesce(title[language == $lang][0].value, title[language == "en"][0].value, title[language == "it"][0].value),
    items,
    "projects": projects[defined(@->slug.current) && @->hidden != true]-> {
      _id,
      title,
      "slug": slug.current
    },
    "note": coalesce(note[language == $lang][0].value, note[language == "en"][0].value, note[language == "it"][0].value)
  }
`);

export const RESUME_QUERY = defineQuery(`
  *[_id == "resume" && defined(file.asset)][0] {
    "url": file.asset->url,
    fileName
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current) && hidden != true].slug.current
`);

export const SITEMAP_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current) && hidden != true] {
    "slug": slug.current,
    _updatedAt
  }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug && hidden != true][0] {
    _id,
    title,
    "slug": slug.current,
    kind,
    isClientWork,
    releaseDate,
    "excerpt": coalesce(excerpt[language == $lang][0].value, excerpt[language == "en"][0].value, excerpt[language == "it"][0].value),
    stack,
    "role": coalesce(role[language == $lang][0].value, role[language == "en"][0].value, role[language == "it"][0].value),
    "platforms": coalesce(platforms[language == $lang][0].value, platforms[language == "en"][0].value, platforms[language == "it"][0].value),
    "architectureSummary": coalesce(architectureSummary[language == $lang][0].value, architectureSummary[language == "en"][0].value, architectureSummary[language == "it"][0].value),
    links { repo, live, store, "storeLabel": coalesce(storeLabel[language == $lang][0].value, storeLabel[language == "en"][0].value, storeLabel[language == "it"][0].value) },
    icon,
    "videos": videos[defined(asset) && ^.hideVideos != true] {
      _key,
      "label": coalesce(label[language == $lang][0].value, label[language == "en"][0].value, label[language == "it"][0].value),
      "caption": coalesce(caption[language == $lang][0].value, caption[language == "en"][0].value, caption[language == "it"][0].value),
      "url": asset->url,
      "mimeType": asset->mimeType,
      poster
    },
    gallery[] {
      ...,
      "alt": coalesce(alt[language == $lang][0].value, alt[language == "en"][0].value, alt[language == "it"][0].value),
      "caption": coalesce(caption[language == $lang][0].value, caption[language == "en"][0].value, caption[language == "it"][0].value),
      asset->{ _id, metadata { lqip, dimensions } }
    },
    "layersBoundary": coalesce(layersBoundary[language == $lang][0].value, layersBoundary[language == "en"][0].value, layersBoundary[language == "it"][0].value),
    layers[] {
      _key,
      "name": coalesce(name[language == $lang][0].value, name[language == "en"][0].value, name[language == "it"][0].value),
      "tech": coalesce(tech[language == $lang][0].value, tech[language == "en"][0].value, tech[language == "it"][0].value),
      icon,
      group,
      "connector": coalesce(connector[language == $lang][0].value, connector[language == "en"][0].value, connector[language == "it"][0].value),
      sideBySide,
      decisions
    },
    decisions[] {
      _key,
      code,
      "title": coalesce(title[language == $lang][0].value, title[language == "en"][0].value, title[language == "it"][0].value),
      "shortLabel": coalesce(shortLabel[language == $lang][0].value, shortLabel[language == "en"][0].value, shortLabel[language == "it"][0].value),
      "context": coalesce(context[language == $lang][0].value, context[language == "en"][0].value, context[language == "it"][0].value),
      "decision": coalesce(decision[language == $lang][0].value, decision[language == "en"][0].value, decision[language == "it"][0].value),
      "tradeoff": coalesce(tradeoff[language == $lang][0].value, tradeoff[language == "en"][0].value, tradeoff[language == "it"][0].value),
      "alternatives": coalesce(alternatives[language == $lang][0].value, alternatives[language == "en"][0].value, alternatives[language == "it"][0].value)
    },
    "seoTitle": coalesce(seoTitle[language == $lang][0].value, seoTitle[language == "en"][0].value, seoTitle[language == "it"][0].value),
    "seoDescription": coalesce(seoDescription[language == $lang][0].value, seoDescription[language == "en"][0].value, seoDescription[language == "it"][0].value),
    ogImage,
    cover { ..., "alt": coalesce(alt[language == $lang][0].value, alt[language == "en"][0].value, alt[language == "it"][0].value) },
    _updatedAt,
    "siblings": *[_type == "project" && defined(slug.current) && hidden != true] | order(releaseDate desc, order asc) {
      title,
      "slug": slug.current
    }
  }
`);
