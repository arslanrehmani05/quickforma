import React, { useState, useMemo } from 'react';
import { Sparkles, Triangle } from 'lucide-react';
import { solveLawOfSinesCosines } from '../../utils/math/mathEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';
import { ModePillsBar } from '../ui/ModePillsBar';

export const LawOfSinesCosinesCalculator: React.FC = () => {
  const [sideA, setSideA] = useState<number>(5);
  const [sideB, setSideB] = useState<number>(7);
  const [angleC, setAngleC] = useState<number>(60);

  const result = useMemo(() => {
    try {
      return solveLawOfSinesCosines(sideA, sideB, undefined, undefined, undefined, angleC);
    } catch (err: any) {
      return { sideA: 0, sideB: 0, sideC: 0, angleA: 0, angleB: 0, angleC: 0, area: 0 };
    }
  }, [sideA, sideB, angleC]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Triangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Law of Sines & Cosines Calculator</h2>
            <p className="text-xs text-slate-500">
              Solve non-right oblique triangles using Law of Cosines ($c^2 = a^2 + b^2 - 2ab \cos C$) and Law of Sines.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Side $a$</label>
            <input
              type="number"
              value={sideA}
              onChange={(e) => setSideA(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Side $b$</label>
            <input
              type="number"
              value={sideB}
              onChange={(e) => setSideB(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Enclosed Angle $C$ (°)</label>
            <input
              type="number"
              value={angleC}
              onChange={(e) => setAngleC(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Solved Triangle Properties
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Side $c$</div>
            <div className="text-2xl font-extrabold text-white font-mono">{result.sideC}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Angle $A$</div>
            <div className="text-2xl font-extrabold text-indigo-300 font-mono">{result.angleA}°</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Angle $B$</div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">{result.angleB}°</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Area</div>
            <div className="text-2xl font-extrabold text-amber-300 font-mono">{result.area}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
