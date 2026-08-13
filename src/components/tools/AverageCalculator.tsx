import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles } from 'lucide-react';
import { parseDataSet } from '../../utils/math/statisticsEngine';

export const AverageCalculator: React.FC = () => {
  const [rawInput, setRawInput] = useState<string>('85, 90, 78, 92, 88, 95');

  const calculation = useMemo(() => {
    const data = parseDataSet(rawInput);
    if (data.length === 0) return { mean: 0, count: 0, sum: 0, min: 0, max: 0 };
    const count = data.length;
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / count;
    const min = Math.min(...data);
    const max = Math.max(...data);

    return {
      mean: Math.round(mean * 1000) / 1000,
      count,
      sum: Math.round(sum * 1000) / 1000,
      min,
      max,
    };
  }, [rawInput]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Average Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate the arithmetic mean, total sum, min/max range, and count from a set of numbers.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Enter Numbers (separated by commas, spaces, or lines)
          </label>
          <textarea
            rows={4}
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder="e.g. 85, 90, 78, 92, 88"
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 text-sm font-mono text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Average Summary
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Average (Mean)</div>
            <div className="text-3xl font-extrabold text-white font-mono">{calculation.mean}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Total Sum</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{calculation.sum}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Count (N)</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{calculation.count}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Min / Max</div>
            <div className="text-lg font-extrabold text-amber-300 font-mono mt-1">
              {calculation.min} / {calculation.max}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
