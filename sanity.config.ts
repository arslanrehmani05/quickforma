import React from 'react';
import { defineConfig, useDocumentOperation } from 'sanity';
import { useToast } from '@sanity/ui';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '60xo4tvv';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

function SaveDraftButton(props: any) {
  const { patch } = useDocumentOperation(props.id, props.type);
  const toast = useToast();

  const handleSaveDraft = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      patch.execute([{ set: { _updatedAt: new Date().toISOString() } }]);
      toast.push({
        status: 'success',
        title: 'Draft saved',
        description: 'Your article draft has been saved successfully.',
      });
    } catch {
      toast.push({
        status: 'error',
        title: 'Save failed',
        description: 'Could not save draft.',
      });
    }
  };

  if (props.schemaType?.name !== 'article') {
    return props.renderDefault(props);
  }

  return (
    React.createElement(React.Fragment, null,
      props.renderDefault(props),
      React.createElement('div', {
        style: {
          position: 'fixed',
          bottom: '12px',
          right: '125px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
        }
      },
        React.createElement('button', {
          type: 'button',
          onClick: handleSaveDraft,
          style: {
            background: '#23283b',
            color: '#e2e8f0',
            border: '1px solid #3b4261',
            borderRadius: '4px',
            padding: '7px 14px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            transition: 'all 0.15s ease',
          },
          onMouseEnter: (e: any) => {
            e.currentTarget.style.background = '#2d344d';
            e.currentTarget.style.borderColor = '#4f5885';
          },
          onMouseLeave: (e: any) => {
            e.currentTarget.style.background = '#23283b';
            e.currentTarget.style.borderColor = '#3b4261';
          }
        }, '💾 Save as draft')
      )
    )
  );
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

  form: {
    components: {
      input: SaveDraftButton,
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

