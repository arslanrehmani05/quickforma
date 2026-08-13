import React, { useState, useMemo } from 'react';
import { Sparkles, BarChart3 } from 'lucide-react';

export const HypothesisTestCalculator: React.FC = () => {
  const [sampleMean, setSampleMean] = useState<number>(104);
  const [hypothesizedMean, setHypothesizedMean] = useState<number>(100);
  const [stdDev, setStdDev] = useState<number>(15);
  const [sampleSize, setSampleSize] = useState<number>(36);

  const result = useMemo(() => {
    if (sampleSize <= 0 || stdDev <= 0) {
      return { zStat: 0, pValue: 0, conclusion: 'N/A' };
    }
    const se = stdDev / Math.sqrt(sampleSize);
    const zStat = (sampleMean - hypothesizedMean) / se;

    // Approximate p-value (two-tailed)
    const absZ = Math.abs(zStat);
    const t = 1 / (1 + 0.2316419 * absZ);
    const d = 0.3989423 * Math.exp((-absZ * absZ) / 2);
    let p1 = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    const pValue = 2 * p1;

    const conclusion = pValue < 0.05 ? 'Reject Null Hypothesis (H₀) at α = 0.05' : 'Fail to Reject Null Hypothesis (H₀)';

    return {
      zStat: Math.round(zStat * 1000) / 1000,
      pValue: Math.round(pValue * 10000) / 10000,
      conclusion,
    };
  }, [sampleMean, hypothesizedMean, stdDev, sampleSize]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Hypothesis Test Calculator (Z-Test / t-Test)</h2>
            <p className="text-xs text-slate-500">
              Calculate test statistic Z = (x̄ - μ₀) / (s / √n), two-tailed p-value, and significance decision.
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
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hypothesized Mean ($\mu_0$)</label>
            <input
              type="number"
              value={hypothesizedMean}
              onChange={(e) => setHypothesizedMean(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Standard Deviation ($s$)</label>
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
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Hypothesis Test Results
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Test Statistic ($Z$)</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.zStat}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">$p$-value (Two-Tailed)</div>
            <div className="text-3xl font-extrabold text-amber-300 font-mono">{result.pValue}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Decision</div>
            <div className="text-xs font-bold text-emerald-400 mt-2">{result.conclusion}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
