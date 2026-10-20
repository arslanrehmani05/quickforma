import React, { useState } from "react";
import { Scale, Users, DollarSign, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const InternalPayEquityCalculator: React.FC = () => {
  const [employeeSalary, setEmployeeSalary] = useState<number>(88000);
  const [cohortAverageSalary, setCohortAverageSalary] = useState<number>(94000);
  const [tenureYears, setTenureYears] = useState<number>(3.5);
  const [cohortAverageTenure, setCohortAverageTenure] = useState<number>(3.2);

  const handleReset = () => {
    setEmployeeSalary(88000);
    setCohortAverageSalary(94000);
    setTenureYears(3.5);
    setCohortAverageTenure(3.2);
  };

  const wageDisparity = employeeSalary - cohortAverageSalary;
  const percentageVariance = cohortAverageSalary > 0 ? (wageDisparity / cohortAverageSalary) * 100 : 0;
  const isPayDisparitySignificant = Math.abs(percentageVariance) > 5;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Internal Job Cohort Pay Equity & Disparity Solver"
        description="Audit internal salary parity, tenure adjustments, and identify pay disparity risks across role cohorts."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Employee Current Salary ($)"
            value={employeeSalary}
            onChange={(val) => setEmployeeSalary(Math.max(1000, Number(val) || 0))}
            type="number"
            min={1000}
            prefix="$"
          />
          <InputField
            label="Cohort Peer Average Salary ($)"
            value={cohortAverageSalary}
            onChange={(val) => setCohortAverageSalary(Math.max(1000, Number(val) || 0))}
            type="number"
            min={1000}
            prefix="$"
          />
          <InputField
            label="Employee Tenure (Years)"
            value={tenureYears}
            onChange={(val) => setTenureYears(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            step={0.5}
          />
          <InputField
            label="Cohort Average Tenure (Years)"
            value={cohortAverageTenure}
            onChange={(val) => setCohortAverageTenure(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            step={0.5}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Cohort Wage Disparity"
            value={`${wageDisparity >= 0 ? "+" : ""}$${wageDisparity.toLocaleString()}`}
            subtitle={`${percentageVariance.toFixed(1)}% variance from cohort mean`}
            variant="light"
          />
          <ResultCard
            title="Equity Audit Status"
            value={isPayDisparitySignificant ? "Equity Review Recommended" : "Within Acceptable Parity Band"}
            subtitle={isPayDisparitySignificant ? "Exceeds 5% cohort variance" : "Normal compensation spread"}
            variant="light"
          />
          <ResultCard
            title="Tenure Delta"
            value={`${tenureYears - cohortAverageTenure >= 0 ? "+" : ""}${(tenureYears - cohortAverageTenure).toFixed(1)} yrs`}
            subtitle="Tenure relative to peers"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
