import { defineField, defineType } from 'sanity';

export const playbookSchema = defineType({
  name: 'playbook',
  title: 'Business Playbook',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Playbook Title',
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
      title: 'Executive Summary / Excerpt',
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
      title: 'Playbook Body (Portable Text)',
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
          title: 'Code / Math Formula Block',
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
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
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
      title: 'Related Articles & Playbooks',
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
      title: 'Featured Playbook Toggle',
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

    // Strategic Business Outcome
    defineField({
      name: 'businessImpact',
      title: 'Business Impact Outcome',
      type: 'string',
      options: {
        list: [
          { title: 'Revenue Growth', value: 'Revenue Growth' },
          { title: 'Cost Reduction', value: 'Cost Reduction' },
          { title: 'Productivity', value: 'Productivity' },
          { title: 'Operational Efficiency', value: 'Operational Efficiency' },
          { title: 'Compliance', value: 'Compliance' },
          { title: 'Decision Making', value: 'Decision Making' },
        ],
      },
    }),

    // Additional
    defineField({
      name: 'readTime',
      title: 'Estimated Reading Time',
      type: 'string',
      placeholder: 'e.g. 15 min read',
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
