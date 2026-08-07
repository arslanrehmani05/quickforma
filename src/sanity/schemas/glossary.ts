import { defineField, defineType } from 'sanity';

export const glossarySchema = defineType({
  name: 'glossary',
  title: 'Glossary Term',
  type: 'document',
  fieldsets: [
    {
      name: 'seoGroup',
      title: '🔍 SEO Metadata (Optional - Auto-falls back to Term & Definition)',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'socialGroup',
      title: '🌐 Social Sharing Previews (Optional - Auto-falls back to SEO)',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'editorialGroup',
      title: '⚙️ Advanced Editorial & Governance Controls (Optional)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'term',
      title: 'Business Term',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'term',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'definition',
      title: 'Short Definition',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formula',
      title: 'Formula / Mathematical Model',
      type: 'string',
      placeholder: 'e.g. ROI = ((Net Profit) / (Total Investment Cost)) * 100',
    }),
    defineField({
      name: 'detailedExplanation',
      title: 'Detailed Explanation (Portable Text)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),

    // SEO Fieldset (Collapsible & Collapsed by Default)
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Meta Title)',
      type: 'string',
      fieldset: 'seoGroup',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      fieldset: 'seoGroup',
    }),

    // Social Sharing Fieldset (Collapsible & Collapsed by Default)
    defineField({
      name: 'socialTitle',
      title: 'Social Title',
      type: 'string',
      fieldset: 'socialGroup',
      validation: (Rule) => Rule.max(60),
      description: 'Optional title used only when this page is shared. If left blank, QuickForma automatically uses the SEO values.',
    }),
    defineField({
      name: 'socialDescription',
      title: 'Social Description',
      type: 'text',
      rows: 2,
      fieldset: 'socialGroup',
      validation: (Rule) => Rule.max(160),
      description: 'Optional description used only for social sharing. If left blank, QuickForma automatically uses the SEO values.',
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Share Image',
      type: 'image',
      fieldset: 'socialGroup',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the social image for accessibility.',
        }),
      ],
      description: 'Optional image used for Open Graph and social sharing. If left blank, QuickForma automatically uses the SEO values.',
    }),

    // Advanced Editorial Controls (Collapsible & Collapsed by Default)
    defineField({
      name: 'relatedToolIds',
      title: 'Related QuickForma Tool IDs',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'editorialGroup',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      fieldset: 'editorialGroup',
    }),
    defineField({
      name: 'relatedPlaybooks',
      title: 'Related Business Playbooks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'playbook' }] }],
      fieldset: 'editorialGroup',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Term Toggle',
      type: 'boolean',
      fieldset: 'editorialGroup',
      initialValue: false,
    }),
    defineField({
      name: 'editorsPick',
      title: "Editor's Pick",
      type: 'boolean',
      fieldset: 'editorialGroup',
      initialValue: false,
      description: 'Highlights top-tier editorial picks across landing pages.',
    }),
    defineField({
      name: 'isEvergreen',
      title: 'Evergreen Content',
      type: 'boolean',
      fieldset: 'editorialGroup',
      initialValue: true,
      description: 'Designates foundational, long-term non-decaying content.',
    }),
    defineField({
      name: 'lastReviewedAt',
      title: 'Last Reviewed Date',
      type: 'datetime',
      fieldset: 'editorialGroup',
      description: 'Timestamp when content facts and formulas were last audited.',
    }),
    defineField({
      name: 'reviewedBy',
      title: 'Reviewed By (Author)',
      type: 'reference',
      to: [{ type: 'author' }],
      fieldset: 'editorialGroup',
      description: 'Expert author who conducted the technical/financial review.',
    }),
  ],
  preview: {
    select: {
      title: 'term',
      subtitle: 'definition',
    },
  },
});
