import React, { useState, useMemo } from 'react';
import { Sparkles, BarChart2 } from 'lucide-react';
import { calculateBinomialProbability } from '../../utils/math/statisticsEngine';

export const ProbabilityDistributionsCalculator: React.FC = () => {
  const [trialsN, setTrialsN] = useState<number>(10);
  const [successesK, setSuccessesK] = useState<number>(3);
  const [probP, setProbP] = useState<number>(0.5);

  const result = useMemo(() => {
    try {
      return calculateBinomialProbability(trialsN, successesK, probP);
    } catch (err: any) {
      return { probExact: 0, probAtLeast: 0, probAtMost: 0 };
    }
  }, [trialsN, successesK, probP]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Binomial Distribution Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate exact probability $P(X = k)$, at least $P(X \ge k)$, and at most $P(X \le k)$ for Binomial distributions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Number of Trials ($n$)</label>
            <input
              type="number"
              min="1"
              value={trialsN}
              onChange={(e) => setTrialsN(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Successes ($k$)</label>
            <input
              type="number"
              min="0"
              max={trialsN}
              value={successesK}
              onChange={(e) => setSuccessesK(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Probability of Success ($p$)</label>
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              value={probP}
              onChange={(e) => setProbP(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Binomial Probabilities
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Exact $P(X = {successesK})$</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.probExact}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">At Least $P(X \ge {successesK})$</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.probAtLeast}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">At Most $P(X \le {successesK})$</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{result.probAtMost}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
