import React from 'react';
import { Info, UserCheck, Calendar, Sparkles } from 'lucide-react';
import { ToolOverviewData } from '../../types/seo';

interface ToolOverviewProps {
  data?: ToolOverviewData;
}

export const ToolOverview: React.FC<ToolOverviewProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <Info className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Quick Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>What This Tool Does</span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{data.whatItDoes}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
            <UserCheck className="w-4 h-4" />
            <span>Who Should Use It</span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{data.whoShouldUseIt}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            <span>When to Use It</span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{data.whenToUseIt}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Why It Is Useful</span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{data.whyItIsUseful}</p>
        </div>
      </div>
    </section>
  );
};
