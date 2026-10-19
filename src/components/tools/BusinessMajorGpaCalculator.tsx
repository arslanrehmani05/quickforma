import React, { useState } from "react";
import { Briefcase, TrendingUp, Award, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface BizCourse {
  name: string;
  grade: string;
  credits: number;
}

export const BusinessMajorGpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<BizCourse[]>([
    { name: "Financial Accounting", grade: "A", credits: 3 },
    { name: "Corporate Finance", grade: "A-", credits: 3 },
    { name: "Managerial Accounting", grade: "A", credits: 3 },
    { name: "Business Analytics & Statistics", grade: "B+", credits: 3 },
    { name: "Operations & Supply Chain Strategy", grade: "A", credits: 3 }
  ]);

  const gradeMap: { [g: string]: number } = {
    "A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7, "D": 1.0, "F": 0.0
  };

  let totalCredits = 0;
  let totalPoints = 0;

  courses.forEach((c) => {
    totalCredits += c.credits;
    totalPoints += (gradeMap[c.grade] ?? 0) * c.credits;
  });

  const majorGpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(3) : "0.000";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Briefcase}
            title="Finance, Accounting & Business Major Core GPA Solver"
            description="Calculate upper-division business core GPA for investment banking, management consulting, and Big 4 corporate recruiting."
          />
          <ResetButton onReset={() => {
            setCourses([
              { name: "Financial Accounting", grade: "A", credits: 3 },
              { name: "Corporate Finance", grade: "A-", credits: 3 },
              { name: "Managerial Accounting", grade: "A", credits: 3 },
              { name: "Business Analytics & Statistics", grade: "B+", credits: 3 },
              { name: "Operations & Supply Chain Strategy", grade: "A", credits: 3 }
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Business Core GPA"
            value={majorGpa}
            subtitle={`${totalCredits} Business Major Credits`}
          />
          <ResultCard
            variant="light"
            title="Recruiting Tier"
            value={parseFloat(majorGpa) >= 3.7 ? "High Honor (IB / MBB Target)" : parseFloat(majorGpa) >= 3.5 ? "Corporate / Big 4 Target" : "Standard"}
            subtitle="Adheres to Wall Street recruiting cutoffs"
          />
          <ResultCard
            variant="light"
            title="Upper Division Units"
            value={`${totalCredits} cr`}
            subtitle="Finance, Accounting & Analytics"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Business Coursework Tally</h3>
            <button
              type="button"
              onClick={() => setCourses([...courses, { name: "Investment Analysis", grade: "A", credits: 3 }])}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
            >
              Add Course
            </button>
          </div>

          <div className="space-y-2">
            {courses.map((course, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => {
                    const next = [...courses];
                    next[idx].name = e.target.value;
                    setCourses(next);
                  }}
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-medium"
                />
                <select
                  value={course.grade}
                  onChange={(e) => {
                    const next = [...courses];
                    next[idx].grade = e.target.value;
                    setCourses(next);
                  }}
                  className="w-20 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-indigo-600"
                >
                  {Object.keys(gradeMap).map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
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
                <button
                  type="button"
                  onClick={() => setCourses(courses.filter((_, i) => i !== idx))}
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
