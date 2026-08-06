import React from 'react';
import { BarChart3, ArrowUpRight, HelpCircle } from 'lucide-react';
import { InterpretResultsData } from '../../types/seo';

interface InterpretResultsProps {
  data?: InterpretResultsData;
}

export const InterpretResults: React.FC<InterpretResultsProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <BarChart3 className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{data.heading || 'Interpret Your Results'}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.typicalRanges && (
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Typical Benchmarks</span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{data.typicalRanges}</p>
          </div>
        )}

        {data.goodVsBadOutput && (
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Evaluating Your Output</span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{data.goodVsBadOutput}</p>
          </div>
        )}

        {data.nextStepsGuidance && (
          <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-950 shadow-xs space-y-2">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">Recommended Next Action</span>
            <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed">{data.nextStepsGuidance}</p>
          </div>
        )}
      </div>
    </section>
  );
};
