import {defineField, defineType} from 'sanity'
import {term} from '../util/constants'

export default defineType({
  name: 'adviser',
  title: 'Adviser',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'object',
      // validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          options: {list: [{title: 'Adviser', value: 'Adviser'}]},
        },
      ],
    }),
    defineField({
      name: 'current_term',
      title: 'Term',
      type: 'string',
      options: {
        list: term,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
