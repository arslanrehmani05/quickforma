import React, { useState } from "react";
import { Scale, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ManufacturingYieldVarianceCalculator: React.FC = () => {
  const [actualInputUnits, setActualInputUnits] = useState<number>(5000);
  const [standardYieldPercent, setStandardYieldPercent] = useState<number>(92);
  const [actualGoodOutputUnits, setActualGoodOutputUnits] = useState<number>(4450);
  const [standardCostPerUnit, setStandardCostPerUnit] = useState<number>(18.50);

  const handleReset = () => {
    setActualInputUnits(5000);
    setStandardYieldPercent(92);
    setActualGoodOutputUnits(4450);
    setStandardCostPerUnit(18.50);
  };

  const standardExpectedGoodUnits = actualInputUnits * (standardYieldPercent / 100);
  const yieldVarianceUnits = actualGoodOutputUnits - standardExpectedGoodUnits;
  const yieldVarianceDollars = yieldVarianceUnits * standardCostPerUnit;
  const actualYieldPercent = actualInputUnits > 0 ? (actualGoodOutputUnits / actualInputUnits) * 100 : 0;
  const isFavorable = yieldVarianceUnits >= 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Standard Yield vs Actual Output Material Variance"
        description="Compute standard cost accounting Material Yield Variance (MYV) and finished good conversion efficiencies."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Raw Material Input Units Started"
            value={actualInputUnits}
            onChange={(val) => setActualInputUnits(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Standard Expected Yield (%)"
            value={standardYieldPercent}
            onChange={(val) => setStandardYieldPercent(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
          <InputField
            label="Actual Finished Good Output (Units)"
            value={actualGoodOutputUnits}
            onChange={(val) => setActualGoodOutputUnits(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Standard Unit Cost ($/unit)"
            value={standardCostPerUnit}
            onChange={(val) => setStandardCostPerUnit(Math.max(0, Number(val) || 0))}
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
          title="Material Yield Variance"
          value={`${yieldVarianceDollars >= 0 ? "+" : ""}$${yieldVarianceDollars.toFixed(2)}`}
          subtitle={isFavorable ? "Favorable (Extra output)" : "Unfavorable (Output deficit)"}
          variant="indigo"
        />
        <ResultCard
          title="Yield Efficiency Spread"
          value={`${(actualYieldPercent - standardYieldPercent).toFixed(1)}%`}
          subtitle={`${actualYieldPercent.toFixed(1)}% vs ${standardYieldPercent}% standard`}
          variant="light"
        />
        <ResultCard
          title="Unit Variance"
          value={`${yieldVarianceUnits >= 0 ? "+" : ""}${Math.round(yieldVarianceUnits)} units`}
          subtitle={`Expected: ${Math.round(standardExpectedGoodUnits)} units`}
          variant="light"
        />
        <ResultCard
          title="Actual Good Output"
          value={`${actualGoodOutputUnits.toLocaleString()} units`}
          subtitle="Verified finished goods"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Yield Accounting Insight</h4>
        <p className="text-slate-600">
          The batch yielded <strong className="text-slate-800">{actualYieldPercent.toFixed(1)}% usable parts</strong> compared to the standard expectation of {standardYieldPercent}%. This {Math.abs(yieldVarianceUnits)} unit difference results in a <strong className="text-slate-800">{isFavorable ? "favorable profit bonus of" : "unfavorable material loss of"} ${Math.abs(yieldVarianceDollars).toFixed(2)}</strong> on standard cost sheets.
        </p>
      </div>
    </div>
  );
};
