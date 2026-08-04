import React from 'react';
import { Binary, Code2 } from 'lucide-react';
import { HowItWorksData } from '../../types/seo';

interface HowItWorksProps {
  data?: HowItWorksData;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <Binary className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{data.heading || 'How It Works (Logic & Methodology)'}</h2>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        {data.subheading && <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{data.subheading}</p>}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{data.explanation}</p>

        {data.formulaText && (
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 text-indigo-900 font-mono text-sm sm:text-base font-bold shadow-xs overflow-x-auto">
            <span className="block text-[10px] uppercase font-bold text-indigo-600 mb-1 tracking-wider">Formula / Algorithm</span>
            {data.formulaText}
          </div>
        )}

        {data.codeSnippet && (
          <pre className="p-4 rounded-2xl bg-slate-900 text-indigo-300 font-mono text-xs overflow-x-auto">
            {data.codeSnippet}
          </pre>
        )}

        {data.variables && data.variables.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Variable & Logic Definitions</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.variables.map((variable, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center gap-3">
                  <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-800 font-mono font-bold">{variable.symbol}</span>
                  <span className="text-slate-700 font-medium">{variable.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
