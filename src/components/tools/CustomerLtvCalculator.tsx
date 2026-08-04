import React, { useState } from 'react';
import { Users } from 'lucide-react';

export const CustomerLtvCalculator: React.FC = () => {
  const [avgPurchaseValue, setAvgPurchaseValue] = useState<number>(75);
  const [purchaseFrequencyPerYear, setPurchaseFrequencyPerYear] = useState<number>(4);
  const [customerLifespanYears, setCustomerLifespanYears] = useState<number>(3);
  const [grossMarginPercent, setGrossMarginPercent] = useState<number>(75);

  const annualValue = (avgPurchaseValue || 0) * (purchaseFrequencyPerYear || 0);
  const grossLtv = annualValue * (customerLifespanYears || 0);
  const netLtv = grossLtv * ((grossMarginPercent || 0) / 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Customer Lifetime Value (LTV) Calculator</h2>
            <p className="text-slate-400 text-sm">Calculate average gross and net Customer Lifetime Value (CLV / LTV).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Average Order / Purchase Value ($)</label>
              <input
                type="number"
                min="0"
                value={avgPurchaseValue}
                onChange={(e) => setAvgPurchaseValue(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Purchases / Yr</label>
                <input
                  type="number"
                  min="0"
                  value={purchaseFrequencyPerYear}
                  onChange={(e) => setPurchaseFrequencyPerYear(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Lifespan (Yrs)</label>
                <input
                  type="number"
                  min="0"
                  value={customerLifespanYears}
                  onChange={(e) => setCustomerLifespanYears(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Gross Margin (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={grossMarginPercent}
                onChange={(e) => setGrossMarginPercent(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Net Customer Lifetime Value (LTV)</span>
              <div className="my-3 text-4xl sm:text-5xl font-extrabold text-emerald-400 font-mono">
                ${netLtv.toFixed(2)}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Annual Customer Value:</span>
                <span className="font-mono text-slate-200">${annualValue.toFixed(2)} / yr</span>
              </div>
              <div className="flex justify-between">
                <span>Gross LTV (Before Margin):</span>
                <span className="font-mono text-indigo-400">${grossLtv.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
