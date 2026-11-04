import {defineArrayMember, defineField, defineType} from 'sanity'
import {PaddedObjectInput} from '../components/PaddedObjectInput'
import {localized} from '../languages'

const LAYER_ICONS = [
  'phone',
  'code',
  'database',
  'bell',
  'server',
  'cloud',
  'cloud-off',
  'lock',
  'globe',
]

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'gallery', title: 'Gallery'},
    {name: 'architecture', title: 'Architecture'},
    {name: 'decisions', title: 'Decisions'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // General
    defineField({
      name: 'title',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'general',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      type: 'string',
      group: 'general',
      description: 'Type badge and list label',
      options: {
        list: ['Mobile app', 'Web app', 'Website', 'Desktop app', 'Tool'],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'category',
      type: 'string',
      group: 'general',
      description: 'Used by the All / App / Web / Desktop filter',
      options: {
        list: [
          {title: 'App', value: 'app'},
          {title: 'Web', value: 'web'},
          {title: 'Desktop', value: 'desktop'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'isClientWork',
      title: 'Client work',
      type: 'boolean',
      group: 'general',
      initialValue: false,
    }),
    defineField({
      name: 'hidden',
      type: 'boolean',
      group: 'general',
      description: 'Hide this project from the site without deleting it',
      initialValue: false,
    }),
    defineField({
      name: 'releaseDate',
      type: 'date',
      group: 'general',
      description: 'Projects are grouped by the year of this date',
    }),
    defineField({
      name: 'icon',
      type: 'image',
      group: 'general',
      description: 'Square app icon',
    }),
    defineField({
      name: 'cover',
      type: 'image',
      group: 'general',
      description: 'Landscape 16:10, used on cards',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'internationalizedArrayString',
          validation: (rule) => rule.required().warning('Alt text is important for accessibility'),
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      type: 'internationalizedArrayText',
      group: 'general',
      description: 'Short description for cards and the case study header (max 220 characters)',
      validation: (rule) =>
        rule.custom((values) =>
          ((values ?? []) as {value?: string}[]).some((item) => (item.value?.length ?? 0) > 220)
            ? 'Max 220 characters per language'
            : true,
        ),
    }),
    defineField({
      name: 'stack',
      type: 'array',
      group: 'general',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'role',
      type: 'internationalizedArrayString',
      group: 'general',
      description: 'e.g. Design & development (solo)',
    }),
    defineField({
      name: 'platforms',
      type: 'internationalizedArrayString',
      group: 'general',
      description: 'e.g. Android · Google Play',
    }),
    defineField({
      name: 'architectureSummary',
      type: 'internationalizedArrayString',
      group: 'general',
      description: 'e.g. Offline-first, no backend',
    }),
    defineField({
      name: 'links',
      type: 'object',
      group: 'general',
      fields: [
        defineField({name: 'repo', title: 'Repository', type: 'url'}),
        defineField({name: 'live', title: 'Live site', type: 'url'}),
        defineField({name: 'store', title: 'Store', type: 'url'}),
        defineField({
          name: 'storeLabel',
          type: 'internationalizedArrayString',
          description: 'e.g. Download on Google Play',
        }),
      ],
    }),
    defineField({
      name: 'order',
      type: 'number',
      group: 'general',
      description: 'Tie-breaker for projects with the same release date (lists and previous/next navigation)',
    }),

    // Gallery
    defineField({
      name: 'gallery',
      type: 'array',
      group: 'gallery',
      description: 'Landscape 16:10 images, shown as a carousel',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'internationalizedArrayString',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'caption', type: 'internationalizedArrayString'}),
          ],
        }),
      ],
    }),

    // Architecture
    defineField({
      name: 'layersBoundary',
      type: 'internationalizedArrayString',
      group: 'architecture',
      description: 'Label of the dashed container, e.g. ON THE DEVICE',
    }),
    defineField({
      name: 'layers',
      type: 'array',
      group: 'architecture',
      of: [
        defineArrayMember({
          name: 'layer',
          type: 'object',
          components: {input: PaddedObjectInput},
          fields: [
            defineField({name: 'name', type: 'internationalizedArrayString', validation: (rule) => rule.required()}),
            defineField({name: 'tech', type: 'internationalizedArrayString', description: 'Technology or short description'}),
            defineField({
              name: 'icon',
              type: 'string',
              options: {list: LAYER_ICONS},
            }),
            defineField({
              name: 'group',
              type: 'string',
              options: {
                list: [
                  {title: 'Core (part of the app)', value: 'core'},
                  {title: 'Absent (intentionally not used)', value: 'absent'},
                ],
                layout: 'radio',
              },
              initialValue: 'core',
            }),
            defineField({
              name: 'connector',
              type: 'internationalizedArrayString',
              description: 'Label on the line below this layer, e.g. user actions',
            }),
            defineField({
              name: 'sideBySide',
              title: 'Side by side',
              type: 'boolean',
              description: 'Place this layer next to the following one',
              initialValue: false,
            }),
            defineField({
              name: 'decisions',
              type: 'array',
              description: 'Codes of related decisions, e.g. D1',
              of: [defineArrayMember({type: 'string'})],
              options: {layout: 'tags'},
              validation: (rule) =>
                rule.custom((codes, context) => {
                  if (!codes?.length) return true
                  const decisions = (context.document?.decisions ?? []) as {code?: string}[]
                  const known = new Set(decisions.map((d) => d.code))
                  const unknown = (codes as string[]).filter((code) => !known.has(code))
                  return unknown.length ? `Unknown decision code: ${unknown.join(', ')}` : true
                }),
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'tech', group: 'group'},
            prepare: ({title, subtitle, group}) => ({
              title: group === 'absent' ? `${localized(title)} (absent)` : localized(title),
              subtitle: localized(subtitle),
            }),
          },
        }),
      ],
    }),

    // Decisions
    defineField({
      name: 'decisions',
      type: 'array',
      group: 'decisions',
      of: [
        defineArrayMember({
          name: 'decision',
          type: 'object',
          components: {input: PaddedObjectInput},
          fields: [
            defineField({
              name: 'code',
              type: 'string',
              description: 'e.g. D1, also used as the #d1 anchor',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'title', type: 'internationalizedArrayString', validation: (rule) => rule.required()}),
            defineField({
              name: 'shortLabel',
              type: 'internationalizedArrayString',
              description: 'Short text for the layer badges, e.g. Offline-first',
            }),
            defineField({name: 'context', type: 'internationalizedArrayText'}),
            defineField({name: 'decision', type: 'internationalizedArrayText'}),
            defineField({name: 'tradeoff', type: 'internationalizedArrayText'}),
            defineField({name: 'alternatives', type: 'internationalizedArrayStringList'}),
          ],
          preview: {
            select: {code: 'code', title: 'title'},
            prepare: ({code, title}) => ({
              title: [code, localized(title)].filter(Boolean).join(' · '),
            }),
          },
        }),
      ],
      validation: (rule) =>
        rule.custom((decisions) => {
          const codes = ((decisions ?? []) as {code?: string}[]).map((d) => d.code).filter(Boolean)
          return new Set(codes).size === codes.length ? true : 'Decision codes must be unique'
        }),
    }),

    // SEO
    defineField({name: 'seoTitle', title: 'SEO title', type: 'internationalizedArrayString', group: 'seo'}),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'internationalizedArrayText',
      group: 'seo',
    }),
    defineField({name: 'ogImage', title: 'Open Graph image', type: 'image', group: 'seo'}),
  ],
  orderings: [
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'},
        {field: 'releaseDate', direction: 'desc'},
      ],
    },
    {
      title: 'Release date, newest',
      name: 'releaseDateDesc',
      by: [{field: 'releaseDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'kind', media: 'icon', hidden: 'hidden'},
    prepare: ({title, subtitle, media, hidden}) => ({
      title,
      subtitle: hidden ? ['Hidden', subtitle].filter(Boolean).join(' · ') : subtitle,
      media,
    }),
  },
})
