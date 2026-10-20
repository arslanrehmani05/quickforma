import React, { useState } from "react";
import { Briefcase, DollarSign, FileText, ShieldAlert } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SideHustleTaxCalculator: React.FC = () => {
  const [gross1099Income, setGross1099Income] = useState<number>(36000);
  const [deductibleBusinessExpenses, setDeductibleBusinessExpenses] = useState<number>(6500);
  const [regularW2MarginalTaxRate, setRegularW2MarginalTaxRate] = useState<number>(22); // 22% bracket
  const [stateIncomeTaxRate, setStateIncomeTaxRate] = useState<number>(5.0);

  const handleReset = () => {
    setGross1099Income(36000);
    setDeductibleBusinessExpenses(6500);
    setRegularW2MarginalTaxRate(22);
    setStateIncomeTaxRate(5.0);
  };

  const netScheduleCProfit = Math.max(0, gross1099Income - deductibleBusinessExpenses);
  // Self-Employment (SE) tax is 15.3% on 92.35% of net profit
  const taxableSeEarnings = netScheduleCProfit * 0.9235;
  const selfEmploymentTax = taxableSeEarnings * 0.153;
  // Deduct half of SE tax from income tax
  const adjustedNetForIncomeTax = Math.max(0, netScheduleCProfit - (selfEmploymentTax / 2));
  const federalIncomeTax = adjustedNetForIncomeTax * (regularW2MarginalTaxRate / 100);
  const stateIncomeTax = adjustedNetForIncomeTax * (stateIncomeTaxRate / 100);
  const totalTaxLiability = selfEmploymentTax + federalIncomeTax + stateIncomeTax;
  const netTakeHomeAfterTaxes = netScheduleCProfit - totalTaxLiability;
  const effectiveTaxRate = netScheduleCProfit > 0 ? (totalTaxLiability / netScheduleCProfit) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Self-Employment Schedule C Side Hustle Tax Estimator"
        description="Estimate 1099 freelance taxes, 15.3% Self-Employment (SE) FICA taxes, business expense write-offs, and net earnings."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Gross 1099 Revenue ($)"
            value={gross1099Income}
            onChange={(val) => setGross1099Income(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Deductible Business Expenses ($)"
            value={deductibleBusinessExpenses}
            onChange={(val) => setDeductibleBusinessExpenses(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Regular Federal Tax Bracket (%)"
            value={regularW2MarginalTaxRate}
            onChange={(val) => setRegularW2MarginalTaxRate(Math.min(45, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            suffix="%"
          />
          <InputField
            label="State Income Tax Rate (%)"
            value={stateIncomeTaxRate}
            onChange={(val) => setStateIncomeTaxRate(Math.min(15, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            step={0.5}
            suffix="%"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Total Tax Reserve Required"
            value={`$${totalTaxLiability.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle={`${effectiveTaxRate.toFixed(1)}% total effective tax rate`}
            variant="light"
          />
          <ResultCard
            title="Self-Employment Tax (15.3%)"
            value={`$${selfEmploymentTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Social Security & Medicare FICA"
            variant="light"
          />
          <ResultCard
            title="Net Take-Home Profit"
            value={`$${netTakeHomeAfterTaxes.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle={`$${(netTakeHomeAfterTaxes / 12).toFixed(0)}/month in your pocket`}
            variant="indigo"
          />
          <ResultCard
            title="Quarterly Estimated Tax"
            value={`$${(totalTaxLiability / 4).toLocaleString(undefined, { maximumFractionDigits: 0 })}/qtr`}
            subtitle="Recommended IRS 1040-ES payment"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
