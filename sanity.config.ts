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
            // 📝 Top-Level Publishing Cockpit (Shopify-Style UX)
            S.listItem()
              .title('📝 Publish')
              .id('publishWorkspace')
              .child(
                S.list()
                  .title('Publishing Cockpit')
                  .items([
                    S.listItem()
                      .title('➕ Write New Article')
                      .id('createArticle')
                      .child(S.documentTypeList('article').title('Articles')),
                    S.listItem()
                      .title('📘 Create Business Playbook')
                      .id('createPlaybook')
                      .child(S.documentTypeList('playbook').title('Business Playbooks')),
                    S.listItem()
                      .title('📦 Assemble Toolkit Collection')
                      .id('createCollection')
                      .child(S.documentTypeList('collection').title('Toolkit Collections')),
                    S.listItem()
                      .title('📖 Define Glossary Term')
                      .id('createGlossary')
                      .child(S.documentTypeList('glossary').title('Glossary Terms')),
                    S.divider(),
                    S.listItem()
                      .title('🟡 Drafts & Writing')
                      .id('draftsContent')
                      .child(
                        S.documentList()
                          .title('Drafts & Writing Documents')
                          .filter('_type in ["article", "playbook", "collection", "glossary"] && (_id in path("drafts.**") || draftStatus in ["draft", "review", "writing"])')
                          .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('🟢 Published Live Content')
                      .id('publishedContent')
                      .child(
                        S.documentList()
                          .title('Published Live Content')
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
                    S.divider(),
                    S.listItem()
                      .title('📊 Publishing Readiness & Audit Dashboard')
                      .id('healthAudit')
                      .child(
                        S.list()
                          .title('Publishing Readiness Audits')
                          .items([
                            S.listItem()
                              .title('⚠️ Evergreen Posts Needing Audit (No Review Date)')
                              .id('needingAudit')
                              .child(
                                S.documentList()
                                  .title('Unverified Evergreen Content')
                                  .filter('_type in ["article", "playbook"] && isEvergreen == true && !defined(lastReviewedAt)')
                              ),
                            S.listItem()
                              .title('🖼️ Content Missing Alt Text or Featured Image')
                              .id('missingMedia')
                              .child(
                                S.documentList()
                                  .title('Missing Media / Alt Text')
                                  .filter('_type in ["article", "playbook"] && (!defined(featuredImage) || !defined(featuredImage.alt))')
                              ),
                            S.listItem()
                              .title('👤 Posts Missing Author Reference')
                              .id('missingAuthor')
                              .child(
                                S.documentList()
                                  .title('Missing Author Profile')
                                  .filter('_type in ["article", "playbook"] && !defined(author)')
                              ),
                          ])
                      ),
                    S.listItem()
                      .title('📝 All Published & Draft Content (Unified List)')
                      .id('allContent')
                      .child(
                        S.documentList()
                          .title('All Content Documents')
                          .filter('_type in ["article", "playbook", "collection", "glossary"]')
                          .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                      ),
                  ])
              ),
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
