import React, { useState } from "react";
import { Wrench, Calendar, Clock, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TpmPlannedMaintenanceScheduler: React.FC = () => {
  const [weeklyOperatingHours, setWeeklyOperatingHours] = useState<number>(80);
  const [lubricationIntervalHours, setLubricationIntervalHours] = useState<number>(200);
  const [filterInspectionIntervalHours, setFilterInspectionIntervalHours] = useState<number>(500);
  const [majorOverhaulIntervalHours, setMajorOverhaulIntervalHours] = useState<number>(4000);
  const [operatingWeeksPerYear, setOperatingWeeksPerYear] = useState<number>(50);

  const handleReset = () => {
    setWeeklyOperatingHours(80);
    setLubricationIntervalHours(200);
    setFilterInspectionIntervalHours(500);
    setMajorOverhaulIntervalHours(4000);
    setOperatingWeeksPerYear(50);
  };

  const annualOperatingHours = weeklyOperatingHours * operatingWeeksPerYear;
  const lubricationCyclesAnnual = lubricationIntervalHours > 0 ? annualOperatingHours / lubricationIntervalHours : 0;
  const filterCyclesAnnual = filterInspectionIntervalHours > 0 ? annualOperatingHours / filterInspectionIntervalHours : 0;
  const majorOverhaulsAnnual = majorOverhaulIntervalHours > 0 ? annualOperatingHours / majorOverhaulIntervalHours : 0;

  // Time in calendar days between major overhauls
  const dailyRunningHours = weeklyOperatingHours / 7;
  const daysBetweenMajorOverhauls = dailyRunningHours > 0 ? majorOverhaulIntervalHours / dailyRunningHours : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Total Productive Maintenance Frequency"
        description="Schedule Total Productive Maintenance (TPM) intervals, lubrication cycles, and major overhaul service dates."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Weekly Machine Running Hours"
            value={weeklyOperatingHours}
            onChange={(val) => setWeeklyOperatingHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs/wk"
          />
          <InputField
            label="Lubrication & Oil Interval (Hours)"
            value={lubricationIntervalHours}
            onChange={(val) => setLubricationIntervalHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
          <InputField
            label="Filter & Seal Inspection (Hours)"
            value={filterInspectionIntervalHours}
            onChange={(val) => setFilterInspectionIntervalHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
          <InputField
            label="Major Overhaul Cycle (Hours)"
            value={majorOverhaulIntervalHours}
            onChange={(val) => setMajorOverhaulIntervalHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="hrs"
          />
          <InputField
            label="Operating Weeks per Year"
            value={operatingWeeksPerYear}
            onChange={(val) => setOperatingWeeksPerYear(Math.min(52, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={52}
            suffix="wks"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Annual Machine Run Time"
          value={`${annualOperatingHours.toLocaleString()} hrs`}
          subtitle="Total production load"
          variant="indigo"
        />
        <ResultCard
          title="Oil & Lube Services"
          value={`${Math.round(lubricationCyclesAnnual)} / year`}
          subtitle={`Every ${(lubricationIntervalHours / (weeklyOperatingHours / 7)).toFixed(0)} days`}
          variant="light"
        />
        <ResultCard
          title="Filter Replacements"
          value={`${Math.round(filterCyclesAnnual)} / year`}
          subtitle={`Every ${(filterInspectionIntervalHours / (weeklyOperatingHours / 7)).toFixed(0)} days`}
          variant="light"
        />
        <ResultCard
          title="Major Overhaul Frequency"
          value={`Every ${Math.round(daysBetweenMajorOverhauls)} days`}
          subtitle={`${majorOverhaulsAnnual.toFixed(1)} overhauls/yr`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Preventive Maintenance Schedule</h4>
        <p className="text-slate-600">
          At an operating pace of {weeklyOperatingHours} hours per week, technicians must perform basic lubrication every <strong className="text-slate-800">{(lubricationIntervalHours / weeklyOperatingHours).toFixed(1)} weeks</strong> and plan a complete teardown overhaul every <strong className="text-slate-800">{(majorOverhaulIntervalHours / weeklyOperatingHours).toFixed(1)} weeks</strong> ({Math.round(daysBetweenMajorOverhauls)} calendar days) to eliminate unexpected catastrophic failures.
        </p>
      </div>
    </div>
  );
};
