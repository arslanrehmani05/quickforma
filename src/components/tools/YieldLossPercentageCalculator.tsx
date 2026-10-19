import React, { useState } from "react";
import { FlaskConical, AlertTriangle, TrendingDown, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const YieldLossPercentageCalculator: React.FC = () => {
  const [startingMassKg, setStartingMassKg] = useState<number>(1200);
  const [usableFinishedMassKg, setUsableFinishedMassKg] = useState<number>(1095);
  const [rawMaterialCostPerKg, setRawMaterialCostPerKg] = useState<number>(14.50);

  const handleReset = () => {
    setStartingMassKg(1200);
    setUsableFinishedMassKg(1095);
    setRawMaterialCostPerKg(14.50);
  };

  const lossMassKg = Math.max(0, startingMassKg - usableFinishedMassKg);
  const yieldLossPercent = startingMassKg > 0 ? (lossMassKg / startingMassKg) * 100 : 0;
  const yieldEfficiencyPercent = startingMassKg > 0 ? (usableFinishedMassKg / startingMassKg) * 100 : 0;
  const totalFinancialLoss = lossMassKg * rawMaterialCostPerKg;
  const effectiveCostPerFinishedKg = usableFinishedMassKg > 0 ? (startingMassKg * rawMaterialCostPerKg) / usableFinishedMassKg : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Chemical / Food Production Yield Loss Solver"
        description="Calculate batch yield losses, evaporation / trimmings material waste, and effective raw ingredient costs."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Starting Batch Input (kg / lbs / L)"
            value={startingMassKg}
            onChange={(val) => setStartingMassKg(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="kg"
          />
          <InputField
            label="Usable Finished Output (kg / lbs / L)"
            value={usableFinishedMassKg}
            onChange={(val) => setUsableFinishedMassKg(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="kg"
          />
          <InputField
            label="Raw Material Cost per Input Unit ($)"
            value={rawMaterialCostPerKg}
            onChange={(val) => setRawMaterialCostPerKg(Math.max(0, Number(val) || 0))}
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
          title="Process Yield Efficiency"
          value={`${yieldEfficiencyPercent.toFixed(1)}%`}
          subtitle="Usable finished product"
          variant="indigo"
        />
        <ResultCard
          title="Yield Loss Percentage"
          value={`${yieldLossPercent.toFixed(1)}%`}
          subtitle={`${lossMassKg.toFixed(1)} kg lost in processing`}
          variant="light"
        />
        <ResultCard
          title="Financial Waste per Batch"
          value={`$${totalFinancialLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Discarded ingredient cost"
          variant="light"
        />
        <ResultCard
          title="Effective Finished Cost"
          value={`$${effectiveCostPerFinishedKg.toFixed(2)}/kg`}
          subtitle={`vs $${rawMaterialCostPerKg.toFixed(2)} input cost`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Processing Yield Insight</h4>
        <p className="text-slate-600">
          Losing {lossMassKg.toFixed(1)} kg ({yieldLossPercent.toFixed(1)}%) through evaporation, filtration, or residue inflates the real unit cost of your finished output from <strong className="text-slate-800">${rawMaterialCostPerKg.toFixed(2)} to ${effectiveCostPerFinishedKg.toFixed(2)} per kg</strong>. Tightening batch recovery by 2% saves <strong className="text-slate-800">${(startingMassKg * 0.02 * rawMaterialCostPerKg).toFixed(0)}</strong> on every single production run.
        </p>
      </div>
    </div>
  );
};
