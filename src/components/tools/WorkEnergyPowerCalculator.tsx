import React, { useState, useMemo } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { calculateEnergyPower } from '../../utils/science/physicsEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const WorkEnergyPowerCalculator: React.FC = () => {
  const [mass, setMass] = useState<number>(50);
  const [velocity, setVelocity] = useState<number>(10);
  const [height, setHeight] = useState<number>(20);
  const [time, setTime] = useState<number>(10);

  const result = useMemo(() => {
    return calculateEnergyPower(mass, velocity, height, time);
  }, [mass, velocity, height, time]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Work, Energy & Power Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate Kinetic Energy (KE = 0.5 m v^2), Potential Energy (PE = mgh), Mechanical Energy, and Power (P = W/t).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mass ($m$ in kg)</label>
            <input
              type="number"
              value={mass}
              onChange={(e) => setMass(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Velocity ($v$ in m/s)</label>
            <input
              type="number"
              value={velocity}
              onChange={(e) => setVelocity(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Height ($h$ in m)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Time ($t$ in s)</label>
            <input
              type="number"
              min="0.1"
              value={time}
              onChange={(e) => setTime(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Energy & Power Output
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Kinetic Energy ($KE$)</div>
            <div className="text-2xl font-extrabold text-white font-mono">{result.kineticEnergy_J} J</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Potential Energy ($PE$)</div>
            <div className="text-2xl font-extrabold text-indigo-300 font-mono">{result.potentialEnergy_J} J</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Total Energy ($E$)</div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">{result.totalMechanicalEnergy_J} J</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Power ($P$)</div>
            <div className="text-2xl font-extrabold text-amber-300 font-mono">{result.power_W} W</div>
          </div>
        </div>
      </div>
    </div>
  );
};
