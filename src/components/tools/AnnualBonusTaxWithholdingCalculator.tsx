import React, { useState } from "react";
import { FileText, DollarSign, Award, Shield } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AnnualBonusTaxWithholdingCalculator: React.FC = () => {
  const [grossBonusAmount, setGrossBonusAmount] = useState<number>(15000);
  const [stateSupplementalTaxRate, setStateSupplementalTaxRate] = useState<number>(6.0); // 6% state

  const handleReset = () => {
    setGrossBonusAmount(15000);
    setStateSupplementalTaxRate(6.0);
  };

  // Statutory IRS flat supplemental wage withholding rate is 22% for bonuses under $1 million
  const federalSupplementalWithholding = grossBonusAmount * 0.22;
  const socialSecurityTax = grossBonusAmount * 0.062; // 6.2%
  const medicareTax = grossBonusAmount * 0.0145; // 1.45%
  const stateWithholding = grossBonusAmount * (stateSupplementalTaxRate / 100);
  const totalTaxWithholdings = federalSupplementalWithholding + socialSecurityTax + medicareTax + stateWithholding;
  const netTakeHomeBonus = grossBonusAmount - totalTaxWithholdings;
  const effectiveBonusTaxRate = grossBonusAmount > 0 ? (totalTaxWithholdings / grossBonusAmount) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Annual Bonus Supplemental 22% Tax Withholding Solver"
        description="Estimate net take-home pay from annual corporate performance bonuses after IRS 22% flat supplemental withholding and FICA."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Gross Bonus Award ($)"
            value={grossBonusAmount}
            onChange={(val) => setGrossBonusAmount(Math.max(100, Number(val) || 0))}
            type="number"
            min={100}
            prefix="$"
          />
          <InputField
            label="State Supplemental Tax Rate (%)"
            value={stateSupplementalTaxRate}
            onChange={(val) => setStateSupplementalTaxRate(Math.min(15, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            step={0.1}
            suffix="%"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Gross Bonus Award"
            value={`$${grossBonusAmount.toLocaleString()}`}
            subtitle="Pre-tax corporate award"
            variant="light"
          />
          <ResultCard
            title="Federal Tax (Flat 22%)"
            value={`-$${federalSupplementalWithholding.toLocaleString()}`}
            subtitle="IRS supplemental statutory deduction"
            variant="light"
          />
          <ResultCard
            title="FICA & State Taxes"
            value={`-$${(socialSecurityTax + medicareTax + stateWithholding).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="7.65% FICA + state deduction"
            variant="light"
          />
          <ResultCard
            title="Net Take-Home Bonus"
            value={`$${netTakeHomeBonus.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle={`${(100 - effectiveBonusTaxRate).toFixed(1)}% net retention`}
            variant="indigo"
          />
        </div>
      </div>
    </div>
  );
};
