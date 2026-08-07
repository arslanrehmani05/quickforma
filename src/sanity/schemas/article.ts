import { defineField, defineType } from 'sanity';

export const articleSchema = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
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
      validation: (Rule) => Rule.required().min(20).max(300),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Rich Text Body (Portable Text)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
        {
          type: 'code',
          title: 'Code Block',
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),

    // SEO Fieldset
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Meta Title)',
      type: 'string',
      description: 'Defaults to article title if blank. Ideal length: 50-60 characters.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Ideal length: 140-155 characters.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL Override',
      type: 'url',
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Target Keyword',
      type: 'string',
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary LSI Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'searchIntent',
      title: 'Search Intent Classification',
      type: 'string',
      options: {
        list: [
          { title: 'Transactional', value: 'transactional' },
          { title: 'Informational', value: 'informational' },
          { title: 'Instructional', value: 'instructional' },
          { title: 'Comparative', value: 'comparative' },
          { title: 'Reassurance', value: 'reassurance' },
        ],
      },
    }),

    // Relationships
    defineField({
      name: 'relatedToolIds',
      title: 'Related QuickForma Tool IDs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tool IDs matching catalog (e.g. freelance-hourly-rate-calculator, invoice-generator, paypal-fee-calculator)',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }, { type: 'playbook' }] }],
    }),

    // Publishing
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article Toggle',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'draftStatus',
      title: 'Editorial Draft Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'In Review', value: 'review' },
          { title: 'Approved', value: 'approved' },
          { title: 'Published', value: 'published' },
        ],
      },
      initialValue: 'draft',
    }),

    // Additional
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
      initialValue: 'intermediate',
    }),
    defineField({
      name: 'estimatedCompletionTime',
      title: 'Estimated Completion Time',
      type: 'string',
      placeholder: 'e.g. 15 minutes, 1 hour',
      description: 'Estimates how long it takes to complete the tutorial or implement the process.',
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Reading Time',
      type: 'string',
      placeholder: 'e.g. 7 min read',
    }),
    defineField({
      name: 'enableTableOfContents',
      title: 'Enable Table of Contents',
      type: 'boolean',
      initialValue: true,
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
