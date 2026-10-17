import React, { useState } from "react";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";

interface Course {
  id: string;
  name: string;
  grade: string;
  level: "Regular" | "Honors" | "AP/IB";
}

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0,
};

export const HighSchoolGpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "AP English Literature", grade: "A", level: "AP/IB" },
    { id: "2", name: "Honors Pre-Calculus", grade: "A-", level: "Honors" },
    { id: "3", name: "AP Chemistry", grade: "B+", level: "AP/IB" },
    { id: "4", name: "US History", grade: "A", level: "Regular" },
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), name: `Course ${courses.length + 1}`, grade: "A", level: "Regular" }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, val: any) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  const calculateGpas = () => {
    if (courses.length === 0) return { unweighted: 0, weighted: 0 };
    let totalUnweighted = 0;
    let totalWeighted = 0;

    courses.forEach((c) => {
      const base = GRADE_POINTS[c.grade] ?? 0;
      totalUnweighted += base;
      const weightBoost = c.level === "AP/IB" ? 1.0 : c.level === "Honors" ? 0.5 : 0;
      totalWeighted += base + weightBoost;
    });

    return {
      unweighted: totalUnweighted / courses.length,
      weighted: totalWeighted / courses.length,
    };
  };

  const { unweighted, weighted } = calculateGpas();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={GraduationCap}
            title="Weighted 5.0 vs Unweighted 4.0 High School GPA"
            description="Calculate cumulative high school GPA with Honors (+0.5) and AP/IB (+1.0) weighting scales."
          />
          <ResetButton onReset={() => {
            setCourses([
              { id: "1", name: "AP English Literature", grade: "A", level: "AP/IB" },
              { id: "2", name: "Honors Pre-Calculus", grade: "A-", level: "Honors" },
              { id: "3", name: "AP Chemistry", grade: "B+", level: "AP/IB" },
              { id: "4", name: "US History", grade: "A", level: "Regular" },
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">High School Classes</h3>
              <Button size="sm" variant="secondary" onClick={addCourse} className="flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Course
              </Button>
            </div>

            <div className="space-y-2">
              {courses.map((c) => (
                <div key={c.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) => updateCourse(c.id, "name", e.target.value)}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div className="col-span-3">
                    <select
                      value={c.grade}
                      onChange={(e) => updateCourse(c.id, "grade", e.target.value)}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    >
                      {Object.keys(GRADE_POINTS).map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-3">
                    <select
                      value={c.level}
                      onChange={(e) => updateCourse(c.id, "level", e.target.value as any)}
                      className="w-full text-xs font-semibold px-1 py-1.5 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="Regular">Regular (4.0)</option>
                      <option value="Honors">Honors (4.5)</option>
                      <option value="AP/IB">AP / IB (5.0)</option>
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
            <ResultCard variant="dark" title="High School GPA Summary">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 block uppercase font-bold">Weighted GPA</span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                      {weighted.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-slate-400 block">5.0 Maximum Scale</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 block uppercase font-bold">Unweighted GPA</span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white">
                      {unweighted.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-slate-400 block">4.0 Standard Scale</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                  Total Courses Evaluated: <strong>{courses.length} Classes</strong>. Honors courses contribute a +0.5 quality boost; AP/IB courses contribute a +1.0 boost.
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
