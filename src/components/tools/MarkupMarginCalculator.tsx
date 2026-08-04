import React, { useState } from 'react';
import { Percent } from 'lucide-react';

export const MarkupMarginCalculator: React.FC = () => {
  const [cost, setCost] = useState<number>(50);
  const [sellingPrice, setSellingPrice] = useState<number>(80);

  const profit = (sellingPrice || 0) - (cost || 0);
  const marginPercent = (sellingPrice || 0) > 0 ? (profit / sellingPrice) * 100 : 0;
  const markupPercent = (cost || 0) > 0 ? (profit / cost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Markup vs Profit Margin Calculator</h2>
            <p className="text-slate-400 text-sm">Calculate profit margins, markup percentages, cost prices, and retail selling rates.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Item Cost Price ($)</label>
              <input
                type="number"
                min="0"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Retail Selling Price ($)</label>
              <input
                type="number"
                min="0"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Profit Margin</span>
                <div className="my-2 text-3xl font-extrabold text-indigo-400 font-mono">
                  {marginPercent.toFixed(1)}%
                </div>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Markup</span>
                <div className="my-2 text-3xl font-extrabold text-emerald-400 font-mono">
                  {markupPercent.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between font-semibold text-slate-200">
                <span>Gross Profit Per Unit:</span>
                <span className="font-mono text-emerald-400">${profit.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
