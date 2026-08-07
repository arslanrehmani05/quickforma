import { defineField, defineType } from 'sanity';

export const tagSchema = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tag Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Short explanation of the tag for tag landing pages.',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Used for manual sorting of tags.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
});
