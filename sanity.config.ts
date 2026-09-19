import React from 'react';
import { defineConfig, useDocumentOperation } from 'sanity';
import { useToast } from '@sanity/ui';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '60xo4tvv';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'QuickForma Publishing CMS',

  projectId,
  dataset,
  basePath: '/studio',

  plugins: [
    structureTool({
      name: 'encyclopedia',
      title: '📚 Encyclopedia',
      structure: (S) => S.documentTypeList('encyclopedia').title('Encyclopedia Entries'),
    }),
    structureTool({
      name: 'eCategories',
      title: '📁 E-Categories',
      structure: (S) => S.documentTypeList('eCategory').title('Encyclopedia Categories'),
    }),
    structureTool({
      name: 'seoDefaults',
      title: '🔍 SEO Defaults',
      structure: (S) => S.document().schemaType('seoDefaults').documentId('seoDefaults'),
    }),
    structureTool({
      name: 'siteSettings',
      title: '⚙️ Site Settings',
      structure: (S) => S.document().schemaType('siteSettings').documentId('siteSettings'),
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  releases: {
    enabled: false,
  },

  tasks: {
    enabled: false,
  },
});

