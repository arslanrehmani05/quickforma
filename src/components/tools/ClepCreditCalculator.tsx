import React, { useState } from "react";
import { DollarSign, Award, Clock, GraduationCap } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ClepCreditCalculator: React.FC = () => {
  const [examsPassed, setExamsPassed] = useState<number>(4);
  const [creditsPerExam, setCreditsPerExam] = useState<number>(3);
  const [tuitionPerCredit, setTuitionPerCredit] = useState<number>(475);
  const [clepExamCost, setClepExamCost] = useState<number>(93); // 2026 standard fee

  const totalCreditsEarned = examsPassed * creditsPerExam;
  const grossTuitionSaved = totalCreditsEarned * tuitionPerCredit;
  const totalTestingFees = examsPassed * clepExamCost;
  const netSavings = Math.max(0, grossTuitionSaved - totalTestingFees);
  const semestersSaved = (totalCreditsEarned / 15).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={GraduationCap}
            title="CLEP Exam Credit Hour & Tuition Savings Solver"
            description="Calculate college credit hours earned and net tuition savings from College Board CLEP examination tests."
          />
          <ResetButton onReset={() => {
            setExamsPassed(4); setCreditsPerExam(3); setTuitionPerCredit(475); setClepExamCost(93);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="CLEP Exams Passed (Score 50+)"
            type="number"
            value={examsPassed}
            onChange={(e) => setExamsPassed(Number(e.target.value))}
            min={1}
            max={15}
          />
          <InputField
            label="Credits Awarded / Exam"
            type="number"
            value={creditsPerExam}
            onChange={(e) => setCreditsPerExam(Number(e.target.value))}
            min={3}
            max={12}
          />
          <InputField
            label="College Tuition / Credit ($)"
            type="number"
            value={tuitionPerCredit}
            onChange={(e) => setTuitionPerCredit(Number(e.target.value))}
            min={50}
          />
          <InputField
            label="CLEP Fee per Exam ($)"
            type="number"
            value={clepExamCost}
            onChange={(e) => setClepExamCost(Number(e.target.value))}
            min={0}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Net Tuition Saved"
            value={`$${netSavings.toLocaleString()}`}
            subtitle={`$${grossTuitionSaved.toLocaleString()} gross tuition avoided`}
          />
          <ResultCard
            variant="light"
            title="College Credits Earned"
            value={`${totalCreditsEarned} Credits`}
            subtitle={`Equal to approx. ${semestersSaved} full-time semesters`}
          />
          <ResultCard
            variant="light"
            title="Testing Out-of-Pocket"
            value={`$${totalTestingFees}`}
            subtitle={`Total CLEP test vouchers`}
          />
        </div>
      </div>
    </div>
  );
};
