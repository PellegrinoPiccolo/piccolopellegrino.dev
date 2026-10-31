import {StackIcon} from '@sanity/icons/Stack'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {PaddedObjectInput} from '../components/PaddedObjectInput'

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
              type: 'string',
              placeholder: 'Mobile',
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
              type: 'string',
              description: 'Shown after the linked projects, or alone if there are none',
              placeholder: 'this portfolio',
            }),
          ],
          preview: {
            select: {title: 'title', items: 'items'},
            prepare: ({title, items}) => ({
              title,
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
