import {StarIcon} from '@sanity/icons/Star'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const featuredProjects = defineType({
  name: 'featuredProjects',
  title: 'Featured projects',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'projects',
      type: 'array',
      description: 'Shown on the home page, in this order',
      of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Featured projects'}),
  },
})
