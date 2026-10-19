import React, { useState } from "react";
import { Users, Gauge, Award, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const OverallLaborEffectivenessOle: React.FC = () => {
  const [scheduledHours, setScheduledHours] = useState<number>(400);
  const [actualProductiveHours, setActualProductiveHours] = useState<number>(360);
  const [standardHoursEarned, setStandardHoursEarned] = useState<number>(335);
  const [goodUnitsProduced, setGoodUnitsProduced] = useState<number>(4200);
  const [totalUnitsProduced, setTotalUnitsProduced] = useState<number>(4400);
  const [hourlyWageCost, setHourlyWageCost] = useState<number>(28.50);

  const handleReset = () => {
    setScheduledHours(400);
    setActualProductiveHours(360);
    setStandardHoursEarned(335);
    setGoodUnitsProduced(4200);
    setTotalUnitsProduced(4400);
    setHourlyWageCost(28.50);
  };

  // Availability = Productive Hours / Scheduled Hours
  const availabilityRate = scheduledHours > 0 ? (actualProductiveHours / scheduledHours) : 0;
  // Performance = Standard Hours Earned / Productive Hours
  const performanceRate = actualProductiveHours > 0 ? (standardHoursEarned / actualProductiveHours) : 0;
  // Quality = Good Units / Total Units
  const qualityRate = totalUnitsProduced > 0 ? (goodUnitsProduced / totalUnitsProduced) : 0;

  const ole = availabilityRate * performanceRate * qualityRate * 100;
  const lostLaborHours = Math.max(0, scheduledHours - (scheduledHours * (ole / 100)));
  const financialLaborWaste = lostLaborHours * hourlyWageCost;

  let rating = "Average (70% - 80%)";
  if (ole >= 85) rating = "World-Class Labor (> 85%)";
  else if (ole < 65) rating = "Substantial Labor Inefficiency (< 65%)";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Overall Labor Effectiveness (OLE) Solver"
        description="Compute Overall Labor Effectiveness (OLE) across Availability, Performance, and Quality factors."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Scheduled Paid Labor Hours"
            value={scheduledHours}
            onChange={(val) => setScheduledHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
          <InputField
            label="Actual Direct Productive Hours"
            value={actualProductiveHours}
            onChange={(val) => setActualProductiveHours(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="hrs"
          />
          <InputField
            label="Standard Earned Output Hours"
            value={standardHoursEarned}
            onChange={(val) => setStandardHoursEarned(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="hrs"
          />
          <InputField
            label="Total Finished Units Produced"
            value={totalUnitsProduced}
            onChange={(val) => setTotalUnitsProduced(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Good Defect-Free Units"
            value={goodUnitsProduced}
            onChange={(val) => setGoodUnitsProduced(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Fully Loaded Hourly Wage ($)"
            value={hourlyWageCost}
            onChange={(val) => setHourlyWageCost(Math.max(0, Number(val) || 0))}
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
          title="Overall Labor Effectiveness"
          value={`${ole.toFixed(1)}%`}
          subtitle={rating}
          variant="indigo"
        />
        <ResultCard
          title="Availability Score"
          value={`${(availabilityRate * 100).toFixed(1)}%`}
          subtitle="Time at workstation"
          variant="light"
        />
        <ResultCard
          title="Performance Score"
          value={`${(performanceRate * 100).toFixed(1)}%`}
          subtitle="Operating speed vs standard"
          variant="light"
        />
        <ResultCard
          title="Unproductive Labor Cost"
          value={`$${financialLaborWaste.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${lostLaborHours.toFixed(1)} lost hours`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Workforce Productivity Benchmark</h4>
        <p className="text-slate-600">
          At an OLE of <strong className="text-slate-800">{ole.toFixed(1)}%</strong>, your workforce operates at <strong className="text-slate-800">{(qualityRate * 100).toFixed(1)}%</strong> quality yield and <strong className="text-slate-800">{(performanceRate * 100).toFixed(1)}%</strong> standard pace. Eliminating attendance and pacing gaps could recover <strong className="text-slate-800">${financialLaborWaste.toLocaleString()}</strong> in payroll productivity.
        </p>
      </div>
    </div>
  );
};
