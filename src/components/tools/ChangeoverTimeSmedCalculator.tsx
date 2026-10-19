import React, { useState } from "react";
import { Wrench, Clock, TrendingUp, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ChangeoverTimeSmedCalculator: React.FC = () => {
  const [currentChangeoverMinutes, setCurrentChangeoverMinutes] = useState<number>(65);
  const [targetSmedMinutes, setTargetSmedMinutes] = useState<number>(9); // Single-minute exchange < 10 mins
  const [changeoversPerWeek, setChangeoversPerWeek] = useState<number>(8);
  const [hourlyMachineRate, setHourlyMachineRate] = useState<number>(140);
  const [unitsProducedPerHour, setUnitsProducedPerHour] = useState<number>(85);

  const handleReset = () => {
    setCurrentChangeoverMinutes(65);
    setTargetSmedMinutes(9);
    setChangeoversPerWeek(8);
    setHourlyMachineRate(140);
    setUnitsProducedPerHour(85);
  };

  const currentAnnualHours = (currentChangeoverMinutes / 60) * changeoversPerWeek * 52;
  const targetAnnualHours = (targetSmedMinutes / 60) * changeoversPerWeek * 52;
  const hoursRecoveredAnnual = Math.max(0, currentAnnualHours - targetAnnualHours);
  const annualCostSaved = hoursRecoveredAnnual * hourlyMachineRate;
  const additionalUnitsCapacity = hoursRecoveredAnnual * unitsProducedPerHour;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="SMED Tooling Changeover Setup Loss Solver"
        description="Compute Single-Minute Exchange of Die (SMED) setup reductions, machine downtime costs, and unlocked production capacity."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Current Changeover Time (Minutes)"
            value={currentChangeoverMinutes}
            onChange={(val) => setCurrentChangeoverMinutes(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="mins"
          />
          <InputField
            label="Target SMED Time (Minutes)"
            value={targetSmedMinutes}
            onChange={(val) => setTargetSmedMinutes(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="mins"
          />
          <InputField
            label="Tooling Setups per Week"
            value={changeoversPerWeek}
            onChange={(val) => setChangeoversPerWeek(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Machine Hourly Downtime Rate ($)"
            value={hourlyMachineRate}
            onChange={(val) => setHourlyMachineRate(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Production Rate (Units / Hour)"
            value={unitsProducedPerHour}
            onChange={(val) => setUnitsProducedPerHour(Math.max(0, Number(val) || 0))}
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
          title="Annual Savings"
          value={`$${annualCostSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Downtime cost eliminated"
          variant="indigo"
        />
        <ResultCard
          title="Production Hours Recovered"
          value={`${hoursRecoveredAnnual.toFixed(0)} hrs/yr`}
          subtitle="Added machine uptime"
          variant="light"
        />
        <ResultCard
          title="Unlocked Capacity"
          value={`+${Math.round(additionalUnitsCapacity).toLocaleString()} units`}
          subtitle="Without capital equipment"
          variant="light"
        />
        <ResultCard
          title="Changeover Reduction"
          value={`${(((currentChangeoverMinutes - targetSmedMinutes) / currentChangeoverMinutes) * 100).toFixed(0)}%`}
          subtitle={`From ${currentChangeoverMinutes}m to ${targetSmedMinutes}m`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">SMED ROI Benchmark</h4>
        <p className="text-slate-600">
          Shrinking setup times from {currentChangeoverMinutes} minutes down to single-digits ({targetSmedMinutes} mins) liberates <strong className="text-slate-800">{hoursRecoveredAnnual.toFixed(0)} hours</strong> of productive press time, worth <strong className="text-slate-800">${annualCostSaved.toLocaleString()}</strong> in recovered manufacturing capacity annually.
        </p>
      </div>
    </div>
  );
};
