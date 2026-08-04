import React, { useState } from 'react';
import { TrendingUp, HelpCircle } from 'lucide-react';

export const BreakEvenPointCalculator: React.FC = () => {
  const [fixedCosts, setFixedCosts] = useState<number>(5000);
  const [pricePerUnit, setPricePerUnit] = useState<number>(50);
  const [costPerUnit, setCostPerUnit] = useState<number>(20);

  const marginPerUnit = Math.max(0, (pricePerUnit || 0) - (costPerUnit || 0));
  const breakEvenUnits = marginPerUnit > 0 ? Math.ceil((fixedCosts || 0) / marginPerUnit) : 0;
  const breakEvenRevenue = breakEvenUnits * (pricePerUnit || 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Break-Even Point Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate units and revenue needed to cover fixed overhead costs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Total Monthly Fixed Costs ($)</label>
              <input
                type="number"
                min="0"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Sale Price Per Unit ($)</label>
              <input
                type="number"
                min="0"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Variable Cost Per Unit ($)</label>
              <input
                type="number"
                min="0"
                value={costPerUnit}
                onChange={(e) => setCostPerUnit(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Break-Even Units Required</span>
              <div className="my-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {breakEvenUnits.toLocaleString()} <span className="text-base text-indigo-200 font-normal">units</span>
              </div>
              <p className="text-indigo-100 text-xs leading-relaxed">
                Profit margin per unit sold: <strong className="text-white">${marginPerUnit.toFixed(2)}</strong>
              </p>
            </div>
            <div className="pt-6 border-t border-indigo-500/80 flex justify-between text-xs text-indigo-100">
              <span>Gross Break-Even Revenue:</span>
              <span className="font-bold text-white">${breakEvenRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
