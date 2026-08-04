import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { ToolSeoWrapper } from '../seo/ToolSeoWrapper';
import { ROI_CALCULATOR_SEO } from '../../data/sampleToolSeoData';

export const RoiCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(14500);

  const netProfit = (finalValue || 0) - (initialInvestment || 0);
  const roiPercent = (initialInvestment || 0) > 0 ? (netProfit / initialInvestment) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. INTERACTIVE TOOL WIDGET (ALWAYS FIRST) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Return on Investment (ROI) Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate net percentage return on marketing, stock, or business investments.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Initial Amount Invested ($)</label>
              <input
                type="number"
                min="0"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Final Value Received ($)</label>
              <input
                type="number"
                min="0"
                value={finalValue}
                onChange={(e) => setFinalValue(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Return On Investment (ROI)</span>
              <div className="my-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{roiPercent.toFixed(2)}%</div>
            </div>
            <div className="pt-4 border-t border-indigo-500/80 flex justify-between text-xs text-indigo-100">
              <span>Net Profit Amount:</span>
              <span className="font-bold text-white">${netProfit.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
