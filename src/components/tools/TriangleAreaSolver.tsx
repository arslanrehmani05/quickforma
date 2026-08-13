import React, { useState, useMemo } from 'react';
import { Sparkles, Triangle } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';
import { ModePillsBar } from '../ui/ModePillsBar';

export const TriangleAreaSolver: React.FC = () => {
  const [base, setBase] = useState<number>(10);
  const [height, setHeight] = useState<number>(6);

  const area = useMemo(() => {
    return Math.round(0.5 * Math.max(0, base) * Math.max(0, height) * 1000) / 1000;
  }, [base, height]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Triangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Triangle Area & Solver</h2>
            <p className="text-xs text-slate-500">
              Calculate triangle area from base and height using Area = 0.5 * b * h.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Base (b)</label>
            <input
              type="number"
              min="0"
              value={base}
              onChange={(e) => setBase(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Height (h)</label>
            <input
              type="number"
              min="0"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl text-center space-y-3">
        <div className="text-xs font-semibold  text-indigo-300 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-400" /> Triangle Area Result
        </div>
        <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">{area}</div>
        <div className="text-xs text-indigo-300">0.5 × {base} × {height} = {area}</div>
      </div>
    </div>
  );
};
