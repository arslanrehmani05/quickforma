import { defineField, defineType } from 'sanity';

export const competitorIntelSchema = defineType({
  name: 'competitorIntel',
  title: 'Strategic Competitor Intelligence',
  type: 'document',
  fields: [
    defineField({
      name: 'competitorName',
      title: 'Competitor / Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      placeholder: 'e.g. FreshBooks Blog, Wave Accounting Guides',
    }),
    defineField({
      name: 'domain',
      title: 'Website Domain',
      type: 'url',
    }),
    defineField({
      name: 'observations',
      title: 'Strategic Observations',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'strengths',
      title: 'Competitor Strengths',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'weaknesses',
      title: 'Competitor Weaknesses & Gaps',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'canWeBeatThem',
      title: 'Can We Outrank Them?',
      type: 'string',
      options: {
        list: [
          { title: 'Yes - Clear Angle / Superior Tool', value: 'yes' },
          { title: 'Maybe - Requires High Authority', value: 'maybe' },
          { title: 'No - High Brand Moat', value: 'no' },
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
