import { defineField, defineType } from 'sanity';

export const seoDefaultsSchema = defineType({
  name: 'seoDefaults',
  title: 'SEO Defaults',
  type: 'document',
  fields: [
    defineField({
      name: 'defaultSeoTitle',
      title: 'Default Meta Title',
      type: 'string',
      initialValue: 'QuickForma — Free Business Calculators & Financial Tools',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      initialValue: '100% free, zero-latency client-side business calculators, financial tools, and operational utilities.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'defaultOpenGraphImage',
      title: 'Default OpenGraph Image (1200x630)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'twitterCardSettings',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          { title: 'Summary Large Image', value: 'summary_large_image' },
          { title: 'Summary', value: 'summary' },
        ],
      },
      initialValue: 'summary_large_image',
    }),
    defineField({
      name: 'organizationSchemaDefaults',
      title: 'Organization Schema Defaults (JSON-LD)',
      type: 'text',
      rows: 4,
      initialValue: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'QuickForma',
        url: 'https://www.quickforma.com',
      }, null, 2),
    }),
  ],
  preview: {
    select: {
      title: 'defaultSeoTitle',
      subtitle: 'defaultMetaDescription',
    },
  },
});
