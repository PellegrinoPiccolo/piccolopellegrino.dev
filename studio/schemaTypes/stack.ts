import {StackIcon} from '@sanity/icons/Stack'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {PaddedObjectInput} from '../components/PaddedObjectInput'
import {localized} from '../languages'

export const stack = defineType({
  name: 'stack',
  title: 'Stack',
  type: 'document',
  icon: StackIcon,
  fields: [
    defineField({
      name: 'groups',
      type: 'array',
      description: 'Shown in this order',
      of: [
        defineArrayMember({
          name: 'stackGroup',
          type: 'object',
          components: {input: PaddedObjectInput},
          fields: [
            defineField({
              name: 'title',
              type: 'internationalizedArrayString',
              description: 'e.g. Mobile',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'items',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              options: {layout: 'tags'},
              validation: (rule) => rule.required().min(1).unique(),
            }),
            defineField({
              name: 'projects',
              type: 'array',
              description: 'Linked in the "Used in" line',
              of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
              validation: (rule) => rule.unique(),
            }),
            defineField({
              name: 'note',
              type: 'internationalizedArrayString',
              description: 'Shown after the linked projects, or alone if there are none, e.g. this portfolio',
            }),
          ],
          preview: {
            select: {title: 'title', items: 'items'},
            prepare: ({title, items}) => ({
              title: localized(title),
              subtitle: (items as string[] | undefined)?.join(' · '),
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Stack'}),
  },
})
