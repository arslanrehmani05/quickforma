import React, { useState } from "react";
import { Shield, DollarSign, Award, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const FourZeroOneKEmployerMatchCalculator: React.FC = () => {
  const [employeeAnnualSalary, setEmployeeAnnualSalary] = useState<number>(85000);
  const [employeeContributionPercent, setEmployeeContributionPercent] = useState<number>(8); // 8%
  const [employerMatchPercentage, setEmployerMatchPercentage] = useState<number>(50); // 50 cents on the dollar
  const [employerMatchCapPercent, setEmployerMatchCapPercent] = useState<number>(6); // up to 6% of salary

  const handleReset = () => {
    setEmployeeAnnualSalary(85000);
    setEmployeeContributionPercent(8);
    setEmployerMatchPercentage(50);
    setEmployerMatchCapPercent(6);
  };

  const employeeAnnualContribution = employeeAnnualSalary * (employeeContributionPercent / 100);
  const matchedEmployeeContributionBasis = Math.min(employeeAnnualSalary * (employerMatchCapPercent / 100), employeeAnnualContribution);
  const employerAnnualMatch = matchedEmployeeContributionBasis * (employerMatchPercentage / 100);
  const totalAnnualRetirementAdded = employeeAnnualContribution + employerAnnualMatch;
  const matchAsPercentageOfSalary = employeeAnnualSalary > 0 ? (employerAnnualMatch / employeeAnnualSalary) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Employer 401(k) Match Contribution & Limit Solver"
        description="Compute employer 401(k) match contributions, employee savings deductions, and maximum match optimization."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Employee Annual Salary ($)"
            value={employeeAnnualSalary}
            onChange={(val) => setEmployeeAnnualSalary(Math.max(1000, Number(val) || 0))}
            type="number"
            min={1000}
            prefix="$"
          />
          <InputField
            label="Employee Contribution Rate (%)"
            value={employeeContributionPercent}
            onChange={(val) => setEmployeeContributionPercent(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
          <InputField
            label="Company Match Rate (%)"
            value={employerMatchPercentage}
            onChange={(val) => setEmployerMatchPercentage(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            suffix="%"
          />
          <InputField
            label="Company Match Cap (% of Salary)"
            value={employerMatchCapPercent}
            onChange={(val) => setEmployerMatchCapPercent(Math.min(25, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            suffix="%"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Employee Contribution"
            value={`$${employeeAnnualContribution.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr`}
            subtitle={`$${(employeeAnnualContribution / 12).toFixed(0)}/mo deduction`}
            variant="light"
          />
          <ResultCard
            title="Employer Free Match"
            value={`$${employerAnnualMatch.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr`}
            subtitle={`${matchAsPercentageOfSalary.toFixed(1)}% effective employer boost`}
            variant="indigo"
          />
          <ResultCard
            title="Total Annual Saved"
            value={`$${totalAnnualRetirementAdded.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
            subtitle="Combined employee + employer savings"
            variant="indigo"
          />
          <ResultCard
            title="Match Capture Status"
            value={employeeContributionPercent >= employerMatchCapPercent ? "100% Match Maximized" : "Leaving Money on Table"}
            subtitle={employeeContributionPercent >= employerMatchCapPercent ? "Full company match captured" : `Increase to ${employerMatchCapPercent}% to maximize`}
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
