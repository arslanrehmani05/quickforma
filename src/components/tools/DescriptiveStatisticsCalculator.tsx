import React, { useState, useMemo } from 'react';
import { BarChart3, Sparkles } from 'lucide-react';
import { calculateDescriptiveStats, parseDataSet } from '../../utils/math/statisticsEngine';

export const DescriptiveStatisticsCalculator: React.FC = () => {
  const [rawInput, setRawInput] = useState<string>('12, 15, 18, 22, 25, 25, 30, 34, 40');

  const result = useMemo(() => {
    try {
      const data = parseDataSet(rawInput);
      return { stats: calculateDescriptiveStats(data), error: null };
    } catch (err: any) {
      return { stats: null, error: err.message };
    }
  }, [rawInput]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Descriptive Statistics Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate mean, median, mode, range, sample & population variance, sample & population standard deviation, quartiles, IQR, and MAD.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Enter Numeric Dataset (separated by commas, spaces, or newlines)
          </label>
          <textarea
            rows={4}
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder="e.g. 12, 15, 18, 22, 25, 25, 30, 34, 40"
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 text-sm font-mono text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      {result.stats && (
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Statistical Summary ($N = {result.stats.count}$)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-indigo-200 mb-1">Mean ($\mu$)</div>
              <div className="text-2xl font-extrabold text-white font-mono">{result.stats.mean}</div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-indigo-200 mb-1">Median</div>
              <div className="text-2xl font-extrabold text-indigo-300 font-mono">{result.stats.median}</div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-indigo-200 mb-1">Sample Std Dev ($s$)</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{result.stats.sampleStdDev}</div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-indigo-200 mb-1">Pop Std Dev ($\sigma$)</div>
              <div className="text-2xl font-extrabold text-amber-300 font-mono">{result.stats.populationStdDev}</div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-indigo-200 mb-1">Sample Variance ($s^2$)</div>
              <div className="text-lg font-bold text-white font-mono">{result.stats.sampleVariance}</div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-indigo-200 mb-1">Interquartile Range (IQR)</div>
              <div className="text-lg font-bold text-indigo-300 font-mono">{result.stats.iqr}</div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-indigo-200 mb-1">Q1 / Q3</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">{result.stats.q1} / {result.stats.q3}</div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-indigo-200 mb-1">Range</div>
              <div className="text-lg font-bold text-amber-300 font-mono">{result.stats.range}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
