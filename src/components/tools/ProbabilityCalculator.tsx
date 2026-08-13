import React, { useState, useMemo } from 'react';
import { Sparkles, PieChart } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';
import { ModePillsBar } from '../ui/ModePillsBar';

export const ProbabilityCalculator: React.FC = () => {
  const [probA, setProbA] = useState<number>(0.5);
  const [probB, setProbB] = useState<number>(0.4);

  const calculation = useMemo(() => {
    const pA = Math.max(0, Math.min(1, probA));
    const pB = Math.max(0, Math.min(1, probB));

    // Independent events assumption
    const pAandB = pA * pB;
    const pAorB = pA + pB - pAandB;
    const pAnot = 1 - pA;

    return {
      pAandB: Math.round(pAandB * 10000) / 10000,
      pAorB: Math.round(pAorB * 10000) / 10000,
      pAnot: Math.round(pAnot * 10000) / 10000,
    };
  }, [probA, probB]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Probability Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate single-event, joint intersection $P(A \cap B)$, union $P(A \cup B)$, and complement probabilities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Probability of Event A $P(A)$ (0 to 1)</label>
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              value={probA}
              onChange={(e) => setProbA(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Probability of Event B $P(B)$ (0 to 1)</label>
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              value={probB}
              onChange={(e) => setProbB(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Joint Probability Results
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Union $P(A \cup B)$</div>
            <div className="text-3xl font-extrabold text-white font-mono">{calculation.pAorB}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Intersection $P(A \cap B)$</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{calculation.pAandB}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Complement $P(A')$</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{calculation.pAnot}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
