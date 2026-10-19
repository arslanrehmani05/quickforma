import React, { useState } from "react";
import { GraduationCap, Award, BookOpen, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface GradeCategory {
  name: string;
  weight: number;
  score: number;
}

export const MiddleSchoolGradeCalculator: React.FC = () => {
  const [categories, setCategories] = useState<GradeCategory[]>([
    { name: "Tests & Exams", weight: 40, score: 88 },
    { name: "Quizzes", weight: 25, score: 92 },
    { name: "Classwork & Projects", weight: 20, score: 95 },
    { name: "Homework", weight: 15, score: 90 }
  ]);

  const handleReset = () => {
    setCategories([
      { name: "Tests & Exams", weight: 40, score: 88 },
      { name: "Quizzes", weight: 25, score: 92 },
      { name: "Classwork & Projects", weight: 20, score: 95 },
      { name: "Homework", weight: 15, score: 90 }
    ]);
  };

  const handleCategoryChange = (index: number, field: keyof GradeCategory, val: any) => {
    const updated = [...categories];
    updated[index] = { ...updated[index], [field]: val };
    setCategories(updated);
  };

  const addCategory = () => {
    setCategories([...categories, { name: "New Category", weight: 10, score: 85 }]);
  };

  const removeCategory = (index: number) => {
    if (categories.length > 1) {
      setCategories(categories.filter((_, i) => i !== index));
    }
  };

  const totalWeight = categories.reduce((sum, c) => sum + (Number(c.weight) || 0), 0);
  const weightedScore = totalWeight > 0
    ? categories.reduce((sum, c) => sum + ((Number(c.weight) || 0) * (Number(c.score) || 0)), 0) / totalWeight
    : 0;

  const getLetterGrade = (pct: number) => {
    if (pct >= 93) return { grade: "A", gpa: 4.0, desc: "Excellent" };
    if (pct >= 90) return { grade: "A-", gpa: 3.7, desc: "Superior" };
    if (pct >= 87) return { grade: "B+", gpa: 3.3, desc: "Very Good" };
    if (pct >= 83) return { grade: "B", gpa: 3.0, desc: "Good" };
    if (pct >= 80) return { grade: "B-", gpa: 2.7, desc: "Above Average" };
    if (pct >= 77) return { grade: "C+", gpa: 2.3, desc: "Average" };
    if (pct >= 73) return { grade: "C", gpa: 2.0, desc: "Satisfactory" };
    if (pct >= 70) return { grade: "C-", gpa: 1.7, desc: "Competent" };
    if (pct >= 67) return { grade: "D+", gpa: 1.3, desc: "Passing" };
    if (pct >= 60) return { grade: "D", gpa: 1.0, desc: "Minimum Passing" };
    return { grade: "F", gpa: 0.0, desc: "Needs Improvement" };
  };

  const gradeInfo = getLetterGrade(weightedScore);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Letter Grade to Percentage Scale Converter"
        description="Calculate overall weighted middle school grades, letter grade equivalents, and standard 4.0 GPA scales."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800">Grade Categories</h3>
          <button
            onClick={addCategory}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Category
          </button>
        </div>

        <div className="space-y-3">
          {categories.map((cat, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div className="col-span-5">
                <input
                  type="text"
                  value={cat.name}
                  onChange={(e) => handleCategoryChange(idx, "name", e.target.value)}
                  className="w-full text-xs font-medium bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:outline-indigo-500"
                  placeholder="Category Name"
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  value={cat.weight}
                  onChange={(e) => handleCategoryChange(idx, "weight", Number(e.target.value))}
                  className="w-full text-xs bg-white border border-slate-300 rounded px-2 py-1.5 focus:outline-indigo-500"
                  placeholder="Weight %"
                  min={0}
                  max={100}
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  value={cat.score}
                  onChange={(e) => handleCategoryChange(idx, "score", Number(e.target.value))}
                  className="w-full text-xs bg-white border border-slate-300 rounded px-2 py-1.5 focus:outline-indigo-500"
                  placeholder="Score %"
                  min={0}
                  max={100}
                />
              </div>
              <div className="col-span-1 flex justify-center">
                {categories.length > 1 && (
                  <button
                    onClick={() => removeCategory(idx)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className={`text-xs font-medium ${Math.abs(totalWeight - 100) < 0.01 ? "text-emerald-600" : "text-amber-600"}`}>
            Total Weight: {totalWeight.toFixed(0)}% {Math.abs(totalWeight - 100) > 0.01 && "(Weights normalized)"}
          </span>
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Overall Average"
          value={`${weightedScore.toFixed(1)}%`}
          subtitle={`Grade score`}
          variant="indigo"
        />
        <ResultCard
          title="Letter Grade"
          value={gradeInfo.grade}
          subtitle={gradeInfo.desc}
          variant="light"
        />
        <ResultCard
          title="4.0 GPA Scale"
          value={`${gradeInfo.gpa.toFixed(1)}`}
          subtitle="Grade point equivalent"
          variant="light"
        />
        <ResultCard
          title="Target to A (93%)"
          value={weightedScore >= 93 ? "Goal Reached!" : `${(93 - weightedScore).toFixed(1)}% gap`}
          subtitle="Points required"
          variant="light"
        />
      </div>
    </div>
  );
};
