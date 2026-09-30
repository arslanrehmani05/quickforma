import { defineField, defineType } from 'sanity';

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'websiteName',
      title: 'Website Name',
      type: 'string',
      initialValue: 'QuickForma',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo Mark',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'defaultSocialLinks',
      title: 'Default Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'footerInformation',
      title: 'Footer Information',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'websiteName',
      media: 'logo',
    },
  },
});
