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

  const isArticleDoc =
    props.type === 'article' ||
    props.value?._type === 'article' ||
    props.schemaType?.name === 'article' ||
    (props.path && props.path.length === 0);

  if (!isArticleDoc) {
    return props.renderDefault(props);
  }

  return (
    React.createElement(React.Fragment, null,
      props.renderDefault(props),
      React.createElement('div', {
        style: {
          position: 'fixed',
          bottom: '10px',
          right: '160px',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
        }
      },
        React.createElement('button', {
          type: 'button',
          onClick: handleSaveDraft,
          style: {
            background: '#485273',
            color: '#e4e9f7',
            border: 'none',
            borderRadius: '3px',
            padding: '4px 10px',
            height: '27px',
            fontSize: '13px',
            fontWeight: 500,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: 'none',
            transition: 'background 0.15s ease',
          },
          onMouseEnter: (e: any) => {
            e.currentTarget.style.background = '#58648c';
          },
          onMouseLeave: (e: any) => {
            e.currentTarget.style.background = '#485273';
          }
        },
          React.createElement('svg', {
            width: 14,
            height: 14,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
          },
            React.createElement('path', { d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' }),
            React.createElement('polyline', { points: '17 21 17 13 7 13 7 21' }),
            React.createElement('polyline', { points: '7 3 7 8 15 8' })
          ),
          'Save as draft'
        )
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

