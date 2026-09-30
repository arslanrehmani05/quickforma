import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { TrendingDown, Calculator } from 'lucide-react';
import { ToolSeoWrapper } from '../seo/ToolSeoWrapper';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const DepreciationCalculator: React.FC = () => {
  const [initialCost, setInitialCost] = useState<number>(10000);
  const [salvageValue, setSalvageValue] = useState<number>(1000);
  const [usefulLifeYears, setUsefulLifeYears] = useState<number>(5);

  // Math: Straight-Line Depreciation = (Cost - Salvage) / Useful Life
  const depreciableBase = Math.max(0, initialCost - salvageValue);
  const annualDepreciation = usefulLifeYears > 0 ? depreciableBase / usefulLifeYears : 0;
  const monthlyDepreciation = annualDepreciation / 12;

  // Yearly schedule
  const schedule = [];
  let currentBookValue = initialCost;
  let accumulatedDepreciation = 0;

  for (let year = 1; year <= Math.min(usefulLifeYears, 30); year++) {
    accumulatedDepreciation += annualDepreciation;
    currentBookValue = Math.max(salvageValue, initialCost - accumulatedDepreciation);
    schedule.push({
      year,
      annualDepreciation,
      accumulatedDepreciation,
      bookValue: currentBookValue,
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <TrendingDown className="w-5 h-5" />
            <span>Asset Depreciation Calculator (Straight-Line)</span>
          </div>
          <ResetButton onReset={() => { setInitialCost(10000); setSalvageValue(1000); setUsefulLifeYears(5); }} />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Asset Purchase Cost ($)</label>
            <input
              type="number"
              value={initialCost}
              onChange={(e) => setInitialCost(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Estimated Salvage Value ($)</label>
            <input
              type="number"
              value={salvageValue}
              onChange={(e) => setSalvageValue(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Useful Asset Life (Years)</label>
            <input
              type="number"
              value={usefulLifeYears}
              onChange={(e) => setUsefulLifeYears(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>
        </div>

        {/* Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
          <div className="p-4 bg-black text-white rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-zinc-300">Annual Expense Deduction</span>
            <div className="text-2xl font-extrabold">${annualDepreciation.toFixed(2)} / yr</div>
            <span className="text-[11px] text-zinc-400 font-mono">${monthlyDepreciation.toFixed(2)} / month</span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Total Depreciable Base</span>
            <div className="text-xl font-bold text-zinc-900">${depreciableBase.toFixed(2)}</div>
            <span className="text-[11px] text-zinc-500 font-mono">Cost minus salvage value</span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Ending Book Value</span>
            <div className="text-xl font-bold text-zinc-900">${salvageValue.toFixed(2)}</div>
            <span className="text-[11px] text-zinc-500 font-mono">At year {usefulLifeYears}</span>
          </div>
        </div>

        {/* Depreciation Schedule Table */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-zinc-900 ">Depreciation Schedule</span>
          <div className="border border-zinc-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-100 text-zinc-700 font-semibold border-b border-zinc-200">
                <tr>
                  <th className="p-2.5">Year</th>
                  <th className="p-2.5">Annual Depreciation</th>
                  <th className="p-2.5">Accumulated Depreciation</th>
                  <th className="p-2.5">Ending Book Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                {schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-zinc-50">
                    <td className="p-2.5 font-bold text-zinc-900">Year {row.year}</td>
                    <td className="p-2.5 text-zinc-700">${row.annualDepreciation.toFixed(2)}</td>
                    <td className="p-2.5 text-zinc-700">${row.accumulatedDepreciation.toFixed(2)}</td>
                    <td className="p-2.5 font-bold text-zinc-900">${row.bookValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
