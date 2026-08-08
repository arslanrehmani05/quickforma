import { defineField, defineType } from 'sanity';

export const researchSprintSchema = defineType({
  name: 'researchSprint',
  title: 'Research Sprint Log',
  type: 'document',
  fields: [
    defineField({
      name: 'sprintName',
      title: 'Research Sprint Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      placeholder: 'e.g. Q3 Freelance Invoicing & Tax SEMrush Research Sprint',
    }),
    defineField({
      name: 'researchDate',
      title: 'Research Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'discoveredKeywords',
      title: 'Discovered Keywords',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'keywordItem' }] }],
    }),
    defineField({
      name: 'observations',
      title: 'Strategic Observations & Competitor Gaps',
      type: 'text',
      rows: 4,
      description: 'Document key findings, unexpected low-KD opportunities, and competitor content weaknesses.',
    }),
  ],
  preview: {
    select: {
      title: 'sprintName',
      subtitle: 'researchDate',
    },
  },
});
