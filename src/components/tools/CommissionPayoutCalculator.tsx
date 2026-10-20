import React, { useState } from "react";
import { Award, DollarSign, Target, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CommissionPayoutCalculator: React.FC = () => {
  const [quotaAttainmentPercent, setQuotaAttainmentPercent] = useState<number>(115); // 115%
  const [onTargetEarningsOteCommission, setOnTargetEarningsOteCommission] = useState<number>(10000); // $10k base commission
  const [acceleratorMultiplier, setAcceleratorMultiplier] = useState<number>(1.5); // 1.5x above 100%

  const handleReset = () => {
    setQuotaAttainmentPercent(115);
    setOnTargetEarningsOteCommission(10000);
    setAcceleratorMultiplier(1.5);
  };

  // Base tier up to 100%
  const baseAttainment = Math.min(100, quotaAttainmentPercent);
  const baseCommissionEarned = (baseAttainment / 100) * onTargetEarningsOteCommission;
  
  // Accelerated tier above 100%
  const excessAttainment = Math.max(0, quotaAttainmentPercent - 100);
  const acceleratedCommissionEarned = (excessAttainment / 100) * onTargetEarningsOteCommission * acceleratorMultiplier;
  
  const totalCommissionPayout = baseCommissionEarned + acceleratedCommissionEarned;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Sales Commission Tier & Quota Accelerator Solver"
        description="Calculate tiered sales commission payouts, quota accelerator bonuses, and on-target earnings (OTE) compensation."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Quota Attainment (%)"
            value={quotaAttainmentPercent}
            onChange={(val) => setQuotaAttainmentPercent(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="%"
          />
          <InputField
            label="Base Target Commission at 100% ($)"
            value={onTargetEarningsOteCommission}
            onChange={(val) => setOnTargetEarningsOteCommission(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Accelerator Multiplier (>100% Quota)"
            value={acceleratorMultiplier}
            onChange={(val) => setAcceleratorMultiplier(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            step={0.1}
            suffix="x"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Base Commission Payout"
            value={`$${baseCommissionEarned.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
            subtitle="Earnings up to 100% quota"
            variant="light"
          />
          <ResultCard
            title="Accelerator Bonus"
            value={`$${acceleratedCommissionEarned.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
            subtitle={`${excessAttainment}% over performance bonus`}
            variant="indigo"
          />
          <ResultCard
            title="Total Commission Check"
            value={`$${totalCommissionPayout.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
            subtitle="Combined payout for performance period"
            variant="indigo"
          />
        </div>
      </div>
    </div>
  );
};
