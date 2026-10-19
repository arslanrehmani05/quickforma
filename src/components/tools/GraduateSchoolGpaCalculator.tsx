import React, { useState } from "react";
import { GraduationCap, Award, BookOpen, AlertTriangle, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface GradCourse {
  name: string;
  grade: string;
  credits: number;
}

export const GraduateSchoolGpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<GradCourse[]>([
    { name: "Advanced Econometrics", grade: "A", credits: 3 },
    { name: "Quantitative Research Methods", grade: "A-", credits: 3 },
    { name: "Seminar in Macroeconomic Theory", grade: "B+", credits: 3 },
    { name: "Graduate Thesis Proposal", grade: "A", credits: 3 }
  ]);

  const gradPoints: { [g: string]: number } = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "F": 0.0
  };

  let totalCredits = 0;
  let totalPoints = 0;
  let nonDegreeCredits = 0; // Grades below B- (2.7) or C (2.0) generally do not count toward grad degrees

  courses.forEach((c) => {
    const pts = (gradPoints[c.grade] ?? 0);
    totalCredits += c.credits;
    totalPoints += pts * c.credits;
    if (pts < 2.7) {
      nonDegreeCredits += c.credits;
    }
  });

  const gradGpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(3) : "0.000";
  const gpaNum = parseFloat(gradGpa);

  let standing = "Good Academic Standing";
  if (gpaNum >= 3.90) standing = "Distinction / Dean's Honor List";
  else if (gpaNum < 3.00) standing = "Academic Probation Risk (< 3.00)";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={GraduationCap}
            title="Graduate Master's & PhD Program GPA Calculator"
            description="Track graduate coursework, minimum 3.00 degree-standing requirements, and academic probation thresholds."
          />
          <ResetButton onReset={() => {
            setCourses([
              { name: "Advanced Econometrics", grade: "A", credits: 3 },
              { name: "Quantitative Research Methods", grade: "A-", credits: 3 },
              { name: "Seminar in Macroeconomic Theory", grade: "B+", credits: 3 },
              { name: "Graduate Thesis Proposal", grade: "A", credits: 3 }
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Graduate GPA"
            value={gradGpa}
            subtitle={`${totalCredits} Total Grad Semester Units`}
          />
          <ResultCard
            variant="light"
            title="Academic Standing"
            value={standing}
            subtitle={gpaNum >= 3.0 ? "Meets 3.00 degree threshold" : "Below graduate minimum"}
          />
          <ResultCard
            variant="light"
            title="Credit Status"
            value={`${totalCredits - nonDegreeCredits} / ${totalCredits} cr`}
            subtitle={nonDegreeCredits > 0 ? `${nonDegreeCredits} cr below B- minimum` : "All credits eligible"}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Graduate Seminar & Thesis Roster</h3>
            <button
              type="button"
              onClick={() => setCourses([...courses, { name: "Graduate Directed Study", grade: "A", credits: 3 }])}
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
                  className="w-20 px-2 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-indigo-600"
                >
                  {Object.keys(gradPoints).map((g) => (
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
