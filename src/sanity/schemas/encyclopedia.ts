import { defineField, defineType } from 'sanity';
import { TOOLS_CATALOG } from '../../data/toolsCatalog';

export const encyclopediaSchema = defineType({
  name: 'encyclopedia',
  title: 'Encyclopedia Entry',
  type: 'document',
  fieldsets: [
    { name: 'identity', title: '1. Identity & Definition', options: { collapsible: true, collapsed: false } },
    { name: 'content', title: '2. Adaptive Core Content', options: { collapsible: true, collapsed: false } },
    { name: 'relationships', title: '3. Structured Ecosystem Connections', options: { collapsible: true, collapsed: false } },
    { name: 'seo', title: '4. Search Engine Optimization', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // --- IDENTITY ---
    defineField({
      name: 'title',
      title: 'Concept Title',
      type: 'string',
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
      description: 'The main concept name (e.g. Gross Margin, Accounts Payable, EOQ).',
    }),
    defineField({
      name: 'slug',
      title: 'URL Handle (Slug)',
      type: 'slug',
      fieldset: 'identity',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'previousSlugs',
      title: 'Previous Slugs (301 Redirects)',
      type: 'array',
      fieldset: 'identity',
      of: [{ type: 'string' }],
      description: 'Former URL handles. Visitor hits to these legacy paths will 301 redirect automatically.',
    }),
    defineField({
      name: 'shortDefinition',
      title: 'Short Direct Definition',
      type: 'text',
      rows: 3,
      fieldset: 'identity',
      validation: (Rule) => Rule.required().max(350),
      description: '1-3 sentence crisp definition shown at top of entry & in search summaries.',
    }),
    defineField({
      name: 'categories',
      title: 'E-Categories',
      type: 'array',
      fieldset: 'identity',
      of: [{ type: 'reference', to: [{ type: 'eCategory' }] }],
      validation: (Rule) => Rule.required().min(1),
      description: 'Select one or more Encyclopedia categories for this concept.',
    }),
    defineField({
      name: 'category',
      title: 'Legacy Single Category (Optional)',
      type: 'reference',
      to: [{ type: 'eCategory' }],
      fieldset: 'identity',
      description: 'Legacy single category reference fallback.',
    }),
    defineField({
      name: 'synonyms',
      title: 'Synonyms / Alternative Names',
      type: 'array',
      fieldset: 'identity',
      of: [{ type: 'string' }],
      description: 'Other common names for this concept (e.g. Gross Profit Ratio, Trading Margin).',
    }),

    // --- ADAPTIVE CORE CONTENT ---
    defineField({
      name: 'simpleExplanation',
      title: 'Simple Explanation',
      type: 'array',
      fieldset: 'content',
      of: [{ type: 'block' }],
      description: 'Plain English breakdown explaining the concept intuitively.',
    }),
    defineField({
      name: 'howItWorks',
      title: 'How It Works',
      type: 'array',
      fieldset: 'content',
      of: [{ type: 'block' }],
      description: 'Underlying mechanics, process steps, or regulatory/operational framework.',
    }),
    defineField({
      name: 'formulaMethod',
      title: 'Formula / Calculation Method',
      type: 'array',
      fieldset: 'content',
      of: [{ type: 'block' }],
      description: 'Mathematical equation, formula breakdown, or step-by-step calculation method.',
    }),
    defineField({
      name: 'workedExample',
      title: 'Worked Example',
      type: 'array',
      fieldset: 'content',
      of: [{ type: 'block' }],
      description: 'Real numeric scenario demonstrating inputs, processing, and final output.',
    }),
    defineField({
      name: 'interpretation',
      title: 'How to Interpret It',
      type: 'array',
      fieldset: 'content',
      of: [{ type: 'block' }],
      description: 'Common mistakes, misconceptions, limitations, and factors that can make the calculated result inappropriate.',
    }),
    defineField({
      name: 'realWorldApplications',
      title: 'Real-World Applications',
      type: 'array',
      fieldset: 'content',
      of: [{ type: 'block' }],
      description: 'Practical industry use cases across e-commerce, manufacturing, finance, etc.',
    }),
    defineField({
      name: 'commonMistakes',
      title: 'Common Mistakes & Misconceptions',
      type: 'array',
      fieldset: 'content',
      of: [{ type: 'block' }],
      description: 'Frequent errors professionals or students make when applying this concept.',
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      fieldset: 'content',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Question & Answer',
          fields: [
            { name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
          ],
        },
      ],
    }),

    // --- STRUCTURED ECOSYSTEM CONNECTIONS ---
    defineField({
      name: 'relatedTools',
      title: 'QuickForma Tools',
      type: 'array',
      fieldset: 'relationships',
      of: [
        {
          type: 'string',
          options: {
            list: TOOLS_CATALOG.map((tool) => ({
              title: `${tool.name} [${tool.category}]`,
              value: tool.id,
            })),
          },
        },
      ],
      description: 'Select one or more QuickForma tools from the dropdown.',
    }),
    defineField({
      name: 'relatedConcepts',
      title: 'Related Encyclopedia Concepts',
      type: 'array',
      fieldset: 'relationships',
      of: [{ type: 'reference', to: [{ type: 'encyclopedia' }] }],
      description: 'Cross-reference complementary concepts in the QuickForma Encyclopedia.',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Ledger Guides',
      type: 'array',
      fieldset: 'relationships',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      description: 'Link to deep-dive editorial guides on the Ledger.',
    }),

    // --- SEO SUITE ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Google Headline)',
      type: 'string',
      fieldset: 'seo',
      description: 'Custom headline snippet for search results (max 70 characters). Defaults to title.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      fieldset: 'seo',
      description: 'Custom snippet description (max 160 characters). Defaults to short definition.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.name',
      shortDefinition: 'shortDefinition',
    },
    prepare({ title, category, shortDefinition }) {
      return {
        title: title || 'Untitled Entry',
        subtitle: `${category ? `[${category}] ` : ''}${shortDefinition || ''}`,
      };
    },
  },
});
