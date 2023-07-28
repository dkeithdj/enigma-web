import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'documents',
  title: 'Documents',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'google drive url',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
    }),
  ],
})
