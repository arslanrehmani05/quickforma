import { defineField, defineType } from 'sanity';

export const articleSchema = defineType({
  name: 'article',
  title: 'Article',
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
      title: 'Article Title',
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
      validation: (Rule) => Rule.required().min(20).max(300),
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
      name: 'body',
      title: 'Rich Text Body (Portable Text)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),

    // Growth OS Integrations
    defineField({
      name: 'primarySearchIntentRef',
      title: '🧠 Primary Search Intent (1 Article = 1 Intent Owner)',
      type: 'reference',
      to: [{ type: 'searchIntentItem' }],
      description: 'Select the Primary Search Intent this article owns. Intent ownership is strictly enforced to prevent search cannibalization.',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value?._ref) return true;
          const client = context.getClient({ apiVersion: '2024-01-01' });
          const docId = context.document?._id ? context.document._id.replace('drafts.', '') : '';
          const existingOwner = await client.fetch(
            `*[_type in ["article", "playbook", "collection", "glossary"] && primarySearchIntentRef._ref == $intentId && _id != $docId && _id != $draftDocId][0]{ title, slug, _type }`,
            { intentId: value._ref, docId, draftDocId: `drafts.${docId}` }
          );
          if (existingOwner) {
            return `⛔ CANNIBALIZATION BLOCKED: Search Intent is already owned by "${existingOwner.title}" (${existingOwner._type})! Transfer ownership in the Intent Vault or select another Search Intent.`;
          }
          return true;
        }),
    }),
    defineField({
      name: 'secondaryKeywordRefs',
      title: '💎 Secondary Supporting Keywords',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'keywordItem' }] }],
      description: 'Select supporting keyword variations targeted in subheadings or sections.',
    }),
    defineField({
      name: 'lifecycleStatus',
      title: '🚥 Content Lifecycle Status (10 Stages)',
      type: 'string',
      options: {
        list: [
          { title: '💡 1. Idea', value: 'idea' },
          { title: '📌 2. Planned', value: 'planned' },
          { title: '🔬 3. Research', value: 'research' },
          { title: '📝 4. Brief', value: 'brief' },
          { title: '✍️ 5. Writing', value: 'writing' },
          { title: '🔍 6. Editing', value: 'editing' },
          { title: '⚙️ 7. SEO Review', value: 'seo' },
          { title: '🟢 8. Published', value: 'published' },
          { title: '📈 9. Ranking', value: 'ranking' },
          { title: '🔄 10. Refreshing Needed', value: 'refreshing' },
        ],
      },
      initialValue: 'writing',
    }),

    // SEO Fieldset (Collapsible & Collapsed by Default)
    defineField({
      name: 'overrideSeo',
      title: '✏️ Override SEO Meta Tags',
      type: 'boolean',
      fieldset: 'seoGroup',
      initialValue: false,
      description: 'By default, QuickForma automatically generates SEO tags from your Article Title and Excerpt. Check this box only if you need custom SEO overrides.',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Meta Title)',
      type: 'string',
      fieldset: 'seoGroup',
      hidden: ({ document }) => !document?.overrideSeo,
      description: 'Ideal length: 50-60 characters. Search engines truncate beyond 60.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      fieldset: 'seoGroup',
      hidden: ({ document }) => !document?.overrideSeo,
      description: 'Ideal length: 140-155 characters. Snippet preview on Google results.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL Override',
      type: 'url',
      fieldset: 'seoGroup',
      hidden: ({ document }) => !document?.overrideSeo,
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Target Keyword',
      type: 'string',
      fieldset: 'seoGroup',
      hidden: ({ document }) => !document?.overrideSeo,
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary LSI Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'seoGroup',
      hidden: ({ document }) => !document?.overrideSeo,
    }),
    defineField({
      name: 'searchIntent',
      title: 'Search Intent Classification',
      type: 'string',
      fieldset: 'seoGroup',
      hidden: ({ document }) => !document?.overrideSeo,
      options: {
        list: [
          { title: 'Transactional', value: 'transactional' },
          { title: 'Informational', value: 'informational' },
          { title: 'Instructional', value: 'instructional' },
          { title: 'Comparative', value: 'comparative' },
          { title: 'Reassurance', value: 'reassurance' },
        ],
      },
    }),

    // Social Sharing Fieldset (Collapsible & Collapsed by Default)
    defineField({
      name: 'overrideSocial',
      title: '🎨 Override Social Share Previews (OpenGraph / Twitter)',
      type: 'boolean',
      fieldset: 'socialGroup',
      initialValue: false,
      description: 'By default, social cards automatically inherit your SEO values and cover image. Check this box only if you need custom social overrides.',
    }),
    defineField({
      name: 'socialTitle',
      title: 'Social Title',
      type: 'string',
      fieldset: 'socialGroup',
      hidden: ({ document }) => !document?.overrideSocial,
      validation: (Rule) => Rule.max(60),
      description: 'Max 60 characters for optimal rendering on LinkedIn, Facebook, and X.',
    }),
    defineField({
      name: 'socialDescription',
      title: 'Social Description',
      type: 'text',
      rows: 2,
      fieldset: 'socialGroup',
      hidden: ({ document }) => !document?.overrideSocial,
      validation: (Rule) => Rule.max(160),
      description: 'Max 160 characters for social card previews.',
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Share Image',
      type: 'image',
      fieldset: 'socialGroup',
      hidden: ({ document }) => !document?.overrideSocial,
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the social image for accessibility.',
        }),
      ],
      description: 'Custom Open Graph banner image.',
    }),

    // Advanced Editorial & Governance Controls (Collapsible & Collapsed by Default)
    defineField({
      name: 'relatedToolIds',
      title: 'Related QuickForma Tool IDs',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'editorialGroup',
      description: 'Tool IDs matching catalog (e.g. freelance-hourly-rate-calculator, invoice-generator, paypal-fee-calculator)',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }, { type: 'playbook' }] }],
      fieldset: 'editorialGroup',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      fieldset: 'editorialGroup',
      initialValue: () => new Date().toISOString(),
      description: 'Defaults to current date/time. Override only for imported or scheduled posts.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article Toggle',
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
    defineField({
      name: 'draftStatus',
      title: 'Editorial Draft Status',
      type: 'string',
      fieldset: 'editorialGroup',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'In Review', value: 'review' },
          { title: 'Approved', value: 'approved' },
          { title: 'Published', value: 'published' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'enableToc',
      title: 'Enable Table of Contents',
      type: 'boolean',
      fieldset: 'editorialGroup',
      initialValue: true,
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
