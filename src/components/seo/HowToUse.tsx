import React from 'react';
import { ListOrdered } from 'lucide-react';
import { HowToUseData } from '../../types/seo';

interface HowToUseProps {
  data?: HowToUseData;
}

export const HowToUse: React.FC<HowToUseProps> = ({ data }) => {
  if (!data || !data.steps || data.steps.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <ListOrdered className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{data.heading || 'How to Use This Tool'}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.steps.map((step) => (
          <div key={step.stepNumber} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center mb-3 shadow-xs">
                {step.stepNumber}
              </div>
              <h3 className="text-slate-900 font-bold text-sm mb-1">{step.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
