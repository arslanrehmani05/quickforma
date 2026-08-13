import React, { useState, useMemo } from 'react';
import { Sparkles, BarChart3 } from 'lucide-react';
import { calculateConfidenceInterval } from '../../utils/math/statisticsEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const ConfidenceIntervalCalculator: React.FC = () => {
  const [sampleMean, setSampleMean] = useState<number>(100);
  const [stdDev, setStdDev] = useState<number>(15);
  const [sampleSize, setSampleSize] = useState<number>(50);
  const [confidenceLevel, setConfidenceLevel] = useState<90 | 95 | 99>(95);

  const result = useMemo(() => {
    try {
      return calculateConfidenceInterval(sampleMean, stdDev, sampleSize, confidenceLevel);
    } catch (err: any) {
      return { marginOfError: 0, lowerBound: 0, upperBound: 0 };
    }
  }, [sampleMean, stdDev, sampleSize, confidenceLevel]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Confidence Interval Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate margin of error E = Z * (σ / √n) and lower/upper bounds for population mean confidence intervals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sample Mean (x̄)</label>
            <input
              type="number"
              value={sampleMean}
              onChange={(e) => setSampleMean(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Standard Deviation ($s$ or $\sigma$)</label>
            <input
              type="number"
              min="0.01"
              value={stdDev}
              onChange={(e) => setStdDev(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sample Size ($n$)</label>
            <input
              type="number"
              min="1"
              value={sampleSize}
              onChange={(e) => setSampleSize(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confidence Level</label>
            <div className="flex gap-2">
              {[90, 95, 99].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setConfidenceLevel(lvl as any)}
                  className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${confidenceLevel === lvl ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}
                >
                  {lvl}%
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> {confidenceLevel}% Confidence Interval
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Lower Bound</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.lowerBound}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Margin of Error ($\pm E$)</div>
            <div className="text-3xl font-extrabold text-amber-300 font-mono font-mono">{result.marginOfError}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Upper Bound</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.upperBound}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
