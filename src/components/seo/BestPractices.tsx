import React from 'react';
import { Award, CheckCircle } from 'lucide-react';
import { BestPracticeItem } from '../../types/seo';

interface BestPracticesProps {
  practices?: BestPracticeItem[];
}

export const BestPractices: React.FC<BestPracticesProps> = ({ practices }) => {
  if (!practices || practices.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <Award className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Industry Best Practices</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {practices.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-slate-900 font-bold text-sm mb-1">{item.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
