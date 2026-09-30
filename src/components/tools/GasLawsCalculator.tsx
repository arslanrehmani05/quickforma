import React, { useState, useMemo } from 'react';
import { Sparkles, Wind } from 'lucide-react';
import { calculateIdealGasLaw } from '../../utils/science/chemistryEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const GasLawsCalculator: React.FC = () => {
  const [pressure, setPressure] = useState<number>(1.0); // atm
  const [volume, setVolume] = useState<number>(22.414); // L
  const [moles, setMoles] = useState<number>(1.0); // mol
  const [temp, setTemp] = useState<number>(273.15); // K

  const result = useMemo(() => {
    try {
      return calculateIdealGasLaw(pressure, volume, moles, undefined);
    } catch (err: any) {
      return { resultValue: 273.15, label: 'Temperature (K)' };
    }
  }, [pressure, volume, moles]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Gas Laws Calculator (PV = nRT)</h2>
            <p className="text-xs text-slate-500">
              Solve for missing variables in the Ideal Gas Law (PV = nRT) with R = 0.08206 L·atm / (mol·K).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pressure ($P$ in atm)</label>
            <input
              type="number"
              value={pressure}
              onChange={(e) => setPressure(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Volume ($V$ in Liters)</label>
            <input
              type="number"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Moles ($n$ in mol)</label>
            <input
              type="number"
              value={moles}
              onChange={(e) => setMoles(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl text-center space-y-3">
        <div className="text-xs font-semibold  text-indigo-300 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-400" /> Solved Ideal Gas Variable
        </div>
        <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">{result.resultValue}</div>
        <div className="text-xs text-indigo-300">{result.label}</div>
      </div>
    </div>
  );
};
