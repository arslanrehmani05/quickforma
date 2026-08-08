import { defineField, defineType } from 'sanity';

export const keywordItemSchema = defineType({
  name: 'keywordItem',
  title: 'Keyword Vault Item',
  type: 'document',
  fields: [
    defineField({
      name: 'keyword',
      title: 'Keyword String',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The exact search term from SEMrush (e.g. "invoice generator")',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'keyword',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'searchVolume',
      title: 'Monthly Search Volume (SEMrush)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'keywordDifficulty',
      title: 'Keyword Difficulty % (0-100 KD)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 0,
    }),
    defineField({
      name: 'businessValue',
      title: 'Business Value Score (1-10)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(10),
      initialValue: 5,
      description: 'How directly this keyword drives calculator usage, tool signups, or revenue.',
    }),
    defineField({
      name: 'opportunityScore',
      title: 'Opportunity Score (0-100)',
      type: 'number',
      description: 'Calculated metric based on Search Volume, KD%, Business Value, and SERP Opportunities.',
    }),
    defineField({
      name: 'searchIntentGroup',
      title: 'Search Intent Group',
      type: 'reference',
      to: [{ type: 'searchIntentItem' }],
      description: 'The parent Search Intent this keyword variation maps to.',
    }),
    defineField({
      name: 'country',
      title: 'Target Country',
      type: 'string',
      initialValue: 'US',
    }),
    defineField({
      name: 'serpFeatures',
      title: 'SERP Features Present',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'AI Overview', value: 'ai_overview' },
          { title: 'Featured Snippet', value: 'featured_snippet' },
          { title: 'People Also Ask', value: 'people_also_ask' },
          { title: 'Calculator Widget', value: 'calculator' },
          { title: 'Video Carousel', value: 'video' },
          { title: 'Local Pack', value: 'local_pack' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Keyword Lifecycle Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Researching', value: 'researching' },
          { title: 'Approved', value: 'approved' },
          { title: 'Assigned', value: 'assigned' },
          { title: 'Published', value: 'published' },
          { title: 'Ranking', value: 'ranking' },
          { title: 'Needs Refresh', value: 'needs_refresh' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'historyLog',
      title: 'Status History Log',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'status', title: 'Status', type: 'string' }),
            defineField({ name: 'timestamp', title: 'Timestamp', type: 'datetime' }),
            defineField({ name: 'note', title: 'Note / Observation', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'researchSprint',
      title: 'Research Sprint Discovered In',
      type: 'reference',
      to: [{ type: 'researchSprint' }],
    }),
  ],
  preview: {
    select: {
      title: 'keyword',
      subtitle: 'status',
      volume: 'searchVolume',
      kd: 'keywordDifficulty',
    },
    prepare({ title, subtitle, volume, kd }) {
      return {
        title,
        subtitle: `Status: ${subtitle || 'New'} | Vol: ${volume || 0} | KD: ${kd || 0}%`,
      };
    },
  },
});
