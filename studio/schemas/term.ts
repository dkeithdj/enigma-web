import {defineField, defineType} from 'sanity'
import {term} from '../util/constants'

export default defineType({
  name: 'term',
  title: 'Term',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      options: {
        list: term,
      },
    }),
  ],
})
