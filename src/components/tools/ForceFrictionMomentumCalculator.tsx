import React, { useState, useMemo } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { calculateForceMomentum } from '../../utils/science/physicsEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const ForceFrictionMomentumCalculator: React.FC = () => {
  const [mass, setMass] = useState<number>(10);
  const [accel, setAccel] = useState<number>(2.5);
  const [velocity, setVelocity] = useState<number>(15);

  const result = useMemo(() => {
    return calculateForceMomentum(mass, accel, velocity);
  }, [mass, accel, velocity]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Force, Friction & Momentum Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate Newton's 2nd Law Force ($F = ma$), Momentum ($p = mv$), and Weight ($W = mg$).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Acceleration (a in m/s²)</label>
            <input
              type="number"
              value={accel}
              onChange={(e) => setAccel(parseFloat(e.target.value) || 0)}
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
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Force & Momentum Dynamics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Net Force ($F = ma$)</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.force_N} N</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Momentum ($p = mv$)</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{result.momentum_kgms} kg·m/s</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Gravity Weight ($W = mg$)</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.weight_N} N</div>
          </div>
        </div>
      </div>
    </div>
  );
};
