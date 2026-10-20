import React, { useState } from "react";
import { DollarSign, TrendingUp, PiggyBank, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RothIraGrowthCalculator: React.FC = () => {
  const [currentBalance, setCurrentBalance] = useState<number>(25000);
  const [annualContribution, setAnnualContribution] = useState<number>(7000); // 2024 IRS limit
  const [expectedAnnualReturnPercent, setExpectedAnnualReturnPercent] = useState<number>(8.0); // 8% S&P500
  const [investmentHorizonYears, setInvestmentHorizonYears] = useState<number>(25);

  const handleReset = () => {
    setCurrentBalance(25000);
    setAnnualContribution(7000);
    setExpectedAnnualReturnPercent(8.0);
    setInvestmentHorizonYears(25);
  };

  const r = expectedAnnualReturnPercent / 100;
  // Compound future value = PV * (1+r)^t + PMT * [((1+r)^t - 1) / r]
  const futureBalanceFromCurrent = currentBalance * Math.pow(1 + r, investmentHorizonYears);
  const futureBalanceFromContributions = r > 0 ? annualContribution * ((Math.pow(1 + r, investmentHorizonYears) - 1) / r) : annualContribution * investmentHorizonYears;
  const totalFutureBalance = futureBalanceFromCurrent + futureBalanceFromContributions;
  const totalPrincipalContributed = currentBalance + (annualContribution * investmentHorizonYears);
  const totalTaxFreeEarnings = Math.max(0, totalFutureBalance - totalPrincipalContributed);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Tax-Free Roth IRA Compound Interest Growth Solver"
        description="Forecast tax-free Roth IRA growth, compound interest accumulation, and lifetime tax-free retirement wealth."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Current Roth IRA Balance ($)"
            value={currentBalance}
            onChange={(val) => setCurrentBalance(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Annual Contribution ($/yr)"
            value={annualContribution}
            onChange={(val) => setAnnualContribution(Math.min(8000, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={8000}
            prefix="$"
          />
          <InputField
            label="Expected Annual Return (%)"
            value={expectedAnnualReturnPercent}
            onChange={(val) => setExpectedAnnualReturnPercent(Math.min(25, Math.max(0.1, Number(val) || 0)))}
            type="number"
            min={0.1}
            step={0.5}
            suffix="%"
          />
          <InputField
            label="Investment Horizon (Years)"
            value={investmentHorizonYears}
            onChange={(val) => setInvestmentHorizonYears(Math.min(50, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={50}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Total Roth IRA Wealth"
            value={`$${totalFutureBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle={`At age in ${investmentHorizonYears} years`}
            variant="indigo"
          />
          <ResultCard
            title="Tax-Free Growth Gain"
            value={`$${totalTaxFreeEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="100% tax-free compound interest"
            variant="indigo"
          />
          <ResultCard
            title="Total Cash Contributed"
            value={`$${totalPrincipalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Your out-of-pocket contributions"
            variant="light"
          />
          <ResultCard
            title="Growth Multiple"
            value={`${(totalPrincipalContributed > 0 ? totalFutureBalance / totalPrincipalContributed : 0).toFixed(1)}x`}
            subtitle="Wealth created per dollar saved"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
