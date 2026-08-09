import { defineConfig, useDocumentOperation } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '60xo4tvv';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

function SaveDraftAction(props: any) {
  const { patch } = useDocumentOperation(props.id, props.type);

  return {
    label: 'Save as draft',
    shortcut: 'ctrl+s',
    onHandle: () => {
      patch.execute([{ set: { _updatedAt: new Date().toISOString() } }]);
      if (props.onComplete) {
        props.onComplete();
      }
    },
  };
}

export default defineConfig({
  name: 'default',
  title: 'QuickForma Publishing CMS',

  projectId,
  dataset,
  basePath: '/studio',

  plugins: [
    structureTool({
      name: 'articles',
      title: '📰 Articles',
      structure: (S) => S.documentTypeList('article').title('Articles'),
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

  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'article') {
        return [SaveDraftAction, ...prev];
      }
      return prev;
    },
  },

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

