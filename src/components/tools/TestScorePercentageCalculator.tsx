import React, { useState } from "react";
import { CheckCircle2, Percent, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TestScorePercentageCalculator: React.FC = () => {
  const [totalQuestions, setTotalQuestions] = useState<number>(50);
  const [wrongQuestions, setWrongQuestions] = useState<number>(6);
  const [extraCredit, setExtraCredit] = useState<number>(0);

  const total = Math.max(1, Number(totalQuestions) || 1);
  const wrong = Math.max(0, Number(wrongQuestions) || 0);
  const extra = Math.max(0, Number(extraCredit) || 0);

  const correctQuestions = Math.max(0, total - wrong + extra);
  const percentage = (correctQuestions / total) * 100;

  const getLetterGrade = (pct: number) => {
    if (pct >= 93) return { grade: "A", gpa: "4.0", status: "Excellent" };
    if (pct >= 90) return { grade: "A-", gpa: "3.7", status: "Very Good" };
    if (pct >= 87) return { grade: "B+", gpa: "3.3", status: "Good" };
    if (pct >= 83) return { grade: "B", gpa: "3.0", status: "Above Average" };
    if (pct >= 80) return { grade: "B-", gpa: "2.7", status: "Average" };
    if (pct >= 77) return { grade: "C+", gpa: "2.3", status: "Satisfactory" };
    if (pct >= 73) return { grade: "C", gpa: "2.0", status: "Passing" };
    if (pct >= 70) return { grade: "C-", gpa: "1.7", status: "Minimum Passing" };
    if (pct >= 60) return { grade: "D", gpa: "1.0", status: "Conditional Pass" };
    return { grade: "F", gpa: "0.0", status: "Failing" };
  };

  const evalResult = getLetterGrade(percentage);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Percent}
            title="Test Score Percentage & Letter Grade Calculator"
            description="Calculate exact exam percentage score, missed points penalty, and standard US/collegiate letter grade."
          />
          <ResetButton onReset={() => {
            setTotalQuestions(50);
            setWrongQuestions(6);
            setExtraCredit(0);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Total Exam Questions (≥ 1)"
            type="number"
            min={1}
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(Math.max(1, Number(e.target.value)))}
          />
          <InputField
            label="Wrong / Missed Questions"
            type="number"
            min={0}
            value={wrongQuestions}
            onChange={(e) => setWrongQuestions(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Extra Credit Questions"
            type="number"
            min={0}
            value={extraCredit}
            onChange={(e) => setExtraCredit(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Test Evaluation">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Final Score</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">{percentage.toFixed(1)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">{correctQuestions} of {total} points</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Letter Grade</span>
              <p className="text-4xl font-extrabold text-white mt-1">{evalResult.grade}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">{evalResult.status}</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Equivalent GPA</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">{evalResult.gpa}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">4.0 Grade Point Scale</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
