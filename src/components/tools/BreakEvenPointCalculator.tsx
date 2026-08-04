import React, { useState } from 'react';
import { TrendingUp, HelpCircle } from 'lucide-react';

export const BreakEvenPointCalculator: React.FC = () => {
  const [fixedCosts, setFixedCosts] = useState<number>(15000);
  const [pricePerUnit, setPricePerUnit] = useState<number>(120);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(45);

  const contributionMargin = Math.max(0.01, (pricePerUnit || 0) - (variableCostPerUnit || 0));
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil((fixedCosts || 0) / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * (pricePerUnit || 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Break-Even Point Calculator</h2>
            <p className="text-slate-400 text-sm">Calculate the required sales unit volume and revenue to cover fixed and variable costs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Total Fixed Costs ($)</label>
              <input
                type="number"
                min="0"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Selling Price Per Unit ($)</label>
              <input
                type="number"
                min="0"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Variable Cost Per Unit ($)</label>
              <input
                type="number"
                min="0"
                value={variableCostPerUnit}
                onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Break-Even Sales Units</span>
              <div className="my-3 text-4xl sm:text-5xl font-extrabold text-indigo-400 font-mono">
                {breakEvenUnits.toLocaleString()} <span className="text-sm font-medium text-slate-400">units</span>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-4 block">Break-Even Target Revenue</span>
              <div className="my-2 text-2xl sm:text-3xl font-bold text-slate-100 font-mono">
                ${breakEvenRevenue.toLocaleString()}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex justify-between">
                <span>Contribution Margin / Unit:</span>
                <span className="font-mono text-slate-200 font-semibold">${contributionMargin.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Contribution Margin Ratio:</span>
                <span className="font-mono text-slate-200 font-semibold">{((contributionMargin / (pricePerUnit || 1)) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
