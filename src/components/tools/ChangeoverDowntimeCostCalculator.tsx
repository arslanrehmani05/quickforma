import React, { useState } from "react";
import { Wrench, DollarSign, Clock, TrendingDown } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ChangeoverDowntimeCostCalculator: React.FC = () => {
  const [changeoversPerMonth, setChangeoversPerMonth] = useState<number>(35);
  const [hoursPerChangeover, setHoursPerChangeover] = useState<number>(1.5);
  const [crewSize, setCrewSize] = useState<number>(3);
  const [crewWagePerHour, setCrewWagePerHour] = useState<number>(28.00);
  const [lostMarginPerHourDowntime, setLostMarginPerHourDowntime] = useState<number>(180.00); // Gross margin lost while press is stopped

  const handleReset = () => {
    setChangeoversPerMonth(35);
    setHoursPerChangeover(1.5);
    setCrewSize(3);
    setCrewWagePerHour(28.00);
    setLostMarginPerHourDowntime(180.00);
  };

  const totalDowntimeHoursMonthly = changeoversPerMonth * hoursPerChangeover;
  const idleLaborCostMonthly = totalDowntimeHoursMonthly * crewSize * crewWagePerHour;
  const lostOpportunityMarginMonthly = totalDowntimeHoursMonthly * lostMarginPerHourDowntime;
  const totalChangeoverCostMonthly = idleLaborCostMonthly + lostOpportunityMarginMonthly;
  const annualizedLoss = totalChangeoverCostMonthly * 12;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Setup Time Changeover Productivity Financial Loss"
        description="Compute monthly idle labor costs and unearned machine contribution margins lost during tooling changeovers."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Tooling Changeovers per Month"
            value={changeoversPerMonth}
            onChange={(val) => setChangeoversPerMonth(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Average Changeover Time (Hours)"
            value={hoursPerChangeover}
            onChange={(val) => setHoursPerChangeover(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            step={0.1}
            suffix="hrs"
          />
          <InputField
            label="Changeover Setup Crew Size"
            value={crewSize}
            onChange={(val) => setCrewSize(Math.max(1, Number(val) || 1))}
            type="number"
            min={1}
          />
          <InputField
            label="Technician Hourly Wage ($/hr)"
            value={crewWagePerHour}
            onChange={(val) => setCrewWagePerHour(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Lost Machine Contribution Margin ($/hr)"
            value={lostMarginPerHourDowntime}
            onChange={(val) => setLostMarginPerHourDowntime(Math.max(0, Number(val) || 0))}
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
          title="Monthly Financial Drag"
          value={`$${totalChangeoverCostMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Labor + lost machine margin"
          variant="indigo"
        />
        <ResultCard
          title="Annualized Cost"
          value={`$${annualizedLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
          subtitle="Full 12-month drain"
          variant="light"
        />
        <ResultCard
          title="Monthly Idle Hours"
          value={`${totalDowntimeHoursMonthly.toFixed(1)} hrs`}
          subtitle="Non-productive downtime"
          variant="light"
        />
        <ResultCard
          title="Direct Setup Labor Cost"
          value={`$${idleLaborCostMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo`}
          subtitle={`${crewSize} techs x $${crewWagePerHour}/hr`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">SMED Justification Insight</h4>
        <p className="text-slate-600">
          Spending {totalDowntimeHoursMonthly.toFixed(0)} hours each month swapping dies and fixtures drains <strong className="text-slate-800">${totalChangeoverCostMonthly.toLocaleString()} in net profit</strong>. Cutting changeover duration by 50% through external pre-staging recovers <strong className="text-slate-800">${(annualizedLoss * 0.5).toLocaleString()}</strong> in bottom-line cash flow annually.
        </p>
      </div>
    </div>
  );
};
