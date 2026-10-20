import React, { useState } from "react";
import { BookOpen, DollarSign, TrendingUp, Award } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CollegeSavingsFiveTwoNineCalculator: React.FC = () => {
  const [currentAccountBalance, setCurrentAccountBalance] = useState<number>(12000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(450);
  const [yearsUntilCollege, setYearsUntilCollege] = useState<number>(12);
  const [annualInvestmentReturnPercent, setAnnualInvestmentReturnPercent] = useState<number>(7.0);

  const handleReset = () => {
    setCurrentAccountBalance(12000);
    setMonthlyContribution(450);
    setYearsUntilCollege(12);
    setAnnualInvestmentReturnPercent(7.0);
  };

  const monthlyRate = (annualInvestmentReturnPercent / 100) / 12;
  const totalMonths = yearsUntilCollege * 12;
  const futureBalanceInitial = currentAccountBalance * Math.pow(1 + monthlyRate, totalMonths);
  const futureBalanceContributions = monthlyRate > 0
    ? monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
    : monthlyContribution * totalMonths;
  const totalProjectedCollegeFund = futureBalanceInitial + futureBalanceContributions;
  const totalOutOfPocketSaved = currentAccountBalance + (monthlyContribution * totalMonths);
  const taxFreeGrowthEarnings = Math.max(0, totalProjectedCollegeFund - totalOutOfPocketSaved);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="529 College Savings Plan Future Growth Solver"
        description="Forecast tax-free 529 education fund growth, monthly contributions, and estimated college tuition coverage."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Current 529 Account Balance ($)"
            value={currentAccountBalance}
            onChange={(val) => setCurrentAccountBalance(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Monthly Deposit ($/mo)"
            value={monthlyContribution}
            onChange={(val) => setMonthlyContribution(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Years Until College Enrollment"
            value={yearsUntilCollege}
            onChange={(val) => setYearsUntilCollege(Math.min(25, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={25}
          />
          <InputField
            label="Expected Annual Return (%)"
            value={annualInvestmentReturnPercent}
            onChange={(val) => setAnnualInvestmentReturnPercent(Math.min(20, Math.max(0.1, Number(val) || 0)))}
            type="number"
            min={0.1}
            step={0.5}
            suffix="%"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Total College Fund at Age 18"
            value={`$${totalProjectedCollegeFund.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle={`In ${yearsUntilCollege} years`}
            variant="indigo"
          />
          <ResultCard
            title="Tax-Free Compound Growth"
            value={`+$${taxFreeGrowthEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="100% tax-exempt for qualified tuition"
            variant="indigo"
          />
          <ResultCard
            title="Your Cash Contributions"
            value={`$${totalOutOfPocketSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Total principal invested"
            variant="light"
          />
          <ResultCard
            title="Annual Tuition Power (4 Yrs)"
            value={`$${(totalProjectedCollegeFund / 4).toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
            subtitle="Available budget per academic year"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
