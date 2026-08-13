import React, { useState, useMemo } from 'react';
import { Sparkles, Calculator } from 'lucide-react';
import { calculatePolynomialDerivative } from '../../utils/math/mathEngine';

export const DerivativeLimitCalculator: React.FC = () => {
  const [coefficient, setCoefficient] = useState<number>(3);
  const [power, setPower] = useState<number>(2);
  const [evalX, setEvalX] = useState<number>(4);

  const result = useMemo(() => {
    const deriv = calculatePolynomialDerivative(coefficient, power);
    const slopeAtX = deriv.coefficient * Math.pow(evalX, deriv.power);

    return {
      derivativeStr: deriv.derivativeStr,
      slopeAtX: Math.round(slopeAtX * 1000) / 1000,
    };
  }, [coefficient, power, evalX]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Derivative & Limit Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate polynomial power-rule derivatives d/dx[a*x^n] = a*n*x^(n-1) and tangent line slopes at x.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Coefficient $a$</label>
            <input
              type="number"
              value={coefficient}
              onChange={(e) => setCoefficient(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Power $n$ ($x^n$)</label>
            <input
              type="number"
              value={power}
              onChange={(e) => setPower(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Evaluate Slope at $x = $</label>
            <input
              type="number"
              value={evalX}
              onChange={(e) => setEvalX(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Derivative Results
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Derivative $f'(x)$</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.derivativeStr}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Tangent Slope $f'({evalX})$</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.slopeAtX}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
