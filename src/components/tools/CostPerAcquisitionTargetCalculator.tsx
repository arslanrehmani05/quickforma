import React, { useState } from "react";
import { Target, DollarSign, Crosshair, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CostPerAcquisitionTargetCalculator: React.FC = () => {
  const [customerLtv, setCustomerLtv] = useState<number>(1800);
  const [targetLtvToCacRatio, setTargetLtvToCacRatio] = useState<number>(3.0); // 3:1 ratio
  const [operatingOverheadMarginPercent, setOperatingOverheadMarginPercent] = useState<number>(25); // 25%

  const handleReset = () => {
    setCustomerLtv(1800);
    setTargetLtvToCacRatio(3.0);
    setOperatingOverheadMarginPercent(25);
  };

  // Target CAC = LTV / Target Ratio
  const targetAllowableCac = targetLtvToCacRatio > 0 ? customerLtv / targetLtvToCacRatio : 0;
  // Maximum break-even CAC before company loses money
  const grossMarginAfterOverhead = customerLtv * (1 - operatingOverheadMarginPercent / 100);
  const safetyBuffer = grossMarginAfterOverhead - targetAllowableCac;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Maximum Allowable Target CAC by Customer LTV Solver"
        description="Determine maximum sustainable Customer Acquisition Cost (CAC) thresholds based on unit economics and LTV:CAC targets."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Customer Lifetime Value (LTV $)"
            value={customerLtv}
            onChange={(val) => setCustomerLtv(Math.max(10, Number(val) || 0))}
            type="number"
            min={10}
            prefix="$"
          />
          <InputField
            label="Target LTV : CAC Multiple"
            value={targetLtvToCacRatio}
            onChange={(val) => setTargetLtvToCacRatio(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            step={0.1}
            suffix=":1"
          />
          <InputField
            label="Fixed Operating Overhead (%)"
            value={operatingOverheadMarginPercent}
            onChange={(val) => setOperatingOverheadMarginPercent(Math.min(90, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            suffix="%"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Target Allowable CAC"
            value={`$${targetAllowableCac.toFixed(2)}`}
            subtitle={`At ${targetLtvToCacRatio}:1 efficiency standard`}
            variant="indigo"
          />
          <ResultCard
            title="Absolute Breakeven Ceiling"
            value={`$${grossMarginAfterOverhead.toFixed(2)}`}
            subtitle="Maximum CAC before net loss"
            variant="light"
          />
          <ResultCard
            title="Capital Buffer per Acquired User"
            value={`$${safetyBuffer.toFixed(2)}`}
            subtitle="Retained cash buffer after CAC & overhead"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
