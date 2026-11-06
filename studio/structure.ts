import {CalendarIcon} from '@sanity/icons/Calendar'
import {CaseIcon} from '@sanity/icons/Case'
import {CogIcon} from '@sanity/icons/Cog'
import {DocumentPdfIcon} from '@sanity/icons/DocumentPdf'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {EyeClosedIcon} from '@sanity/icons/EyeClosed'
import {FilterIcon} from '@sanity/icons/Filter'
import {FolderIcon} from '@sanity/icons/Folder'
import {PlayIcon} from '@sanity/icons/Play'
import {ProjectsIcon} from '@sanity/icons/Projects'
import {StackIcon} from '@sanity/icons/Stack'
import {StarIcon} from '@sanity/icons/Star'
import {TagIcon} from '@sanity/icons/Tag'
import {UserIcon} from '@sanity/icons/User'
import {VideoIcon} from '@sanity/icons/Video'
import type {ComponentType} from 'react'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

const CATEGORIES = [
  {title: 'App', value: 'app'},
  {title: 'Web', value: 'web'},
  {title: 'Desktop', value: 'desktop'},
]

const KINDS = ['Mobile app', 'Web app', 'Website', 'Desktop app', 'Tool']

const projectList = (
  S: StructureBuilder,
  id: string,
  title: string,
  filter: string,
  params: Record<string, unknown> = {},
  icon?: ComponentType,
) =>
  S.listItem()
    .id(id)
    .title(title)
    .icon(icon)
    .child(
      S.documentList()
        .id(id)
        .title(title)
        .schemaType('project')
        .filter(`_type == "project" && (${filter})`)
        .params(params)
        .apiVersion('2025-01-01')
        .defaultOrdering([
          {field: 'order', direction: 'asc'},
          {field: 'releaseDate', direction: 'desc'},
        ])
        .initialValueTemplates([S.initialValueTemplateItem('project')]),
    )

export const structure: StructureResolver = (S, context) => {
  const client = context.getClient({apiVersion: '2025-01-01'})

  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Projects')
        .icon(ProjectsIcon)
        .child(
          S.list()
            .title('Projects')
            .items([
              S.listItem()
                .id('all-projects')
                .title('All projects')
                .icon(DocumentsIcon)
                .child(
                  S.documentTypeList('project')
                    .title('All projects')
                    .defaultOrdering([
                      {field: 'order', direction: 'asc'},
                      {field: 'releaseDate', direction: 'desc'},
                    ]),
                ),
              S.divider(),
              S.listItem()
                .id('by-category')
                .title('By category')
                .icon(FilterIcon)
                .child(
                  S.list()
                    .title('By category')
                    .items([
                      ...CATEGORIES.map(({title, value}) =>
                        projectList(S, `category-${value}`, title, 'category == $value', {value}),
                      ),
                      projectList(S, 'category-none', 'Uncategorized', '!defined(category)'),
                    ]),
                ),
              S.listItem()
                .id('by-kind')
                .title('By kind')
                .icon(TagIcon)
                .child(
                  S.list()
                    .title('By kind')
                    .items([
                      ...KINDS.map((kind) =>
                        projectList(
                          S,
                          `kind-${kind.toLowerCase().replace(/\s+/g, '-')}`,
                          kind,
                          'kind == $kind',
                          {kind},
                        ),
                      ),
                      projectList(S, 'kind-none', 'No kind', '!defined(kind)'),
                    ]),
                ),
              S.listItem()
                .id('by-year')
                .title('By year')
                .icon(CalendarIcon)
                .child(async () => {
                  const dates: string[] = await client.fetch(
                    'array::unique(*[_type == "project" && defined(releaseDate)].releaseDate)',
                  )
                  const years = [...new Set(dates.map((date) => date.slice(0, 4)))].sort(
                    (a, b) => Number(b) - Number(a),
                  )
                  return S.list()
                    .title('By year')
                    .items([
                      ...years.map((year) =>
                        projectList(
                          S,
                          `year-${year}`,
                          year,
                          'releaseDate >= $from && releaseDate <= $to',
                          {from: `${year}-01-01`, to: `${year}-12-31`},
                          FolderIcon,
                        ),
                      ),
                      projectList(S, 'year-none', 'No release date', '!defined(releaseDate)'),
                    ])
                }),
              S.divider(),
              projectList(S, 'client-work', 'Client work', 'isClientWork == true', {}, CaseIcon),
              projectList(S, 'personal', 'Personal', 'isClientWork != true', {}, UserIcon),
              projectList(S, 'hidden', 'Hidden', 'hidden == true', {}, EyeClosedIcon),
              S.divider(),
              S.listItem()
                .id('by-videos')
                .title('By videos')
                .icon(VideoIcon)
                .child(
                  S.list()
                    .title('By videos')
                    .items([
                      projectList(
                        S,
                        'videos-shown',
                        'With videos',
                        'count(videos[defined(asset)]) > 0 && hideVideos != true',
                        {},
                        PlayIcon,
                      ),
                      projectList(
                        S,
                        'videos-hidden',
                        'With hidden videos',
                        'count(videos[defined(asset)]) > 0 && hideVideos == true',
                        {},
                        EyeClosedIcon,
                      ),
                      projectList(
                        S,
                        'videos-none',
                        'Without videos',
                        'count(videos[defined(asset)]) == 0 || !defined(videos)',
                      ),
                    ]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site settings')
            .items([
              S.listItem()
                .title('Featured projects')
                .icon(StarIcon)
                .child(
                  S.document()
                    .schemaType('featuredProjects')
                    .documentId('featuredProjects')
                    .title('Featured projects'),
                ),
              S.listItem()
                .title('Stack')
                .icon(StackIcon)
                .child(S.document().schemaType('stack').documentId('stack').title('Stack')),
              S.listItem()
                .title('Resume')
                .icon(DocumentPdfIcon)
                .child(S.document().schemaType('resume').documentId('resume').title('Resume')),
            ]),
        ),
    ])
}
