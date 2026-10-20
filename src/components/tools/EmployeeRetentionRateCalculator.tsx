import React, { useState } from "react";
import { Heart, Users, TrendingUp, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EmployeeRetentionRateCalculator: React.FC = () => {
  const [headcountAtStart, setHeadcountAtStart] = useState<number>(150);
  const [employeesRemainingFromStart, setEmployeesRemainingFromStart] = useState<number>(138);
  const [averageReplacementCostPerEmployee, setAverageReplacementCostPerEmployee] = useState<number>(18500);

  const handleReset = () => {
    setHeadcountAtStart(150);
    setEmployeesRemainingFromStart(138);
    setAverageReplacementCostPerEmployee(18500);
  };

  // Retention Rate = (Remaining Employees / Starting Employees) * 100
  const retentionRatePercent = headcountAtStart > 0 ? (employeesRemainingFromStart / headcountAtStart) * 100 : 0;
  const departures = Math.max(0, headcountAtStart - employeesRemainingFromStart);
  const totalTurnoverFinancialLoss = departures * averageReplacementCostPerEmployee;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Annual Employee Retention Rate & Turnover Cost Solver"
        description="Compute employee retention percentages, annual departure counts, and bottom-line turnover replacement expenses."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Headcount at Start of Year"
            value={headcountAtStart}
            onChange={(val) => setHeadcountAtStart(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Original Employees Retained at End"
            value={employeesRemainingFromStart}
            onChange={(val) => setEmployeesRemainingFromStart(Math.min(headcountAtStart, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={headcountAtStart}
          />
          <InputField
            label="Average Turnover Replacement Cost ($)"
            value={averageReplacementCostPerEmployee}
            onChange={(val) => setAverageReplacementCostPerEmployee(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Employee Retention Rate"
            value={`${retentionRatePercent.toFixed(1)}%`}
            subtitle={`${employeesRemainingFromStart} of ${headcountAtStart} employees retained`}
            variant="light"
          />
          <ResultCard
            title="Turnover Departures"
            value={`${departures} employees`}
            subtitle={`${(100 - retentionRatePercent).toFixed(1)}% attrition rate`}
            variant="light"
          />
          <ResultCard
            title="Turnover Replacement Cost"
            value={`$${totalTurnoverFinancialLoss.toLocaleString()}`}
            subtitle="Recruiting, onboarding & lost productivity"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
