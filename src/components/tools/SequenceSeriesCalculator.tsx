import React, { useState, useMemo } from 'react';
import { Sparkles, Calculator } from 'lucide-react';

export const SequenceSeriesCalculator: React.FC = () => {
  const [seqType, setSeqType] = useState<'arithmetic' | 'geometric'>('arithmetic');
  const [firstTerm, setFirstTerm] = useState<number>(2);
  const [commonDiffRatio, setCommonDiffRatio] = useState<number>(3);
  const [nTerms, setNTerms] = useState<number>(10);

  const calculation = useMemo(() => {
    const a1 = firstTerm;
    const n = Math.max(1, Math.floor(nTerms));

    if (seqType === 'arithmetic') {
      const d = commonDiffRatio;
      const an = a1 + (n - 1) * d;
      const sum = (n / 2) * (a1 + an);
      return {
        nthTerm: Math.round(an * 1000) / 1000,
        sum: Math.round(sum * 1000) / 1000,
        formulaStr: `a_${n} = ${a1} + (${n}-1)(${d})`,
      };
    } else {
      const r = commonDiffRatio;
      const an = a1 * Math.pow(r, n - 1);
      const sum = r !== 1 ? (a1 * (1 - Math.pow(r, n))) / (1 - r) : a1 * n;
      return {
        nthTerm: Math.round(an * 1000) / 1000,
        sum: Math.round(sum * 1000) / 1000,
        formulaStr: `a_${n} = ${a1} × (${r})^{${n}-1}`,
      };
    }
  }, [seqType, firstTerm, commonDiffRatio, nTerms]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Sequence & Series Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate $n$-th terms and sum of terms for Arithmetic and Geometric sequences.
            </p>
          </div>
        </div>

        {/* Type Toggle */}
        <div className="flex gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setSeqType('arithmetic')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${seqType === 'arithmetic' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}
          >
            Arithmetic Sequence
          </button>
          <button
            onClick={() => setSeqType('geometric')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${seqType === 'geometric' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}
          >
            Geometric Sequence
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              First Term ($a_1$)
            </label>
            <input
              type="number"
              value={firstTerm}
              onChange={(e) => setFirstTerm(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {seqType === 'arithmetic' ? 'Common Difference (d)' : 'Common Ratio (r)'}
            </label>
            <input
              type="number"
              value={commonDiffRatio}
              onChange={(e) => setCommonDiffRatio(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Number of Terms ($n$)
            </label>
            <input
              type="number"
              min="1"
              value={nTerms}
              onChange={(e) => setNTerms(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Sequence Results
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">$n$-th Term ($a_n$)</div>
            <div className="text-3xl font-extrabold text-white font-mono">{calculation.nthTerm}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Sum of $n$ Terms ($S_n$)</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{calculation.sum}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
