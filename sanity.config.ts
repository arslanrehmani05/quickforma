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
            // 🚀 Growth OS (Strategic Strategist Workspace)
            S.listItem()
              .title('🚀 QuickForma Growth OS (SEO & Intent Intelligence)')
              .id('growthOS')
              .child(
                S.list()
                  .title('Growth OS Intelligence Modules')
                  .items([
                    S.listItem()
                      .title('➕ Start Research Sprint')
                      .id('startResearch')
                      .child(
                        S.documentList()
                          .title('Research Sprints Log')
                          .filter('_type == "researchSprint"')
                      ),
                    S.listItem()
                      .title('📝 Content Briefs (Pre-Writing Roadmap)')
                      .id('contentBriefsList')
                      .child(
                        S.documentList()
                          .title('Content Briefs')
                          .filter('_type == "contentBrief"')
                      ),
                    S.listItem()
                      .title('🎯 Topic Clusters (Content Roadmap & Progress)')
                      .id('topicClustersList')
                      .child(
                        S.documentList()
                          .title('Topic Clusters')
                          .filter('_type == "topicCluster"')
                      ),
                    S.listItem()
                      .title('👑 Topic Authority & Content Gap Dashboard')
                      .id('topicAuthority')
                      .child(
                        S.documentList()
                          .title('Topic Authority & Cluster Coverage')
                          .filter('_type == "topicCluster"')
                          .defaultOrdering([{ field: 'roadmapStatus', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('🧠 Search Intent Vault (Primary Intent Owners)')
                      .id('searchIntentsList')
                      .child(
                        S.documentList()
                          .title('Search Intent Registry')
                          .filter('_type == "searchIntentItem"')
                      ),
                    S.listItem()
                      .title('💎 Keyword Vault & Opportunity Scores (0-100)')
                      .id('keywordVault')
                      .child(
                        S.documentList()
                          .title('Keyword Vault')
                          .filter('_type == "keywordItem"')
                          .defaultOrdering([{ field: 'opportunityScore', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('❓ AEO Question Library (AI Search Targets)')
                      .id('aeoQuestions')
                      .child(
                        S.documentList()
                          .title('AEO Direct Answer Questions')
                          .filter('_type == "questionItem"')
                      ),
                    S.listItem()
                      .title('⚔️ Strategic Competitor Intelligence')
                      .id('competitorIntelList')
                      .child(
                        S.documentList()
                          .title('Competitor Intelligence')
                          .filter('_type == "competitorIntel"')
                      ),
                    S.divider(),
                    S.listItem()
                      .title('⚠️ Intent Cannibalization Monitor')
                      .id('cannibalizationMonitor')
                      .child(
                        S.documentList()
                          .title('Overlapping or Unassigned Intents')
                          .filter('_type == "searchIntentItem" && !defined(primaryOwner)')
                      ),
                  ])
              ),
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
