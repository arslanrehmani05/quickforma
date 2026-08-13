import React, { useState, useMemo } from 'react';
import { Divide, Sparkles } from 'lucide-react';
import { solveProportion, gcd } from '../../utils/math/mathEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const RatioProportionCalculator: React.FC = () => {
  const [valA, setValA] = useState<number>(2);
  const [valB, setValB] = useState<number>(5);
  const [valC, setValC] = useState<number>(10);

  const result = useMemo(() => {
    try {
      const x = solveProportion(valA, valB, valC);
      const commonDivisor = gcd(valA, valB);
      const simplifiedA = valA / commonDivisor;
      const simplifiedB = valB / commonDivisor;
      return {
        solvedX: Math.round(x * 1000) / 1000,
        simplifiedRatio: `${simplifiedA} : ${simplifiedB}`,
        error: null,
      };
    } catch (err: any) {
      return { solvedX: 0, simplifiedRatio: '', error: err.message };
    }
  }, [valA, valB, valC]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Divide className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Ratio & Proportion Calculator</h2>
            <p className="text-xs text-slate-500">
              Solve for missing ratio variable x in $A : B = C : X$ or simplify complex ratios into lowest integer terms.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 items-center text-center">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">A</label>
            <input
              type="number"
              value={valA}
              onChange={(e) => setValA(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-center text-sm font-mono text-slate-900 outline-none focus:border-indigo-600"
            />
          </div>
          <div className="text-lg font-bold text-slate-500">:</div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">B</label>
            <input
              type="number"
              value={valB}
              onChange={(e) => setValB(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-center text-sm font-mono text-slate-900 outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        <div className="text-center font-bold text-sm text-slate-400 uppercase tracking-widest">equals (=)</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 items-center text-center">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">C</label>
            <input
              type="number"
              value={valC}
              onChange={(e) => setValC(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-center text-sm font-mono text-slate-900 outline-none focus:border-indigo-600"
            />
          </div>
          <div className="text-lg font-bold text-slate-500">:</div>
          <div>
            <label className="block text-xs font-semibold text-indigo-600 mb-1">X (Unknown)</label>
            <div className="w-full bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2 text-center text-sm font-extrabold text-indigo-700 font-mono">
              {result.solvedX}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Ratio Solution
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Solved X Value</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.solvedX}</div>
            <div className="text-xs text-indigo-300 mt-1">{valA} / {valB} = {valC} / {result.solvedX}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Simplified Ratio A:B</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.simplifiedRatio}</div>
            <div className="text-xs text-indigo-300 mt-1">Lowest Whole Number Ratio</div>
          </div>
        </div>
      </div>
    </div>
  );
};
