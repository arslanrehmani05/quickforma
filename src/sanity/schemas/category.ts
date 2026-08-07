import { defineField, defineType } from 'sanity';

export const categorySchema = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
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
      rows: 3,
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Category Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Used for manual sorting of categories throughout the website.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
});
