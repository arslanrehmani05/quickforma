import { defineField, defineType } from 'sanity';

export const contentBriefSchema = defineType({
  name: 'contentBrief',
  title: 'Content Brief',
  type: 'document',
  fields: [
    defineField({
      name: 'briefTitle',
      title: 'Content Brief Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
      placeholder: 'e.g. Content Brief: Ultimate Guide to Freelance Invoicing 2026',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'briefTitle',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'searchIntent',
      title: 'Primary Search Intent',
      type: 'reference',
      to: [{ type: 'searchIntentItem' }],
      description: 'The Search Intent this brief is designed to capture.',
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Target Keyword',
      type: 'reference',
      to: [{ type: 'keywordItem' }],
    }),
    defineField({
      name: 'topicCluster',
      title: 'Topic Cluster',
      type: 'reference',
      to: [{ type: 'topicCluster' }],
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience / Persona',
      type: 'string',
      placeholder: 'e.g. US Freelance Web Developers & Designers',
    }),
    defineField({
      name: 'questionsToAnswer',
      title: 'AEO Questions to Answer',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'questionItem' }] }],
      description: 'Real user questions that must be answered in direct 40-60 word answer blocks.',
    }),
    defineField({
      name: 'competitorUrls',
      title: 'Competitor URLs to Outrank',
      type: 'array',
      of: [{ type: 'url' }],
    }),
    defineField({
      name: 'outlineText',
      title: 'Article Outline (H2 / H3 Structure)',
      type: 'text',
      rows: 6,
      description: 'Section by section outline detailing key takeaways and worked examples.',
    }),
    defineField({
      name: 'requiredInternalLinks',
      title: 'Required Internal Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
    }),
    defineField({
      name: 'primaryToolId',
      title: 'Primary QuickForma Tool Catalog ID',
      type: 'string',
      placeholder: 'e.g. invoice-generator, freelance-hourly-rate-calculator',
    }),
    defineField({
      name: 'successCriteria',
      title: 'Success Criteria & Key Takeaways',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'assignedWriter',
      title: 'Assigned Author / Writer',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'briefStatus',
      title: 'Brief Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft Brief', value: 'draft' },
          { title: 'Approved Brief', value: 'approved' },
          { title: 'In Writing', value: 'in_writing' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'approved',
    }),
  ],
  preview: {
    select: {
      title: 'briefTitle',
      subtitle: 'briefStatus',
    },
  },
});
