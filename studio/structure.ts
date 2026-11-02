import {CogIcon} from '@sanity/icons/Cog'
import {DocumentPdfIcon} from '@sanity/icons/DocumentPdf'
import {StackIcon} from '@sanity/icons/Stack'
import {StarIcon} from '@sanity/icons/Star'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Projects')
        .schemaType('project')
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .defaultOrdering([
              {field: 'order', direction: 'asc'},
              {field: 'releaseDate', direction: 'desc'},
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
