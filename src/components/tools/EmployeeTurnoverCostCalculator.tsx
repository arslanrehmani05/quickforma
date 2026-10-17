import React, { useState } from "react";
import { UserMinus, DollarSign, AlertTriangle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EmployeeTurnoverCostCalculator: React.FC = () => {
  const [baseSalary, setBaseSalary] = useState<number>(85000);
  const [recruitingFees, setRecruitingFees] = useState<number>(12000); // Agency / job board
  const [interviewingHours, setInterviewingHours] = useState<number>(40); // Internal team hours
  const [trainingCost, setTrainingCost] = useState<number>(6500); // Software & onboarding
  const [lostProductivityWeeks, setLostProductivityWeeks] = useState<number>(8); // Ramp time

  const weeklySalary = (baseSalary || 0) / 52;
  const interviewingTeamCost = (interviewingHours || 0) * 75; // $75/hr avg internal cost
  const rampProductivityLoss = (lostProductivityWeeks || 0) * weeklySalary * 0.50; // 50% productivity during ramp

  const totalTurnoverCost = (recruitingFees || 0) + interviewingTeamCost + (trainingCost || 0) + rampProductivityLoss;
  const turnoverPercentOfSalary = (baseSalary || 0) > 0 ? (totalTurnoverCost / baseSalary) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={UserMinus}
            title="Cost of Replacing an Employee & Departure Loss"
            description="Calculate the true hidden cost of employee turnover including recruitment, interview time, and ramp-up productivity loss."
          />
          <ResetButton onReset={() => {
            setBaseSalary(85000);
            setRecruitingFees(12000);
            setInterviewingHours(40);
            setTrainingCost(6500);
            setLostProductivityWeeks(8);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Departing Employee Annual Salary ($)" type="number" prefix="$" value={baseSalary} onChange={(e) => setBaseSalary(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Recruiting & Ad Fees ($)" type="number" prefix="$" value={recruitingFees} onChange={(e) => setRecruitingFees(Number(e.target.value))} />
              <InputField label="Staff Interview Hours" type="number" suffix="hrs" value={interviewingHours} onChange={(e) => setInterviewingHours(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Training & Onboarding ($)" type="number" prefix="$" value={trainingCost} onChange={(e) => setTrainingCost(Number(e.target.value))} />
              <InputField label="Ramp-Up Duration (Weeks)" type="number" suffix="wks" value={lostProductivityWeeks} onChange={(e) => setLostProductivityWeeks(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Total Replacement Cost">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Total Replacement Burden</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono">
                    ${Math.round(totalTurnoverCost).toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400">
                    Represents <strong className="text-white">{turnoverPercentOfSalary.toFixed(1)}%</strong> of employee annual base pay.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Ramp-Up Output Loss</span>
                    <span className="text-base font-bold text-white">${Math.round(rampProductivityLoss).toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Internal Interview Cost</span>
                    <span className="text-base font-bold text-white">${Math.round(interviewingTeamCost).toLocaleString()}</span>
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
