import React, { useState } from "react";
import { Moon, DollarSign, Clock, Award } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ShiftDifferentialPayCalculator: React.FC = () => {
  const [baseHourlyWage, setBaseHourlyWage] = useState<number>(22.50);
  const [differentialHourlyPremium, setDifferentialHourlyPremium] = useState<number>(3.50); // $3.50/hr premium
  const [nightWeekendHoursWorked, setNightWeekendHoursWorked] = useState<number>(35);
  const [regularDayHoursWorked, setRegularDayHoursWorked] = useState<number>(10);

  const handleReset = () => {
    setBaseHourlyWage(22.50);
    setDifferentialHourlyPremium(3.50);
    setNightWeekendHoursWorked(35);
    setRegularDayHoursWorked(10);
  };

  const differentialRate = baseHourlyWage + differentialHourlyPremium;
  const regularDayPay = regularDayHoursWorked * baseHourlyWage;
  const shiftDifferentialPay = nightWeekendHoursWorked * differentialRate;
  const totalGrossPay = regularDayPay + shiftDifferentialPay;
  const totalHours = regularDayHoursWorked + nightWeekendHoursWorked;
  const effectiveBlendedWage = totalHours > 0 ? totalGrossPay / totalHours : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Night & Weekend Shift Differential Premium Pay Solver"
        description="Compute 2nd and 3rd shift differential premiums, graveyard shift hourly bumps, and effective blended wage rates."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Base Day Hourly Wage ($)"
            value={baseHourlyWage}
            onChange={(val) => setBaseHourlyWage(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            step={0.5}
            prefix="$"
          />
          <InputField
            label="Shift Differential Premium ($/hr)"
            value={differentialHourlyPremium}
            onChange={(val) => setDifferentialHourlyPremium(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            step={0.25}
            prefix="$"
          />
          <InputField
            label="Night / Weekend Shift Hours"
            value={nightWeekendHoursWorked}
            onChange={(val) => setNightWeekendHoursWorked(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Standard Day Shift Hours"
            value={regularDayHoursWorked}
            onChange={(val) => setRegularDayHoursWorked(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Premium Shift Wage"
            value={`$${differentialRate.toFixed(2)}/hr`}
            subtitle={`Base + $${differentialHourlyPremium.toFixed(2)} premium`}
            variant="indigo"
          />
          <ResultCard
            title="Total Weekly Earnings"
            value={`$${totalGrossPay.toFixed(2)}`}
            subtitle={`Across ${totalHours} total hours`}
            variant="indigo"
          />
          <ResultCard
            title="Shift Premium Lift"
            value={`+$${(nightWeekendHoursWorked * differentialHourlyPremium).toFixed(2)}`}
            subtitle="Extra cash from differential"
            variant="light"
          />
          <ResultCard
            title="Blended Effective Wage"
            value={`$${effectiveBlendedWage.toFixed(2)}/hr`}
            subtitle="Weighted average pay rate"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
