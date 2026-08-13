import React, { useState, useMemo } from 'react';
import { Sparkles, Triangle } from 'lucide-react';

export const TrigonometryCalculator: React.FC = () => {
  const [angle, setAngle] = useState<number>(45);
  const [unit, setUnit] = useState<'degrees' | 'radians'>('degrees');

  const calculation = useMemo(() => {
    const rad = unit === 'degrees' ? (angle * Math.PI) / 180 : angle;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
    const tan = Math.abs(cos) > 1e-12 ? Math.tan(rad) : Infinity;

    return {
      sin: Math.round(sin * 10000) / 10000,
      cos: Math.round(cos * 10000) / 10000,
      tan: tan === Infinity ? 'Undefined' : Math.round(tan * 10000) / 10000,
      radians: Math.round(rad * 10000) / 10000,
    };
  }, [angle, unit]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Triangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Trigonometry Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate sine ($\sin\theta$), cosine ($\cos\theta$), and tangent ($\tan\theta$) in degrees or radians.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Angle ($\theta$)</label>
            <input
              type="number"
              value={angle}
              onChange={(e) => setAngle(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Angle Unit</label>
            <div className="flex gap-2">
              <button
                onClick={() => setUnit('degrees')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl ${unit === 'degrees' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                Degrees (°)
              </button>
              <button
                onClick={() => setUnit('radians')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl ${unit === 'radians' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                Radians (rad)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Trigonometric Values
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">$\sin(\theta)$</div>
            <div className="text-3xl font-extrabold text-white font-mono">{calculation.sin}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">$\cos(\theta)$</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{calculation.cos}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">$\tan(\theta)$</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{calculation.tan}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
