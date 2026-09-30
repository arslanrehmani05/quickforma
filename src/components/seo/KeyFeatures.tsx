import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { KeyFeaturesData } from '../../types/seo';

interface KeyFeaturesProps {
  data?: KeyFeaturesData;
}

export const KeyFeatures: React.FC<KeyFeaturesProps> = ({ data }) => {
  if (!data || !data.features || data.features.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{data.heading || 'Why Use This Tool? (Key Features)'}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.features.map((feature, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-xs sm:text-sm">{feature.title}</h3>
              {feature.description && <p className="text-slate-600 text-xs leading-relaxed mt-0.5">{feature.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
