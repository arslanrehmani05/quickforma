import React, { useState } from "react";
import { Award, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";

interface CollegeCourse {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const COLLEGE_POINTS: Record<string, number> = {
  "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0,
};

export const CollegeGpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<CollegeCourse[]>([
    { id: "1", name: "Organic Chemistry I", credits: 4, grade: "A" },
    { id: "2", name: "Calculus II", credits: 4, grade: "B+" },
    { id: "3", name: "Macroeconomics", credits: 3, grade: "A-" },
    { id: "4", name: "Computer Science I", credits: 4, grade: "A" },
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), name: "College Course", credits: 3, grade: "A" }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof CollegeCourse, val: any) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  const totalCredits = courses.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
  const totalQualityPoints = courses.reduce((sum, c) => sum + (Number(c.credits) || 0) * (COLLEGE_POINTS[c.grade] ?? 0), 0);
  const collegeGpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Award}
            title="University Credit Hour GPA Calculator"
            description="Calculate college semester GPA and cumulative quality points weighted by credit hour values."
          />
          <ResetButton onReset={() => {
            setCourses([
              { id: "1", name: "Organic Chemistry I", credits: 4, grade: "A" },
              { id: "2", name: "Calculus II", credits: 4, grade: "B+" },
              { id: "3", name: "Macroeconomics", credits: 3, grade: "A-" },
              { id: "4", name: "Computer Science I", credits: 4, grade: "A" },
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">University Courses</h3>
              <Button size="sm" variant="secondary" onClick={addCourse} className="flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Course
              </Button>
            </div>

            <div className="space-y-2">
              {courses.map((c) => (
                <div key={c.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="col-span-6">
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) => updateCourse(c.id, "name", e.target.value)}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={c.credits}
                      onChange={(e) => updateCourse(c.id, "credits", Number(e.target.value))}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                      placeholder="Credits"
                    />
                  </div>
                  <div className="col-span-3">
                    <select
                      value={c.grade}
                      onChange={(e) => updateCourse(c.id, "grade", e.target.value)}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    >
                      {Object.keys(COLLEGE_POINTS).map((g) => (
                        <option key={g} value={g}>{g} ({COLLEGE_POINTS[g].toFixed(1)})</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1 text-center">
                    <button onClick={() => removeCourse(c.id)} className="text-slate-400 hover:text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Semester GPA Result">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Credit-Weighted GPA</span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-white">
                    {collegeGpa.toFixed(2)}
                  </div>
                  <p className="text-xs text-slate-400">
                    Calculated across {totalCredits} attempted college semester credit hours.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Total Quality Points</span>
                    <span className="text-lg font-bold text-white">{totalQualityPoints.toFixed(1)}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Total Credit Hours</span>
                    <span className="text-lg font-bold text-white">{totalCredits}</span>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
