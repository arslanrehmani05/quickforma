import React, { useState } from "react";
import { Clock, Gauge, Layers, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CycleTimeCalculator: React.FC = () => {
  const [shiftHours, setShiftHours] = useState<number>(8);
  const [plannedDowntimeMinutes, setPlannedDowntimeMinutes] = useState<number>(45); // breaks + setup
  const [unitsProduced, setUnitsProduced] = useState<number>(550);
  const [customerDemandUnits, setCustomerDemandUnits] = useState<number>(600);
  const [wipUnits, setWipUnits] = useState<number>(120);

  const handleReset = () => {
    setShiftHours(8);
    setPlannedDowntimeMinutes(45);
    setUnitsProduced(550);
    setCustomerDemandUnits(600);
    setWipUnits(120);
  };

  const netOperatingSeconds = Math.max(0, (shiftHours * 3600) - (plannedDowntimeMinutes * 60));
  const actualCycleTimeSeconds = unitsProduced > 0 ? netOperatingSeconds / unitsProduced : 0;
  const taktTimeSeconds = customerDemandUnits > 0 ? netOperatingSeconds / customerDemandUnits : 0;
  const throughputPerHour = netOperatingSeconds > 0 ? (unitsProduced / (netOperatingSeconds / 3600)) : 0;
  // Little's Law: Lead Time = WIP / Throughput Rate (in hours)
  const leadTimeHours = throughputPerHour > 0 ? wipUnits / throughputPerHour : 0;

  const isMeetingDemand = actualCycleTimeSeconds <= taktTimeSeconds;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Manufacturing Lead Time & Little's Law WIP Solver"
        description="Compute actual machine cycle times, customer Takt time, and production lead times using Little's Law."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Shift Length (Hours)"
            value={shiftHours}
            onChange={(val) => setShiftHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
          <InputField
            label="Planned Breaks & Setup (Minutes)"
            value={plannedDowntimeMinutes}
            onChange={(val) => setPlannedDowntimeMinutes(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="mins"
          />
          <InputField
            label="Actual Units Produced in Shift"
            value={unitsProduced}
            onChange={(val) => setUnitsProduced(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Customer Demand Target (Units)"
            value={customerDemandUnits}
            onChange={(val) => setCustomerDemandUnits(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Work-in-Process (WIP Units on Line)"
            value={wipUnits}
            onChange={(val) => setWipUnits(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Actual Cycle Time"
          value={`${actualCycleTimeSeconds.toFixed(1)}s`}
          subtitle="Time per finished unit"
          variant="indigo"
        />
        <ResultCard
          title="Takt Time"
          value={`${taktTimeSeconds.toFixed(1)}s`}
          subtitle={isMeetingDemand ? "Pace meets demand" : "Pace behind demand"}
          variant="light"
        />
        <ResultCard
          title="Throughput Velocity"
          value={`${throughputPerHour.toFixed(0)} units/hr`}
          subtitle="Net production pace"
          variant="light"
        />
        <ResultCard
          title="Little's Law Lead Time"
          value={`${(leadTimeHours * 60).toFixed(0)} mins`}
          subtitle={`${leadTimeHours.toFixed(2)} hrs line latency`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Lean Manufacturing Balance</h4>
        <p className="text-slate-600">
          Your machine takes <strong className="text-slate-800">{actualCycleTimeSeconds.toFixed(1)} seconds</strong> per piece, while customer demand requires 1 piece every <strong className="text-slate-800">{taktTimeSeconds.toFixed(1)} seconds</strong>. {isMeetingDemand ? "Production easily meets customer delivery pace." : "Warning: Cycle time exceeds Takt time, creating an output deficit of " + (customerDemandUnits - unitsProduced) + " units per shift without overtime."}
        </p>
      </div>
    </div>
  );
};
