import React, { useState, useMemo } from 'react';
import { Sparkles, FlaskConical } from 'lucide-react';
import { calculateDilution } from '../../utils/science/chemistryEngine';

export const DilutionCalculator: React.FC = () => {
  const [c1, setC1] = useState<number>(6.0); // 6M stock
  const [v1, setV1] = useState<number>(50); // 50 mL
  const [c2, setC2] = useState<number>(1.0); // target 1M

  const result = useMemo(() => {
    try {
      return calculateDilution(c1, v1, c2, undefined);
    } catch (err: any) {
      return { missingValue: 0, missingLabel: '', solventToAdd: 0 };
    }
  }, [c1, v1, c2]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Solution Dilution Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate required final volume ($V_2$) or concentration ($C_2$) using $C_1 V_1 = C_2 V_2$ and required solvent volume to add.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Stock Concentration ($C_1$)</label>
            <input
              type="number"
              value={c1}
              onChange={(e) => setC1(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Stock Volume ($V_1$)</label>
            <input
              type="number"
              value={v1}
              onChange={(e) => setV1(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Concentration ($C_2$)</label>
            <input
              type="number"
              value={c2}
              onChange={(e) => setC2(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Dilution Recipe
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Final Target Volume ($V_2$)</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.missingValue}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Solvent Volume to Add</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.solventToAdd}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
