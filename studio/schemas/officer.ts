import {defineField, defineType} from 'sanity'
import {position_hierarchy, positions, program, term, year_level} from '../util/constants'

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
        {name: 'title', title: 'Title', type: 'string', options: {list: positions}},
        {
          name: 'hierarchy',
          title: 'Hierarchy',
          type: 'number',
          options: {list: position_hierarchy},
        },
      ],
    }),
    defineField({
      name: 'program',
      title: 'Program',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: program,
      },
    }),
    defineField({
      name: 'year_level',
      title: 'Year Level',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: year_level,
      },
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
