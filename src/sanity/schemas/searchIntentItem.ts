import { defineField, defineType } from 'sanity';

export const searchIntentItemSchema = defineType({
  name: 'searchIntentItem',
  title: 'Search Intent Owner',
  type: 'document',
  fields: [
    defineField({
      name: 'intentHeadline',
      title: 'Intent Headline / Core Problem',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
      description: 'e.g. "Generate Invoices Online" or "Calculate Freelance Hourly Rate"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'intentHeadline',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intentType',
      title: 'Intent Type',
      type: 'string',
      options: {
        list: [
          { title: 'Transactional (Tool / Generator)', value: 'transactional' },
          { title: 'Informational (Guide / Definition)', value: 'informational' },
          { title: 'Commercial (Comparison / Pricing)', value: 'commercial' },
          { title: 'Navigational (Brand / Direct)', value: 'navigational' },
        ],
      },
      initialValue: 'informational',
    }),
    defineField({
      name: 'topicCluster',
      title: 'Topic Cluster',
      type: 'reference',
      to: [{ type: 'topicCluster' }],
      description: 'The parent Topic Cluster this search intent belongs to.',
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience / Persona',
      type: 'string',
      placeholder: 'e.g. US Freelancers, SMB Financial Operations',
    }),
    defineField({
      name: 'primaryOwner',
      title: 'Primary Owner Document (1 Article = 1 Intent)',
      type: 'reference',
      to: [{ type: 'article' }, { type: 'playbook' }, { type: 'collection' }, { type: 'glossary' }],
      description: 'Strict 1:1 Intent Ownership. Only ONE live article can own this search intent.',
    }),
    defineField({
      name: 'keywordVariations',
      title: 'Keywords Belonging to this Intent',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'keywordItem' }] }],
      description: 'List of keyword variations sharing this exact same search intent.',
    }),
  ],
  preview: {
    select: {
      title: 'intentHeadline',
      subtitle: 'intentType',
    },
  },
});
