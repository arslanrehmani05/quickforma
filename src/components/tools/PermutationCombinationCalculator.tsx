import React, { useState, useMemo } from 'react';
import { Sparkles, Calculator } from 'lucide-react';
import { calculatePermutation, calculateCombination, factorial } from '../../utils/math/statisticsEngine';

export const PermutationCombinationCalculator: React.FC = () => {
  const [valN, setValN] = useState<number>(8);
  const [valR, setValR] = useState<number>(3);

  const result = useMemo(() => {
    try {
      const n = Math.max(0, Math.floor(valN));
      const r = Math.max(0, Math.floor(valR));
      const nPr = calculatePermutation(n, r);
      const nCr = calculateCombination(n, r);
      const nFact = n <= 20 ? factorial(n) : Infinity;

      return { nPr, nCr, nFact, error: null };
    } catch (err: any) {
      return { nPr: 0, nCr: 0, nFact: 0, error: err.message };
    }
  }, [valN, valR]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Permutation & Combination Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate permutations nPr = n! / (n-r)! (order matters) and combinations nCr = n! / (r!(n-r)!) (order does not matter).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Objects ($n$)</label>
            <input
              type="number"
              min="0"
              value={valN}
              onChange={(e) => setValN(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sample Size ($r$)</label>
            <input
              type="number"
              min="0"
              max={valN}
              value={valR}
              onChange={(e) => setValR(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Combinatorics Results
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Permutations ($nPr$)</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.nPr}</div>
            <div className="text-xs text-indigo-300 mt-1">Order Matters</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Combinations ($nCr$)</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.nCr}</div>
            <div className="text-xs text-indigo-300 mt-1">Order Does Not Matter</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Factorial ($n!$)</div>
            <div className="text-3xl font-extrabold text-amber-300 font-mono">{result.nFact}</div>
            <div className="text-xs text-indigo-300 mt-1">{valN}!</div>
          </div>
        </div>
      </div>
    </div>
  );
};
