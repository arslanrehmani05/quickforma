import React, { useState, useMemo } from 'react';
import { Sparkles, Atom } from 'lucide-react';
import { calculateMolarMass } from '../../utils/science/chemistryEngine';

export const MolarMassCalculator: React.FC = () => {
  const [formula, setFormula] = useState<string>('H2SO4');

  const result = useMemo(() => {
    try {
      return { data: calculateMolarMass(formula), error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, [formula]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Atom className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Molar Mass & Composition Calculator</h2>
            <p className="text-xs text-slate-500">
              Parse chemical formulas (e.g., H2SO4, Ca(NO3)2) to compute total molecular weight (g/mol) and element mass percentages.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Chemical Formula</label>
          <input
            type="text"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            placeholder="e.g. H2SO4, Ca(NO3)2, C6H12O6"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      {result.data && (
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Molecular Weight Result
            </span>
          </div>

          <div className="text-center">
            <div className="text-xs text-indigo-200 mb-1">Molar Mass for {result.data.formula}</div>
            <div className="text-4xl font-extrabold text-white font-mono">{result.data.molarMass} g/mol</div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-2">Mass Percent Composition</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.data.composition.map((c) => (
                <div key={c.element} className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-sm font-bold text-emerald-400">{c.element} ({c.count})</div>
                  <div className="text-lg font-mono font-extrabold text-white">{c.massPercent}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
