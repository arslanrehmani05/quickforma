import React, { useState } from "react";
import { Target, TrendingUp, AlertTriangle, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const GpaBoostCalculator: React.FC = () => {
  const [currentGpa, setCurrentGpa] = useState<number>(3.20);
  const [completedCredits, setCompletedCredits] = useState<number>(60);
  const [targetGpa, setTargetGpa] = useState<number>(3.50);
  const [futureCredits, setFutureCredits] = useState<number>(30);

  const cCredits = Math.max(0, completedCredits || 0);
  const fCredits = Math.max(0, futureCredits || 0);
  const cGpa = Math.max(0, Math.min(4.0, currentGpa || 0));
  const tGpa = Math.max(0, Math.min(4.0, targetGpa || 0));

  const totalCredits = cCredits + fCredits;

  // Formula: Required Future GPA = [Target * (Completed + Future) - (Current * Completed)] / Future
  let requiredGpa = 0;
  let calculationValid = fCredits > 0;

  if (calculationValid) {
    requiredGpa = (tGpa * totalCredits - cGpa * cCredits) / fCredits;
  }

  const isAchievable = calculationValid && requiredGpa <= 4.0 && requiredGpa >= 0;
  const isAlreadyMet = calculationValid && requiredGpa < 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Target}
            title="Target GPA Boost & Required Grade Simulator"
            description="Calculate the exact minimum term GPA required across planned future credit hours to achieve your cumulative GPA goal."
          />
          <ResetButton onReset={() => {
            setCurrentGpa(3.20);
            setCompletedCredits(60);
            setTargetGpa(3.50);
            setFutureCredits(30);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="Current Cumulative GPA"
              type="number"
              step="0.01"
              min={0}
              max={4.0}
              value={currentGpa}
              onChange={(e) => setCurrentGpa(Number(e.target.value))}
            />
            <InputField
              label="Completed Credit Hours"
              type="number"
              min={0}
              value={completedCredits}
              onChange={(e) => setCompletedCredits(Math.max(0, Number(e.target.value)))}
            />
            <InputField
              label="Target Cumulative GPA"
              type="number"
              step="0.01"
              min={0}
              max={4.0}
              value={targetGpa}
              onChange={(e) => setTargetGpa(Number(e.target.value))}
            />
            <InputField
              label="Planned Future Credit Hours"
              type="number"
              min={1}
              value={futureCredits}
              onChange={(e) => setFutureCredits(Math.max(0, Number(e.target.value)))}
              helpText="Must be greater than 0 credit hours."
            />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Required Academic Performance">
              <div className="space-y-4 text-center">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Required Future Term GPA</div>
                  <div className={`text-5xl font-extrabold ${!calculationValid ? "text-slate-400" : isAchievable ? "text-emerald-400" : "text-amber-400"}`}>
                    {!calculationValid ? "—" : requiredGpa <= 0 ? "0.00" : requiredGpa.toFixed(2)}
                  </div>
                  <div className={`text-xs font-semibold mt-2 ${!calculationValid ? "text-slate-400" : isAchievable ? "text-indigo-200" : "text-rose-300"}`}>
                    {!calculationValid
                      ? "Enter planned future credits (> 0) to compute requirement"
                      : isAlreadyMet
                      ? "Target already achieved! Maintaining a 0.00+ GPA keeps you above target."
                      : isAchievable
                      ? `Achievable: Earn a ${requiredGpa.toFixed(2)} average across next ${fCredits} credits`
                      : `Mathematically Impossible on 4.0 Scale: Requires ${requiredGpa.toFixed(2)} (Earn more credits or adjust target)`}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Credits at Graduation:</span>
                    <p className="text-white font-bold text-base mt-0.5">{totalCredits} hrs</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Required Letter Benchmark:</span>
                    <p className="text-emerald-300 font-bold text-base mt-0.5">
                      {!calculationValid ? "—" : requiredGpa > 4.0 ? "Exceeds 4.0" : requiredGpa >= 3.7 ? "Straight A / A-" : requiredGpa >= 3.0 ? "B+ / B Average" : "C or Pass"}
                    </p>
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
