import React, { useState } from 'react';
import { PieChart } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(16500);
  const [investmentYears, setInvestmentYears] = useState<number>(3);

  const netGain = (finalValue || 0) - (initialInvestment || 0);
  const roiPercent = (initialInvestment || 0) > 0 ? (netGain / initialInvestment) * 100 : 0;
  const annualizedRoi = (investmentYears || 0) > 0 && (initialInvestment || 0) > 0 && (finalValue || 0) > 0
    ? (Math.pow(finalValue / initialInvestment, 1 / investmentYears) - 1) * 100
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">ROI & Investment Return Calculator</h2>
            <p className="text-slate-400 text-sm">Calculate total Return on Investment (ROI) percentage and annualized rate of return.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Initial Amount Invested ($)</label>
              <input
                type="number"
                min="0"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Final Value / Total Return ($)</label>
              <input
                type="number"
                min="0"
                value={finalValue}
                onChange={(e) => setFinalValue(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Investment Duration (Years)</label>
              <input
                type="number"
                min="0.1"
                step="0.5"
                value={investmentYears}
                onChange={(e) => setInvestmentYears(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Return on Investment</span>
              <div className={`my-3 text-4xl sm:text-5xl font-extrabold font-mono ${roiPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {roiPercent >= 0 ? '+' : ''}{roiPercent.toFixed(2)}%
              </div>
              <span className="text-xs text-slate-500">Net Profit / Gain: <strong className="text-slate-200 font-mono">${netGain.toLocaleString()}</strong></span>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Annualized ROI (CAGR):</span>
                <span className="font-mono text-indigo-400 font-bold">{annualizedRoi.toFixed(2)}% / yr</span>
              </div>
              <div className="flex justify-between">
                <span>Total Multiple:</span>
                <span className="font-mono text-slate-300">{((finalValue || 0) / (initialInvestment || 1)).toFixed(2)}x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
