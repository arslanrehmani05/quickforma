import React from 'react';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import { TOOLS_CATALOG } from '../../data/toolsCatalog';

interface RelatedToolsProps {
  toolIds?: string[];
  currentCategory?: string;
  currentToolId?: string;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ toolIds, currentCategory, currentToolId }) => {
  let related = TOOLS_CATALOG.filter((t) => toolIds?.includes(t.id));

  if (related.length === 0 && currentCategory) {
    related = TOOLS_CATALOG.filter((t) => t.category === currentCategory && t.id !== currentToolId).slice(0, 6);
  }

  if (related.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <LayoutGrid className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Complementary QuickForma Utilities</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((tool) => (
          <a
            key={tool.id}
            href={`/tools/${tool.id}`}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {tool.categoryLabel}
                </span>
              </div>
              <h3 className="text-slate-900 font-bold text-sm mb-1 group-hover:text-indigo-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{tool.description}</p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-end text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Open Tool</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
