import React, { useState } from "react";
import { Gauge, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ManufacturingTaktVsCycleTime: React.FC = () => {
  const [shiftMinutes, setShiftMinutes] = useState<number>(480); // 8 hours = 480 mins
  const [plannedBreaksMinutes, setPlannedBreaksMinutes] = useState<number>(50); // lunch + breaks
  const [customerDemandUnits, setCustomerDemandUnits] = useState<number>(520);
  const [actualCycleTimeSeconds, setActualCycleTimeSeconds] = useState<number>(45); // Line cycle time

  const handleReset = () => {
    setShiftMinutes(480);
    setPlannedBreaksMinutes(50);
    setCustomerDemandUnits(520);
    setActualCycleTimeSeconds(45);
  };

  const netAvailableSeconds = Math.max(1, (shiftMinutes - plannedBreaksMinutes) * 60);
  const taktTimeSeconds = customerDemandUnits > 0 ? netAvailableSeconds / customerDemandUnits : 0;
  const isPaceSatisfied = actualCycleTimeSeconds <= taktTimeSeconds;
  const maxPossibleOutputUnits = actualCycleTimeSeconds > 0 ? Math.floor(netAvailableSeconds / actualCycleTimeSeconds) : 0;
  const productionGapUnits = customerDemandUnits - maxPossibleOutputUnits;
  const linePacingRatio = taktTimeSeconds > 0 ? (actualCycleTimeSeconds / taktTimeSeconds) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Takt Time vs Cycle Time Line Efficiency Solver"
        description="Compare customer demand Takt pacing against machine cycle times to balance line flow and avoid overtime."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Shift Length (Minutes)"
            value={shiftMinutes}
            onChange={(val) => setShiftMinutes(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="mins"
          />
          <InputField
            label="Planned Breaks & Meetings (Minutes)"
            value={plannedBreaksMinutes}
            onChange={(val) => setPlannedBreaksMinutes(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="mins"
          />
          <InputField
            label="Customer Demand Target (Units/Shift)"
            value={customerDemandUnits}
            onChange={(val) => setCustomerDemandUnits(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Actual Machine Cycle Time (Seconds/Unit)"
            value={actualCycleTimeSeconds}
            onChange={(val) => setActualCycleTimeSeconds(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            step={0.5}
            suffix="sec"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Takt Time (Target)"
          value={`${taktTimeSeconds.toFixed(1)}s`}
          subtitle="Required pace per unit"
          variant="indigo"
        />
        <ResultCard
          title="Cycle vs Takt Status"
          value={isPaceSatisfied ? "BALANCED" : "OVERBURDEN"}
          subtitle={isPaceSatisfied ? "Pace satisfies demand" : `${(actualCycleTimeSeconds - taktTimeSeconds).toFixed(1)}s too slow`}
          variant="light"
        />
        <ResultCard
          title="Max Shift Output"
          value={`${maxPossibleOutputUnits.toLocaleString()} units`}
          subtitle={`Target: ${customerDemandUnits.toLocaleString()} units`}
          variant="light"
        />
        <ResultCard
          title="Output Gap"
          value={productionGapUnits <= 0 ? "Surplus +" + Math.abs(productionGapUnits) : `Deficit -${productionGapUnits}`}
          subtitle={`${linePacingRatio.toFixed(1)}% of takt pace`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Lean Line Pacing Verdict</h4>
        <p className="text-slate-600">
          Customer demand requires 1 completed unit every <strong className="text-slate-800">{taktTimeSeconds.toFixed(1)} seconds</strong>. Because your line produces at <strong className="text-slate-800">{actualCycleTimeSeconds.toFixed(1)} seconds</strong>, {isPaceSatisfied ? "the line comfortably delivers daily quotas within regular shift hours." : "the line falls short by " + productionGapUnits + " units per shift, requiring overtime or bottleneck elimination."}
        </p>
      </div>
    </div>
  );
};
