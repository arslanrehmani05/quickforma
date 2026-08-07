import { defineField, defineType } from 'sanity';

export const glossarySchema = defineType({
  name: 'glossary',
  title: 'Glossary Term',
  type: 'document',
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
      name: 'detailedExplanation',
      title: 'Detailed Explanation (Portable Text)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'formula',
      title: 'Formula / Mathematical Model',
      type: 'string',
      placeholder: 'e.g. ROI = ((Net Profit) / (Total Investment Cost)) * 100',
    }),
    defineField({
      name: 'relatedToolIds',
      title: 'Related QuickForma Tool IDs',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
    }),
    defineField({
      name: 'relatedPlaybooks',
      title: 'Related Business Playbooks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'playbook' }] }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Meta Title)',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
    }),
    // Social Sharing Fieldset
    defineField({
      name: 'socialTitle',
      title: 'Social Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      description: 'Optional title used only when this page is shared. If left blank, QuickForma automatically uses the SEO values.',
    }),
    defineField({
      name: 'socialDescription',
      title: 'Social Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      description: 'Optional description used only for social sharing. If left blank, QuickForma automatically uses the SEO values.',
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Share Image',
      type: 'image',
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
    defineField({
      name: 'featured',
      title: 'Featured Term Toggle',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'term',
      subtitle: 'definition',
    },
  },
});
