import React, { useState, useMemo } from 'react';
import { Sparkles, BarChart } from 'lucide-react';
import { calculateZScore } from '../../utils/math/statisticsEngine';

export const ZScoreCalculator: React.FC = () => {
  const [valX, setValX] = useState<number>(85);
  const [mean, setMean] = useState<number>(75);
  const [stdDev, setStdDev] = useState<number>(10);

  const result = useMemo(() => {
    try {
      return calculateZScore(valX, mean, stdDev);
    } catch (err: any) {
      return { zScore: 0, percentile: 0 };
    }
  }, [valX, mean, stdDev]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <BarChart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Z-Score Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate standard score Z = (X - μ) / σ and percentile rank under standard normal distribution curve.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Raw Score (X)</label>
            <input
              type="number"
              value={valX}
              onChange={(e) => setValX(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mean ($\mu$)</label>
            <input
              type="number"
              value={mean}
              onChange={(e) => setMean(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Standard Dev ($\sigma$)</label>
            <input
              type="number"
              min="0.001"
              value={stdDev}
              onChange={(e) => setStdDev(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Z-Score Result
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Z-Score ($Z$)</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.zScore}</div>
            <div className="text-xs text-indigo-300 mt-1">
              {result.zScore >= 0 ? `${result.zScore} std devs above mean` : `${Math.abs(result.zScore)} std devs below mean`}
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Percentile Rank</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.percentile}%</div>
            <div className="text-xs text-indigo-300 mt-1">$P(X \le {valX})$</div>
          </div>
        </div>
      </div>
    </div>
  );
};
