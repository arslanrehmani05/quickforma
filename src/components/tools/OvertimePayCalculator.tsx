import React, { useState } from "react";
import { Clock, DollarSign, Award, ShieldAlert } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const OvertimePayCalculator: React.FC = () => {
  const [regularHourlyWage, setRegularHourlyWage] = useState<number>(24.00);
  const [totalHoursWorked, setTotalHoursWorked] = useState<number>(52);
  const [overtimeThresholdHours, setOvertimeThresholdHours] = useState<number>(40); // FLSA standard 40 hrs
  const [overtimeRateMultiplier, setOvertimeRateMultiplier] = useState<number>(1.5); // 1.5x time-and-a-half

  const handleReset = () => {
    setRegularHourlyWage(24.00);
    setTotalHoursWorked(52);
    setOvertimeThresholdHours(40);
    setOvertimeRateMultiplier(1.5);
  };

  const regularHours = Math.min(totalHoursWorked, overtimeThresholdHours);
  const overtimeHours = Math.max(0, totalHoursWorked - overtimeThresholdHours);
  const regularGrossPay = regularHours * regularHourlyWage;
  const overtimeHourlyRate = regularHourlyWage * overtimeRateMultiplier;
  const overtimeGrossPay = overtimeHours * overtimeHourlyRate;
  const totalWeeklyGross = regularGrossPay + overtimeGrossPay;
  const blendedHourlyRate = totalHoursWorked > 0 ? totalWeeklyGross / totalHoursWorked : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Fair Labor Standards Act (FLSA) Overtime Pay Solver"
        description="Compute time-and-a-half (1.5x) and double-time wage premiums, regular rate calculations, and total gross pay."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Regular Hourly Base Wage ($)"
            value={regularHourlyWage}
            onChange={(val) => setRegularHourlyWage(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            step={0.5}
            prefix="$"
          />
          <InputField
            label="Total Weekly Hours Worked"
            value={totalHoursWorked}
            onChange={(val) => setTotalHoursWorked(Math.min(120, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={120}
          />
          <InputField
            label="FLSA OT Threshold (Hours)"
            value={overtimeThresholdHours}
            onChange={(val) => setOvertimeThresholdHours(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Overtime Premium Multiplier"
            value={overtimeRateMultiplier}
            onChange={(val) => setOvertimeRateMultiplier(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            step={0.5}
            suffix="x"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Regular Base Earnings"
            value={`$${regularGrossPay.toFixed(2)}`}
            subtitle={`${regularHours} hrs @ $${regularHourlyWage.toFixed(2)}/hr`}
            variant="light"
          />
          <ResultCard
            title="Overtime Premium Pay"
            value={`$${overtimeGrossPay.toFixed(2)}`}
            subtitle={`${overtimeHours} OT hrs @ $${overtimeHourlyRate.toFixed(2)}/hr`}
            variant="indigo"
          />
          <ResultCard
            title="Total Weekly Gross Pay"
            value={`$${totalWeeklyGross.toFixed(2)}`}
            subtitle="Combined regular + overtime"
            variant="indigo"
          />
          <ResultCard
            title="Blended Effective Rate"
            value={`$${blendedHourlyRate.toFixed(2)}/hr`}
            subtitle="Effective wage across all 52 hours"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
