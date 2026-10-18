import React, { useState } from "react";
import { Award, Plus, Trash2, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { Button } from "../ui/Button";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface CourseRow {
  id: string;
  name: string;
  type: "regular" | "honors" | "ap";
  grade: "A" | "B" | "C" | "D" | "F";
  credits: number;
}

export const HonorsApIbGpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<CourseRow[]>([
    { id: "1", name: "AP Calculus BC", type: "ap", grade: "A", credits: 1 },
    { id: "2", name: "Honors Chemistry", type: "honors", grade: "B", credits: 1 },
    { id: "3", name: "AP English Literature", type: "ap", grade: "A", credits: 1 },
    { id: "4", name: "US History", type: "regular", grade: "A", credits: 1 },
  ]);

  const [weightPolicy, setWeightPolicy] = useState<"standard" | "equal" | "custom">("standard");
  const [customHonorsWeight, setCustomHonorsWeight] = useState<number>(0.5);
  const [customApWeight, setCustomApWeight] = useState<number>(1.0);

  const basePoints: { [key: string]: number } = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 };

  const getWeightBoost = (type: "regular" | "honors" | "ap") => {
    if (type === "regular") return 0;
    if (weightPolicy === "standard") return type === "honors" ? 0.5 : 1.0;
    if (weightPolicy === "equal") return 1.0;
    return type === "honors" ? customHonorsWeight : customApWeight;
  };

  const totalCredits = courses.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);

  const unweightedPoints = courses.reduce((sum, c) => sum + basePoints[c.grade] * (Number(c.credits) || 0), 0);
  const unweightedGpa = totalCredits > 0 ? unweightedPoints / totalCredits : 0;

  const weightedPoints = courses.reduce((sum, c) => {
    const extra = c.grade !== "F" ? getWeightBoost(c.type) : 0;
    return sum + (basePoints[c.grade] + extra) * (Number(c.credits) || 0);
  }, 0);
  const weightedGpa = totalCredits > 0 ? weightedPoints / totalCredits : 0;

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), name: `Course ${courses.length + 1}`, type: "ap", grade: "A", credits: 1 }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseRow, val: any) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Award}
            title="AP / IB / Honors Course Grade Weighting Solver"
            description="Calculate unweighted (4.0) and weighted (5.0) high school GPAs with configurable district weighting standards."
          />
          <ResetButton onReset={() => {
            setCourses([
              { id: "1", name: "AP Calculus BC", type: "ap", grade: "A", credits: 1 },
              { id: "2", name: "Honors Chemistry", type: "honors", grade: "B", credits: 1 },
              { id: "3", name: "AP English Literature", type: "ap", grade: "A", credits: 1 },
              { id: "4", name: "US History", type: "regular", grade: "A", credits: 1 },
            ]);
            setWeightPolicy("standard");
            setCustomHonorsWeight(0.5);
            setCustomApWeight(1.0);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="sm:col-span-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              District Weight Policy
            </label>
            <select
              value={weightPolicy}
              onChange={(e) => setWeightPolicy(e.target.value as any)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
            >
              <option value="standard">Standard (+1.0 AP/IB, +0.5 Honors)</option>
              <option value="equal">Equal Bump (+1.0 AP/IB, +1.0 Honors)</option>
              <option value="custom">Custom Policy</option>
            </select>
          </div>

          {weightPolicy === "custom" && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Honors Added Weight
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="2.0"
                  value={customHonorsWeight}
                  onChange={(e) => setCustomHonorsWeight(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  AP / IB Added Weight
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="2.0"
                  value={customApWeight}
                  onChange={(e) => setCustomApWeight(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </>
          )}

          <div className={weightPolicy === "custom" ? "sm:col-span-3 text-xs text-slate-500" : "sm:col-span-2 text-xs text-slate-500 flex items-center"}>
            <p>
              Weighting policies vary by US school district. Many competitive colleges recalculate transcripts back to unweighted 4.0 GPAs for admissions equity.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Enrolled High School Courses</h3>
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
                    value={c.type}
                    onChange={(e) => updateCourse(c.id, "type", e.target.value as any)}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="regular">Regular (+0.0)</option>
                    <option value="honors">Honors (+{getWeightBoost("honors")})</option>
                    <option value="ap">AP / IB (+{getWeightBoost("ap")})</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <select
                    value={c.grade}
                    onChange={(e) => updateCourse(c.id, "grade", e.target.value as any)}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="A">A (4.0)</option>
                    <option value="B">B (3.0)</option>
                    <option value="C">C (2.0)</option>
                    <option value="D">D (1.0)</option>
                    <option value="F">F (0.0)</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={c.credits}
                    onChange={(e) => updateCourse(c.id, "credits", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-1 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removeCourse(c.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ResultCard variant="dark" title="Cumulative GPA Standing">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Weighted GPA</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">{weightedGpa.toFixed(2)}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">
                Honors (+{getWeightBoost("honors")}) & AP/IB (+{getWeightBoost("ap")})
              </span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Unweighted GPA (4.0 Scale)</span>
              <p className="text-4xl font-extrabold text-white mt-1">{unweightedGpa.toFixed(2)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Total Credits: {totalCredits}</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
