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
          .title('QuickForma CMS Command Center')
          .items([
            // 🚀 Top-Level Content Hub Dashboard
            S.listItem()
              .title('🚀 Content Hub (Command Center)')
              .id('contentHub')
              .child(
                S.list()
                  .title('Content Hub Overview')
                  .items([
                    S.listItem()
                      .title('📝 All Published & Draft Content (Unified List)')
                      .id('allContent')
                      .child(
                        S.documentList()
                          .title('All Content Documents')
                          .filter('_type in ["article", "playbook", "collection", "glossary"]')
                          .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('🟡 Drafts & Pending Review')
                      .id('draftsContent')
                      .child(
                        S.documentList()
                          .title('Drafts & In-Review Content')
                          .filter('_type in ["article", "playbook", "collection", "glossary"] && (_id in path("drafts.**") || draftStatus in ["draft", "review"])')
                          .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('🟢 Published Live Content')
                      .id('publishedContent')
                      .child(
                        S.documentList()
                          .title('Published Content')
                          .filter('_type in ["article", "playbook", "collection", "glossary"] && !(_id in path("drafts.**"))')
                          .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('⭐ Featured & Editor\'s Picks')
                      .id('featuredContent')
                      .child(
                        S.documentList()
                          .title('Featured & Editor\'s Choice')
                          .filter('_type in ["article", "playbook", "collection", "glossary"] && (featured == true || editorsPick == true)')
                          .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                      ),
                  ])
              ),
            S.divider(),
            // Core Content Types
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
