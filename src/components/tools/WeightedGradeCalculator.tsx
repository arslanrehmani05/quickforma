import React, { useState, useMemo } from 'react';
import { Percent, Plus, Trash2, Calculator, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

interface AssignmentCategory {
  id: string;
  name: string;
  weightPct: number;
  scorePct: number;
}

export const WeightedGradeCalculator: React.FC = () => {
  const [categories, setCategories] = useState<AssignmentCategory[]>([
    { id: '1', name: 'Homework & Assignments', weightPct: 20, scorePct: 92 },
    { id: '2', name: 'Quizzes & Midterm', weightPct: 30, scorePct: 84 },
    { id: '3', name: 'Final Project', weightPct: 20, scorePct: 88 },
    { id: '4', name: 'Final Exam', weightPct: 30, scorePct: 0 },
  ]);

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      { id: Date.now().toString(), name: 'New Assessment', weightPct: 10, scorePct: 85 },
    ]);
  };

  const removeCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCategory = (id: string, field: keyof AssignmentCategory, value: any) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const calculation = useMemo(() => {
    let totalWeight = 0;
    let weightedScoreSum = 0;

    categories.forEach((c) => {
      const w = Math.max(0, Number(c.weightPct) || 0);
      const s = Math.max(0, Number(c.scorePct) || 0);
      totalWeight += w;
      weightedScoreSum += (w * s) / 100;
    });

    const currentGradePct = totalWeight > 0 ? (weightedScoreSum / totalWeight) * 100 : 0;

    let letterGrade = 'F';
    if (currentGradePct >= 93) letterGrade = 'A';
    else if (currentGradePct >= 90) letterGrade = 'A-';
    else if (currentGradePct >= 87) letterGrade = 'B+';
    else if (currentGradePct >= 83) letterGrade = 'B';
    else if (currentGradePct >= 80) letterGrade = 'B-';
    else if (currentGradePct >= 77) letterGrade = 'C+';
    else if (currentGradePct >= 73) letterGrade = 'C';
    else if (currentGradePct >= 70) letterGrade = 'C-';
    else if (currentGradePct >= 60) letterGrade = 'D';

    return {
      currentGradePct: Math.round(currentGradePct * 10) / 10,
      totalWeight: Math.round(totalWeight * 10) / 10,
      weightedScoreSum: Math.round(weightedScoreSum * 10) / 10,
      letterGrade,
    };
  }, [categories]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Weighted Grade Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate your overall course grade from weighted assignment categories (e.g. Homework 20%, Exams 50%).
            </p>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Assessment Categories</h3>
            <button
              onClick={addCategory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Category
            </button>
          </div>

          <div className="space-y-2.5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="grid grid-cols-12 gap-2 items-center bg-slate-50/60 p-3 rounded-2xl border border-slate-200/60"
              >
                <div className="col-span-5 sm:col-span-6">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Category Name</label>
                  <input
                    type="text"
                    value={cat.name}
                    onChange={(e) => updateCategory(cat.id, 'name', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-600"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Weight (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={cat.weightPct}
                    onChange={(e) => updateCategory(cat.id, 'weightPct', parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-slate-900 text-center outline-none focus:border-indigo-600 font-mono"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Score (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={cat.scorePct}
                    onChange={(e) => updateCategory(cat.id, 'scorePct', parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-slate-900 text-center outline-none focus:border-indigo-600 font-mono"
                  />
                </div>
                <div className="col-span-1 text-right pt-3">
                  <button
                    onClick={() => removeCategory(cat.id)}
                    disabled={categories.length <= 1}
                    className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {calculation.totalWeight !== 100 && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Total weight sums to <strong>{calculation.totalWeight}%</strong>. (Ideally categories should total 100%).
            </span>
          </div>
        )}
      </div>

      {/* Result Display */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-4">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Weighted Course Grade Result
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
            Client-Side RAM Only
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Current Course Grade</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
              {calculation.currentGradePct}%
            </div>
            <div className="text-[11px] text-indigo-300 mt-1">
              Letter Grade: <strong className="text-emerald-400">{calculation.letterGrade}</strong>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Weighted Points Earned</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-300 font-mono">
              {calculation.weightedScoreSum}
            </div>
            <div className="text-[11px] text-indigo-300 mt-1">
              out of {calculation.totalWeight} total weight
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Category Weight Allocated</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
              {calculation.totalWeight}%
            </div>
            <div className="text-[11px] text-indigo-300 mt-1">
              across {categories.length} categories
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
