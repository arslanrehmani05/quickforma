import { defineField, defineType } from 'sanity';

export const competitorIntelSchema = defineType({
  name: 'competitorIntel',
  title: 'Strategic Competitor Intelligence',
  type: 'document',
  fields: [
    defineField({
      name: 'competitorName',
      title: 'Competitor Page / Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      placeholder: 'e.g. FreshBooks Invoice Guide, Wave Accounting Blog',
    }),
    defineField({
      name: 'domain',
      title: 'Competitor Page URL',
      type: 'url',
    }),
    defineField({
      name: 'notes',
      title: 'Strategic Notes & Observations',
      type: 'text',
      rows: 3,
      description: 'Key insights into their content strategy, gaps, and weaknesses.',
    }),
    defineField({
      name: 'whyItRanks',
      title: 'Why Does It Rank?',
      type: 'text',
      rows: 2,
      description: 'Key ranking factors (e.g. High domain authority, early mover advantage, custom interactive tool).',
    }),
    defineField({
      name: 'canWeBeatThem',
      title: 'Can We Outrank Them?',
      type: 'string',
      options: {
        list: [
          { title: 'Yes - Clear Superior Tool / Better Content', value: 'yes' },
          { title: 'Maybe - Requires Domain Authority Growth', value: 'maybe' },
          { title: 'No - Heavy Brand Moat', value: 'no' },
        ],
      },
      initialValue: 'yes',
    }),
    defineField({
      name: 'targetedKeywords',
      title: 'Targeted Keywords',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'keywordItem' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'competitorName',
      subtitle: 'canWeBeatThem',
    },
  },
});
