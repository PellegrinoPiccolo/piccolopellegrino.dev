import {DocumentPdfIcon} from '@sanity/icons/DocumentPdf'
import {defineField, defineType} from 'sanity'

export const resume = defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      name: 'file',
      title: 'PDF',
      type: 'file',
      description: 'Downloadable from the site. Leave empty to hide the download button',
      options: {accept: 'application/pdf'},
    }),
    defineField({
      name: 'fileName',
      type: 'string',
      description: 'Name of the downloaded file',
      initialValue: 'Pellegrino-Piccolo-CV.pdf',
      validation: (rule) =>
        rule.regex(/^[\w.-]+\.pdf$/, {name: 'PDF file name'}).warning(
          'Use letters, numbers, dots, dashes or underscores, ending in .pdf',
        ),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Resume'}),
  },
})
