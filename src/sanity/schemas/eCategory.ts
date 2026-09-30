import { defineField, defineType } from 'sanity';

export const eCategorySchema = defineType({
  name: 'eCategory',
  title: 'E-Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The name of the Encyclopedia category (e.g. Finance & Accounting, Operations & Supply Chain).',
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
      description: 'A brief description of this category for hub cards and headers.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      description: 'Snippet text for search engines (max 160 characters).',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Category Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
          description: 'Accessibility alt text describing the image.',
        }),
      ],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Used for sorting categories throughout the website.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
});
