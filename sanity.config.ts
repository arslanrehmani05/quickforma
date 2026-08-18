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
      name: 'home',
      title: '🏠 Home',
      structure: (S) =>
        S.documentTypeList('category')
          .title('Published Content by Category')
          .child((categoryId) =>
            S.documentList()
              .title('Articles in Category')
              .filter('_type in ["article", "playbook"] && (category._ref == $categoryId || category->slug.current == $categoryId)')
              .params({ categoryId })
          ),
    }),
    structureTool({
      name: 'articles',
      title: '📰 Articles',
      structure: (S) => S.documentTypeList('article').title('Articles'),
    }),
    structureTool({
      name: 'encyclopedia',
      title: '📚 Encyclopedia',
      structure: (S) => S.documentTypeList('encyclopedia').title('Encyclopedia'),
    }),
    structureTool({
      name: 'eCategories',
      title: '📁 E-Categories',
      structure: (S) => S.documentTypeList('eCategory').title('E-Categories'),
    }),
    structureTool({
      name: 'categories',
      title: '📁 Categories',
      structure: (S) => S.documentTypeList('category').title('Categories'),
    }),
    structureTool({
      name: 'authors',
      title: '👤 Authors',
      structure: (S) => S.documentTypeList('author').title('Authors'),
    }),
    structureTool({
      name: 'tags',
      title: '🏷️ Tags',
      structure: (S) => S.documentTypeList('tag').title('Tags'),
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

