import React, { useState } from "react";
import { Target, Award, CheckCircle, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ExamPrepScorePredictor: React.FC = () => {
  const [currentWeightedGrade, setCurrentWeightedGrade] = useState<number>(86.5); // 86.5% B
  const [currentCompletedWeight, setCurrentCompletedWeight] = useState<number>(75); // 75% completed
  const [finalExamWeight, setFinalExamWeight] = useState<number>(25); // 25% final exam
  const [targetGoalGrade, setTargetGoalGrade] = useState<number>(90.0); // Target 90% (A-)

  // CurrentPoints = CurrentWeightedGrade * (CurrentCompletedWeight / 100)
  // TargetGrade = CurrentPoints + RequiredFinal * (FinalExamWeight / 100)
  // RequiredFinal = (TargetGrade - CurrentPoints) / (FinalExamWeight / 100)
  const currentPoints = currentWeightedGrade * (currentCompletedWeight / 100);
  const neededFromFinal = targetGoalGrade - currentPoints;
  const safeWeight = Math.max(1, finalExamWeight) / 100;
  const requiredFinalScore = (neededFromFinal / safeWeight).toFixed(1);

  const isAchievable = parseFloat(requiredFinalScore) <= 100.0;
  const isAlreadyLocked = parseFloat(requiredFinalScore) <= 0.0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Target}
            title="Final Exam Target Score & Grade Predictor"
            description="Determine the exact score required on your final exam to secure your target semester letter grade (A, B, C)."
          />
          <ResetButton onReset={() => {
            setCurrentWeightedGrade(86.5); setCurrentCompletedWeight(75);
            setFinalExamWeight(25); setTargetGoalGrade(90.0);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Current Standing Grade %"
            type="number"
            step={0.1}
            value={currentWeightedGrade}
            onChange={(e) => setCurrentWeightedGrade(Number(e.target.value))}
            min={0}
            max={100}
          />
          <InputField
            label="Completed Course Weight %"
            type="number"
            value={currentCompletedWeight}
            onChange={(e) => setCurrentCompletedWeight(Number(e.target.value))}
            min={1}
            max={99}
          />
          <InputField
            label="Final Exam Weight %"
            type="number"
            value={finalExamWeight}
            onChange={(e) => setFinalExamWeight(Number(e.target.value))}
            min={1}
            max={50}
          />
          <InputField
            label="Target Final Course Grade %"
            type="number"
            step={0.1}
            value={targetGoalGrade}
            onChange={(e) => setTargetGoalGrade(Number(e.target.value))}
            min={50}
            max={100}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Required Final Exam Score"
            value={isAlreadyLocked ? "0.0% (Secured)" : `${requiredFinalScore}%`}
            subtitle={isAlreadyLocked ? "Grade mathematically secured" : `Needed on the final exam to reach ${targetGoalGrade}%`}
          />
          <ResultCard
            variant="light"
            title="Feasibility Assessment"
            value={isAlreadyLocked ? "Grade Locked" : isAchievable ? "Achievable Target" : "Mathematically Out of Reach"}
            subtitle={isAchievable ? "Score is under 100%" : "Requires extra credit"}
          />
          <ResultCard
            variant="light"
            title="Accumulated Points"
            value={`${currentPoints.toFixed(1)} pts`}
            subtitle={`Earned out of ${currentCompletedWeight} available`}
          />
        </div>
      </div>
    </div>
  );
};
