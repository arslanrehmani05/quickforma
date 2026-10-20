import React, { useState } from "react";
import { Calendar, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const FmlaLeaveHoursCalculator: React.FC = () => {
  const [weeklyScheduledHours, setWeeklyScheduledHours] = useState<number>(40);
  const [hoursUsedToDate, setHoursUsedToDate] = useState<number>(120);

  const handleReset = () => {
    setWeeklyScheduledHours(40);
    setHoursUsedToDate(120);
  };

  // Statutory FMLA is 12 workweeks per 12-month period
  const totalFmlaEntitlementHours = weeklyScheduledHours * 12;
  const remainingHours = Math.max(0, totalFmlaEntitlementHours - hoursUsedToDate);
  const remainingWeeks = weeklyScheduledHours > 0 ? remainingHours / weeklyScheduledHours : 0;
  const percentageConsumed = totalFmlaEntitlementHours > 0 ? (hoursUsedToDate / totalFmlaEntitlementHours) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="12-Week FMLA Entitlement Hours & Balance Solver"
        description="Compute statutory Family and Medical Leave Act (FMLA) hour balances, intermittent leave tracking, and available balance."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Employee Scheduled Weekly Hours"
            value={weeklyScheduledHours}
            onChange={(val) => setWeeklyScheduledHours(Math.min(80, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={80}
          />
          <InputField
            label="FMLA Leave Hours Used to Date"
            value={hoursUsedToDate}
            onChange={(val) => setHoursUsedToDate(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Total FMLA Entitlement"
            value={`${totalFmlaEntitlementHours} hours`}
            subtitle="Statutory 12-workweek allocation"
            variant="light"
          />
          <ResultCard
            title="Remaining FMLA Balance"
            value={`${remainingHours} hours`}
            subtitle={`Equivalent to ${remainingWeeks.toFixed(1)} workweeks`}
            variant="light"
          />
          <ResultCard
            title="Leave Utilization"
            value={`${percentageConsumed.toFixed(1)}%`}
            subtitle={`${hoursUsedToDate} of ${totalFmlaEntitlementHours} hours consumed`}
            variant="light"
          />
          <ResultCard
            title="Compliance Status"
            value={remainingHours > 0 ? "Compliant / Active" : "Entitlement Exhausted"}
            subtitle="Statutory protection limit"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
