import React from 'react';
import { ArrowRight, Workflow } from 'lucide-react';
import { WorkflowProgressionData } from '../../types/seo';

interface WorkflowProgressionProps {
  data?: WorkflowProgressionData;
}

export const WorkflowProgression: React.FC<WorkflowProgressionProps> = ({ data }) => {
  if (!data || !data.steps || data.steps.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <Workflow className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{data.heading || 'Continue Your Workflow'}</h2>
      </div>

      {data.introText && (
        <p className="text-slate-600 text-sm">{data.introText}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.steps.map((step, idx) => (
          <a
            key={idx}
            href={`/tools/${step.toolId}`}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Action Step</span>
              </div>
              <h3 className="text-slate-900 font-bold text-sm mb-1 group-hover:text-indigo-600 transition-colors">
                {step.toolName}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{step.description}</p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-end text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>{step.actionPrompt || 'Open Tool'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
