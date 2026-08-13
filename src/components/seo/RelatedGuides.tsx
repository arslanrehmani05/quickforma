import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { RelatedGuideItem } from '../../types/seo';

interface RelatedGuidesProps {
  guides?: RelatedGuideItem[];
  onSelectView?: (view: string) => void;
}

export const RelatedGuides: React.FC<RelatedGuidesProps> = ({ guides, onSelectView }) => {
  if (!guides || guides.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <BookOpen className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Related Guides & Articles</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((guide) => (
          <a
            key={guide.id}
            href={guide.url}
            onClick={(e) => {
              if (onSelectView && (guide.url.startsWith('/ledger/') || guide.url.startsWith('/blog/'))) {
                e.preventDefault();
                const slug = guide.url.replace(/^\/(ledger|blog)\//, '');
                onSelectView(`blog:${slug}`);
              }
            }}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                <span className="font-semibold text-slate-500">{guide.category}</span>
                <span className="text-[10px] text-slate-400 font-mono">{guide.readTime}</span>
              </div>
              <h3 className="text-slate-900 font-bold text-sm mb-1 group-hover:text-indigo-600 transition-colors">
                {guide.title}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{guide.description}</p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-end text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Read Guide</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

