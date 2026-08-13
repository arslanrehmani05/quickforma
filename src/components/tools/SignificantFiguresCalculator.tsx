import React, { useState, useMemo } from 'react';
import { Sparkles, Hash } from 'lucide-react';

export const SignificantFiguresCalculator: React.FC = () => {
  const [numInput, setNumInput] = useState<string>('0.0045020');

  const calculation = useMemo(() => {
    const clean = numInput.trim();
    if (!clean) return { count: 0, rounded2Sig: '0', sciNotation: '0' };

    // Sig fig count rules
    const num = parseFloat(clean);
    if (isNaN(num)) return { count: 0, rounded2Sig: 'N/A', sciNotation: 'N/A' };

    let sigStr = clean.replace(/^-/, '');
    if (sigStr.includes('.')) {
      sigStr = sigStr.replace(/^0+/, ''); // leading zeros
      if (sigStr.startsWith('.')) sigStr = sigStr.replace(/^\./, '').replace(/^0+/, '');
      sigStr = sigStr.replace('.', '');
    } else {
      sigStr = sigStr.replace(/^0+/, '').replace(/0+$/, ''); // trailing zeros in integer without decimal
    }

    const count = sigStr.length || 1;

    return {
      count,
      rounded2Sig: num.toPrecision(2),
      sciNotation: num.toExponential(count - 1),
    };
  }, [numInput]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Hash className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Significant Figures Calculator</h2>
            <p className="text-xs text-slate-500">
              Count significant figures in a number and apply scientific rounding rules.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Enter Number</label>
          <input
            type="text"
            value={numInput}
            onChange={(e) => setNumInput(e.target.value)}
            placeholder="e.g. 0.0045020"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Sig Fig Count & Rounding
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Sig Fig Count</div>
            <div className="text-3xl font-extrabold text-white font-mono">{calculation.count}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Rounded to 2 Sig Figs</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{calculation.rounded2Sig}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Scientific Notation</div>
            <div className="text-2xl font-extrabold text-indigo-300 font-mono">{calculation.sciNotation}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
