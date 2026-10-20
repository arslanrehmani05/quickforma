import React, { useState } from "react";
import { Layers, Gauge, Clock, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const WorkCenterCapacityPlanner: React.FC = () => {
  const [machineCount, setMachineCount] = useState<number>(6);
  const [shiftsPerDay, setShiftsPerDay] = useState<number>(2);
  const [shiftHours, setShiftHours] = useState<number>(8);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [oeeUtilizationPercent, setOeeUtilizationPercent] = useState<number>(80);
  const [scheduledJobHoursRequired, setScheduledJobHoursRequired] = useState<number>(340);

  const handleReset = () => {
    setMachineCount(6);
    setShiftsPerDay(2);
    setShiftHours(8);
    setDaysPerWeek(5);
    setOeeUtilizationPercent(80);
    setScheduledJobHoursRequired(340);
  };

  const totalTheoreticalHours = machineCount * shiftsPerDay * shiftHours * daysPerWeek;
  const ratedCapacityHours = totalTheoreticalHours * (oeeUtilizationPercent / 100);
  const capacityVarianceHours = ratedCapacityHours - scheduledJobHoursRequired;
  const workCenterLoadFactorPercent = ratedCapacityHours > 0 ? (scheduledJobHoursRequired / ratedCapacityHours) * 100 : 0;
  const isOverloaded = scheduledJobHoursRequired > ratedCapacityHours;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Work Center Available Hours & Load Factor Solver"
        description="Compute rough-cut capacity planning (RCCP), rated machine work center hours, and production bottleneck load factors."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Identical Machines in Work Center"
            value={machineCount}
            onChange={(val) => setMachineCount(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Shifts per Day"
            value={shiftsPerDay}
            onChange={(val) => setShiftsPerDay(Math.min(3, Math.max(1, Number(val) || 1)))}
            type="number"
            min={1}
            max={3}
          />
          <InputField
            label="Shift Length (Hours)"
            value={shiftHours}
            onChange={(val) => setShiftHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
          <InputField
            label="Operating Days per Week"
            value={daysPerWeek}
            onChange={(val) => setDaysPerWeek(Math.min(7, Math.max(1, Number(val) || 1)))}
            type="number"
            min={1}
            max={7}
            suffix="days/wk"
          />
          <InputField
            label="OEE Machine Efficiency (%)"
            value={oeeUtilizationPercent}
            onChange={(val) => setOeeUtilizationPercent(Math.min(100, Math.max(10, Number(val) || 0)))}
            type="number"
            min={10}
            max={100}
            suffix="%"
          />
          <InputField
            label="Scheduled Job Workload (Hours/Wk)"
            value={scheduledJobHoursRequired}
            onChange={(val) => setScheduledJobHoursRequired(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="hrs"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Rated Weekly Capacity"
          value={`${ratedCapacityHours.toFixed(0)} hrs`}
          subtitle={`At ${oeeUtilizationPercent}% OEE`}
          variant="indigo"
        />
        <ResultCard
          title="Work Center Load Factor"
          value={`${workCenterLoadFactorPercent.toFixed(1)}%`}
          subtitle={isOverloaded ? "Capacity Shortage" : "Capacity Available"}
          variant="light"
        />
        <ResultCard
          title="Surplus / Deficit"
          value={`${capacityVarianceHours >= 0 ? "+" : ""}${capacityVarianceHours.toFixed(0)} hrs`}
          subtitle={isOverloaded ? "Overbooked buffer" : "Available spare capacity"}
          variant="light"
        />
        <ResultCard
          title="Total Clock Hours"
          value={`${totalTheoreticalHours} hrs`}
          subtitle={`${machineCount} machines x ${shiftsPerDay * shiftHours * daysPerWeek} hrs`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Capacity Feasibility Assessment</h4>
        <p className="text-slate-600">
          The work center provides <strong className="text-slate-800">{ratedCapacityHours.toFixed(0)} productive hours</strong> weekly against a demanded load of {scheduledJobHoursRequired} hours ({workCenterLoadFactorPercent.toFixed(1)}% load). {isOverloaded ? "Warning: Workload exceeds rated capacity by " + Math.abs(capacityVarianceHours).toFixed(0) + " hours, creating an active factory bottleneck." : "The cell operates with an adequate " + capacityVarianceHours.toFixed(0) + " hour buffer to absorb unexpected machine breakdowns."}
        </p>
      </div>
    </div>
  );
};
