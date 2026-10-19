import React, { useState } from "react";
import { RefreshCw, TrendingUp, Award, BookOpen } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AcademicForgivenessGpaCalculator: React.FC = () => {
  const [cumulativeGpa, setCumulativeGpa] = useState<number>(2.85);
  const [totalAttemptedCredits, setTotalAttemptedCredits] = useState<number>(45);
  const [repeatedCourseCredits, setRepeatedCourseCredits] = useState<number>(4);
  const [originalGradePoints, setOriginalGradePoints] = useState<number>(0.0); // F (0.0)
  const [newGradePoints, setNewGradePoints] = useState<number>(4.0); // A (4.0)

  const safeCredits = Math.max(1, totalAttemptedCredits);
  const currentTotalQualityPoints = cumulativeGpa * safeCredits;

  // Grade Replacement Policy (Original quality points removed from total, credits stay unchanged)
  const replacedPoints = currentTotalQualityPoints - (originalGradePoints * repeatedCourseCredits) + (newGradePoints * repeatedCourseCredits);
  const replacedGpa = (replacedPoints / safeCredits).toFixed(3);

  // Grade Averaging Policy (Both attempts count toward cumulative GPA and total credits)
  const averagedPoints = currentTotalQualityPoints + (newGradePoints * repeatedCourseCredits);
  const averagedCredits = safeCredits + repeatedCourseCredits;
  const averagedGpa = (averagedPoints / averagedCredits).toFixed(3);

  const boostReplaced = (parseFloat(replacedGpa) - cumulativeGpa).toFixed(3);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={RefreshCw}
            title="Course Repeat & Grade Forgiveness GPA Solver"
            description="Model how repeating a failed or low-grade course improves cumulative GPA under Grade Replacement versus Grade Averaging policies."
          />
          <ResetButton onReset={() => {
            setCumulativeGpa(2.85); setTotalAttemptedCredits(45); setRepeatedCourseCredits(4);
            setOriginalGradePoints(0.0); setNewGradePoints(4.0);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Current Cumulative GPA"
            type="number"
            step={0.01}
            value={cumulativeGpa}
            onChange={(e) => setCumulativeGpa(Number(e.target.value))}
            min={0}
            max={4.0}
          />
          <InputField
            label="Total Graded Attempted Credits"
            type="number"
            value={totalAttemptedCredits}
            onChange={(e) => setTotalAttemptedCredits(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Repeated Course Credits"
            type="number"
            value={repeatedCourseCredits}
            onChange={(e) => setRepeatedCourseCredits(Number(e.target.value))}
            min={1}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Original Prior Grade</label>
            <select
              value={originalGradePoints}
              onChange={(e) => setOriginalGradePoints(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-bold text-red-600"
            >
              <option value={0.0}>F (0.00)</option>
              <option value={1.0}>D (1.00)</option>
              <option value={1.7}>C- (1.70)</option>
              <option value={2.0}>C (2.00)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">New Retake Grade</label>
            <select
              value={newGradePoints}
              onChange={(e) => setNewGradePoints(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-bold text-emerald-600"
            >
              <option value={4.0}>A (4.00)</option>
              <option value={3.7}>A- (3.70)</option>
              <option value={3.3}>B+ (3.30)</option>
              <option value={3.0}>B (3.00)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Forgiveness / Replacement GPA"
            value={replacedGpa}
            subtitle={`+${boostReplaced} net GPA improvement`}
          />
          <ResultCard
            variant="light"
            title="Grade Averaging GPA"
            value={averagedGpa}
            subtitle={`If university counts both course attempts`}
          />
          <ResultCard
            variant="light"
            title="Quality Points Gained"
            value={`+${(newGradePoints - originalGradePoints) * repeatedCourseCredits} pts`}
            subtitle="Added directly to cumulative tally"
          />
        </div>
      </div>
    </div>
  );
};
