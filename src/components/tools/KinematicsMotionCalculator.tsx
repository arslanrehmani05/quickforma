import React, { useState, useMemo } from 'react';
import { Sparkles, Gauge } from 'lucide-react';
import { solveSuvat } from '../../utils/science/physicsEngine';

export const KinematicsMotionCalculator: React.FC = () => {
  const [initVel, setInitVel] = useState<number>(0);
  const [accel, setAccel] = useState<number>(9.8);
  const [time, setTime] = useState<number>(5);

  const result = useMemo(() => {
    try {
      return solveSuvat({ u: initVel, a: accel, t: time });
    } catch (err: any) {
      return { u: 0, v: 0, a: 0, s: 0, t: 0 };
    }
  }, [initVel, accel, time]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Kinematics & SUVAT Motion Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate 1D motion variables using SUVAT equations (v = u + at, s = ut + 0.5 a t^2, v^2 = u^2 + 2as).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Initial Velocity ($u$ in m/s)</label>
            <input
              type="number"
              value={initVel}
              onChange={(e) => setInitVel(parseFloat(e.target.value) || 0)}
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
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Elapsed Time ($t$ in s)</label>
            <input
              type="number"
              min="0"
              value={time}
              onChange={(e) => setTime(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Motion Outputs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Final Velocity ($v$)</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.v} m/s</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Displacement ($s$)</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.s} m</div>
          </div>
        </div>
      </div>
    </div>
  );
};
