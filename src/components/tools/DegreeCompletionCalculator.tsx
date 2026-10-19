import React, { useState } from "react";
import { GraduationCap, Calendar, Clock, CheckCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const DegreeCompletionCalculator: React.FC = () => {
  const [totalDegreeRequired, setTotalDegreeRequired] = useState<number>(120);
  const [creditsCompleted, setCreditsCompleted] = useState<number>(78);
  const [currentEnrolledCredits, setCurrentEnrolledCredits] = useState<number>(15);
  const [plannedCreditsPerSemester, setPlannedCreditsPerSemester] = useState<number>(15);
  const [includeSummerTerms, setIncludeSummerTerms] = useState<boolean>(false);
  const [summerCredits, setSummerCredits] = useState<number>(6);

  const effectiveCompleted = creditsCompleted + currentEnrolledCredits;
  const remainingCredits = Math.max(0, totalDegreeRequired - effectiveCompleted);

  const creditsPerYear = plannedCreditsPerSemester * 2 + (includeSummerTerms ? summerCredits : 0);
  const semestersRemaining = Math.ceil(remainingCredits / Math.max(1, plannedCreditsPerSemester));
  const yearsRemaining = (remainingCredits / Math.max(1, creditsPerYear)).toFixed(1);
  const completionPercentage = ((effectiveCompleted / totalDegreeRequired) * 100).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={GraduationCap}
            title="Degree Credit Progress & Remaining Semester Estimator"
            description="Estimate graduation timeline, remaining credit requirements, and semester load for bachelor's or associate degrees."
          />
          <ResetButton onReset={() => {
            setTotalDegreeRequired(120);
            setCreditsCompleted(78);
            setCurrentEnrolledCredits(15);
            setPlannedCreditsPerSemester(15);
            setIncludeSummerTerms(false);
            setSummerCredits(6);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Total Degree Credits (e.g. 120)"
            type="number"
            value={totalDegreeRequired}
            onChange={(e) => setTotalDegreeRequired(Number(e.target.value))}
            min={60}
          />
          <InputField
            label="Credits Earned to Date"
            type="number"
            value={creditsCompleted}
            onChange={(e) => setCreditsCompleted(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Current Term In-Progress"
            type="number"
            value={currentEnrolledCredits}
            onChange={(e) => setCurrentEnrolledCredits(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Planned Credits / Term"
            type="number"
            value={plannedCreditsPerSemester}
            onChange={(e) => setPlannedCreditsPerSemester(Number(e.target.value))}
            min={3}
            max={21}
          />
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={includeSummerTerms}
              onChange={(e) => setIncludeSummerTerms(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Accelerate with Summer Term Coursework
          </label>
          {includeSummerTerms && (
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-xs">Summer Credits:</span>
              <input
                type="number"
                value={summerCredits}
                onChange={(e) => setSummerCredits(Number(e.target.value))}
                className="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-center text-xs font-bold"
                min={1}
                max={12}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Degree Progress"
            value={`${completionPercentage}%`}
            subtitle={`${effectiveCompleted} of ${totalDegreeRequired} credits fulfilled`}
          />
          <ResultCard
            variant="light"
            title="Remaining Semesters"
            value={`${semestersRemaining} terms`}
            subtitle={`Approx. ${yearsRemaining} academic years`}
          />
          <ResultCard
            variant="light"
            title="Remaining Credits"
            value={`${remainingCredits} cr`}
            subtitle={remainingCredits === 0 ? "Requirements satisfied!" : "Pending to graduate"}
          />
        </div>
      </div>
    </div>
  );
};
