import React, { useState } from "react";
import { Wrench, DollarSign, Clock, ShieldAlert } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MaintenanceLaborCostCalculator: React.FC = () => {
  const [preventiveHours, setPreventiveHours] = useState<number>(120);
  const [correctiveHours, setCorrectiveHours] = useState<number>(55);
  const [technicianHourlyRate, setTechnicianHourlyRate] = useState<number>(36.00);
  const [overtimeHourlyRate, setOvertimeHourlyRate] = useState<number>(54.00);
  const [emergencyOvertimeHours, setEmergencyOvertimeHours] = useState<number>(20);

  const handleReset = () => {
    setPreventiveHours(120);
    setCorrectiveHours(55);
    setTechnicianHourlyRate(36.00);
    setOvertimeHourlyRate(54.00);
    setEmergencyOvertimeHours(20);
  };

  const preventiveCost = preventiveHours * technicianHourlyRate;
  const regularCorrectiveHours = Math.max(0, correctiveHours - emergencyOvertimeHours);
  const correctiveCost = (regularCorrectiveHours * technicianHourlyRate) + (emergencyOvertimeHours * overtimeHourlyRate);
  const totalMaintenanceLaborCost = preventiveCost + correctiveCost;

  const totalHours = preventiveHours + correctiveHours;
  const pmRatioPercent = totalHours > 0 ? (preventiveHours / totalHours) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Preventive vs Corrective Maintenance Cost"
        description="Compute industrial maintenance labor expenses, overtime emergency breakdown surcharges, and PM/CM ratios."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Preventive Maintenance (PM) Hours"
            value={preventiveHours}
            onChange={(val) => setPreventiveHours(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="hrs"
          />
          <InputField
            label="Corrective Breakdown (CM) Hours"
            value={correctiveHours}
            onChange={(val) => setCorrectiveHours(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            suffix="hrs"
          />
          <InputField
            label="Emergency Overtime Breakdown Hours"
            value={emergencyOvertimeHours}
            onChange={(val) => setEmergencyOvertimeHours(Math.min(correctiveHours, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            suffix="hrs"
          />
          <InputField
            label="Standard Technician Rate ($/hr)"
            value={technicianHourlyRate}
            onChange={(val) => setTechnicianHourlyRate(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Overtime Premium Rate ($/hr)"
            value={overtimeHourlyRate}
            onChange={(val) => setOvertimeHourlyRate(Math.max(0, Number(val) || 0))}
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
          title="Total Maintenance Payroll"
          value={`$${totalMaintenanceLaborCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="PM + CM labor total"
          variant="indigo"
        />
        <ResultCard
          title="PM / Total Ratio"
          value={`${pmRatioPercent.toFixed(1)}%`}
          subtitle="World-class target: 80%"
          variant="light"
        />
        <ResultCard
          title="Preventive Labor Spend"
          value={`$${preventiveCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${preventiveHours} scheduled hours`}
          variant="light"
        />
        <ResultCard
          title="Corrective Emergency Spend"
          value={`$${correctiveCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`Includes overtime penalties`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Reliability Maintenance Balance</h4>
        <p className="text-slate-600">
          Your preventive-to-corrective ratio is <strong className="text-slate-800">{pmRatioPercent.toFixed(1)}% PM</strong>. World-class manufacturing facilities target 80% proactive planned maintenance to prevent costly emergency overtime calls ($${correctiveCost.toLocaleString()}).
        </p>
      </div>
    </div>
  );
};
