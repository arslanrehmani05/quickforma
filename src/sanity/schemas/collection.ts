import { defineField, defineType } from 'sanity';

export const collectionSchema = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Collection Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description (Portable Text)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'relatedToolIds',
      title: 'Related QuickForma Tool IDs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of tool IDs included in this collection.',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles & Playbooks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }, { type: 'playbook' }] }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Meta Title)',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Collection Toggle',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'featuredImage',
    },
  },
});
