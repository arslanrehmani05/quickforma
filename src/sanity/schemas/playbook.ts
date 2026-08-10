import { defineField, defineType } from 'sanity';
import { TOOLS_CATALOG } from '../../data/toolsCatalog';

export const playbookSchema = defineType({
  name: 'playbook',
  title: 'Business Playbook',
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
    {
      name: 'growthOsGroup',
      title: '🧠 Growth OS & Intelligence (Optional)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // Main Content (Shopify Left Column)
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      placeholder: 'e.g., Ultimate Freelance Billing Playbook 2026',
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
      description: 'The web path segment for this playbook.',
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

    // Optional Growth OS Layer (Collapsed accordion at bottom)
    defineField({
      name: 'primaryKeyword',
      title: '🎯 Primary Target Keyword',
      type: 'string',
      fieldset: 'growthOsGroup',
      description: 'The main target search term from SEMrush. Automatically checked against published articles.',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value || value.trim().length === 0) return true;
          const client = context.getClient({ apiVersion: '2024-01-01' });
          const docId = context.document?._id ? context.document._id.replace('drafts.', '') : '';
          const existingOwner = await client.fetch(
            `*[_type in ["article", "playbook", "collection", "glossary"] && primaryKeyword == $kw && _id != $docId && _id != $draftDocId][0]{ title, slug, _type }`,
            { kw: value.trim(), docId, draftDocId: `drafts.${docId}` }
          );
          if (existingOwner) {
            const ownerSlug = existingOwner.slug?.current || '';
            return `⚠️ Primary keyword already targeted: "${value}" is already assigned to "${existingOwner.title}" (${existingOwner._type}) at /blog/${ownerSlug}`;
          }
          return true;
        }).warning(),
    }),
    defineField({
      name: 'primarySearchIntentRef',
      title: '🧠 Primary Search Intent',
      type: 'reference',
      to: [{ type: 'searchIntentItem' }],
      fieldset: 'growthOsGroup',
    }),
    defineField({
      name: 'secondaryKeywordRefs',
      title: '💎 Secondary Keywords',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'keywordItem' }] }],
      fieldset: 'growthOsGroup',
    }),
    defineField({
      name: 'contentBriefRef',
      title: '📝 Content Brief',
      type: 'reference',
      to: [{ type: 'contentBrief' }],
      fieldset: 'growthOsGroup',
    }),
    defineField({
      name: 'relatedToolIds',
      title: 'Secondary Related Tools',
      type: 'array',
      fieldset: 'growthOsGroup',
      description: 'Select all secondary tools related to this playbook for tool-page recommendations.',
      of: [{ type: 'string' }],
      options: {
        list: TOOLS_CATALOG.map((t) => ({
          title: `${t.name} (${t.id})`,
          value: t.id,
        })),
      },
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles & Playbooks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }, { type: 'playbook' }] }],
      fieldset: 'growthOsGroup',
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
