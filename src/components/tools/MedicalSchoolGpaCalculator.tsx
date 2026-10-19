import React, { useState } from "react";
import { Stethoscope, Activity, BookOpen, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface MedCourse {
  name: string;
  category: "BCPM" | "AO"; // BCPM: Biology, Chemistry, Physics, Math. AO: All Other
  grade: string;
  credits: number;
}

export const MedicalSchoolGpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<MedCourse[]>([
    { name: "General Chemistry I", category: "BCPM", grade: "A", credits: 4 },
    { name: "Organic Chemistry II", category: "BCPM", grade: "B+", credits: 4 },
    { name: "Cell Biology & Genetics", category: "BCPM", grade: "A-", credits: 4 },
    { name: "Calculus for Life Sciences", category: "BCPM", grade: "A", credits: 3 },
    { name: "Biomedical Ethics", category: "AO", grade: "A", credits: 3 },
    { name: "Sociology & Health Behaviors", category: "AO", grade: "A", credits: 3 }
  ]);

  const amcasPoints: { [g: string]: number } = {
    "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0.0
  };

  let bcpmCredits = 0;
  let bcpmPoints = 0;
  let aoCredits = 0;
  let aoPoints = 0;

  courses.forEach((c) => {
    const pts = (amcasPoints[c.grade] ?? 0) * c.credits;
    if (c.category === "BCPM") {
      bcpmCredits += c.credits;
      bcpmPoints += pts;
    } else {
      aoCredits += c.credits;
      aoPoints += pts;
    }
  });

  const totalCredits = bcpmCredits + aoCredits;
  const totalPoints = bcpmPoints + aoPoints;

  const bcpmGpa = bcpmCredits > 0 ? (bcpmPoints / bcpmCredits).toFixed(2) : "0.00";
  const aoGpa = aoCredits > 0 ? (aoPoints / aoCredits).toFixed(2) : "0.00";
  const cumulativeGpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  const addCourse = () => {
    setCourses([...courses, { name: "Human Physiology", category: "BCPM", grade: "A", credits: 4 }]);
  };

  const removeCourse = (idx: number) => {
    setCourses(courses.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Stethoscope}
            title="AMCAS Medical School BCPM & Science GPA Calculator"
            description="Deconstruct your undergraduate record into Science (BCPM) and Non-Science (AO) GPAs per official AAMC guidelines."
          />
          <ResetButton onReset={() => {
            setCourses([
              { name: "General Chemistry I", category: "BCPM", grade: "A", credits: 4 },
              { name: "Organic Chemistry II", category: "BCPM", grade: "B+", credits: 4 },
              { name: "Cell Biology & Genetics", category: "BCPM", grade: "A-", credits: 4 },
              { name: "Calculus for Life Sciences", category: "BCPM", grade: "A", credits: 3 },
              { name: "Biomedical Ethics", category: "AO", grade: "A", credits: 3 },
              { name: "Sociology & Health Behaviors", category: "AO", grade: "A", credits: 3 }
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Science BCPM GPA"
            value={bcpmGpa}
            subtitle={`${bcpmCredits} Biology/Chem/Physics/Math cr`}
          />
          <ResultCard
            variant="light"
            title="Non-Science (AO) GPA"
            value={aoGpa}
            subtitle={`${aoCredits} All Other credits`}
          />
          <ResultCard
            variant="light"
            title="AMCAS Cumulative GPA"
            value={cumulativeGpa}
            subtitle={`${totalCredits} total credit hours`}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">AMCAS Coursework Classification</h3>
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
                />
                <select
                  value={course.category}
                  onChange={(e) => {
                    const next = [...courses];
                    next[idx].category = e.target.value as any;
                    setCourses(next);
                  }}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700"
                >
                  <option value="BCPM">BCPM (Science / Math)</option>
                  <option value="AO">All Other (Non-Science)</option>
                </select>
                <select
                  value={course.grade}
                  onChange={(e) => {
                    const next = [...courses];
                    next[idx].grade = e.target.value;
                    setCourses(next);
                  }}
                  className="w-20 px-2 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-indigo-600"
                >
                  {Object.keys(amcasPoints).map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={course.credits}
                    onChange={(e) => {
                      const next = [...courses];
                      next[idx].credits = Number(e.target.value);
                      setCourses(next);
                    }}
                    className="w-14 px-2 py-1.5 bg-white border border-slate-200 rounded-xl text-center font-semibold"
                  />
                  <span className="text-slate-500 text-[11px]">cr</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeCourse(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-500"
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
