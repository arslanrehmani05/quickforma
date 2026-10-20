import React, { useState } from "react";
import { Clock, DollarSign, Calendar, Briefcase } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const HourlyToSalaryCalculator: React.FC = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(38.50);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [paidWeeksPerYear, setPaidWeeksPerYear] = useState<number>(52);

  const handleReset = () => {
    setHourlyRate(38.50);
    setHoursPerWeek(40);
    setPaidWeeksPerYear(52);
  };

  const annualSalary = hourlyRate * hoursPerWeek * paidWeeksPerYear;
  const monthlySalary = annualSalary / 12;
  const biWeeklySalary = annualSalary / 26;
  const dailyPay = hourlyRate * (hoursPerWeek / 5);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Hourly Wage to Equivalent Annual Salary Solver"
        description="Convert hourly compensation rates to equivalent annual, monthly, bi-weekly, and weekly compensation totals."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Hourly Pay Rate ($)"
            value={hourlyRate}
            onChange={(val) => setHourlyRate(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            step={0.5}
            prefix="$"
          />
          <InputField
            label="Standard Hours Worked per Week"
            value={hoursPerWeek}
            onChange={(val) => setHoursPerWeek(Math.min(80, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={80}
          />
          <InputField
            label="Paid Weeks per Year"
            value={paidWeeksPerYear}
            onChange={(val) => setPaidWeeksPerYear(Math.min(52, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={52}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Annual Equivalent Salary"
            value={`$${annualSalary.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
            subtitle="Full-year gross compensation"
            variant="indigo"
          />
          <ResultCard
            title="Monthly Equivalent"
            value={`$${monthlySalary.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
            subtitle="Monthly gross pay"
            variant="light"
          />
          <ResultCard
            title="Bi-Weekly Paycheck"
            value={`$${biWeeklySalary.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
            subtitle="Every 2 weeks (26 pay periods)"
            variant="light"
          />
          <ResultCard
            title="Daily Earnings"
            value={`$${dailyPay.toFixed(2)}`}
            subtitle="Based on standard 5-day week"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
