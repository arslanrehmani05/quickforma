import React, { useState, useMemo } from 'react';
import { Sparkles, FlaskConical } from 'lucide-react';
import { calculateMolesMolarity } from '../../utils/science/chemistryEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const MolesMolarityCalculator: React.FC = () => {
  const [mass, setMass] = useState<number>(58.44); // e.g. NaCl mass
  const [molarMass, setMolarMass] = useState<number>(58.44); // NaCl molar mass
  const [volume, setVolume] = useState<number>(1.0); // 1 Liter

  const result = useMemo(() => {
    try {
      return calculateMolesMolarity(mass, molarMass, volume);
    } catch (err: any) {
      return { moles: 0, molarity: 0, mass: 0 };
    }
  }, [mass, molarMass, volume]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Moles & Molarity Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate moles n = m / M and molar concentration M = n / V in mol/L.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Solute Mass ($m$ in grams)</label>
            <input
              type="number"
              value={mass}
              onChange={(e) => setMass(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Molar Mass ($M$ in g/mol)</label>
            <input
              type="number"
              min="0.01"
              value={molarMass}
              onChange={(e) => setMolarMass(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Solution Volume ($V$ in Liters)</label>
            <input
              type="number"
              min="0.001"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Solution Concentration
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Amount of Moles ($n$)</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.moles} mol</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Molarity ($M$)</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.molarity} M (mol/L)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
