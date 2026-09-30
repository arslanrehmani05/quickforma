import React, { useState, useMemo } from 'react';
import { Sparkles, FlaskConical } from 'lucide-react';
import { calculatePh } from '../../utils/science/chemistryEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const PhPohCalculator: React.FC = () => {
  const [phInput, setPhInput] = useState<number>(3.5);

  const result = useMemo(() => {
    try {
      return calculatePh(undefined, phInput);
    } catch (err: any) {
      return { pH: 7, pOH: 7, hConcentration: 1e-7, ohConcentration: 1e-7, solutionType: 'Neutral' as const };
    }
  }, [phInput]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">pH & pOH Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate pH, pOH, [H+] concentration, and [OH-] concentration (pH + pOH = 14).
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Enter pH Value (0 to 14)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="14"
            value={phInput}
            onChange={(e) => setPhInput(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Acid-Base Equilibrium
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
            {result.solutionType} Solution
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">pH</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.pH}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">pOH</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{result.pOH}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">[H+] Conc. (M)</div>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-1">{result.hConcentration.toExponential(2)}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">[OH-] Conc. (M)</div>
            <div className="text-lg font-bold text-amber-300 font-mono mt-1">{result.ohConcentration.toExponential(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
