import React, { useState } from "react";
import { GraduationCap, DollarSign, TrendingUp, Users } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TrainingRoiCalculator: React.FC = () => {
  const [trainingCourseCost, setTrainingCourseCost] = useState<number>(4500);
  const [employeeHoursSpentInTraining, setEmployeeHoursSpentInTraining] = useState<number>(24);
  const [employeeHourlyCost, setEmployeeHourlyCost] = useState<number>(55);
  const [annualProductivityBenefit, setAnnualProductivityBenefit] = useState<number>(14000);

  const handleReset = () => {
    setTrainingCourseCost(4500);
    setEmployeeHoursSpentInTraining(24);
    setEmployeeHourlyCost(55);
    setAnnualProductivityBenefit(14000);
  };

  const employeeTimeCost = employeeHoursSpentInTraining * employeeHourlyCost;
  const totalTrainingInvestment = trainingCourseCost + employeeTimeCost;
  const netBenefit = annualProductivityBenefit - totalTrainingInvestment;
  const trainingRoiPercent = totalTrainingInvestment > 0 ? (netBenefit / totalTrainingInvestment) * 100 : 0;
  const paybackMonths = annualProductivityBenefit > 0 ? (totalTrainingInvestment / (annualProductivityBenefit / 12)) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Employee Upskilling & Training Return on Investment Solver"
        description="Compute employee training ROI, direct and wage opportunity costs, and payback periods on corporate education."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Tuition / Course Fee ($)"
            value={trainingCourseCost}
            onChange={(val) => setTrainingCourseCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Training Duration (Hours)"
            value={employeeHoursSpentInTraining}
            onChange={(val) => setEmployeeHoursSpentInTraining(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Employee Hourly Wage Burden ($)"
            value={employeeHourlyCost}
            onChange={(val) => setEmployeeHourlyCost(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Annual Value / Output Lift ($)"
            value={annualProductivityBenefit}
            onChange={(val) => setAnnualProductivityBenefit(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Total Training Outlay"
            value={`$${totalTrainingInvestment.toLocaleString()}`}
            subtitle="Tuition + employee wage time"
            variant="light"
          />
          <ResultCard
            title="First-Year Net Return"
            value={`$${netBenefit.toLocaleString()}`}
            subtitle="Annual benefit minus total cost"
            variant="indigo"
          />
          <ResultCard
            title="Training ROI"
            value={`${trainingRoiPercent.toFixed(1)}%`}
            subtitle="Net percentage return"
            variant="light"
          />
          <ResultCard
            title="Payback Timeline"
            value={`${paybackMonths.toFixed(1)} months`}
            subtitle="Time to recover full program costs"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
