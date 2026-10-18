import React, { useState } from "react";
import { BookOpen, Plus, Trash2, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface SyllabusCategory {
  id: string;
  name: string;
  weight: number;
  currentScore: number;
}

export const AssignmentWeightCalculator: React.FC = () => {
  const [categories, setCategories] = useState<SyllabusCategory[]>([
    { id: "1", name: "Homework & Quizzes", weight: 20, currentScore: 92 },
    { id: "2", name: "Midterm Exam 1", weight: 25, currentScore: 84 },
    { id: "3", name: "Midterm Exam 2", weight: 25, currentScore: 78 },
    { id: "4", name: "Final Examination", weight: 30, currentScore: 0 },
  ]);
  const [targetFinalGrade, setTargetFinalGrade] = useState<number>(85);

  const totalWeight = categories.reduce((sum, c) => sum + (Number(c.weight) || 0), 0);

  const finalCategory = categories[categories.length - 1];
  const completedCategories = categories.slice(0, categories.length - 1);
  const completedWeight = completedCategories.reduce((sum, c) => sum + (Number(c.weight) || 0), 0);
  const earnedPoints = completedCategories.reduce((sum, c) => sum + ((Number(c.currentScore) || 0) * (Number(c.weight) || 0)) / 100, 0);

  const currentOverallPct = completedWeight > 0 ? (earnedPoints / completedWeight) * 100 : 0;
  const remainingWeight = Math.max(0, 100 - completedWeight);
  const neededScoreOnRemaining = remainingWeight > 0 ? ((targetFinalGrade - earnedPoints) / remainingWeight) * 100 : 0;

  const addCategory = () => {
    setCategories([...categories, { id: Date.now().toString(), name: "Project / Paper", weight: 10, currentScore: 85 }]);
  };

  const removeCategory = (id: string) => {
    if (categories.length > 1) setCategories(categories.filter((c) => c.id !== id));
  };

  const updateCategory = (id: string, field: keyof SyllabusCategory, val: any) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BookOpen}
            title="Weighted Syllabus & Final Exam Target Calculator"
            description="Calculate current weighted course grade and exact score needed on your final exam to achieve your target grade."
          />
          <ResetButton onReset={() => {
            setCategories([
              { id: "1", name: "Homework & Quizzes", weight: 20, currentScore: 92 },
              { id: "2", name: "Midterm Exam 1", weight: 25, currentScore: 84 },
              { id: "3", name: "Midterm Exam 2", weight: 25, currentScore: 78 },
              { id: "4", name: "Final Examination", weight: 30, currentScore: 0 },
            ]);
            setTargetFinalGrade(85);
          }} />
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Syllabus Breakdown (Total: {totalWeight}%)</h3>
            <Button size="sm" variant="secondary" onClick={addCategory} className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Category
            </Button>
          </div>

          <div className="space-y-2">
            {categories.map((c) => (
              <div key={c.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="col-span-5">
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => updateCategory(c.id, "name", e.target.value)}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-slate-500">Weight:</span>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={c.weight}
                      onChange={(e) => updateCategory(c.id, "weight", Number(e.target.value))}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                    <span className="text-xs text-slate-600">%</span>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-slate-500">Score:</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={c.currentScore}
                      onChange={(e) => updateCategory(c.id, "currentScore", Number(e.target.value))}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                    <span className="text-xs text-slate-600">%</span>
                  </div>
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removeCategory(c.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalWeight !== 100 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Note: Total syllabus weight currently sums to {totalWeight}% (standard syllabus equals 100%).</span>
          </div>
        )}

        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Target Desired Final Course Grade (%)
          </label>
          <input
            type="number"
            min={50}
            max={100}
            value={targetFinalGrade}
            onChange={(e) => setTargetFinalGrade(Number(e.target.value))}
            className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
          />
        </div>

        <ResultCard variant="dark" title="Performance & Final Exam Requirement">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Current Grade</span>
              <p className="text-4xl font-extrabold text-white mt-1">{currentOverallPct.toFixed(1)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Based on completed {completedWeight}%</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Needed on Final</span>
              <p className={`text-4xl font-extrabold mt-1 ${neededScoreOnRemaining <= 100 && neededScoreOnRemaining >= 0 ? "text-emerald-400" : "text-amber-400"}`}>
                {neededScoreOnRemaining <= 0 ? "0.0%" : `${neededScoreOnRemaining.toFixed(1)}%`}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">On remaining {remainingWeight}% weight</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Feasibility</span>
              <p className="text-sm font-bold text-slate-100 mt-1">
                {neededScoreOnRemaining <= 0 ? "Target Secured" : neededScoreOnRemaining <= 100 ? "Achievable Target" : "Requires >100% or Extra Credit"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
