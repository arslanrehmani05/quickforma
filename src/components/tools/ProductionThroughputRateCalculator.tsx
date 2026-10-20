import React, { useState } from "react";
import { Gauge, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ProductionThroughputRateCalculator: React.FC = () => {
  const [goodUnitsProduced, setGoodUnitsProduced] = useState<number>(3600);
  const [shiftHours, setShiftHours] = useState<number>(8);
  const [downtimeHours, setDowntimeHours] = useState<number>(0.75); // 45 mins downtime

  const handleReset = () => {
    setGoodUnitsProduced(3600);
    setShiftHours(8);
    setDowntimeHours(0.75);
  };

  const netOperatingHours = Math.max(0.1, shiftHours - downtimeHours);
  const throughputPerHourGross = shiftHours > 0 ? goodUnitsProduced / shiftHours : 0;
  const throughputPerHourNet = netOperatingHours > 0 ? goodUnitsProduced / netOperatingHours : 0;
  const unitsPerMinute = throughputPerHourNet / 60;
  const secondsPerUnit = unitsPerMinute > 0 ? 60 / unitsPerMinute : 0;
  const projectedDailyCapacity = throughputPerHourNet * 24;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Units Per Hour Throughput Rate Solver"
        description="Compute gross and net production throughput velocities, unit cycle paces, and 24-hour plant run capacities."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Good Units Produced in Shift"
            value={goodUnitsProduced}
            onChange={(val) => setGoodUnitsProduced(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Total Scheduled Shift Length (Hours)"
            value={shiftHours}
            onChange={(val) => setShiftHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
          <InputField
            label="Total Unplanned Downtime (Hours)"
            value={downtimeHours}
            onChange={(val) => setDowntimeHours(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            step={0.25}
            suffix="hrs"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Net Throughput Rate"
          value={`${Math.round(throughputPerHourNet).toLocaleString()} units/hr`}
          subtitle="Active running pace"
          variant="indigo"
        />
        <ResultCard
          title="Cycle Pace"
          value={`${secondsPerUnit.toFixed(1)}s / unit`}
          subtitle={`${unitsPerMinute.toFixed(1)} units / min`}
          variant="light"
        />
        <ResultCard
          title="Gross Throughput Rate"
          value={`${Math.round(throughputPerHourGross).toLocaleString()} units/hr`}
          subtitle="Includes downtime loss"
          variant="light"
        />
        <ResultCard
          title="24-Hour Max Capacity"
          value={`${Math.round(projectedDailyCapacity).toLocaleString()} units`}
          subtitle="Continuous theoretical run"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Production Rate Dynamics</h4>
        <p className="text-slate-600">
          The assembly line finishes 1 good unit every <strong className="text-slate-800">{secondsPerUnit.toFixed(1)} seconds</strong> during active operation. Because of {downtimeHours * 60} minutes of downtime, the blended gross rate drops from <strong className="text-slate-800">{Math.round(throughputPerHourNet)} to {Math.round(throughputPerHourGross)} units/hr</strong>.
        </p>
      </div>
    </div>
  );
};
