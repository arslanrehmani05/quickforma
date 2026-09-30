import React, { useState, useMemo } from 'react';
import { Target, GraduationCap, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { calculateTargetGpa } from '../../utils/math/gradeEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const TargetGpaPlannerCalculator: React.FC = () => {
  const [currentGpa, setCurrentGpa] = useState<number>(2.95);
  const [completedCredits, setCompletedCredits] = useState<number>(45);
  const [targetGpa, setTargetGpa] = useState<number>(3.30);
  const [remainingCredits, setRemainingCredits] = useState<number>(60);
  const [maxScaleGpa, setMaxScaleGpa] = useState<number>(4.0);

  const result = useMemo(() => {
    return calculateTargetGpa(currentGpa, completedCredits, targetGpa, remainingCredits, maxScaleGpa);
  }, [currentGpa, completedCredits, targetGpa, remainingCredits, maxScaleGpa]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Target GPA & Course Planner</h2>
            <p className="text-xs text-slate-500">
              Calculate what average GPA you need across your remaining credit hours to hit your target graduation GPA.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Current Cumulative GPA
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="5.0"
              value={currentGpa}
              onChange={(e) => setCurrentGpa(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Completed Credit Hours
            </label>
            <input
              type="number"
              min="0"
              value={completedCredits}
              onChange={(e) => setCompletedCredits(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Target Desired GPA
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="5.0"
              value={targetGpa}
              onChange={(e) => setTargetGpa(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Remaining Credit Hours to Graduate
            </label>
            <input
              type="number"
              min="1"
              value={remainingCredits}
              onChange={(e) => setRemainingCredits(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Result Display */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-4">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Target GPA Feasibility Result
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
            Client-Side RAM Only
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
            <div className="text-xs text-indigo-200 mb-1">Required Remaining GPA</div>
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
              {result.requiredGpa.toFixed(2)}
            </div>
            <div className="text-xs text-indigo-300 mt-2">
              across {remainingCredits} remaining credits
            </div>
          </div>

          <div className="space-y-4">
            <div className={`flex items-start gap-3 p-4 rounded-2xl border ${result.isAchievable ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-rose-500/10 border-rose-500/30 text-rose-200'}`}>
              {result.isAchievable ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="text-xs leading-relaxed">
                <div className="font-bold text-sm text-white mb-1">
                  {result.isAchievable ? 'Target Is Feasible!' : 'Target Is Mathematically Unachievable'}
                </div>
                {result.message}
              </div>
            </div>

            <div className="text-xs text-indigo-300 space-y-1 bg-white/5 p-3 rounded-xl">
              <div>• Total Lifetime Credits at Graduation: <strong>{completedCredits + remainingCredits}</strong></div>
              <div>• Current Points Earned: <strong>{(currentGpa * completedCredits).toFixed(1)}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
