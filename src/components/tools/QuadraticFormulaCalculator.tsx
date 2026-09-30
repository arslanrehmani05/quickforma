import React, { useState, useMemo } from 'react';
import { Sparkles, Calculator } from 'lucide-react';
import { solveQuadratic } from '../../utils/math/mathEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const QuadraticFormulaCalculator: React.FC = () => {
  const [valA, setValA] = useState<number>(1);
  const [valB, setValB] = useState<number>(-5);
  const [valC, setValC] = useState<number>(6);

  const result = useMemo(() => {
    try {
      return solveQuadratic(valA, valB, valC);
    } catch (err: any) {
      return { discriminant: 0, root1: 'N/A', root2: 'N/A', vertexX: 0, vertexY: 0, isReal: false };
    }
  }, [valA, valB, valC]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Quadratic Formula Calculator</h2>
            <p className="text-xs text-slate-500">
              Solve quadratic equations $ax^2 + bx + c = 0$ for real & complex roots, discriminant, and parabola vertex.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Coefficient $a$ ($x^2$)
            </label>
            <input
              type="number"
              value={valA}
              onChange={(e) => setValA(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600 text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Coefficient $b$ ($x$)
            </label>
            <input
              type="number"
              value={valB}
              onChange={(e) => setValB(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600 text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Constant $c$
            </label>
            <input
              type="number"
              value={valC}
              onChange={(e) => setValC(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600 text-center"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Quadratic Solution
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Root $x_1$</div>
            <div className="text-2xl font-extrabold text-white font-mono">{result.root1}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Root $x_2$</div>
            <div className="text-2xl font-extrabold text-indigo-300 font-mono">{result.root2}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Discriminant ($\Delta = b^2 - 4ac$)</div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">{result.discriminant}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
