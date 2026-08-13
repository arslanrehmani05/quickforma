import React, { useState, useMemo } from 'react';
import { Percent, Plus, Trash2, Calculator, Target, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

interface ComponentRow {
  id: string;
  name: string;
  weight: number;
  score: number;
  whatIfScore?: number;
}

type Mode = 'current' | 'needed' | 'whatif';

export const FinalGradeCalculator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode>('current');

  // Mode 1 & 2 Course Components State
  const [components, setComponents] = useState<ComponentRow[]>([
    { id: '1', name: 'Homework & Assignments', weight: 20, score: 90 },
    { id: '2', name: 'Quizzes & Tests', weight: 20, score: 85 },
    { id: '3', name: 'Midterm Exam', weight: 25, score: 78 },
    { id: '4', name: 'Final Exam / Project', weight: 35, score: 92 },
  ]);

  // Mode 2 Target Grade Needed State
  const [targetGrade, setTargetGrade] = useState<number>(85);

  // Mode 3 What-If Scenario Components State
  const [whatIfComponents, setWhatIfComponents] = useState<ComponentRow[]>([
    { id: 'w1', name: 'Homework & Assignments', weight: 20, score: 90, whatIfScore: 95 },
    { id: 'w2', name: 'Quizzes & Tests', weight: 20, score: 85, whatIfScore: 90 },
    { id: 'w3', name: 'Midterm Exam', weight: 25, score: 78, whatIfScore: 85 },
    { id: 'w4', name: 'Final Exam / Project', weight: 35, score: 80, whatIfScore: 92 },
  ]);

  // --- Handlers for Component Management ---
  const addComponent = (type: Mode) => {
    const newId = Date.now().toString();
    const defaultRow: ComponentRow = { id: newId, name: '', weight: 15, score: 85, whatIfScore: 90 };
    if (type === 'whatif') setWhatIfComponents(prev => [...prev, defaultRow]);
    else setComponents(prev => [...prev, defaultRow]);
  };

  const removeComponent = (id: string, type: Mode) => {
    if (type === 'whatif') setWhatIfComponents(prev => prev.filter(c => c.id !== id));
    else setComponents(prev => prev.filter(c => c.id !== id));
  };

  const updateComponent = (id: string, field: keyof ComponentRow, value: any, type: Mode) => {
    const updater = (prev: ComponentRow[]) =>
      prev.map(c => (c.id === id ? { ...c, [field]: value } : c));
    if (type === 'whatif') setWhatIfComponents(updater);
    else setComponents(updater);
  };

  // --- Calculations ---

  // Mode 1: Current & Projected Final Grade Calculation
  const currentCalc = useMemo(() => {
    let totalWeight = 0;
    let earnedPoints = 0;

    components.forEach(c => {
      const w = Math.max(0, Math.min(100, Number(c.weight) || 0));
      const s = Math.max(0, Math.min(100, Number(c.score) || 0));
      totalWeight += w;
      earnedPoints += (s * (w / 100));
    });

    const isWeightOver100 = totalWeight > 100;
    const isComplete100 = Math.abs(totalWeight - 100) < 0.001;
    const currentGrade = totalWeight > 0 ? (earnedPoints / totalWeight) * 100 : 0;
    const remainingWeight = Math.max(0, 100 - totalWeight);

    return { totalWeight, earnedPoints, currentGrade, remainingWeight, isWeightOver100, isComplete100 };
  }, [components]);

  // Mode 2: Grade Needed Calculation
  const neededCalc = useMemo(() => {
    const totalCompletedWeight = currentCalc.totalWeight;
    const remainingWeight = Math.max(0, 100 - totalCompletedWeight);
    const earnedPoints = currentCalc.earnedPoints;
    const target = Math.max(0, Math.min(100, Number(targetGrade) || 0));

    const pointsNeeded = target - earnedPoints;
    const requiredScoreRaw = remainingWeight > 0 ? (pointsNeeded / (remainingWeight / 100)) : 0;
    const requiredScore = Math.max(0, requiredScoreRaw);

    const isUnreachable = requiredScoreRaw > 100;
    const requiresZeroOrLess = requiredScoreRaw <= 0 && remainingWeight > 0;
    const isCompleteAndAchieved = remainingWeight === 0 && earnedPoints >= target;

    return {
      remainingWeight,
      earnedPoints,
      target,
      requiredScoreRaw,
      requiredScore,
      isUnreachable,
      requiresZeroOrLess,
      isCompleteAndAchieved
    };
  }, [currentCalc, targetGrade]);

  // Mode 3: What-If Calculation
  const whatIfCalc = useMemo(() => {
    let currentTotalWeight = 0;
    let currentEarnedPoints = 0;
    let whatIfEarnedPoints = 0;

    whatIfComponents.forEach(c => {
      const w = Math.max(0, Math.min(100, Number(c.weight) || 0));
      const curScore = Math.max(0, Math.min(100, Number(c.score) || 0));
      const scenarioScore = Math.max(0, Math.min(100, Number(c.whatIfScore ?? c.score) || 0));

      currentTotalWeight += w;
      currentEarnedPoints += (curScore * (w / 100));
      whatIfEarnedPoints += (scenarioScore * (w / 100));
    });

    const currentGrade = currentTotalWeight > 0 ? (currentEarnedPoints / currentTotalWeight) * 100 : 0;
    const whatIfGrade = currentTotalWeight > 0 ? (whatIfEarnedPoints / currentTotalWeight) * 100 : 0;
    const difference = whatIfGrade - currentGrade;

    return { currentTotalWeight, currentGrade, whatIfGrade, difference };
  }, [whatIfComponents]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tool Main Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        {/* Tool Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Final Grade Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate current course grade, projected final grade, required score on remaining coursework, and what-if scenarios.</p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveMode('current')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeMode === 'current'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Current / Projected Grade</span>
          </button>

          <button
            onClick={() => setActiveMode('needed')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeMode === 'needed'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Grade Needed</span>
          </button>

          <button
            onClick={() => setActiveMode('whatif')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeMode === 'whatif'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>What-If Scenario</span>
          </button>
        </div>

        {/* ================= MODE 1: CURRENT / PROJECTED GRADE ================= */}
        {activeMode === 'current' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 text-xs font-semibold ">Course Components & Weights</label>
                <span className={`text-xs font-mono font-bold ${currentCalc.isWeightOver100 ? 'text-rose-600' : 'text-slate-500'}`}>
                  Total Weight: {currentCalc.totalWeight.toFixed(1)}%
                </span>
              </div>

              {currentCalc.isWeightOver100 && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Your category weights currently total <strong>{currentCalc.totalWeight.toFixed(1)}%</strong>. Please adjust component weights so they total 100%.</span>
                </div>
              )}

              <div className="space-y-3">
                {components.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 gap-2 sm:gap-3 items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <input
                      type="text"
                      placeholder="Component Name (e.g. Midterm Exam)"
                      value={c.name}
                      onChange={(e) => updateComponent(c.id, 'name', e.target.value, 'current')}
                      className="col-span-5 sm:col-span-6 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                    />

                    <div className="col-span-3 sm:col-span-3 flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-xl border border-slate-300">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Weight"
                        value={c.weight}
                        onChange={(e) => updateComponent(c.id, 'weight', Number(e.target.value), 'current')}
                        className="w-full text-xs sm:text-sm text-slate-900 font-mono focus:outline-none"
                      />
                      <span className="text-xs text-slate-400 font-bold">%</span>
                    </div>

                    <div className="col-span-3 sm:col-span-2 flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-xl border border-slate-300">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Score"
                        value={c.score}
                        onChange={(e) => updateComponent(c.id, 'score', Number(e.target.value), 'current')}
                        className="w-full text-xs sm:text-sm text-slate-900 font-mono font-bold focus:outline-none"
                      />
                      <span className="text-xs text-slate-400 font-bold">%</span>
                    </div>

                    <button
                      onClick={() => removeComponent(c.id, 'current')}
                      disabled={components.length <= 1}
                      className="col-span-1 p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30 flex justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addComponent('current')}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-600 text-indigo-600 hover:bg-indigo-50/50 font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Component</span>
              </button>
            </div>

            {/* Result Display */}
            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold  text-indigo-700">
                    {currentCalc.isComplete100 ? 'PROJECTED FINAL COURSE GRADE' : 'CURRENT GRADE ON COMPLETED WORK'}
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 mt-1 tracking-tight">
                    {currentCalc.currentGrade.toFixed(2)}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-indigo-100">
                    <span className="text-slate-500 block text-[10px] font-semibold uppercase">Earned Points</span>
                    <span className="text-slate-900 font-bold text-sm">{currentCalc.earnedPoints.toFixed(2)} pts</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-indigo-100">
                    <span className="text-slate-500 block text-[10px] font-semibold uppercase">Completed Weight</span>
                    <span className="text-slate-900 font-bold text-sm">{currentCalc.totalWeight.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {!currentCalc.isComplete100 && (
                <p className="text-slate-600 text-xs border-t border-indigo-100 pt-3">
                  You have completed <strong>{currentCalc.totalWeight.toFixed(1)}%</strong> of your total course weight with an average grade of <strong>{currentCalc.currentGrade.toFixed(2)}%</strong>. Remaining uncompleted weight: <strong>{currentCalc.remainingWeight.toFixed(1)}%</strong>.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ================= MODE 2: GRADE NEEDED ================= */}
        {activeMode === 'needed' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <label className="block text-slate-700 text-xs font-semibold ">Target Final Course Grade Goal</label>
              <div className="flex items-center gap-2 max-w-xs">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={targetGrade}
                  onChange={(e) => setTargetGrade(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold text-base focus:outline-none focus:border-indigo-600"
                />
                <span className="text-base font-bold text-slate-500">%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 text-xs font-semibold ">Completed Coursework Components</label>
                <span className="text-xs text-slate-500 font-mono">Completed Weight: {currentCalc.totalWeight.toFixed(1)}%</span>
              </div>

              <div className="space-y-3">
                {components.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 gap-2 sm:gap-3 items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <input
                      type="text"
                      placeholder="Component Name"
                      value={c.name}
                      onChange={(e) => updateComponent(c.id, 'name', e.target.value, 'needed')}
                      className="col-span-5 sm:col-span-6 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                    />

                    <div className="col-span-3 sm:col-span-3 flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-xl border border-slate-300">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Weight"
                        value={c.weight}
                        onChange={(e) => updateComponent(c.id, 'weight', Number(e.target.value), 'needed')}
                        className="w-full text-xs sm:text-sm text-slate-900 font-mono focus:outline-none"
                      />
                      <span className="text-xs text-slate-400 font-bold">%</span>
                    </div>

                    <div className="col-span-3 sm:col-span-2 flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-xl border border-slate-300">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Score"
                        value={c.score}
                        onChange={(e) => updateComponent(c.id, 'score', Number(e.target.value), 'needed')}
                        className="w-full text-xs sm:text-sm text-slate-900 font-mono font-bold focus:outline-none"
                      />
                      <span className="text-xs text-slate-400 font-bold">%</span>
                    </div>

                    <button
                      onClick={() => removeComponent(c.id, 'needed')}
                      disabled={components.length <= 1}
                      className="col-span-1 p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30 flex justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addComponent('needed')}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-600 text-indigo-600 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Component</span>
              </button>
            </div>

            {/* Grade Needed Result Display */}
            {neededCalc.remainingWeight <= 0 ? (
              neededCalc.isCompleteAndAchieved ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">TARGET ACHIEVED!</h4>
                    <p className="text-xs text-emerald-800 leading-relaxed mt-1">
                      You have completed 100% of course weight with a final grade of <strong>{neededCalc.earnedPoints.toFixed(2)}%</strong>, meeting your target goal of {neededCalc.target}%.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-100 text-slate-600 text-xs">
                  All 100% of course weight is completed. Your final course grade is <strong>{neededCalc.earnedPoints.toFixed(2)}%</strong> (Target goal: {neededCalc.target}%).
                </div>
              )
            ) : neededCalc.isUnreachable ? (
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">TARGET NOT REACHABLE</h4>
                  <p className="text-xs text-amber-800 leading-relaxed mt-1">
                    A <strong>{neededCalc.target}%</strong> final course grade is not mathematically reachable. You would need an average score of <strong>{neededCalc.requiredScoreRaw.toFixed(2)}%</strong> across your remaining {neededCalc.remainingWeight.toFixed(1)}% course weight.
                  </p>
                </div>
              </div>
            ) : neededCalc.requiresZeroOrLess ? (
              <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase text-indigo-700 tracking-wider">REQUIRED AVERAGE SCORE ON REMAINING COURSEWORK</span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 mt-1">
                    0.00%
                  </div>
                </div>

                <p className="text-slate-600 text-xs border-t border-indigo-100 pt-3 leading-relaxed">
                  You need a <strong>0.00%</strong> score on your remaining <strong>{neededCalc.remainingWeight.toFixed(1)}%</strong> of coursework to finish at or above your <strong>{neededCalc.target}% target grade</strong>. You have already earned {neededCalc.earnedPoints.toFixed(2)} weighted points.
                </p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase text-indigo-700 tracking-wider">REQUIRED AVERAGE SCORE ON REMAINING COURSEWORK</span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 mt-1">
                    {neededCalc.requiredScore.toFixed(2)}%
                  </div>
                </div>

                <p className="text-slate-600 text-xs border-t border-indigo-100 pt-3 leading-relaxed">
                  An average score of <strong>{neededCalc.requiredScore.toFixed(2)}%</strong> on your remaining <strong>{neededCalc.remainingWeight.toFixed(1)}%</strong> of coursework will result in an <strong>{neededCalc.target}% final course grade</strong>.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================= MODE 3: WHAT-IF SCENARIO ================= */}
        {activeMode === 'whatif' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 text-xs font-semibold ">Simulate Component Score Changes</label>
                <span className="text-xs text-slate-500 font-mono">Current vs What-If Score</span>
              </div>

              <div className="space-y-3">
                {whatIfComponents.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 gap-2 sm:gap-3 items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <input
                      type="text"
                      placeholder="Component Name"
                      value={c.name}
                      onChange={(e) => updateComponent(c.id, 'name', e.target.value, 'whatif')}
                      className="col-span-4 sm:col-span-4 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                    />

                    <div className="col-span-2 sm:col-span-2 flex items-center gap-1 bg-white px-2 py-1.5 rounded-xl border border-slate-300">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Wt"
                        value={c.weight}
                        onChange={(e) => updateComponent(c.id, 'weight', Number(e.target.value), 'whatif')}
                        className="w-full text-xs text-slate-900 font-mono focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 font-bold">%</span>
                    </div>

                    <div className="col-span-5 sm:col-span-5 grid grid-cols-2 gap-1.5">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Current</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={c.score}
                          onChange={(e) => updateComponent(c.id, 'score', Number(e.target.value), 'whatif')}
                          className="w-full px-2 py-1 rounded-lg bg-white border border-slate-300 text-slate-900 font-bold text-xs focus:outline-none focus:border-indigo-600"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] text-indigo-600 font-bold block uppercase">What-If</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={c.whatIfScore ?? c.score}
                          onChange={(e) => updateComponent(c.id, 'whatIfScore', Number(e.target.value), 'whatif')}
                          className="w-full px-2 py-1 rounded-lg bg-indigo-50 border border-indigo-300 text-indigo-900 font-extrabold text-xs focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => removeComponent(c.id, 'whatif')}
                      disabled={whatIfComponents.length <= 1}
                      className="col-span-1 p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30 flex justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addComponent('whatif')}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-600 text-indigo-600 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Component</span>
              </button>
            </div>

            {/* What-If Result Comparison */}
            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase">Current Final Grade</span>
                  <div className="text-2xl font-bold text-slate-800 mt-0.5">{whatIfCalc.currentGrade.toFixed(2)}%</div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase text-indigo-700">WHAT-IF FINAL GRADE</span>
                  <div className="text-4xl font-extrabold text-indigo-950 mt-0.5">{whatIfCalc.whatIfGrade.toFixed(2)}%</div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase">Grade Change</span>
                  <div className={`text-2xl font-bold mt-0.5 ${whatIfCalc.difference >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {whatIfCalc.difference >= 0 ? `+${whatIfCalc.difference.toFixed(2)}` : whatIfCalc.difference.toFixed(2)}%
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-xs border-t border-indigo-100 pt-3">
                Simulating score changes shifts your final course grade by <strong>{whatIfCalc.difference >= 0 ? '+' : ''}{whatIfCalc.difference.toFixed(2)} percentage points</strong> across {whatIfCalc.currentTotalWeight.toFixed(1)}% total course weight.
              </p>
            </div>
          </div>
        )}

        {/* Disclaimer Note */}
        <div className="pt-4 border-t border-slate-200 text-slate-500 text-xs leading-relaxed">
          <p>
            <strong>Note:</strong> Course grading policies and percentage weightings are determined by your individual course syllabus. QuickForma provides calculations based on standard weighted percentage formulas and your explicit inputs.
          </p>
        </div>
      </div>
    </div>
  );
};
