import React from 'react';
import { Briefcase, Building2 } from 'lucide-react';
import { IndustryUseCasesData } from '../../types/seo';

interface IndustryUseCasesProps {
  data?: IndustryUseCasesData;
}

export const IndustryUseCases: React.FC<IndustryUseCasesProps> = ({ data }) => {
  if (!data || !data.useCases || data.useCases.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <Briefcase className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{data.heading || 'Industry Use Cases & Applications'}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.useCases.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4" />
                <span>{item.industry}</span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-700">
              💡 Benefit: <span className="font-normal text-slate-600">{item.benefit}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
