import React, { useState } from "react";
import { DollarSign, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const BreakEvenRevenueCalculator: React.FC = () => {
  const [fixedCosts, setFixedCosts] = useState<number>(45000);
  const [expectedRevenue, setExpectedRevenue] = useState<number>(120000);
  const [contributionMarginRatio, setContributionMarginRatio] = useState<number>(40);

  const handleReset = () => {
    setFixedCosts(45000);
    setExpectedRevenue(120000);
    setContributionMarginRatio(40);
  };

  const cmrDecimal = Math.max(0.001, contributionMarginRatio / 100);
  const breakEvenRevenue = fixedCosts / cmrDecimal;
  const marginOfSafetyDollars = Math.max(0, expectedRevenue - breakEvenRevenue);
  const marginOfSafetyPct = expectedRevenue > 0 ? (marginOfSafetyDollars / expectedRevenue) * 100 : 0;
  const variableCostsAtBreakeven = breakEvenRevenue * (1 - cmrDecimal);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Break-Even Sales Volume Revenue Dollar Solver"
        description="Compute the exact dollar sales volume required to completely cover all fixed operating overhead."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Total Fixed Costs ($)"
            value={fixedCosts}
            onChange={(val) => setFixedCosts(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Contribution Margin Ratio (%)"
            value={contributionMarginRatio}
            onChange={(val) => setContributionMarginRatio(Math.min(99.9, Math.max(0.1, Number(val) || 0)))}
            type="number"
            min={0.1}
            max={100}
            suffix="%"
          />
          <InputField
            label="Projected Revenue ($)"
            value={expectedRevenue}
            onChange={(val) => setExpectedRevenue(Math.max(0, Number(val) || 0))}
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
          title="Break-Even Revenue"
          value={`$${breakEvenRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
          subtitle="Zero profit threshold"
          variant="indigo"
        />
        <ResultCard
          title="Margin of Safety ($)"
          value={`$${marginOfSafetyDollars.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
          subtitle="Revenue buffer"
          variant="light"
        />
        <ResultCard
          title="Margin of Safety (%)"
          value={`${marginOfSafetyPct.toFixed(1)}%`}
          subtitle="Buffer percentage"
          variant="light"
        />
        <ResultCard
          title="Monthly Run Rate Needed"
          value={`$${(breakEvenRevenue / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Per month to breakeven"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Financial Breakdown</h4>
        <p className="text-slate-600">
          At break-even revenue of <strong className="text-slate-800">${breakEvenRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>, your variable costs will absorb <strong className="text-slate-800">${variableCostsAtBreakeven.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> and your fixed costs of <strong className="text-slate-800">${fixedCosts.toLocaleString()}</strong> are 100% covered.
        </p>
      </div>
    </div>
  );
};
