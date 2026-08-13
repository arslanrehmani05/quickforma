import React, { useState } from 'react';
import { Percent } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const MarkupMarginCalculator: React.FC = () => {
  const [cost, setCost] = useState<number>(40);
  const [revenue, setRevenue] = useState<number>(100);

  const profit = (revenue || 0) - (cost || 0);
  const marginPercent = (revenue || 0) > 0 ? (profit / revenue) * 100 : 0;
  const markupPercent = (cost || 0) > 0 ? (profit / cost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Profit Margin & Markup Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate profit margins vs percentage markup on wholesale cost.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold  mb-2">Item Cost ($)</label>
              <input
                type="number"
                min="0"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-semibold  mb-2">Selling Price / Revenue ($)</label>
              <input
                type="number"
                min="0"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md space-y-4">
            <div className="flex justify-between border-b border-indigo-500/80 pb-4">
              <div>
                <span className="text-xs text-indigo-200 uppercase font-bold block">Profit Margin</span>
                <span className="text-3xl font-extrabold text-white">{marginPercent.toFixed(2)}%</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-indigo-200 uppercase font-bold block">Markup %</span>
                <span className="text-3xl font-extrabold text-white">{markupPercent.toFixed(2)}%</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-indigo-100">
              <span>Gross Profit Amount:</span>
              <span className="font-bold text-white">${profit.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
