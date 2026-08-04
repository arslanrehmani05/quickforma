import React, { useState } from 'react';
import { PieChart } from 'lucide-react';

export const CpmAdCostCalculator: React.FC = () => {
  const [totalCost, setTotalCost] = useState<number>(2500);
  const [impressions, setImpressions] = useState<number>(200000);

  const cpm = (impressions || 0) > 0 ? ((totalCost || 0) / impressions) * 1000 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">CPM & Ad Cost Calculator</h2>
            <p className="text-slate-400 text-sm">Calculate Cost Per Mille (CPM), total ad campaign budget, and ad impression rates.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Total Campaign Budget / Cost ($)</label>
              <input
                type="number"
                min="0"
                value={totalCost}
                onChange={(e) => setTotalCost(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Total Ad Impressions</label>
              <input
                type="number"
                min="0"
                value={impressions}
                onChange={(e) => setImpressions(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Effective CPM (Cost Per 1,000 Impressions)</span>
              <div className="my-3 text-4xl sm:text-5xl font-extrabold text-indigo-400 font-mono">
                ${cpm.toFixed(2)}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Cost Per Single Impression:</span>
                <span className="font-mono text-slate-300">${(cpm / 1000).toFixed(4)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
