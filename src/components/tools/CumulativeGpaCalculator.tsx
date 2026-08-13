import React, { useState, useMemo } from 'react';
import { GraduationCap, Plus, Trash2, Calculator, TrendingUp, Sparkles, BookOpen } from 'lucide-react';
import { calculateCumulativeGpa, STANDARD_4_0_SCALE } from '../../utils/math/gradeEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

interface NewCourse {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

export const CumulativeGpaCalculator: React.FC = () => {
  const [priorGpa, setPriorGpa] = useState<number>(3.20);
  const [priorCredits, setPriorCredits] = useState<number>(45);
  const [courses, setCourses] = useState<NewCourse[]>([
    { id: '1', name: 'Physics I', credits: 4, grade: 'A' },
    { id: '2', name: 'Organic Chemistry', credits: 4, grade: 'B+' },
    { id: '3', name: 'Psychology 101', credits: 3, grade: 'A-' },
  ]);

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { id: Date.now().toString(), name: '', credits: 3, grade: 'A' },
    ]);
  };

  const removeCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof NewCourse, value: any) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const calculation = useMemo(() => {
    let currentSemesterPoints = 0;
    let currentSemesterCredits = 0;

    courses.forEach((c) => {
      const cr = Math.max(0, Number(c.credits) || 0);
      const points = STANDARD_4_0_SCALE[c.grade] ?? 0;
      currentSemesterPoints += points * cr;
      currentSemesterCredits += cr;
    });

    const currentGpa =
      currentSemesterCredits > 0 ? currentSemesterPoints / currentSemesterCredits : 0;

    const res = calculateCumulativeGpa(priorGpa, priorCredits, currentGpa, currentSemesterCredits);

    return {
      currentSemesterGpa: Math.round(currentGpa * 100) / 100,
      currentSemesterCredits,
      cumulativeGpa: res.cumulativeGpa,
      totalCredits: res.totalCredits,
      gpaChange: res.gpaChange,
    };
  }, [priorGpa, priorCredits, courses]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Cumulative GPA Calculator</h2>
            <p className="text-xs text-slate-500">
              Combine your existing GPA history with your new semester grades to project your updated cumulative GPA.
            </p>
          </div>
        </div>

        {/* Prior GPA & Credits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Prior Cumulative GPA
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="5.0"
              value={priorGpa}
              onChange={(e) => setPriorGpa(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Prior Completed Credits
            </label>
            <input
              type="number"
              step="1"
              min="0"
              value={priorCredits}
              onChange={(e) => setPriorCredits(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
            />
          </div>
        </div>

        {/* New Semester Courses */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" /> New Semester Courses
            </h3>
            <button
              onClick={addCourse}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Course
            </button>
          </div>

          <div className="space-y-2.5">
            {courses.map((course) => (
              <div
                key={course.id}
                className="grid grid-cols-12 gap-2 items-center bg-slate-50/60 p-2.5 rounded-2xl border border-slate-200/60"
              >
                <div className="col-span-5 sm:col-span-6">
                  <input
                    type="text"
                    placeholder="Course name (e.g. Physics)"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-600"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={course.credits}
                    onChange={(e) =>
                      updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-slate-900 text-center outline-none focus:border-indigo-600"
                  />
                </div>
                <div className="col-span-3">
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-600"
                  >
                    {Object.keys(STANDARD_4_0_SCALE).map((g) => (
                      <option key={g} value={g}>
                        {g} ({STANDARD_4_0_SCALE[g].toFixed(1)})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1 text-right">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1}
                    className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result Display */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-4">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Projected Cumulative GPA Result
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
            Client-Side RAM Only
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">New Cumulative GPA</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
              {calculation.cumulativeGpa.toFixed(2)}
            </div>
            <div className="text-[11px] text-indigo-300 mt-1">
              {calculation.gpaChange >= 0 ? `+${calculation.gpaChange.toFixed(2)}` : calculation.gpaChange.toFixed(2)} change
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Semester GPA</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-300 font-mono">
              {calculation.currentSemesterGpa.toFixed(2)}
            </div>
            <div className="text-[11px] text-indigo-300 mt-1">
              {calculation.currentSemesterCredits} credits this term
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Total Lifetime Credits</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
              {calculation.totalCredits}
            </div>
            <div className="text-[11px] text-indigo-300 mt-1">
              {priorCredits} prior + {calculation.currentSemesterCredits} new
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
