import React, { useState } from "react";
import { Scale, Award, GraduationCap, AlertCircle, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface CourseRow {
  name: string;
  grade: string;
  credits: number;
}

export const LawSchoolGpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<CourseRow[]>([
    { name: "Constitutional Law", grade: "A+", credits: 4 },
    { name: "Legal Writing & Research", grade: "A", credits: 3 },
    { name: "Economics of Public Policy", grade: "A-", credits: 3 },
    { name: "Philosophy of Logic", grade: "B+", credits: 3 },
    { name: "American History 1865-Present", grade: "A", credits: 3 }
  ]);

  // LSAC Standard Scale (Crucial: A+ = 4.33)
  const lsacGradePoints: { [grade: string]: number } = {
    "A+": 4.33, "A": 4.00, "A-": 3.67,
    "B+": 3.33, "B": 3.00, "B-": 2.67,
    "C+": 2.33, "C": 2.00, "C-": 1.67,
    "D+": 1.33, "D": 1.00, "D-": 0.67,
    "F": 0.00
  };

  // Standard College Scale (A+ capped at 4.00)
  const standardGradePoints: { [grade: string]: number } = {
    "A+": 4.00, "A": 4.00, "A-": 3.70,
    "B+": 3.30, "B": 3.00, "B-": 2.70,
    "C+": 2.30, "C": 2.00, "C-": 1.70,
    "D+": 1.30, "D": 1.00, "D-": 0.70,
    "F": 0.00
  };

  let totalCredits = 0;
  let totalLsacPoints = 0;
  let totalStandardPoints = 0;

  courses.forEach((c) => {
    const cr = Math.max(0, c.credits);
    totalCredits += cr;
    totalLsacPoints += cr * (lsacGradePoints[c.grade] ?? 0);
    totalStandardPoints += cr * (standardGradePoints[c.grade] ?? 0);
  });

  const lsacGpa = totalCredits > 0 ? (totalLsacPoints / totalCredits).toFixed(3) : "0.000";
  const standardGpa = totalCredits > 0 ? (totalStandardPoints / totalCredits).toFixed(3) : "0.000";
  const gpaDelta = (parseFloat(lsacGpa) - parseFloat(standardGpa)).toFixed(3);

  const addCourse = () => {
    setCourses([...courses, { name: `Course ${courses.length + 1}`, grade: "A", credits: 3 }]);
  };

  const removeCourse = (idx: number) => {
    setCourses(courses.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Scale}
            title="LSAC Law School Admission GPA Converter"
            description="Calculate your official Law School Admission Council (LSAC) cumulative GPA with A+ weighting (4.33 scale) and course adjustments."
          />
          <ResetButton onReset={() => {
            setCourses([
              { name: "Constitutional Law", grade: "A+", credits: 4 },
              { name: "Legal Writing & Research", grade: "A", credits: 3 },
              { name: "Economics of Public Policy", grade: "A-", credits: 3 },
              { name: "Philosophy of Logic", grade: "B+", credits: 3 },
              { name: "American History 1865-Present", grade: "A", credits: 3 }
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Official LSAC GPA"
            value={lsacGpa}
            subtitle="Includes A+ = 4.33 boost"
          />
          <ResultCard
            variant="light"
            title="Undergrad 4.00 GPA"
            value={standardGpa}
            subtitle="Standard institutional scale"
          />
          <ResultCard
            variant="light"
            title="LSAC Advantage"
            value={parseFloat(gpaDelta) >= 0 ? `+${gpaDelta}` : gpaDelta}
            subtitle={`${totalCredits} graded semester hours`}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Undergraduate Course Schedule</h3>
            <button
              type="button"
              onClick={addCourse}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Course
            </button>
          </div>

          <div className="space-y-2">
            {courses.map((course, idx) => (
              <div key={idx} className="flex flex-wrap sm:flex-nowrap items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => {
                    const next = [...courses];
                    next[idx].name = e.target.value;
                    setCourses(next);
                  }}
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
                  placeholder="Course title..."
                />
                <select
                  value={course.grade}
                  onChange={(e) => {
                    const next = [...courses];
                    next[idx].grade = e.target.value;
                    setCourses(next);
                  }}
                  className="w-24 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-indigo-600"
                >
                  {Object.keys(lsacGradePoints).map((g) => (
                    <option key={g} value={g}>{g} ({lsacGradePoints[g].toFixed(2)})</option>
                  ))}
                </select>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0.5}
                    max={6}
                    step={0.5}
                    value={course.credits}
                    onChange={(e) => {
                      const next = [...courses];
                      next[idx].credits = Number(e.target.value);
                      setCourses(next);
                    }}
                    className="w-16 px-2 py-1.5 bg-white border border-slate-200 rounded-xl text-center font-semibold"
                  />
                  <span className="text-slate-500 text-[11px]">cr</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeCourse(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
