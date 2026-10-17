import React, { useState } from "react";
import { BookOpen, Target, CheckCircle2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SemesterGradeCalculator: React.FC = () => {
  const [midtermScore, setMidtermScore] = useState<number>(88);
  const [midtermWeight, setMidtermWeight] = useState<number>(25);
  const [homeworkScore, setHomeworkScore] = useState<number>(95);
  const [homeworkWeight, setHomeworkWeight] = useState<number>(20);
  const [quizzesScore, setQuizzesScore] = useState<number>(84);
  const [quizzesWeight, setQuizzesWeight] = useState<number>(15);
  const [finalExamWeight, setFinalExamWeight] = useState<number>(40);
  const [targetSemesterGrade, setTargetSemesterGrade] = useState<number>(90); // Want an A (90%)

  // Current completed weight
  const completedWeight = (midtermWeight || 0) + (homeworkWeight || 0) + (quizzesWeight || 0);
  const completedScore = (
    (midtermScore || 0) * (midtermWeight || 0) +
    (homeworkScore || 0) * (homeworkWeight || 0) +
    (quizzesScore || 0) * (quizzesWeight || 0)
  ) / (completedWeight > 0 ? completedWeight : 1);

  // Score needed on final: (Target - CurrentWeightedContribution) / FinalWeight
  const currentContribution = (
    (midtermScore || 0) * (midtermWeight || 0) +
    (homeworkScore || 0) * (homeworkWeight || 0) +
    (quizzesScore || 0) * (quizzesWeight || 0)
  ) / 100;

  const scoreNeededOnFinal = (finalExamWeight || 0) > 0
    ? ((targetSemesterGrade - currentContribution) / (finalExamWeight / 100))
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BookOpen}
            title="Midterm, Final Exam & Assignment Weight Solver"
            description="Calculate current semester standing and solve the exact final exam score needed to achieve your target course grade."
          />
          <ResetButton onReset={() => {
            setMidtermScore(88);
            setMidtermWeight(25);
            setHomeworkScore(95);
            setHomeworkWeight(20);
            setQuizzesScore(84);
            setQuizzesWeight(15);
            setFinalExamWeight(40);
            setTargetSemesterGrade(90);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Current Semester Assessments</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Midterm Exam (%)" type="number" suffix="%" value={midtermScore} onChange={(e) => setMidtermScore(Number(e.target.value))} />
              <InputField label="Midterm Weight (%)" type="number" suffix="%" value={midtermWeight} onChange={(e) => setMidtermWeight(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Homework Grade (%)" type="number" suffix="%" value={homeworkScore} onChange={(e) => setHomeworkScore(Number(e.target.value))} />
              <InputField label="Homework Weight (%)" type="number" suffix="%" value={homeworkWeight} onChange={(e) => setHomeworkWeight(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Quizzes Grade (%)" type="number" suffix="%" value={quizzesScore} onChange={(e) => setQuizzesScore(Number(e.target.value))} />
              <InputField label="Quizzes Weight (%)" type="number" suffix="%" value={quizzesWeight} onChange={(e) => setQuizzesWeight(Number(e.target.value))} />
            </div>

            <h3 className="text-sm font-bold text-slate-800 pt-2 border-t border-slate-100">Final Target Goal</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Final Exam Weight (%)" type="number" suffix="%" value={finalExamWeight} onChange={(e) => setFinalExamWeight(Number(e.target.value))} />
              <InputField label="Desired Class Grade (%)" type="number" suffix="%" value={targetSemesterGrade} onChange={(e) => setTargetSemesterGrade(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Target Final Score Required">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Required Final Exam Score</span>
                  <div className={`text-4xl sm:text-5xl font-extrabold ${scoreNeededOnFinal <= 100 ? "text-emerald-400" : "text-amber-400"}`}>
                    {scoreNeededOnFinal.toFixed(1)}%
                  </div>
                  <p className="text-xs text-slate-400">
                    {scoreNeededOnFinal <= 100
                      ? `Achieving ${scoreNeededOnFinal.toFixed(1)}% on the final secures your ${targetSemesterGrade}% course goal.`
                      : `Target requires over 100% on the final exam (${scoreNeededOnFinal.toFixed(1)}%). Consider extra credit options.`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Current Weighted Standing</span>
                    <span className="text-lg font-bold text-white">{completedScore.toFixed(1)}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Completed Course Weight</span>
                    <span className="text-lg font-bold text-white">{completedWeight}%</span>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
