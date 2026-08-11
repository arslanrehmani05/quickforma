import React from 'react';
import { urlFor } from '../../lib/sanity';

interface SpanChild {
  _key?: string;
  _type: string;
  text: string;
  marks?: string[];
}

interface MarkDef {
  _key: string;
  _type: string;
  href?: string;
  [key: string]: any;
}

export interface PortableTextBlock {
  _key?: string;
  _type: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: SpanChild[];
  markDefs?: MarkDef[];
  asset?: any;
  caption?: string;
  alt?: string;
  [key: string]: any;
}

interface PortableTextRendererProps {
  content: PortableTextBlock[] | string | undefined | null;
  onSelectTool?: (toolId: string) => void;
}

export const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({ content, onSelectTool }) => {
  if (!content) return null;

  // Fallback if body content is a raw string instead of PortableText array
  if (typeof content === 'string') {
    const paragraphs = content.split(/\n\n+/).filter(Boolean);
    return (
      <div className="space-y-4 text-slate-700 leading-relaxed font-sans">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed">
            {renderFormattedText(p, onSelectTool)}
          </p>
        ))}
      </div>
    );
  }

  if (!Array.isArray(content) || content.length === 0) return null;

  // Process blocks & group lists
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'bullet' | 'number'; items: PortableTextBlock[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    const ListTag = currentList.type === 'bullet' ? 'ul' : 'ol';
    const listClasses = currentList.type === 'bullet'
      ? 'list-disc ml-6 space-y-2 my-4 text-slate-700'
      : 'list-decimal ml-6 space-y-2 my-4 text-slate-700';

    elements.push(
      <ListTag key={`list-${elements.length}`} className={listClasses}>
        {currentList.items.map((item, idx) => (
          <li key={item._key || idx} className="leading-relaxed text-base">
            {renderBlockChildren(item, onSelectTool)}
          </li>
        ))}
      </ListTag>
    );
    currentList = null;
  };

  content.forEach((block, index) => {
    if (block._type === 'block') {
      if (block.listItem) {
        const listType = block.listItem === 'number' ? 'number' : 'bullet';
        if (!currentList || currentList.type !== listType) {
          flushList();
          currentList = { type: listType, items: [block] };
        } else {
          currentList.items.push(block);
        }
        return;
      }

      flushList();

      const children = renderBlockChildren(block, onSelectTool);
      const key = block._key || `block-${index}`;

      switch (block.style) {
        case 'h1':
          elements.push(
            <h1 key={key} className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-10 mb-4 tracking-tight">
              {children}
            </h1>
          );
          break;
        case 'h2':
          elements.push(
            <h2 key={key} className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 tracking-tight border-b border-slate-100 pb-2">
              {children}
            </h2>
          );
          break;
        case 'h3':
          elements.push(
            <h3 key={key} className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-2">
              {children}
            </h3>
          );
          break;
        case 'h4':
          elements.push(
            <h4 key={key} className="text-base sm:text-lg font-semibold text-slate-900 mt-4 mb-2">
              {children}
            </h4>
          );
          break;
        case 'blockquote':
          elements.push(
            <blockquote key={key} className="border-l-4 border-indigo-600 pl-4 py-2 my-5 text-slate-700 italic bg-indigo-50/50 rounded-r-lg">
              {children}
            </blockquote>
          );
          break;
        default:
          elements.push(
            <p key={key} className="text-slate-700 text-base leading-relaxed mb-4">
              {children}
            </p>
          );
          break;
      }
    } else if (block._type === 'image' && block.asset) {
      flushList();
      const imageUrl = urlFor(block).url();
      elements.push(
        <figure key={block._key || `img-${index}`} className="my-8">
          <img
            src={imageUrl}
            alt={block.alt || block.caption || 'Article image'}
            className="w-full rounded-2xl border border-slate-200 shadow-sm max-h-[500px] object-cover"
          />
          {block.caption && (
            <figcaption className="text-center text-xs text-slate-500 mt-2 italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }
  });

  flushList();

  return <div className="prose prose-slate max-w-none font-sans">{elements}</div>;
};

/**
 * Render children spans inside a block with full mark support (bold, italic, links, etc.)
 */
function renderBlockChildren(block: PortableTextBlock, onSelectTool?: (toolId: string) => void): React.ReactNode {
  if (!block.children || block.children.length === 0) return null;

  const markDefsMap = new Map<string, MarkDef>();
  if (block.markDefs) {
    block.markDefs.forEach(def => {
      if (def._key) markDefsMap.set(def._key, def);
    });
  }

  return block.children.map((child, idx) => {
    let node: React.ReactNode = child.text;

    if (child.marks && child.marks.length > 0) {
      child.marks.forEach(markKey => {
        // 1. Check if markKey matches a link definition
        const linkDef = markDefsMap.get(markKey);
        if (linkDef && linkDef.href) {
          const href = linkDef.href;
          const isToolLink = href.includes('/tools/') || href.startsWith('/tools/');
          const toolId = isToolLink ? href.split('/tools/')[1]?.replace(/\/$/, '') : null;

          node = (
            <a
              key={`link-${idx}`}
              href={href}
              onClick={(e) => {
                if (toolId && onSelectTool) {
                  e.preventDefault();
                  onSelectTool(toolId);
                }
              }}
              className="text-indigo-600 font-semibold underline decoration-indigo-300 underline-offset-2 hover:text-indigo-800 hover:decoration-indigo-600 transition-colors"
              target={href.startsWith('http') && !href.includes('quickforma.com') ? '_blank' : undefined}
              rel={href.startsWith('http') && !href.includes('quickforma.com') ? 'noopener noreferrer' : undefined}
            >
              {node}
            </a>
          );
          return;
        }

        // 2. Formatting decorators
        switch (markKey) {
          case 'strong':
          case 'bold':
            node = <strong key={`strong-${idx}`} className="font-bold text-slate-900">{node}</strong>;
            break;
          case 'em':
          case 'italic':
            node = <em key={`em-${idx}`} className="italic">{node}</em>;
            break;
          case 'underline':
            node = <u key={`u-${idx}`} className="underline decoration-slate-400">{node}</u>;
            break;
          case 'code':
            node = (
              <code key={`code-${idx}`} className="font-mono text-xs bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded border border-slate-200">
                {node}
              </code>
            );
            break;
          case 'strike-through':
          case 'strikethrough':
            node = <del key={`del-${idx}`} className="line-through text-slate-400">{node}</del>;
            break;
        }
      });
    }

    return <React.Fragment key={child._key || idx}>{node}</React.Fragment>;
  });
}

/**
 * Helper to parse plain markdown text strings for bold, italic, and links if raw text is provided
 */
function renderFormattedText(text: string, onSelectTool?: (toolId: string) => void): React.ReactNode {
  // Simple regex for markdown links [text](url) and bold **text**
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(parseInlineFormatting(text.substring(lastIndex, match.index)));
    }
    const label = match[1];
    const url = match[2];
    const isTool = url.includes('/tools/');
    const toolId = isTool ? url.split('/tools/')[1]?.replace(/\/$/, '') : null;

    parts.push(
      <a
        key={`md-link-${match.index}`}
        href={url}
        onClick={(e) => {
          if (toolId && onSelectTool) {
            e.preventDefault();
            onSelectTool(toolId);
          }
        }}
        className="text-indigo-600 font-semibold underline decoration-indigo-300 underline-offset-2 hover:text-indigo-800 hover:decoration-indigo-600 transition-colors"
      >
        {label}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(parseInlineFormatting(text.substring(lastIndex)));
  }

  return parts;
}

function parseInlineFormatting(text: string): React.ReactNode {
  // Bold **text**
  const boldRegex = /\*\*([^*]+)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(<strong key={`b-${match.index}`} className="font-bold text-slate-900">{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}
