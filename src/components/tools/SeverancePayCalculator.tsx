import React, { useState } from "react";
import { Briefcase, DollarSign, Calendar, FileText } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SeverancePayCalculator: React.FC = () => {
  const [weeklyBaseSalary, setWeeklyBaseSalary] = useState<number>(1850);
  const [yearsOfService, setYearsOfService] = useState<number>(6.5);
  const [weeksPerYearOfService, setWeeksPerYearOfService] = useState<number>(2.0); // 2 weeks per year
  const [healthcareContinuationMonths, setHealthcareContinuationMonths] = useState<number>(3);
  const [monthlyHealthcareCost, setMonthlyHealthcareCost] = useState<number>(650);

  const handleReset = () => {
    setWeeklyBaseSalary(1850);
    setYearsOfService(6.5);
    setWeeksPerYearOfService(2.0);
    setHealthcareContinuationMonths(3);
    setMonthlyHealthcareCost(650);
  };

  const severanceWeeks = Math.max(1, yearsOfService * weeksPerYearOfService);
  const cashSeverancePay = severanceWeeks * weeklyBaseSalary;
  const healthcareSubsidy = healthcareContinuationMonths * monthlyHealthcareCost;
  const totalSeverancePackage = cashSeverancePay + healthcareSubsidy;
  const estimatedTaxWithholding = cashSeverancePay * 0.22; // IRS supplemental 22% rate

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Years of Service Severance Pay & Tax Solver"
        description="Estimate employee severance package totals, severance weeks per service year, COBRA healthcare subsidies, and tax withholding."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Weekly Base Pay ($)"
            value={weeklyBaseSalary}
            onChange={(val) => setWeeklyBaseSalary(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Completed Years of Service"
            value={yearsOfService}
            onChange={(val) => setYearsOfService(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            step={0.5}
          />
          <InputField
            label="Severance Policy (Weeks / Year)"
            value={weeksPerYearOfService}
            onChange={(val) => setWeeksPerYearOfService(Math.max(0.5, Number(val) || 0))}
            type="number"
            min={0.5}
            step={0.5}
          />
          <InputField
            label="COBRA Health Subsidy (Months)"
            value={healthcareContinuationMonths}
            onChange={(val) => setHealthcareContinuationMonths(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Monthly Employer Health Premium ($)"
            value={monthlyHealthcareCost}
            onChange={(val) => setMonthlyHealthcareCost(Math.max(0, Number(val) || 0))}
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
            title="Severance Duration"
            value={`${severanceWeeks.toFixed(1)} weeks`}
            subtitle="Equivalent salary continuation"
            variant="light"
          />
          <ResultCard
            title="Gross Cash Severance"
            value={`$${cashSeverancePay.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
            subtitle="Lump-sum cash component"
            variant="indigo"
          />
          <ResultCard
            title="Estimated 22% Federal Tax"
            value={`-$${estimatedTaxWithholding.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
            subtitle="Supplemental wage withholding"
            variant="light"
          />
          <ResultCard
            title="Total Package Value"
            value={`$${totalSeverancePackage.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
            subtitle="Includes COBRA benefits subsidy"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
