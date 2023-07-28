import {defineField, defineType} from 'sanity'
import {positions, term} from '../util/constants'

export default defineType({
  name: 'officer',
  title: 'Officer',
  type: 'document',
  fields: [
    defineField({
      name: 'first_name',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'last_name',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: positions,
      },
    }),
    defineField({
      name: 'current_term',
      title: 'Term',
      type: 'array',
      of: [{type: 'reference', to: {type: 'term'}}],
    }),
  ],
})
