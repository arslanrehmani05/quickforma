import React, { useState, useMemo } from 'react';
import { Sparkles, Binary } from 'lucide-react';

export const ScientificNotationCalculator: React.FC = () => {
  const [standardInput, setStandardInput] = useState<string>('300000000');

  const calculation = useMemo(() => {
    const num = parseFloat(standardInput);
    if (isNaN(num)) {
      return { scientific: 'N/A', engineering: 'N/A', exponential: 'N/A' };
    }
    const scientific = num.toExponential(4);
    const exponential = num.toExponential();

    // Engineering notation (exponent divisible by 3)
    const expMatch = num.toExponential().match(/e([+-]?\d+)/);
    let exp = expMatch ? parseInt(expMatch[1], 10) : 0;
    let mod = exp % 3;
    if (mod < 0) mod += 3;
    const mantissa = num / Math.pow(10, exp - mod);
    const engExp = exp - mod;
    const engineering = `${mantissa.toFixed(4)} × 10^${engExp}`;

    return {
      scientific: scientific.replace('e+', ' × 10^').replace('e-', ' × 10^-'),
      engineering,
      exponential,
    };
  }, [standardInput]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Binary className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Scientific Notation Calculator</h2>
            <p className="text-xs text-slate-500">
              Convert numbers between standard decimal notation, scientific notation ($a \times 10^b$), and engineering notation.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Standard Decimal Number
          </label>
          <input
            type="text"
            value={standardInput}
            onChange={(e) => setStandardInput(e.target.value)}
            placeholder="e.g. 300000000 or 0.0000052"
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3.5 text-sm font-mono text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Scientific & Engineering Forms
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Scientific Notation (a × 10^b)</div>
            <div className="text-2xl font-extrabold text-white font-mono">{calculation.scientific}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Engineering Notation (10^3k)</div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculation.engineering}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
