import React, { useState } from "react";
import { Layers, DollarSign, Activity, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const WorkInProcessWipCalculator: React.FC = () => {
  const [wipUnits, setWipUnits] = useState<number>(350);
  const [rawMaterialPerUnit, setRawMaterialPerUnit] = useState<number>(45.00);
  const [fullLaborOverheadPerUnit, setFullLaborOverheadPerUnit] = useState<number>(35.00);
  const [stageCompletionPercent, setStageCompletionPercent] = useState<number>(50); // Standard 50% for work in process
  const [holdingCostPercentAnnual, setHoldingCostPercentAnnual] = useState<number>(20);

  const handleReset = () => {
    setWipUnits(350);
    setRawMaterialPerUnit(45.00);
    setFullLaborOverheadPerUnit(35.00);
    setStageCompletionPercent(50);
    setHoldingCostPercentAnnual(20);
  };

  // Value per WIP unit = 100% Raw Material + (Completion% * Labor/Overhead)
  const valuePerWipUnit = rawMaterialPerUnit + (fullLaborOverheadPerUnit * (stageCompletionPercent / 100));
  const totalWipValuation = wipUnits * valuePerWipUnit;
  const annualCarryingCost = totalWipValuation * (holdingCostPercentAnnual / 100);
  const dailyCarryingCost = annualCarryingCost / 365;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="WIP Inventory Valuation & Production Flow"
        description="Compute Work-in-Process (WIP) balance sheet valuations, stage-of-completion absorption, and carrying cost leakage."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Total WIP Units on Shop Floor"
            value={wipUnits}
            onChange={(val) => setWipUnits(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Raw Material Content per Unit ($)"
            value={rawMaterialPerUnit}
            onChange={(val) => setRawMaterialPerUnit(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Total Labor & Overhead Standard ($)"
            value={fullLaborOverheadPerUnit}
            onChange={(val) => setFullLaborOverheadPerUnit(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Average Stage of Completion (%)"
            value={stageCompletionPercent}
            onChange={(val) => setStageCompletionPercent(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
          <InputField
            label="Annual Inventory Carrying Cost (%)"
            value={holdingCostPercentAnnual}
            onChange={(val) => setHoldingCostPercentAnnual(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Total WIP Balance Sheet Value"
          value={`$${totalWipValuation.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Working capital tied up"
          variant="indigo"
        />
        <ResultCard
          title="Value per WIP Unit"
          value={`$${valuePerWipUnit.toFixed(2)}`}
          subtitle={`At ${stageCompletionPercent}% completion`}
          variant="light"
        />
        <ResultCard
          title="Annual Carrying Cost"
          value={`$${annualCarryingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${holdingCostPercentAnnual}% holding rate`}
          variant="light"
        />
        <ResultCard
          title="Daily Cost of WIP Delay"
          value={`$${dailyCarryingCost.toFixed(2)}/day`}
          subtitle="Carrying cost burn"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Working Capital Impact</h4>
        <p className="text-slate-600">
          Unfinished parts waiting on the factory floor tie up <strong className="text-slate-800">${totalWipValuation.toLocaleString()}</strong> in unliquidated capital. Trimming WIP cycle time by half frees <strong className="text-slate-800">${(totalWipValuation * 0.5).toLocaleString()}</strong> in liquid cash flow while accelerating plant customer response times.
        </p>
      </div>
    </div>
  );
};
