import React, { useState } from "react";
import { Building, TrendingDown, DollarSign, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const VacancyRateLossCalculator: React.FC = () => {
  const [totalUnits, setTotalUnits] = useState<number>(16);
  const [monthlyRentPerUnit, setMonthlyRentPerUnit] = useState<number>(1850);
  const [unoccupiedDaysPerYear, setUnoccupiedDaysPerYear] = useState<number>(24); // Days empty per unit/yr
  const [uncollectedBadDebt, setUncollectedBadDebt] = useState<number>(2400); // Eviction or skipped rent

  const handleReset = () => {
    setTotalUnits(16);
    setMonthlyRentPerUnit(1850);
    setUnoccupiedDaysPerYear(24);
    setUncollectedBadDebt(2400);
  };

  const grossPotentialAnnualRent = totalUnits * monthlyRentPerUnit * 12;
  const vacancyLossRent = (grossPotentialAnnualRent / 365) * unoccupiedDaysPerYear;
  const totalEconomicLoss = vacancyLossRent + uncollectedBadDebt;
  const effectiveGrossIncome = grossPotentialAnnualRent - totalEconomicLoss;
  const economicVacancyRatePercent = grossPotentialAnnualRent > 0 ? (totalEconomicLoss / grossPotentialAnnualRent) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Annual Vacancy Allowance & Income Loss Solver"
        description="Compute multifamily rental property vacancy rates, uncollected bad debt allowances, and Effective Gross Income (EGI)."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Total Rental Units in Property"
            value={totalUnits}
            onChange={(val) => setTotalUnits(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Average Market Rent per Unit ($/mo)"
            value={monthlyRentPerUnit}
            onChange={(val) => setMonthlyRentPerUnit(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Average Unoccupied Days per Unit / Year"
            value={unoccupiedDaysPerYear}
            onChange={(val) => setUnoccupiedDaysPerYear(Math.min(365, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={365}
            suffix="days"
          />
          <InputField
            label="Annual Uncollected Bad Debt & Defaults ($)"
            value={uncollectedBadDebt}
            onChange={(val) => setUncollectedBadDebt(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Economic Vacancy Rate"
          value={`${economicVacancyRatePercent.toFixed(1)}%`}
          subtitle="Benchmark allowance: 5% - 8%"
          variant="indigo"
        />
        <ResultCard
          title="Effective Gross Income (EGI)"
          value={`$${effectiveGrossIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Actual realized cash"
          variant="light"
        />
        <ResultCard
          title="Total Vacancy & Credit Loss"
          value={`-$${totalEconomicLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Downtime + skipped rent"
          variant="light"
        />
        <ResultCard
          title="Gross Potential Rent (100%)"
          value={`$${grossPotentialAnnualRent.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Theoretical max rent"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Underwriting Assessment</h4>
        <p className="text-slate-600">
          At an economic vacancy of <strong className="text-slate-800">{economicVacancyRatePercent.toFixed(1)}%</strong>, the building loses <strong className="text-slate-800">${totalEconomicLoss.toLocaleString()} annually</strong> from physical empty days and uncollected bad debt, delivering <strong className="text-slate-800">${effectiveGrossIncome.toLocaleString()} in Effective Gross Income</strong> into operations.
        </p>
      </div>
    </div>
  );
};
