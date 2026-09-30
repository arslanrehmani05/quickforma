import React from 'react';
import { AlertTriangle, XCircle, Check } from 'lucide-react';
import { CommonMistakesData } from '../../types/seo';

interface CommonMistakesProps {
  data?: CommonMistakesData;
}

export const CommonMistakes: React.FC<CommonMistakesProps> = ({ data }) => {
  if (!data || !data.mistakes || data.mistakes.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{data.heading || 'Common Mistakes to Avoid'}</h2>
      </div>

      <div className="space-y-4">
        {data.mistakes.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>{item.mistake}</span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-6">{item.whyItHappens}</p>
            <div className="flex items-start gap-2 text-xs text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 font-medium">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>How to Avoid:</strong> {item.howToAvoid}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
