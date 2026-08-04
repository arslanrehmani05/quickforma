import React from 'react';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WorkedExampleData } from '../../types/seo';

interface WorkedExampleProps {
  data?: WorkedExampleData;
}

export const WorkedExample: React.FC<WorkedExampleProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <Calculator className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Worked Real-World Example</h2>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">{data.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{data.scenarioDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sample Inputs */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">Sample Inputs</span>
            {data.sampleInputs.map((input, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-slate-200 last:border-0">
                <span className="text-slate-600 font-medium">{input.label}</span>
                <span className="font-mono font-bold text-slate-900">{input.value}</span>
              </div>
            ))}
          </div>

          {/* Final Output Result */}
          <div className="p-5 rounded-2xl bg-indigo-600 text-white flex flex-col justify-center items-center text-center shadow-sm">
            <span className="text-xs uppercase font-bold text-indigo-200 tracking-wider mb-1">{data.finalOutput.label}</span>
            <span className="text-3xl font-extrabold tracking-tight">{data.finalOutput.value}</span>
          </div>
        </div>

        {/* Step by Step Breakdown */}
        {data.stepsExplanation && data.stepsExplanation.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Calculation Breakdown</span>
            <div className="space-y-2">
              {data.stepsExplanation.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <ArrowRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{data.summary}</span>
        </div>
      </div>
    </section>
  );
};
