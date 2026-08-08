import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
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
      structure: (S) =>
        S.list()
          .title('QuickForma Publishing CMS')
          .items([
            // Core Content Types (Shopify-Style Direct Access)
            S.documentTypeListItem('article').title('📰 Articles'),
            S.documentTypeListItem('playbook').title('📘 Business Playbooks'),
            S.documentTypeListItem('collection').title('📦 Collections'),
            S.documentTypeListItem('glossary').title('📖 Glossary Terms'),
            S.divider(),
            // Taxonomy & Authors
            S.documentTypeListItem('category').title('📁 Categories'),
            S.documentTypeListItem('author').title('👤 Authors'),
            S.documentTypeListItem('tag').title('🏷️ Tags'),
            S.divider(),
            // Settings Singletons
            S.listItem()
              .title('🔍 SEO Defaults')
              .id('seoDefaults')
              .child(S.document().schemaType('seoDefaults').documentId('seoDefaults')),
            S.listItem()
              .title('⚙️ Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
