import { defineField, defineType } from 'sanity';

export const collectionSchema = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fieldsets: [
    {
      name: 'seoGroup',
      title: '🔍 SEO Metadata (Optional - Auto-falls back to Title & Excerpt)',
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
      name: 'title',
      title: 'Collection Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
          description: 'This field is required for accessibility and image SEO. Describe the image for accessibility and search engines. This should accurately explain what the image contains.',
        }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description (Portable Text)',
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
      description: 'List of tool IDs included in this collection.',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles & Playbooks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }, { type: 'playbook' }] }],
      fieldset: 'editorialGroup',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Collection Toggle',
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
      title: 'title',
      subtitle: 'excerpt',
      media: 'featuredImage',
    },
  },
});
