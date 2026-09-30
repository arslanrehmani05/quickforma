import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const CpmAdCostCalculator: React.FC = () => {
  const [cost, setCost] = useState<number>(1500);
  const [impressions, setImpressions] = useState<number>(250000);

  const cpm = (impressions || 0) > 0 ? ((cost || 0) / impressions) * 1000 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">CPM (Cost Per Mille) Ad Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate cost per thousand ad impressions for advertising campaigns.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold  mb-2">Total Campaign Cost ($)</label>
              <input
                type="number"
                min="0"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-semibold  mb-2">Total Ad Impressions</label>
              <input
                type="number"
                min="0"
                value={impressions}
                onChange={(e) => setImpressions(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold  text-indigo-200">Effective CPM</span>
              <div className="my-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">${cpm.toFixed(2)}</div>
            </div>
            <div className="pt-4 border-t border-indigo-500/80 flex justify-between text-xs text-indigo-100">
              <span>Cost Per 1,000 Impressions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
