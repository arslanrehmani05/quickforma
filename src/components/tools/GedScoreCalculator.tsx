import React, { useState } from "react";
import { Award, BookOpen, CheckCircle, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const GedScoreCalculator: React.FC = () => {
  const [mathScore, setMathScore] = useState<number>(158);
  const [rlaScore, setRlaScore] = useState<number>(162);
  const [scienceScore, setScienceScore] = useState<number>(168);
  const [socialScore, setSocialScore] = useState<number>(154);

  const scores = [mathScore, rlaScore, scienceScore, socialScore];
  const totalScore = mathScore + rlaScore + scienceScore + socialScore;
  const averageScore = (totalScore / 4).toFixed(1);

  // GED Scoring Tiers:
  // <145: Did not pass
  // 145-164: GED Passing Score (High School Equivalency)
  // 165-174: GED College Ready
  // 175-200: GED College Ready + Credit (eligible for college credit)
  const isAllPassed = scores.every((s) => s >= 145);
  const isCollegeReady = isAllPassed && scores.every((s) => s >= 165);
  const hasCollegeCredit = isAllPassed && scores.some((s) => s >= 175);

  let overallStatus = "Pass — High School Equivalency";
  if (!isAllPassed) overallStatus = "Below Passing (< 145 on some subjects)";
  else if (hasCollegeCredit) overallStatus = "Pass — College Ready + Credit Tier";
  else if (isCollegeReady) overallStatus = "Pass — College Ready Honors";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Award}
            title="GED Subject Score & College Readiness Evaluator"
            description="Evaluate official GED subject scores: 145 passing standard, 165 college ready, and 175 credit-earning tiers."
          />
          <ResetButton onReset={() => {
            setMathScore(158); setRlaScore(162); setScienceScore(168); setSocialScore(154);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Mathematical Reasoning (100-200)"
            type="number"
            value={mathScore}
            onChange={(e) => setMathScore(Number(e.target.value))}
            min={100}
            max={200}
          />
          <InputField
            label="Language Arts (RLA) (100-200)"
            type="number"
            value={rlaScore}
            onChange={(e) => setRlaScore(Number(e.target.value))}
            min={100}
            max={200}
          />
          <InputField
            label="Science (100-200)"
            type="number"
            value={scienceScore}
            onChange={(e) => setScienceScore(Number(e.target.value))}
            min={100}
            max={200}
          />
          <InputField
            label="Social Studies (100-200)"
            type="number"
            value={socialScore}
            onChange={(e) => setSocialScore(Number(e.target.value))}
            min={100}
            max={200}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Credential Status"
            value={isAllPassed ? "Passed Diploma" : "Retake Needed"}
            subtitle={overallStatus}
          />
          <ResultCard
            variant="light"
            title="Composite Score"
            value={`${totalScore} / 800`}
            subtitle={`Average: ${averageScore} pts / subject`}
          />
          <ResultCard
            variant="light"
            title="College Readiness"
            value={isCollegeReady ? "Waiver Eligible" : "Standard Diploma"}
            subtitle="165+ scores may waive placement exams"
          />
        </div>
      </div>
    </div>
  );
};
