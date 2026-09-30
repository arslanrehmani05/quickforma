import React, { useState, useMemo } from 'react';
import { Sparkles, FlaskConical } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const StoichiometryPercentYieldCalculator: React.FC = () => {
  const [actualYield, setActualYield] = useState<number>(42.5);
  const [theoreticalYield, setTheoreticalYield] = useState<number>(50.0);

  const percentYield = useMemo(() => {
    if (theoreticalYield <= 0) return 0;
    return Math.round((actualYield / theoreticalYield) * 1000) / 10;
  }, [actualYield, theoreticalYield]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Stoichiometry & Percent Yield Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate reaction efficiency and percent yield (Percent Yield = (Actual Yield / Theoretical Yield) × 100%).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Actual Yield (grams)</label>
            <input
              type="number"
              min="0"
              value={actualYield}
              onChange={(e) => setActualYield(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Theoretical Yield (grams)</label>
            <input
              type="number"
              min="0.01"
              value={theoreticalYield}
              onChange={(e) => setTheoreticalYield(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl text-center space-y-3">
        <div className="text-xs font-semibold  text-indigo-300 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-400" /> Percent Yield Result
        </div>
        <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">{percentYield}%</div>
        <div className="text-xs text-indigo-300">({actualYield}g / {theoreticalYield}g) × 100</div>
      </div>
    </div>
  );
};
