import { defineField, defineType } from 'sanity';

export const questionItemSchema = defineType({
  name: 'questionItem',
  title: 'Question & AEO Answer Library',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Real User Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The exact question real users ask AI search engines (e.g. "What is the average freelance rate for web developers?")',
    }),
    defineField({
      name: 'searchIntent',
      title: 'Target Search Intent Group',
      type: 'reference',
      to: [{ type: 'searchIntentItem' }],
    }),
    defineField({
      name: 'directAnswerBlock',
      title: 'Direct Answer Block (40-60 Words)',
      type: 'text',
      rows: 4,
      description: 'Concise direct answer optimized for AI Overviews, Perplexity, and ChatGPT Search snippets.',
    }),
    defineField({
      name: 'sourceReference',
      title: 'Source / Authoritative Reference',
      type: 'string',
      placeholder: 'e.g. IRS Publication 535, QuickForma Benchmark Survey 2026',
    }),
    defineField({
      name: 'coveredDocument',
      title: 'Covered In Article',
      type: 'reference',
      to: [{ type: 'article' }],
      description: 'The live article that answers this question.',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'directAnswerBlock',
    },
  },
});
