import { defineField, defineType } from 'sanity';

export const topicClusterSchema = defineType({
  name: 'topicCluster',
  title: 'Topic Cluster',
  type: 'document',
  fields: [
    defineField({
      name: 'topicName',
      title: 'Topic Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
      description: 'Business topic pillar (e.g. "Freelance Invoicing & Billing")',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'topicName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Strategic Overview',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'pillarArticle',
      title: 'Pillar Page (Main Comprehensive Guide)',
      type: 'reference',
      to: [{ type: 'article' }],
      description: 'The core foundational pillar post for this topic cluster.',
    }),
    defineField({
      name: 'supportingArticles',
      title: 'Supporting Articles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      description: 'Sub-topic articles interlinked back to the pillar page.',
    }),
    defineField({
      name: 'relatedTools',
      title: 'Related QuickForma Tool Catalog IDs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of tool catalog IDs (e.g. invoice-generator, paypal-fee-calculator)',
    }),
    defineField({
      name: 'roadmapStatus',
      title: 'Content Roadmap Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planning Phase', value: 'planning' },
          { title: 'In Progress (25% Covered)', value: 'in_progress_25' },
          { title: 'Half Covered (50% Covered)', value: 'in_progress_50' },
          { title: 'Substantially Covered (75% Covered)', value: 'in_progress_75' },
          { title: 'Fully Covered (100% Complete)', value: 'completed' },
        ],
      },
      initialValue: 'planning',
    }),
  ],
  preview: {
    select: {
      title: 'topicName',
      subtitle: 'roadmapStatus',
    },
  },
});
