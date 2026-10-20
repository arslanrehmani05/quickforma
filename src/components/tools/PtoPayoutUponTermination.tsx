import React, { useState } from "react";
import { Calendar, DollarSign, Clock, FileText } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PtoPayoutUponTermination: React.FC = () => {
  const [hourlyWage, setHourlyWage] = useState<number>(36.00);
  const [unusedPtoHours, setUnusedPtoHours] = useState<number>(64);
  const [stateTaxRatePercent, setStateTaxRatePercent] = useState<number>(5.5);

  const handleReset = () => {
    setHourlyWage(36.00);
    setUnusedPtoHours(64);
    setStateTaxRatePercent(5.5);
  };

  const grossPtoPayout = unusedPtoHours * hourlyWage;
  const federalSupplementalWithholding = grossPtoPayout * 0.22; // 22% IRS supplemental rate
  const ficaTaxes = grossPtoPayout * 0.0765; // 7.65% Social Security & Medicare
  const stateWithholding = grossPtoPayout * (stateTaxRatePercent / 100);
  const totalTaxDeductions = federalSupplementalWithholding + ficaTaxes + stateWithholding;
  const netEstimatedPayout = grossPtoPayout - totalTaxDeductions;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Accrued Unused PTO Payout upon Termination Estimator"
        description="Calculate final paycheck accrued vacation payouts, state PTO forfeiture rules, and supplemental tax withholdings."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Employee Hourly Wage ($)"
            value={hourlyWage}
            onChange={(val) => setHourlyWage(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            step={0.5}
            prefix="$"
          />
          <InputField
            label="Unused Accrued PTO (Hours)"
            value={unusedPtoHours}
            onChange={(val) => setUnusedPtoHours(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="State Supplemental Income Tax (%)"
            value={stateTaxRatePercent}
            onChange={(val) => setStateTaxRatePercent(Math.min(15, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            step={0.1}
            suffix="%"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Gross PTO Payout"
            value={`$${grossPtoPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle={`${unusedPtoHours} accrued hours @ $${hourlyWage.toFixed(2)}/hr`}
            variant="light"
          />
          <ResultCard
            title="Federal Tax (22%)"
            value={`-$${federalSupplementalWithholding.toFixed(2)}`}
            subtitle="IRS supplemental wage withholding"
            variant="light"
          />
          <ResultCard
            title="FICA & State Taxes"
            value={`-$${(ficaTaxes + stateWithholding).toFixed(2)}`}
            subtitle="Social Security, Medicare, State"
            variant="light"
          />
          <ResultCard
            title="Estimated Net Check"
            value={`$${netEstimatedPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle="Final cash received after withholdings"
            variant="indigo"
          />
        </div>
      </div>
    </div>
  );
};
