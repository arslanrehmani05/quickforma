import React, { useState } from "react";
import { ShieldCheck, DollarSign, TrendingUp, Heart } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const HsaTripleTaxAdvantageCalculator: React.FC = () => {
  const [annualHsaContribution, setAnnualHsaContribution] = useState<number>(4150); // 2024 single limit
  const [marginalTaxBracketPercent, setMarginalTaxBracketPercent] = useState<number>(24); // 24% bracket
  const [investmentYears, setInvestmentYears] = useState<number>(20);
  const [annualGrowthRatePercent, setAnnualGrowthRatePercent] = useState<number>(7.5);

  const handleReset = () => {
    setAnnualHsaContribution(4150);
    setMarginalTaxBracketPercent(24);
    setInvestmentYears(20);
    setAnnualGrowthRatePercent(7.5);
  };

  // 1. Upfront tax savings: Contribution * (Marginal rate + 7.65% FICA exemption)
  const annualTaxSavings = annualHsaContribution * ((marginalTaxBracketPercent + 7.65) / 100);
  const totalTaxSavingsOverYears = annualTaxSavings * investmentYears;

  // 2. Compound growth inside HSA
  const r = annualGrowthRatePercent / 100;
  const futureHsaBalance = r > 0
    ? annualHsaContribution * ((Math.pow(1 + r, investmentYears) - 1) / r)
    : annualHsaContribution * investmentYears;
  const totalCashContributed = annualHsaContribution * investmentYears;
  const taxFreeInvestmentGains = Math.max(0, futureHsaBalance - totalCashContributed);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="HSA Triple-Tax Advantage Investment Growth Solver"
        description="Compute Health Savings Account (HSA) upfront tax deductions, FICA payroll savings, and tax-free compound medical wealth."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Annual HSA Contribution ($)"
            value={annualHsaContribution}
            onChange={(val) => setAnnualHsaContribution(Math.min(8300, Math.max(100, Number(val) || 0)))}
            type="number"
            min={100}
            max={8300}
            prefix="$"
          />
          <InputField
            label="Marginal Income Tax Bracket (%)"
            value={marginalTaxBracketPercent}
            onChange={(val) => setMarginalTaxBracketPercent(Math.min(45, Math.max(10, Number(val) || 0)))}
            type="number"
            min={10}
            suffix="%"
          />
          <InputField
            label="Investment Time Horizon (Years)"
            value={investmentYears}
            onChange={(val) => setInvestmentYears(Math.min(40, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={40}
          />
          <InputField
            label="Expected Investment Growth (%)"
            value={annualGrowthRatePercent}
            onChange={(val) => setAnnualGrowthRatePercent(Math.min(20, Math.max(0.1, Number(val) || 0)))}
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
            title="Future HSA Wealth"
            value={`$${futureHsaBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle={`In ${investmentYears} years of compound investing`}
            variant="indigo"
          />
          <ResultCard
            title="Annual Tax Saved Upfront"
            value={`$${annualTaxSavings.toFixed(0)}/yr`}
            subtitle="Income tax + 7.65% FICA savings"
            variant="indigo"
          />
          <ResultCard
            title="Tax-Free Compound Gains"
            value={`$${taxFreeInvestmentGains.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Zero tax on investment growth"
            variant="indigo"
          />
          <ResultCard
            title="Total Direct Tax Windfall"
            value={`$${totalTaxSavingsOverYears.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Cumulative upfront tax avoided"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
