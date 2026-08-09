import { defineField, defineType } from 'sanity';

export const articleSchema = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fieldsets: [
    {
      name: 'searchEngineListing',
      title: '🔍 Search engine listing',
      description: 'Add a title and description to see how this blog post might appear in a search engine listing',
      options: { collapsible: false },
    },
    {
      name: 'organization',
      title: '🏷️ Organization & Media',
      options: { collapsible: false },
    },
  ],
  fields: [
    // Main Content (Shopify Left Column)
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      placeholder: 'e.g., How to Calculate Profit Margin in 2026',
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: 'body',
      title: 'Content',
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
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Add a summary of the post to appear on your home page or blog.',
      type: 'text',
      rows: 3,
    }),

    // Search Engine Listing (Shopify SEO Card)
    defineField({
      name: 'seoTitle',
      title: 'Page title',
      type: 'string',
      fieldset: 'searchEngineListing',
      description: 'Custom headline for Google search results. Auto-falls back to main Title if left blank. (Max 70 chars)',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      fieldset: 'searchEngineListing',
      description: 'Custom snippet description for Google results. Auto-falls back to Excerpt if left blank. (Max 160 chars)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'slug',
      title: 'URL handle',
      type: 'slug',
      fieldset: 'searchEngineListing',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'The web path segment for this article.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL Override',
      type: 'url',
      fieldset: 'searchEngineListing',
      description: 'Specify an external canonical URL if published elsewhere first.',
    }),

    // Organization & Media (Shopify Right Sidebar)
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      fieldset: 'organization',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Required for accessibility and image SEO. Describe the image for search engines.',
        }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      fieldset: 'organization',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      fieldset: 'organization',
      initialValue: async (params, context) => {
        try {
          const client = context.getClient({ apiVersion: '2024-01-01' });
          const defaultAuthorId = await client.fetch(
            `*[_type == "author" && (name match "Arslan Rehmani" || name match "QuickForma Editorial")][0]._id`
          );
          if (defaultAuthorId) {
            return { _type: 'reference', _ref: defaultAuthorId };
          }
        } catch {
          // fallback if client not ready
        }
        return { _type: 'reference', _ref: '' };
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      fieldset: 'organization',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      fieldset: 'organization',
      initialValue: () => new Date().toISOString(),
    }),

    // Legacy Stored Fields (Hidden from UI, eliminates 'Unknown fields found' schema warnings)
    defineField({ name: 'draftStatus', type: 'string', hidden: true }),
    defineField({ name: 'editorsPick', type: 'boolean', hidden: true }),
    defineField({ name: 'featured', type: 'boolean', hidden: true }),
    defineField({ name: 'isEvergreen', type: 'boolean', hidden: true }),
    defineField({ name: 'lastReviewedAt', type: 'datetime', hidden: true }),
    defineField({ name: 'reviewedBy', type: 'reference', to: [{ type: 'author' }], hidden: true }),
    defineField({ name: 'enableToc', type: 'boolean', hidden: true }),
    defineField({ name: 'overrideSeo', type: 'boolean', hidden: true }),
    defineField({ name: 'secondaryKeywords', type: 'array', of: [{ type: 'string' }], hidden: true }),
    defineField({ name: 'searchIntent', type: 'string', hidden: true }),
    defineField({ name: 'overrideSocial', type: 'boolean', hidden: true }),
    defineField({ name: 'socialTitle', type: 'string', hidden: true }),
    defineField({ name: 'socialDescription', type: 'text', hidden: true }),
    defineField({ name: 'socialImage', type: 'image', hidden: true }),
    defineField({ name: 'gscClicks', type: 'number', hidden: true }),
    defineField({ name: 'gscImpressions', type: 'number', hidden: true }),
    defineField({ name: 'gscCtr', type: 'number', hidden: true }),
    defineField({ name: 'gscAvgPosition', type: 'number', hidden: true }),
    defineField({ name: 'gscLastUpdated', type: 'datetime', hidden: true }),
    defineField({ name: 'gscPerformanceState', type: 'string', hidden: true }),
    defineField({ name: 'readTimeMinutes', type: 'number', hidden: true }),
    defineField({ name: 'primaryKeyword', type: 'string', hidden: true }),
    defineField({ name: 'primarySearchIntentRef', type: 'reference', to: [{ type: 'article' }], hidden: true }),
    defineField({ name: 'secondaryKeywordRefs', type: 'array', of: [{ type: 'string' }], hidden: true }),
    defineField({ name: 'contentBriefRef', type: 'reference', to: [{ type: 'article' }], hidden: true }),
    defineField({ name: 'relatedToolIds', type: 'array', of: [{ type: 'string' }], hidden: true }),
    defineField({ name: 'relatedArticles', type: 'array', of: [{ type: 'reference', to: [{ type: 'article' }] }], hidden: true }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'featuredImage',
    },
  },
});
