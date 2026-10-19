import React, { useState } from "react";
import { CheckCircle2, XCircle, ArrowRightLeft, BookOpen } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PassFailGpaImpactCalculator: React.FC = () => {
  const [currentGpa, setCurrentGpa] = useState<number>(3.65);
  const [completedCredits, setCompletedCredits] = useState<number>(45);
  const [courseCredits, setCourseCredits] = useState<number>(4);
  const [projectedGrade, setProjectedGrade] = useState<number>(2.7); // B-
  const [passGradeThreshold, setPassGradeThreshold] = useState<number>(2.0); // C

  const safeCredits = Math.max(1, completedCredits);
  const currentPoints = currentGpa * safeCredits;

  // If taken for a Letter Grade:
  const withLetterPoints = currentPoints + (projectedGrade * courseCredits);
  const withLetterCredits = safeCredits + courseCredits;
  const gpaWithLetter = (withLetterPoints / withLetterCredits).toFixed(3);

  // If taken Pass/Fail (Pass does not affect GPA, credits earned):
  const gpaWithPass = currentGpa.toFixed(3);
  const isPass = projectedGrade >= passGradeThreshold;

  const difference = (parseFloat(gpaWithLetter) - currentGpa).toFixed(3);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ArrowRightLeft}
            title="Pass / Fail Course Selection GPA Impact Solver"
            description="Evaluate whether to elect Pass/No Credit grading or retain letter grades to protect institutional GPA and honors standing."
          />
          <ResetButton onReset={() => {
            setCurrentGpa(3.65);
            setCompletedCredits(45);
            setCourseCredits(4);
            setProjectedGrade(2.7);
            setPassGradeThreshold(2.0);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Current Cumulative GPA"
            type="number"
            step={0.01}
            value={currentGpa}
            onChange={(e) => setCurrentGpa(Number(e.target.value))}
            min={0}
            max={4.0}
          />
          <InputField
            label="Completed Graded Credits"
            type="number"
            value={completedCredits}
            onChange={(e) => setCompletedCredits(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Elective Course Credits"
            type="number"
            value={courseCredits}
            onChange={(e) => setCourseCredits(Number(e.target.value))}
            min={1}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Expected Course Letter Grade</label>
            <select
              value={projectedGrade}
              onChange={(e) => setProjectedGrade(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-bold text-indigo-600"
            >
              <option value={4.0}>A (4.00)</option>
              <option value={3.7}>A- (3.70)</option>
              <option value={3.3}>B+ (3.30)</option>
              <option value={3.0}>B (3.00)</option>
              <option value={2.7}>B- (2.70)</option>
              <option value={2.3}>C+ (2.30)</option>
              <option value={2.0}>C (2.00)</option>
              <option value={1.0}>D (1.00)</option>
              <option value={0.0}>F (0.00)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="GPA with Letter Grade"
            value={gpaWithLetter}
            subtitle={`Impact: ${parseFloat(difference) >= 0 ? `+${difference}` : difference}`}
          />
          <ResultCard
            variant="light"
            title="GPA with Pass/Fail Option"
            value={gpaWithPass}
            subtitle={isPass ? "Earns credits, preserves GPA" : "Fail risk (0 credits earned)"}
          />
          <ResultCard
            variant="light"
            title="Recommendation"
            value={parseFloat(gpaWithLetter) >= currentGpa ? "Take Letter Grade" : "Elect Pass / Fail"}
            subtitle={parseFloat(gpaWithLetter) >= currentGpa ? "Boosts cumulative standing" : "Protects GPA from downward dilution"}
          />
        </div>
      </div>
    </div>
  );
};
