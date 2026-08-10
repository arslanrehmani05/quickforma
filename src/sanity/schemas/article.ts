import React from 'react';
import { defineField, defineType, useClient, useFormValue } from 'sanity';
import { TextInput } from '@sanity/ui';
import { TOOLS_CATALOG } from '../../data/toolsCatalog';

function AutoBlogCategoryInput(props: any) {
  const categoryRef = useFormValue(['category']) as { _ref?: string } | undefined;
  const client = useClient({ apiVersion: '2024-01-01' });
  const [categoryName, setCategoryName] = React.useState<string>('');

  React.useEffect(() => {
    let isMounted = true;
    if (categoryRef?._ref) {
      const rawId = categoryRef._ref.replace(/^drafts\./, '');
      client
        .fetch(`*[_id in [$id, "drafts." + $id]][0]{ name, title }`, { id: rawId })
        .then((res) => {
          if (isMounted && res) {
            setCategoryName(res.name || res.title || '');
          }
        })
        .catch(() => {});
    } else {
      if (isMounted) setCategoryName('');
    }
    return () => {
      isMounted = false;
    };
  }, [categoryRef?._ref, client]);

  return (
    React.createElement(TextInput, {
      value: categoryName || props.value || '',
      readOnly: true,
      placeholder: 'Select a Category in Organization above...',
    })
  );
}

function AutoArticleTitleInput(props: any) {
  const mainTitle = (useFormValue(['title']) as string) || '';

  return (
    React.createElement(TextInput, {
      value: mainTitle || props.value || '',
      readOnly: true,
      placeholder: 'Type a Title above to auto-populate...',
    })
  );
}

function AutoUrlInput(props: any) {
  const slug = useFormValue(['slug']) as { current?: string } | undefined;
  const derivedUrl = slug?.current ? `https://www.quickforma.com/blog/${slug.current}` : '';

  return (
    React.createElement(TextInput, {
      value: derivedUrl || props.value || '',
      readOnly: true,
      placeholder: 'Generate a URL handle (slug) above...',
    })
  );
}

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
    {
      name: 'seoSuite',
      title: '📈 SEO Suite',
      description: 'Comprehensive SEO strategy, keyword targeting, intent classification, and content intelligence',
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

    // SEO Suite (Positioned Beneath Published Date - Auto-synced from Publishing Wizard)
    defineField({
      name: 'contentId',
      title: 'Content ID',
      type: 'string',
      fieldset: 'seoSuite',
      readOnly: true,
      initialValue: () => `ART-${Math.floor(100000 + Math.random() * 900000)}`,
      description: '⚡ Auto-generated system identifier. Permanent unique key for tracking.',
    }),
    defineField({
      name: 'blogCategory',
      title: 'Blog Category',
      type: 'string',
      fieldset: 'seoSuite',
      readOnly: true,
      components: {
        input: AutoBlogCategoryInput,
      },
      description: '⚡ Auto-updated from the Category selected in Organization & Media above.',
    }),
    defineField({
      name: 'articleTitle',
      title: 'Article Title',
      type: 'string',
      fieldset: 'seoSuite',
      readOnly: true,
      components: {
        input: AutoArticleTitleInput,
      },
      description: '⚡ Auto-updated from the main Title field above.',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      fieldset: 'seoSuite',
      readOnly: true,
      components: {
        input: AutoUrlInput,
      },
      placeholder: 'https://www.quickforma.com/blog/...',
      description: '⚡ Auto-derived full canonical URL segment (e.g. /blog/your-slug).',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      fieldset: 'seoSuite',
      readOnly: true,
      options: {
        list: [
          { title: 'Draft', value: 'Draft' },
          { title: 'Scheduled', value: 'Scheduled' },
          { title: 'Published', value: 'Published' },
          { title: 'Archived', value: 'Archived' },
        ],
      },
      initialValue: 'Draft',
      description: '⚡ System-managed publication state (Draft until published).',
    }),
    defineField({
      name: 'articleType',
      title: 'Article Type',
      type: 'string',
      fieldset: 'seoSuite',
      options: {
        list: [
          { title: 'Article', value: 'Article' },
          { title: 'Guide', value: 'Guide' },
          { title: 'Comparison', value: 'Comparison' },
        ],
      },
      initialValue: 'Article',
      description: '⚡ System default (Article) or format override.',
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Keyword',
      type: 'string',
      fieldset: 'seoSuite',
      description: 'Main target search phrase for ranking.',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true;
          try {
            const client = context.getClient({ apiVersion: '2024-01-01' });
            const docId = context.document?._id?.replace(/^drafts\./, '') || '';
            const existingDoc = await client.fetch(
              `*[_type == "article" && lower(primaryKeyword) == lower($keyword) && !(_id match $id)][0]{_id, title}`,
              { keyword: value.trim(), id: `${docId}*` }
            );
            if (existingDoc) {
              return `⚠️ Cannibalization Warning: Primary keyword "${value}" is already claimed by article "${existingDoc.title}".`;
            }
          } catch {
            // Client fetch fallback
          }
          return true;
        }),
    }),
    defineField({
      name: 'primarySearchIntent',
      title: 'Primary Search Intent',
      type: 'string',
      fieldset: 'seoSuite',
      options: {
        list: [
          { title: 'Informational', value: 'Informational' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Transactional', value: 'Transactional' },
          { title: 'Navigational', value: 'Navigational' },
        ],
      },
    }),
    defineField({
      name: 'intentType',
      title: 'Intent Type',
      type: 'string',
      fieldset: 'seoSuite',
      options: {
        list: [
          { title: 'Tool Discovery & Utility', value: 'Tool Discovery & Utility' },
          { title: 'Problem-Solving / How-To', value: 'Problem-Solving / How-To' },
          { title: 'Product Comparison', value: 'Product Comparison' },
          { title: 'Definition & Educational', value: 'Definition & Educational' },
          { title: 'Template / Download', value: 'Template / Download' },
        ],
      },
    }),
    defineField({
      name: 'keywordCluster',
      title: 'Keyword Cluster',
      type: 'string',
      fieldset: 'seoSuite',
      description: 'Parent topic cluster grouping related articles.',
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      fieldset: 'seoSuite',
      description: 'Supporting LSI and semantic variations.',
    }),
    defineField({
      name: 'excludedKeywords',
      title: 'Excluded Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      fieldset: 'seoSuite',
      description: 'Negative keywords to avoid cannibalization.',
    }),
    defineField({
      name: 'targetTool',
      title: 'Target Tool',
      type: 'string',
      fieldset: 'seoSuite',
      description: 'QuickForma tool embedded or linked in this article.',
      options: {
        list: TOOLS_CATALOG.map((t) => ({
          title: `${t.name} (${t.id})`,
          value: t.id,
        })),
      },
    }),
    defineField({
      name: 'contentAngle',
      title: 'Content Angle',
      type: 'string',
      fieldset: 'seoSuite',
      description: 'Unique hook or value proposition for searchers.',
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
